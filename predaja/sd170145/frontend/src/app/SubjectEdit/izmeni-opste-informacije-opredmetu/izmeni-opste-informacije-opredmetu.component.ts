import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SubjectGeneralInfo } from 'src/app/model/SubjectGeneralInfo';
import { SubjectService } from 'src/app/services/subject.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-izmeni-opste-informacije-opredmetu',
  templateUrl: './izmeni-opste-informacije-opredmetu.component.html',
  styleUrls: ['./izmeni-opste-informacije-opredmetu.component.css']
})
export class IzmeniOpsteInformacijeOPredmetuComponent implements OnInit {


  constructor(private subjectService: SubjectService, private activeRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subjectId = this.activeRouter.snapshot.params.id;
    //console.log("IS DECE" + this.subjectId);
    this.getAllGeneralSubjectInfo();
    this.activeRouter.url.subscribe((res) => {
      this.subjectId = this.activeRouter.snapshot.params.id;
      //console.log("IS DECE" + this.subjectId);
      this.getAllGeneralSubjectInfo();
    })
  }

  mySubscription: Subscription;
  getAllGeneralSubjectInfo() {
    this.subjectService.getGeneralSubjectInfoByObjectId(this.subjectId).subscribe((subject: any) => {
      this.info = subject.generalInfo;
      console.log(this.info);
      this.employees = subject.employees;
      this.makeClasses();
      console.log(this.info);
    }, (err) => {
      console.log(err);
    });
  }

  public Editor1 = ClassicEditor;
  public Editor2 = ClassicEditor;


  makeClasses() {
    let help = "";
    let temp = "";
    for (const one of this.info.classTime) {
      help += temp;
      help += one;
      temp = "-";
    }
    console.log(help);
    this.subjectClasses = help;
  }
  subjectClasses: string = "";

  info: SubjectGeneralInfo = {} as SubjectGeneralInfo;

  employees: { idEmployee: string, employeeName: string };

  subjectId: string;

  baseUrl: string = "/listaZaposlenih/zaposlen/";

  message: string;

  haveEmptyFields() {
    if (!this.info.name || this.info.name == '') {
      this.message = 'Ime predmeta je obavezno';
      return true;
    }
    if (!this.info.id || this.info.id == '') {
      this.message = 'Sifra predmeta je obavezna';
      return true;
    }
    if (!this.info.department || this.info.department == '') {
      this.message = 'Odsek je obavezan';
      return true;
    }
    if (!this.info.espb || this.info.espb < 0) {
      this.message = 'ESPB bodovi su obavezni';
      return true;
    }
    if (!this.info.semestar || this.info.semestar < 0 || this.info.semestar > 13) {
      this.message = 'Semestar je obavezan';
      return true;
    }
    if (!this.info.type || this.info.type == "") {
      this.message = 'Tip je obavezan';
      return true;
    }
    return false

  }

  azuriraj() {
    if (this.haveEmptyFields()) return;
    this.info.classTime = this.subjectClasses.split("_");
    this.subjectService.updateSubjectGeneralInfo(this.info, this.subjectId).subscribe((result: any) => {
      this.message = result;
    }, (err) => {
      this.message = "Probajte ponovo";
    })
  }


}
