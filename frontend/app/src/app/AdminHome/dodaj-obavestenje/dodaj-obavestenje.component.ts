import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Notification from 'src/app/model/Notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dodaj-obavestenje',
  templateUrl: './dodaj-obavestenje.component.html',
  styleUrls: ['./dodaj-obavestenje.component.css']
})
export class DodajObavestenjeComponent implements OnInit {

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllNotifTypes();
  }


  notification: Notification = {} as Notification;

  dodaj() {
    this.notificationService.addNotification(this.notification).subscribe(result => {
      this.message = "Uspesno dodato obavestenje";
    }, (err) => {
      this.message = err.error.error;
    })
  }


  getAllNotifTypes() {
    this.notificationService.getNotificationType().subscribe((result: any) => {
      this.notifTypes = result;
    },
      (err) => {
        this.router.navigate(['errorPage']);
      })
  }

  message: string = "";
  notifTypes: string[];


}
