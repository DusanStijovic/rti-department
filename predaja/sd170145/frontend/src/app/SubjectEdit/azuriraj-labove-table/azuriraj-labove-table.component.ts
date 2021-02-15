import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';
import SubjectMaterialsInfo from '../../model/SubjectMaterialsInfo';
import { AuthServiceService } from '../../services/auth-service.service';
import { ShareLoginDataService } from '../../services/share-login-data.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-azuriraj-labove-table',
  templateUrl: './azuriraj-labove-table.component.html',
  styleUrls: ['./azuriraj-labove-table.component.css']
})
export class AzurirajLaboveTableComponent implements OnInit {


  @Input() materials: Array<SubjectMaterialsInfo>;
  @Input() baseUrl: string;
  @Input() buttonAction: string;
  @Input() emptyText: string;
  @Input() moreOprions: boolean;
  @Input() lab_id: string;

  constructor(
    private http: HttpClient,
    private share: ShareLoginDataService,
    private authService: AuthServiceService,
    private activeRouted: ActivatedRoute,
    private subjectService: SubjectService,
    private employeeService: EmployeeService) { }

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



  pocetak() {
    this.subjectService.getGeneralSubjectInfoByObjectId(this.activeRouted.snapshot.params.id).subscribe((result: any) => {
      let subjectId = result.generalInfo.id;
      let matName = this.activeRouted.snapshot.params.tipMaterijala;
      this.urlToApply = `${environment.api}/predmetiSacuvaniFajlovi/${subjectId}/labovi `;
      this.initForApply();
    })
  }


  one_file: boolean;

  obrisi(name: string) {
    this.materials = this.materials.filter((one) => {
      return one.link != name;
    })
  }


  dodaj() {
    if (this.saveFile == null || this.newMatInfo.name == '' || !this.newMatInfo.number) {
      this.message = 'Imate prazna polja';
      return;
    }
    this.one_file = true;
    this.materials.push(this.newMatInfo);
    this.newMatInfo = {} as SubjectMaterialsInfo;
    this.saveFile = null;
  }

  newMatInfo: SubjectMaterialsInfo = {} as SubjectMaterialsInfo;


  dodajNoviMaterijal() {

  }

  azurirajMaterijale() {
    if (this.one_file) {
      this.uploader.uploadAll()
      this.one_file = false;
    }

    this.subjectService.azurirajLabMaterials(this.materials, this.activeRouted.snapshot.params.id, this.lab_id).subscribe((result: any) => {
      this.message = result;
    }, (err) => {
      this.message = "Greska probajte opet";
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
