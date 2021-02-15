import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { stderr } from 'process';
import { TranslatePipe, TranslateService } from 'src/app/translate';
import { environment } from 'src/environments/environment';
import { Student } from '../../model/Student';
import { EncrDecrService } from '../../services/encr-decr.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private registerService: RegisterService, private router: Router, private encrDecr: EncrDecrService) { }



  
  ngOnInit(): void {
    this.registerType = "student";
    this.student = {
      username: 'primer',
      password: 'primer',
      index: '2017/0145',
      studyType: 'd',
      firstName: 'Dusan',
      lastName: 'Stijovic',
      status: 'aktivan',
      type: 'student'
    }


  }



  student: Student;
  registerType: string;

  register() {
    let sendPassword = "";
    if (this.student.password)
      sendPassword = this.encrDecr.set(environment.key, this.student.password);
    console.log(this.student.password);
    let student = new Student(this.student);
    student.password = sendPassword;
    console.log(student);
    this.registerService.registerStudent(student).subscribe((resp: any) => {
      this.message =   this.translateService.instant("Uspesno registrovan korisnik sa korisnickim imenom: ") + resp;
      console.log(resp);
    }, (err: any) => {
      console.log(err)
      this.message = err.error;
      //this.router.navigate(['errorPage']);
    })
  }
  message: String;
}
