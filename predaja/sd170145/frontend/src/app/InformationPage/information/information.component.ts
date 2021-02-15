import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Notification from '../../model/Notification';
import { NotificationService } from '../../services/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private router: Router, private notifService: NotificationService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.notificationType = "sva"
    this.readNotificationType();
    this.readNotification(this.notificationType);
    console.log("ovde sam");
  }

  readNotification(notificationType: string): void {
    this.notifService.getNotification(notificationType).subscribe((notif: Notification[]) => {
      this.notifications = notif;
      this.notificationType = notificationType;
      if (this.notificationType == "sva") this.notificationType = "Sva obavestenja";
      console.log(notif);
    }, (err: any) => {
      this.router.navigate(['errorPage']);
    })
  }

  readNotificationType(): void {
    this.notifService.getNotificationType().subscribe((notifType: String[]) => {
      this.options = new Array<any>();
      this.options.push("sva");
      this.options = this.options.concat(notifType);
      console.log(notifType);
    }, (err: any) => { this.router.navigate(['errorPage']); })
  }

  notificationType: string;
  notifications: Notification[];
  options: String[];
  message: string;

  receiveMessage($event: string) {
    this.oboji();
    this.notificationType = $event;
    console.log(this.notificationType);
    this.readNotification(this.notificationType);
    console.log("primio poruku");

  }


  obojiTrenutnuStranicu: boolean[] = [true];

  oboji() {
    let i_string = localStorage.getItem('DrugiMeni');
    if (i_string == null) return;
    let i = JSON.parse(i_string);
    this.obojiTrenutnuStranicu = [];
    for (let oneOption of this.obojiTrenutnuStranicu) {
      this.obojiTrenutnuStranicu.push(false);
    }
    this.obojiTrenutnuStranicu[i] = true;
    localStorage.removeItem('DrugiMeni');
  }

  checkIfShouldShow(infoDate: Date): boolean {
    let momentNew = moment(infoDate);
    let momentNow = moment(new Date());
    return moment.duration(momentNow.diff(momentNew)).asMonths() < 3;

  }
}
