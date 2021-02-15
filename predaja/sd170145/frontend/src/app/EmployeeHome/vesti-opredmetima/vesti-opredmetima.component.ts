import { not, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import SubjectNotifications from '../../model/SubjectNotifications';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-vesti-opredmetima',
  templateUrl: './vesti-opredmetima.component.html',
  styleUrls: ['./vesti-opredmetima.component.css']
})
export class VestiOPredmetimaComponent implements OnInit {

  constructor(
    private router: Router,
    private share: ShareLoginDataService,
    private employeeService: EmployeeService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getAllSubjectsNotif();
  }

  subjectConnected: { subject: string }[] = [{}] as { subject: string }[];
  getEmloyeesSubject() {

    this.employeeService.getEmployeeSubjects(this.share.getUser().username).subscribe((result: any) => {
      this.subjectConnected = result;
      console.log(this.subjectConnected)
      this.notifs = this.helper.filter((notif: SubjectNotifications) => {
        return this.subjectConnected.find((elem: { subject: string }) => {
          return notif.connectedSubject.find((elem2: string) => {
            return elem2 === elem.subject;
          })
        });
      })
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  helper: SubjectNotifications[] = {} as SubjectNotifications[];

  notifs: SubjectNotifications[] = {} as SubjectNotifications[];

  getAllSubjectsNotif() {
    this.subjectService.getAllNotifications().subscribe((result: any) => {
      this.helper = result;
      this.getEmloyeesSubject();
      console.log(result);
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }
  obrisi(_id: string) {
    this.subjectService.deleteSubjectNotif(_id).subscribe((result: any) => {
      this.message = result.message;
      this.getAllSubjectsNotif();
    }, (err) => {
      this.message = err.error.error;
    });
  }

  message: string;

  uredi(_id: string) {
    this.router.navigate(['/employeeHomePage', 'izmeni-obrisi obavestenje', _id]);
  }

}
