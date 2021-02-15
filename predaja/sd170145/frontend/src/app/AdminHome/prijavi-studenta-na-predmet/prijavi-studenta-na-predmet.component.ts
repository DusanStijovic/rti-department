import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../../services/student-service.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-prijavi-studenta-na-predmet',
  templateUrl: './prijavi-studenta-na-predmet.component.html',
  styleUrls: ['./prijavi-studenta-na-predmet.component.css']
})
export class PrijaviStudentaNaPredmetComponent implements OnInit {

  constructor(
    private router: Router,
    private studentService: StudentServiceService,
    private subjectService: SubjectService

  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getStudents();
    this.getAllApplys();
  }

  choosenStudent: string[] = [];
  choosenSubject: string[] = [];

  students: [{ username: string, _id: string }];
  subjects: [{ id: string }];

  getStudents() {
    this.studentService.getAllStudents('aktivan').subscribe((result: any) => {
      this.students = result.students;
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  getSubjects() {
    this.subjectService.getAllSubjectsAllOdsek().subscribe((result: any) => {
      this.subjects = result;
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }
  message: string;

  prijavi() {
    if (this.choosenStudent.length == 0 || this.choosenSubject.length == 0) {
      this.message = "Izaberite studente i predmete";
      return;
    }
    this.studentService.applyStudents(this.choosenStudent, this.choosenSubject).subscribe((result: any) => {
      this.message = result.message;
      this.getAllApplys();
    }, (err) => {
      this.message = JSON.stringify(err.error.error);
    })
  }

  getAllApplys() {
    this.studentService.getAllApplys().subscribe((result: any) => {
      this.applys = result;
    }, (err) => {
      this.router.navigate(['errorPage']);
    });
  }

  applys: [{ userId: string, subjectId: string }]

}
