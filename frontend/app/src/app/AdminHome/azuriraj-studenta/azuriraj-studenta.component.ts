import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../model/Student';
import { StudentServiceService } from '../../services/student-service.service';
import { EncrDecrService } from '../../services/encr-decr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-azuriraj-studenta',
  templateUrl: './azuriraj-studenta.component.html',
  styleUrls: ['./azuriraj-studenta.component.css']
})
export class AzurirajStudentaComponent implements OnInit {

  constructor(private encrDecr: EncrDecrService, private activeRouter: ActivatedRoute, private studentService: StudentServiceService, private router: Router) { }

  ngOnInit(): void {
    this.student = {} as Student;
    this.student.status = 'aktivan';
    this.getStudent(this.activeRouter.snapshot.params.id);
  }


  getStudent(id: string) {
    this.studentService.getStudent(id).subscribe((result: any) => {
      this.student = result.student;
      this.student.password = this.encrDecr.get(environment.key, this.student.password);
      console.log(result);
    }, (err) => {
      this.router.navigate(['errorPage']);
    });
  }

  update() {
    let sendPassword = "";
    if (this.student.password)
      sendPassword = this.encrDecr.set(environment.key, this.student.password);
    //console.log(this.student.password);
    let student = new Student(this.student);
    student.password = sendPassword;
    this.studentService.updateStudent(student, this.activeRouter.snapshot.params.id).subscribe((result: any) => {
      this.message = result.message;

    }, (err) => {
      console.log(err);
      this.message = err.error.error;
    })
  }

  message: string;
  student: Student;
}
