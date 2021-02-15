import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { SubjectService } from 'src/app/services/subject.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SubjectNotifications from 'src/app/model/SubjectNotifications';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-subject-notifications',
  templateUrl: './change-subject-notifications.component.html',
  styleUrls: ['./change-subject-notifications.component.css']
})
export class ChangeSubjectNotificationsComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthServiceService,
    private subjectService: SubjectService,
    private employeeService: EmployeeService,
    private shareLogin: ShareLoginDataService) { }

  ngOnInit(): void {
    this.getSubjectWhereAngeaaged();
    this.initForApply();
    this.subjectNotif.content = '';
    this.getSubjectNotification(this.activeRouter.snapshot.params.id);
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

  getSubjectNotification(id: string) {
    this.subjectService.getSubjectNotif(id).subscribe((result: any) => {
      this.subjectNotif = result;
      this.choosenSubject = result.connectedSubject;
    }, (err) => {
      console.log(err);
      this.router.navigate(['errorPage']);
    })
  }

  subjectNotif: SubjectNotifications = {} as SubjectNotifications;
  choosenSubject: string[] = [];

  subjectConnected: Array<{ subject: string }> = {} as Array<{ subject: string }>;
  azurirajVest() {
    this.subjectNotif.connectedSubject = this.choosenSubject;
    this.subjectService.updateSubjectNotif(this.subjectNotif).subscribe((result: any) => {
      this.message = result;
      if (this.saveFile) {
        this.uploader.uploadAll();
      }
    }, (err) => {
      this.message = err.error.error;
    })
  }

  azurirajDodatke(){
    //To do
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

  obrisiObavestenjeMaterijal(name: string) {
    this.subjectService.deleteNotifMaterials(name).subscribe((result: any) => {
      this.subjectNotif.materials = this.subjectNotif.materials.filter((elem: string) => {
        return elem != name;
      })
      this.message = result.message;
    }, (err) => {
      this.message = "Fajl nije uspesno obrisan probajte opet";
    });

    //Dodati azuriranje predmeta i ovde...

  }

}
