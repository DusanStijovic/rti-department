import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-listazaposlenih',
  templateUrl: './listazaposlenih.component.html',
  styleUrls: ['./listazaposlenih.component.css']
})
export class ListazaposlenihComponent implements OnInit {

  constructor(private router: Router, private employeeService: EmployeeService) { }
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployeesUserName('all').subscribe((result: any) => {
      this.employees = result;
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  obrisi(zaposlenId: string) {
    //alert(zaposlenId);
    this.employeeService.removeEmployee(zaposlenId).subscribe((res: any) => {
      this.message = res.result;
      this.getAllEmployees();
    },
      (err) => {
        this.message = err.error.error;
      })
  }

  message: string;

  employees: [{ username: string, _id: string }];
}
