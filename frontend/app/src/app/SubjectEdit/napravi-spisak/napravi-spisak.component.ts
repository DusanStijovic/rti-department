import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SubjectApplication from '../../model/SubjectApplication';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-napravi-spisak',
  templateUrl: './napravi-spisak.component.html',
  styleUrls: ['./napravi-spisak.component.css']
})
export class NapraviSpisakComponent implements OnInit {

  constructor(
    private active: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  subject_id: string;

  subject_name_id: string;

  ngOnInit(): void {
    this.subject_id = this.active.snapshot.params.id;
    this.getSubjectNameID();
    this.active.url.subscribe((url) => {
      this.subject_id = this.active.snapshot.params.id;
      this.getSubjectNameID();
    })
    this.init();
  }


  getSubjectNameID() {
    this.subjectService.getGeneralSubjectInfoByObjectId(this.subject_id).subscribe((res: any) => {
      this.subject_name_id = res.generalInfo.id;
    })
  }

  init() {
    this.application = {} as SubjectApplication;
    this.application.maxApply = -1;
    this.application.open = true;
    this.application.uploadFileNedded = false;
    this.application.deadline = null;
    this.application.time = null;
  }

  checkEmpty() {
    if (!this.application.name || this.application.name == '') {
      this.message = 'Ime je obavezno';
      return true;
    }
    if (!this.application.place || this.application.place == '') {
      this.message = 'Mesto je obavezno';
      return true;
    }
    if (!this.application.time || this.application.time == null) {
      this.message = 'Vreme je obavezno';
      return true;
    }
    return false;
  }


  application: SubjectApplication;

  message: string

  napraviSpisak() {
    if (this.checkEmpty()) {
      return;
    }
    this.subjectService.napraviSpisak(this.subject_id, this.application).subscribe((result: any) => {
      this.message = result;

    })
    this.init();
  }

}
