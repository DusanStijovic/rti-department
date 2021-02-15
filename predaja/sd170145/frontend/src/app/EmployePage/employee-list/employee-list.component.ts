
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { SubjectService } from 'src/app/services/subject.service';
import Employee from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private studentService: StudentServiceService,
    private subjectService: SubjectService,
    private share: ShareLoginDataService,
    private route: Router) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees('aktivan').subscribe((userList: Array<any>) => {
      this.employeeList = userList;
      console.log(this.employeeList[0].subject);
    }, (err: any) => {
      this.route.navigate(['errorPage']);
    })



  }


  employeeList: Array<any>;

}
