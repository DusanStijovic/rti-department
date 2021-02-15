import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectGeneralInfo } from 'src/app/model/SubjectGeneralInfo';
import SubjectMapping from 'src/app/model/SubjectMapping';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-dodaj-predmet',
  templateUrl: './dodaj-predmet.component.html',
  styleUrls: ['./dodaj-predmet.component.css']
})
export class DodajPredmetComponent implements OnInit {

  constructor(private subjectService: SubjectService, private activeRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllSubject();
    this.info = {} as SubjectGeneralInfo;
    this.info.weekly = {
      lecture: 0,
      exercise: 0,
      lab: 0
    };
    this.nacinPravljenja = 'napravi novi';

  }

  getAllSubject() {

    this.subjectService.getAllSubjectsAllOdsek().subscribe((result: any) => {
      console.log(result);
      this.subjects = result;
    })
  }

  mapiraj() {
    if (!this.subjectMapping.department || this.subjectMapping.department == '') {
      this.message = "Obavezan izbor odseka";
      return;
    }
    if (!this.subjectMapping.subject_id || this.subjectMapping.subject_id == '') {
      this.message = "Obavezna sifra predmeta";
      return;
    }
    if (!this.subjectMapping.mapped_subject_id || this.subjectMapping.mapped_subject_id == '') {
      this.message = "Obavezan izbor predmeta na koji se mapira";
      return;
    }
    this.subjectService.mappSubject(this.subjectMapping).subscribe((result: any) => {
      this.message = result;
    }, (err) => {
      this.message = "Probajte opet";
    })
  }

  subjectMapping: SubjectMapping = {} as SubjectMapping;

  subjects: any;

  nacinPravljenja: string;



  mySubscription: Subscription;

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

  dodaj() {
    if (this.haveEmptyFields()) return;
    this.info.classTime = this.subjectClasses.split("_");
    this.subjectService.createSubject(this.info).subscribe((result: any) => {
      this.message = result;
    }, (err) => {
      this.message = err.error.error;
    })
  }

}
