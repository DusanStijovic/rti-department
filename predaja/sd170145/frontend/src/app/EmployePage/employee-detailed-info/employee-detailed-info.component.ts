import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { SubjectService } from 'src/app/services/subject.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detailed-info',
  templateUrl: './employee-detailed-info.component.html',
  styleUrls: ['./employee-detailed-info.component.css']
})
export class EmployeeDetailedInfoComponent implements OnInit {

  constructor(private share: ShareLoginDataService, private subejctService: SubjectService, private employeeService: EmployeeService, private activeRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.userId = this.activeRoute.snapshot.params.id;

    this.employeeService.getEmployee(this.userId).subscribe((user: any) => {
      this.employee = user;

      if (this.share.getUser()) {
        this.subejctService.getAllStudentSubject(this.share.getUser().username).subscribe((result: any) => {
          console.log(result)
          this.applySubjects = result.subjects;
        })
      }
      console.log(this.employee);
    }, (err: any) => {
      this.route.navigate(['errorPage']);
    })


    this.share.currentLoginUser.subscribe((user) => {
      this.isLogin = user.type == 'student';
    })




  }

  isLogin: boolean;

  applySubjects: string[] = [];

  shoudlShow(subject: string) {
    if (!this.isLogin) return false;
    let ok = this.applySubjects.find((one) => {
      return one == subject;
    })
    if (ok) return true;
    else return false;
  }

  employee: any;
  userId: string;
}
