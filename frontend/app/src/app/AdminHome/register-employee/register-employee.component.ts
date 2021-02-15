import { Component, OnInit } from '@angular/core';
import Employee from 'src/app/model/Employee';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { environment } from 'src/environments/environment';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { toUnicode } from 'punycode';


@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEMployeeComponent implements OnInit {

  constructor(private encDevice: EncrDecrService, private authService: AuthServiceService, private employeeService: EmployeeService, private share: ShareLoginDataService) { }

  ngOnInit(): void {
    this.employee = {} as Employee;
    this.employee.status = "aktivan"
    this.initForApply();
  }

  employee: Employee = {} as Employee;

  zvanja: string[] = ["redovni profesor", "vandredni profesor", "docent", "asistent", "saradnik u nastavi", "istrazivac", "laboratorijski inzenjer", "laboratorijski tehnicar"];


  zvanjeToTip(zvanje: string) {
    if (zvanje === 'laboratorijski inzenjer' || zvanje === 'laboratorijski tehnicar' || zvanje === 'istrazivac') {
      this.employee.type = 'laborant';
    } else {
      this.employee.type = 'nastavnik';
    }
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
      file.file.name = this.employee.username + "_" + file.file.name;
      console.log(this.saveFile);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
      //alert('File uploaded successfully');
      this.saveFile = null;
    };

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      this.message = "Nije uplodavana slika, probajte opet";
    }
    console.log(this.urlToApply);
  }


  addEmployee() {
    //console.log(this.employee);
    if (this.employee.password) {
      this.employee.password = this.encDevice.set(environment.key, this.employee.password);
    }
    if (this.saveFile) {
      this.employee.pictureUrl = this.saveFile.file.name;
    } else {
      this.employee.pictureUrl = "";
    }
    this.zvanjeToTip(this.employee.title);
    console.log(this.employee);

    this.employeeService.createNewEmployee(this.employee).subscribe((result: any) => {
      this.message = result.message;
      if (this.saveFile) {
        this.uploader.uploadAll();
      }
      this.saveFile = null;
      this.employee.password = this.encDevice.get(environment.key, this.employee.password)
    }, (err) => {
      this.message = err.error.error;
    })
  }

  registrujZaposlenog() {
    if (this.checkIfEmptyField()) {
      return;
    }
    console.log(this.saveFile);
    this.addEmployee();
  }

  checkIfEmptyField(): boolean {
    console.log(this.employee);
    if (!this.employee.password || this.employee.password == "") {
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
    if (!this.employee.address || this.employee.address == "") {
      this.message = "Adresa je obavezna";
      return true;
    }
    if (!this.employee.roomNumber || this.employee.roomNumber < 0) {
      this.message = "Broj kabineta je obavezno";
      return true;
    }
    if (!this.employee.title || this.employee.title == "") {
      this.message = "Zvanje je obavezno";
      return true;
    }
    return false;
  }

  uploader: FileUploader;

  saveFile: FileItem = null;
  urlToApply: string;







  //Img preview
  public imagePath;
  imgURL: any;
  public message: string;

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
