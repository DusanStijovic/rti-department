import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SubjectApplication from 'src/app/model/SubjectApplication';
import { SubjectService } from 'src/app/services/subject.service';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-subject-applications',
  templateUrl: './subject-applications.component.html',
  styleUrls: ['./subject-applications.component.css']
})
export class SubjectApplicationsComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthServiceService,
    private http: HttpClient, private el: ElementRef, private share: ShareLoginDataService, private subjectService: SubjectService, private router: Router, private activeRouted: ActivatedRoute) { }

  public uploader: FileUploader;

  ngOnInit(): void {
    this.studentApply = [];
    this.id = this.activeRouted.snapshot.params.id;
    this.getAllSubjectApplications(this.id);
    //this.refreshPage();
    this.initForApply();
    this.getAllStudentSpisakApplication(this.share.getUser().username);
    this.opisDugmeta = "Prijavi se";
  }


  initForApply() {
    let user = this.share.getUser().username;
    this.urlToApply = `${environment.api}/predmetiSacuvaniFajlovi/${this.id}/spiskovi/${user}`;
    this.uploader = new FileUploader({
      url: this.urlToApply, itemAlias: 'file',
      authToken: "Bearer " + this.authService.getToken()
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.saveFile = file;
      //console.log(this.saveFile);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
      this.saveFile = null;
      this.getAllSubjectApplications(this.id);
      this.getAllStudentSpisakApplication(this.share.getUser().username);
      //alert('File uploaded successfully');
    };
  }

  saveFile: FileItem;
  urlToApply: string;


  upload() {
    console.log(this.saveFile);
    this.uploader.uploadAll();
  }

  checkExtension(fileName: string) {
    let regex = /^.*\.(zip|7z)$/;
    return regex.test(fileName);
  }

  prijaviSe(oneApply: SubjectApplication) {
    let name = "";
    if (oneApply.uploadFileNedded && !this.saveFile) {
      this.message = "Niste uneli fajl";
      return;
    }
    if (oneApply.uploadFileNedded && !this.checkExtension(this.saveFile.file.name)) {
      this.message = "Dozvoljeni su samo zip i 7z fajlovi";
      return;
    }
    if (oneApply.uploadFileNedded) {
      name = `${this.saveFile.file.name}`;
    }
    const spisakID = oneApply._id;
    this.subjectService.applyStudentToSpisak(spisakID, this.share.getUser().username, name).subscribe((result) => {
      this.message = 'Uspesno prijavljeni';
      if (oneApply.uploadFileNedded) {
        name = `${this.saveFile.file.name}`;
        this.upload();
      } else {
        this.getAllSubjectApplications(this.id);
        this.getAllStudentSpisakApplication(this.share.getUser().username);
      }
      this.removeMessage();
    }, (err) => {
      // this.router.navigate(['errorPage']);
      this.message = JSON.stringify(err);
      console.log(JSON.stringify(err));
    })

  }


  getAllStudentSpisakApplication(studentID: string) {
    this.subjectService.getAllStudentSpisakApplication(studentID).subscribe((result: any) => {
      this.studentApply = result.body;
    }, (err) => {
      this.router.navigate(['errorPage']);
    });
  }

  studentApply: string[];

  getAllSubjectApplications(id: string) {
    this.subjectService.getAllSubjectApplications(id).subscribe((result: any) => {
      this.subjectApplication = result.subjectApply;
      console.log(this.subjectApplication);
    }, (err) => {
      this.router.navigate(['errorPage']);
    });

  }

  removeMessage() {
    const source2 = timer(200);
    const subscribe2 = source2.subscribe((res) => { this.message = ""; });
  }


  id: string;
  subjectApplication: SubjectApplication[];
  opisDugmeta: string;
  message: string;


  showText(oneApply: SubjectApplication): string {
    let date = oneApply.deadline;
    let current = oneApply.currentApply;
    let max = oneApply.maxApply;
    let id = oneApply._id;
    this.opisDugmeta = "Prijavi se";
    // console.log(date);
    // console.log("MAX:" + max);
    // console.log("CUR:" + current);

    let momentNew = moment(date);
    let momentNow = moment(new Date());
    if (momentNow > momentNew) {
      return "Prosao rok";
    }
    // console.log(date);
    // console.log("MAX:" + max);
    // console.log("CUR:" + current);
    if (max != -1 && current === max) return "Nema vise mesta";
    if (this.studentApply) {
      console.log(this.studentApply);
      console.log(id);
      let found = this.studentApply.find((one: string) => {
        return one === id;
      })
      if (found) return "Prijavljeni ste";
    }
    return "";
  }

  checkIfCanApply(oneApply: SubjectApplication): boolean {
    let date = oneApply.deadline;
    let current = oneApply.currentApply;
    let max = oneApply.maxApply;
    let id = oneApply._id;

    if (this.studentApply) {
      console.log(this.studentApply);
      console.log(id);
      let found = this.studentApply.find((one: string) => {
        return one === id;
      })
      if (found) return false;
    }
    // console.log(date);
    // console.log("MAX:" + max);
    // console.log("CUR:" + current);
    if (max != -1 && current === max) return false;


    if (!date) return true;

    let momentNew = moment(date);
    let momentNow = moment(new Date());
    if (momentNow > momentNew) {
      return false;
    }
    // console.log(date);
    // console.log("MAX:" + max);
    // console.log("CUR:" + current);
    return true;
  }

  source = timer(0, 2000);
  subscribe: Subscription;
  refreshPage() {
    this.subscribe = this.source.subscribe(val => {
      console.log(val);
      this.getAllSubjectApplications(this.id);
    });
  }

  ngOnDestroy() {
    //this.subscribe.unsubscribe();
  }


}
