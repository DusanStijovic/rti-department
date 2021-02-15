import { Component, OnInit } from '@angular/core';
import { EmployeeProjectsService } from '../../services/done-projects.service';
import EmployeeProject from '../../model/EmployeeProject';
import { Router } from '@angular/router';
@Component({
  selector: 'app-done-project',
  templateUrl: './done-project.component.html',
  styleUrls: ['./done-project.component.css']
})
export class EmployeeProjectComponent implements OnInit {

  constructor(private employeeProjectServie: EmployeeProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.readAllEmployeeProjects();
  }
  readAllEmployeeProjects() {
    this.employeeProjectServie.getAllEmployeeProjectProjects().subscribe((employeeProject: EmployeeProject[]) => {
      this.employeeProjects = employeeProject;
    }, (err: any) => {
      this.router.navigate(['errorPage']);
    });
  }

  employeeProjects: EmployeeProject[];
}
