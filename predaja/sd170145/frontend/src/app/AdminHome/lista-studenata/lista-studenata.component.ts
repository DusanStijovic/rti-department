import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/services/student-service.service';

@Component({
  selector: 'app-lista-studenata',
  templateUrl: './lista-studenata.component.html',
  styleUrls: ['./lista-studenata.component.css']
})
export class ListaStudenataComponent implements OnInit {

  constructor(private studentService: StudentServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents('all').subscribe((result: any) => {
      this.students = result.students;
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  obrisi(studentId: string) {
    //alert(studentId);
    this.studentService.removeStudent(studentId).subscribe((res: any) => {
      this.message = res.message;
      this.getAllStudents();
    },
      (err) => {
        this.router.navigate(['errorPage']);
      })
  }

  message: string;

  students: [{ username: string, _id: string }];

}
