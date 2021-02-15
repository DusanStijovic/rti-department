import { Component, OnInit } from '@angular/core';
import {Student} from '../../model/Student'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.registerType = "student";
    this.student = { username: 'primer',
      password: 'primer',
      index: '2017/0145',
      studyType: 'd',
      firstName: 'Dusan',
      lastName: 'Stijovic',
      status: 'aktivan',
      type:'student'
    }
  }

  student: Student;
  registerType: string;
}
