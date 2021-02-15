import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import SubjectMaterialsInfo from 'src/app/model/SubjectMaterialsInfo';
import { SubjectService } from '../../services/subject.service';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-subject-materials-table',
  templateUrl: './subject-materials-table.component.html',
  styleUrls: ['./subject-materials-table.component.css']
})
export class SubjectMaterialsTableComponent implements OnInit {


  @Input() materials: Array<any>;
  @Input() baseUrl: string;
  @Input() buttonAction: string;
  @Input() emptyText: string;
  @Input() moreOprions: boolean;
  constructor(
    private http: HttpClient,
    private share: ShareLoginDataService,
    private authService: AuthServiceService,
    private activeRouted: ActivatedRoute,
    private subjectService: SubjectService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.pocetak();
    this.getEmployeeName();
    this.activeRouted.url.subscribe((result) => {
      this.pocetak();
      this.getEmployeeName();
      console.log('Resenje' + result);
    })
  }


  getEmployeeName() {
    let username = this.share.getUser().username;
    if (username == 'admin@admin') {
      this.employeeName = 'admin';
      return;
    }
    this.employeeService.getEmployeNamebyUserName(username).subscribe((result: any) => {
      this.employeeName = result;
    })


  }
  employeeName: string;

  obrisi(name: string) {
    this.subjectService.deleteSubjectMaterials(name, this.activeRouted.snapshot.params.id, this.activeRouted.snapshot.params.tipMaterijala).subscribe((result: any) => {
      this.message = result;
      this.materials = this.materials.filter((one) => {
        return one.link != name;
      })
    }, (err) => {
      this.message = "Greska probajte opet";
    })
  }

  pocetak() {
    this.subjectService.getGeneralSubjectInfoByObjectId(this.activeRouted.snapshot.params.id).subscribe((result: any) => {
      let subjectId = result.generalInfo.id;
      let matName = this.activeRouted.snapshot.params.tipMaterijala;
      this.urlToApply = `${environment.api}/predmetiSacuvaniFajlovi/${subjectId}/${matName}`;
      this.initForApply();
    })
  }


  dodaj() {
    if (this.saveFile == null) {
      this.message = "Morate izabrati fajl";
      return;
    }
    this.dodajNoviMaterijal();

  }

  newMatInfo: SubjectMaterialsInfo = {} as SubjectMaterialsInfo;



  dodajNoviMaterijal() {
    let name = this.activeRouted.snapshot.params.tipMaterijala;
    console.log(name);
    if (name === "Predavanja") {
      this.createPredavanja();
    }
    if (name === "Vezbe") {
      this.createVezbe();
    }
    if (name === "Ispitna pitanja") {
      this.createIspitneZadatke();
    }
    if (name === "Ispitna resenja") {
      this.createIspistnaResenja();
    }
  }

  azurirajMaterijale() {
    this.subjectService.azurirajRedosled(this.materials, this.activeRouted.snapshot.params.id, this.activeRouted.snapshot.params.tipMaterijala).subscribe((result: any) => {
      this.message = result;
    }, (err) => {
      this.message = "Greska probajte opet";
    })
  }


  createPredavanja() {
    this.subjectService.createSubjectLectureMaterials(this.newMatInfo, this.activeRouted.snapshot.params.id).subscribe((result: any) => {
      this.message = result;
      this.uploader.uploadAll();
      this.materials.push(this.newMatInfo);
      console.log(this.materials);
      this.newMatInfo = {} as SubjectMaterialsInfo;
    }, (err) => {
      this.message = 'Neuspesno probajte ponovo';
    })
  }


  createVezbe() {
    this.subjectService.createSubjectExerciseMaterials(this.newMatInfo, this.activeRouted.snapshot.params.id).subscribe((result: any) => {
      this.message = result;
      this.uploader.uploadAll();
      this.materials.push(this.newMatInfo);
      console.log(this.materials);
      this.newMatInfo = {} as SubjectMaterialsInfo;
    }, (err) => {
      this.message = 'Neuspesno probajte ponovo';
    })
  }

  createIspitneZadatke() {
    this.subjectService.createSubjectIspitniZadaciMaterials(this.newMatInfo, this.activeRouted.snapshot.params.id).subscribe((result: any) => {
      this.message = result;
      this.uploader.uploadAll();
      this.materials.push(this.newMatInfo);
      console.log(this.materials);
      this.newMatInfo = {} as SubjectMaterialsInfo;
    }, (err) => {
      this.message = 'Neuspesno probajte ponovo';
    })
  }

  createIspistnaResenja() {
    this.subjectService.createSubjectIspitnaResenjaMaterials(this.newMatInfo, this.activeRouted.snapshot.params.id).subscribe((result: any) => {
      this.message = result;
      this.uploader.uploadAll();
      this.materials.push(this.newMatInfo);
      console.log(this.materials);
      this.newMatInfo = {} as SubjectMaterialsInfo;
    }, (err) => {
      this.message = 'Neuspesno probajte ponovo';
    })
  }



  download(filename: string = null): void {


    this.http.get(`${this.baseUrl}/${filename}`, { responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (filename)
          downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }


  saveFile: FileItem;
  uploader: FileUploader;
  urlToApply: string;
  message: string;


  extractFormat(name: string) {
    let regex = /^.*\.(.*)$/
    let result = regex.exec(name);
    return result[1];
  }

  initForApply() {
    console.log("LINK" + this.urlToApply);
    this.uploader = new FileUploader({
      url: this.urlToApply, itemAlias: 'file',
      authToken: "Bearer " + this.authService.getToken()
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.saveFile = file;
      console.log(this.saveFile);
      file.file.name = `${new Date().getTime()}_${file.file.name}`;
      this.newMatInfo.link = file.file.name;
      this.newMatInfo.size = file.file.size;
      this.newMatInfo.employee = this.employeeName;
      this.newMatInfo.format = this.extractFormat(file.file.name);
      this.newMatInfo.date = new Date();
      console.log(file.file);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('FileUpload:uploaded:', item, staFtus, response);
      alert('File uploaded successfully');
      this.message = response;
      //this.uploader.queue.pop();
    };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      this.message = "Greska pri uploadovanju fajla, probajte opet";
    }
    //console.log(this.urlToApply);
  }

}
