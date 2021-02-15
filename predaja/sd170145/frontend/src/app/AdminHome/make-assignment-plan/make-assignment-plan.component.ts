import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mongo } from 'mongoose';
import { Assignment, SubjectGroup } from 'src/app/model/AssignmentPlan';
import { EmployeeService } from 'src/app/services/employee.service';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-make-assignment-plan',
  templateUrl: './make-assignment-plan.component.html',
  styleUrls: ['./make-assignment-plan.component.css']
})
export class MakeAssignmentPlanComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private employeeSerbice: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllEmployees();
  }

  mongoose = require('mongoose');


  subjects: string[] = [];

  subjectAssigmnetPlan: Assignment = {} as Assignment;

  getAllSubjects() {
    this.subjectService.getAllSubjectsAllOdsek().subscribe((result: any) => {
      for (const one of result) {
        this.subjects.push(one.id);
      }
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  employees: string[] = [];

  getAllEmployees() {
    this.employeeSerbice.getAllTeachersUserName('aktivan').subscribe((result: any) => {
      console.log(result);
      for (const one of result) {
        this.employees.push(one.username);
      }
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  getSubjectAssignmentPlan(subject: string) {
    this.subjectService.getSubjectAssigmentPlan(subject).subscribe((result: any) => {
      this.subjectAssigmnetPlan = result;
      if (!this.subjectAssigmnetPlan) {
        this.subjectAssigmnetPlan = {} as Assignment;
      }
      this.subjectAssigmnetPlan.subject = subject;
      console.log(this.subjectAssigmnetPlan);
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }


  izabranPredmet(subject: string) {
    console.log(subject);
    this.getSubjectAssignmentPlan(subject);
  }

  brojGrupa: number;
  podeliNaGrupe() {
    if (this.brojGrupa < 0) return;
    this.subjectAssigmnetPlan.group = [];
    for (let i = 0; i < this.brojGrupa; i++) {
      let subjectGroup: SubjectGroup = {} as SubjectGroup;
      subjectGroup._id = i.toString();
      subjectGroup._id = this.mongoose.Types.ObjectId();
      this.subjectAssigmnetPlan.group.push(subjectGroup);

    }
  }

  obrisi(_id: string) {
    this.subjectAssigmnetPlan.group = this.subjectAssigmnetPlan.group.filter((group: SubjectGroup) => {
      return group._id != _id;
    })
  }

  dodajGrupu() {
    if (!this.subjectAssigmnetPlan.group) {
      this.subjectAssigmnetPlan.group = [];
    }
    let max = 0;
    for (const one of this.subjectAssigmnetPlan.group) {
      if (max < Number.parseInt(one._id)) {
        max = Number.parseInt(one._id);
      }
    }
    max = max + 1;

    let subjectGroup: SubjectGroup = {} as SubjectGroup;
    subjectGroup._id = max.toString();
    subjectGroup._id = this.mongoose.Types.ObjectId();
    this.subjectAssigmnetPlan.group.push(subjectGroup);
  }
  message: string;

  azuriraj() {
    if (!this.subjectAssigmnetPlan.group) {
      this.subjectAssigmnetPlan.group = [];
    }
    let helpEmployee = []
    for (const oneGroup of this.subjectAssigmnetPlan.group) {
      if (!oneGroup.name || oneGroup.name == '') {
        this.message = 'Ime grupe je obavezno';
        return;
      }
      if (!oneGroup.employees) oneGroup.employees = [];
      for (const oneEmployee of oneGroup.employees) {
        let help = helpEmployee.find((one) => {
          return one == oneEmployee;
        });
        if (help == null) {
          helpEmployee.push(oneEmployee);
        }
      }
    }
    this.subjectAssigmnetPlan.employees = helpEmployee;
    this.subjectService.updateAssigmentPlan(this.subjectAssigmnetPlan).subscribe((result: any) => {
      this.message = result;
      console.log(result);
    }, (err) => {
      this.message = 'Greska, probajte ponovo';
      console.log(err);
    })
  }
}
