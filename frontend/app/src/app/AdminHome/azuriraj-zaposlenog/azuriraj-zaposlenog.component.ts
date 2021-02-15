import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { env } from 'process';
import Employee from 'src/app/model/Employee';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { ShowImageService } from 'src/app/show-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-azuriraj-zaposlenog',
  templateUrl: './azuriraj-zaposlenog.component.html',
  styleUrls: ['./azuriraj-zaposlenog.component.css']
})
export class AzurirajZaposlenogComponent implements OnInit {

  constructor(
    private imageService: ShowImageService,
    private activeRouted: ActivatedRoute,
    private employeeService: EmployeeService, private authService: AuthServiceService, private encDevice: EncrDecrService) { }


  ngOnInit(): void {
    this.employeeId = this.activeRouted.snapshot.params.id;
    this.employee = {} as Employee;
    this.employee.status = "aktivan"
    this.initForApply();
    this.getEmployee(this.employeeId);
    this.employee._id = this.employeeId;
  }


  employeeId: string;

  employee: Employee = {} as Employee;

  zvanja: string[] = ["redovni profesor", "vandredni profesor", "docent", "asistent", "saradnik u nastavi", "istrazivac", "laboratorijski inzenjer", "laboratorijski tehnicar"];

  saveFile: FileItem;
  uploader: FileUploader;
  urlToApply: string;

  message: string;

  showImage: boolean;
  getEmployee(id: string) {
    this.employeeService.getEmployee(id).subscribe((result: any) => {
      this.employee = result.employee;
      //alert(this.encDevice.set(environment.key, 'stud123'))
      this.employee.password = this.encDevice.get(environment.key, this.employee.password)
      if (this.employee.pictureUrl && this.employee.pictureUrl != "") {
        this.getImageFromService();
        this.showImage = true;
      } else {
        this.showImage = false;
      }
    }, (err) => {
      this.message = err.error.error;
    })
  }

  extractUserNamePrefix(username: string) {
    let rx = /^(\w+)@etf\.bg\.ac\.rs$/g;
    var arr = rx.exec(username);
    return arr[1];
  }


  zvanjeToTip(zvanje: string) {
    if (zvanje === 'laboratorijski inzenjer' || zvanje === 'laboratorijski tehnicar' || zvanje === 'istrazivac') {
      this.employee.type = 'laborant';
    } else {
      this.employee.type = 'nastavnik';
    }
  }



  changeEmployee() {
    //console.log(this.employee);
    if (this.employee.password) {
      this.employee.password = this.encDevice.set(environment.key, this.employee.password);
    }
    if (this.saveFile) {
      this.employee.pictureUrl = this.saveFile.file.name;
    }
    this.zvanjeToTip(this.employee.title);
    //console.log(this.employee);
    this.employeeService.changeEmployee(this.employee).subscribe((result: any) => {
      this.message = result.result;
      if (this.saveFile) {
        this.uploader.uploadAll();
      }
      this.getEmployee(this.employeeId);
      this.saveFile = null;
    }, (err) => {
      this.message = err.error.error;//JSON.stringify(err.error.error);
    })
  }


  azurirajZaposlenog() {
    if (this.checkIfEmptyField()) {
      return;
    }
    if (this.saveFile && !this.checkExtension(this.saveFile.file.name)) {
      this.message = "Only pictures allowed";
      return;
    }
    //console.log(this.saveFile);
    this.changeEmployee();
  }

  checkIfEmptyField(): boolean {
    //console.log(this.employee);
    if (!this.employee.password || this.employee.password === "") {
      this.message = "Sifra je obavezna";
      return true;
    }
    if (!this.employee.firstName || this.employee.firstName == "") {
      this.message = "Ime je obavezno";
      return true;
    }
    if (!this.employee.lastName || this.employee.lastName == "") {
      this.message = "Prezime je obavezno";
      return true;
    }
    if (!this.employee.title || this.employee.title == "") {
      this.message = "Zvanje je obavezno";
      return true;
    }
    if (!this.employee.address || this.employee.address == "") {
      this.message = "Adresa je obavezno";
      return true;
    }
    return false;
  }

  checkExtension(fileName: string) {
    let regex = /^.*\.(png|jpg)$/;
    return regex.test(fileName);
  }


  initForApply() {
    this.urlToApply = `${environment.api}/slikeZaposlenih`;
    this.uploader = new FileUploader({
      url: this.urlToApply, itemAlias: 'slika',
      authToken: "Bearer " + this.authService.getToken()
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.saveFile = file;
      file.file.name = this.employee.username + new Date().getTime() + "_" + file.file.name;
      //console.log(this.saveFile);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('FileUpload:uploaded:', item, staFtus, response);
      //alert('File uploaded successfully');
      this.getEmployee(this.employeeId);
      this.uploader.queue.pop();
      this.saveFile = null;
    };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      this.message = "Greska pri uploadovanju fajla";
      this.saveFile = null;
    }
    //console.log(this.urlToApply);
  }






  imageToShow: any;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }


  getImageFromService() {
    //let name = this.extractUserNamePrefix(this.employee.username);
    this.imageService.getImage(`${environment.api}/slikeZaposlenih/${this.employee.pictureUrl}`).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      this.message = error;
      //console.log(error);
    });
  }





  //Img preview
  public imagePath;
  imgURL: any;
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
