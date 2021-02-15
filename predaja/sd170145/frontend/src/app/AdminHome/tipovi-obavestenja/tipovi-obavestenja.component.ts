import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-tipovi-obavestenja',
  templateUrl: './tipovi-obavestenja.component.html',
  styleUrls: ['./tipovi-obavestenja.component.css']
})
export class TipoviObavestenjaComponent implements OnInit {

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllNotifTypes();
  }

  getAllNotifTypes() {
    this.notificationService.getNotificationTypesWithId().subscribe((result: any) => {
      console.log(result);
      this.obavestenja = result;
    })
  }

  izmeni(obavestenje: any) {
    this.notificationService.updateNotificationType(obavestenje._id, obavestenje.typeName).subscribe((result: any) => {
      this.message = result.message;
      this.getAllNotifTypes();
    }, (err) => {
      this.message = err.error.error;
    });

  }

  obrisi(obavestenje: any) {
    this.notificationService.deleteNotifType(obavestenje._id).subscribe((result: any) => {
      this.message = result.message;
      this.getAllNotifTypes();
    }, (err) => {
      this.message = err.error.error;
    })

  }

  dodaj() {
    console.log("IME" + this.newType)
    this.notificationService.addNotifType(this.newType).subscribe((result: any) => {
      this.message = result.message;
      this.getAllNotifTypes();
    }, (err) => {
      console.log(err);
      this.message = err.error.error;
    })
  }

  newType: string;
  message: string;
  obavestenja: [{ typeName: string, _id: string }];

}
