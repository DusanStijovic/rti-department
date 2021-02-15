import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectGeneralInfo } from '../../model/SubjectGeneralInfo';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-sho-info-subject',
  templateUrl: './sho-info-subject.component.html',
  styleUrls: ['./sho-info-subject.component.css']
})
export class ShoInfoSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService, private activeRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subjectId = this.activeRouter.snapshot.params.id;
    //console.log("IS DECE" + this.subjectId);
    this.getAllGeneralSubjectInfo();
  }

  getAllGeneralSubjectInfo() {
    this.subjectService.getGeneralSubjectInfo(this.subjectId).subscribe((subject: any) => {
      this.info = subject.generalInfo;
      this.employees = subject.employees;
    }, (err) => {
      console.log(err);
    });
  }

  info: SubjectGeneralInfo = {} as SubjectGeneralInfo;

  employees: { idEmployee: string, employeeName: string };

  subjectId: string;

  baseUrl: string = "/listaZaposlenih/zaposlen/";


}
