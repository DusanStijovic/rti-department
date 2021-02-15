import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SubjectNotifications from '../../model/SubjectNotifications';
import { SubjectService } from '../../services/subject.service';
import * as moment from 'moment';


@Component({
  selector: 'app-show-subject-notification',
  templateUrl: './show-subject-notification.component.html',
  styleUrls: ['./show-subject-notification.component.css']
})
export class ShowSubjectNotificationComponent implements OnInit {

  constructor(private subjectServie: SubjectService, private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params.id;
    this.getAllSubjectNotifications(this.id);
  }

  getAllSubjectNotifications(id: string) {
    this.subjectServie.getAllNotificationsSubject(id).subscribe(((notifs: SubjectNotifications[]) => {
      this.subjectNotifs = notifs;
      console.log(JSON.stringify(this.subjectNotifs));
      console.log(notifs);
    }), (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  subjectNotifs: SubjectNotifications[];

  checkIfShouldShow(infoDate: Date) {
    let momentNew = moment(infoDate);
    let momentNow = moment(new Date());
    return moment.duration(momentNow.diff(momentNew)).asDays() < 7;
  }
  id: string;

}
