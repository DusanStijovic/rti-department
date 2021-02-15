import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { from } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';
import SubjectNotifications from '../../model/SubjectNotifications';
import { EmployeeService } from '../../services/employee.service';
import { ShareLoginDataService } from '../../services/share-login-data.service';
import { SubjectService } from '../../services/subject.service';


@Component({
  selector: 'app-dodaj-vest-opredmetu',
  templateUrl: './dodaj-vest-opredmetu.component.html',
  styleUrls: ['./dodaj-vest-opredmetu.component.css']
})


export class DodajVestOPredmetuComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private subjectService: SubjectService,
    private employeeService: EmployeeService,
    private shareLogin: ShareLoginDataService
  ) { }

  ngOnInit(): void {
    this.getSubjectWhereAngeaaged();
    this.initForApply();
    this.subjectNotif.content = '';
  }

  public Editor = ClassicEditor;

  public model = {
    editorData: '<p>Unesite sadrzaj vesti!</p>'
  }

  getSubjectWhereAngeaaged() {
    let username = this.shareLogin.getUser().username;
    this.employeeService.getEmployeeSubjects(username).subscribe((result: any) => {
      this.subjectConnected = result;
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  subjectNotif: SubjectNotifications = {} as SubjectNotifications;
  choosenSubject: string[] = [];

  subjectConnected: Array<{ subject: string }> = {} as Array<{ subject: string }>;
  dodajVest() {
    if (this.haveEmptyFields()) return;
    if (!this.subjectNotif.dateCreation || this.subjectNotif.dateCreation == null) {
      this.subjectNotif.dateCreation = new Date();
    }
    this.subjectService.createSubjectNotif({ choosenSubject: this.choosenSubject, subjectNotif: this.subjectNotif }).subscribe((result: any) => {
      this.message = result.message;
      if (this.saveFile) {
        this.uploader.uploadAll();
      }
    }, (err) => {
      this.message = err.error.error;
    })
  }

  haveEmptyFields() {
    if (!this.subjectNotif.title || this.subjectNotif.title == '') {
      this.message = "Naslov prazan";
      return true;
    }
    if (!this.subjectNotif.content || this.subjectNotif.content == '') {
      this.message = "Sadrzaj prazan";
      return true;
    }
    if (!this.choosenSubject || this.choosenSubject.length == 0) {
      this.message = "Niste izabrali nijedan predmet";
      return true;
    }

  }

  message: string;


  saveFile: FileItem;
  uploader: FileUploader;
  urlToApply: string;

  initForApply() {
    this.subjectNotif.materials = [];
    this.urlToApply = `${environment.api}/predmetiSacuvaniFajlovi/all/information_materials`;
    this.uploader = new FileUploader({
      url: this.urlToApply, itemAlias: 'file',
      authToken: "Bearer " + this.authService.getToken()
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.saveFile = file;
      console.log(this.saveFile);
      file.file.name = `${new Date().getTime()}_${file.file.name}`;
      this.subjectNotif.materials.push(file.file.name);
      console.log(this.subjectNotif.materials);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('FileUpload:uploaded:', item, staFtus, response);
      alert('File uploaded successfully');
      this.message = response;
      //this.uploader.queue.pop();
    };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      this.message = "Greska pri uploadovanju fajla";
    }
    //console.log(this.urlToApply);
  }

}
