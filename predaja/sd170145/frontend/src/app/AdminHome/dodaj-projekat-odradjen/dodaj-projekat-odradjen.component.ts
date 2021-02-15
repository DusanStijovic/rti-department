import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import EmployeeProject from '../../model/EmployeeProject';
import Employee from '../../model/Employee';
import { EmployeeProjectsService } from '../../services/done-projects.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dodaj-projekat-odradjen',
  templateUrl: './dodaj-projekat-odradjen.component.html',
  styleUrls: ['./dodaj-projekat-odradjen.component.css']
})
export class DodajProjekatOdradjenComponent implements OnInit {

  constructor(private done: EmployeeProjectsService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  message: string;
  project: EmployeeProject = {} as EmployeeProject;
  employee: [{ name: string, isChecked: boolean }] = [{ name: '', isChecked: false }];


  getEmployees() {
    this.employeeService.getAllEmployees('aktivan').subscribe((result: any) => {
      let temp: any = [];
      console.log(result);
      for (const one of result) {
        let e = one.employee;
        temp.push({
          name: `${e.firstName} ${e.lastName}`,
          isChecked: false
        })
      }
      this.employee = temp;
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }


  dodaj() {
    let temp: string[] = [];
    for (const one of this.employee) {
      if (one.isChecked) {
        temp.push(one.name);
      }
    }
    this.project.authors = temp;
    this.done.makeEmployeeProjectroject(this.project).subscribe((result: any) => {
      this.message = result.message;
    }, (err) => {
      this.message = err.error.error;
    })

  }



}
