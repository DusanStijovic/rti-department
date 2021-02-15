import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Notification from '../model/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  [x: string]: any;

  constructor(private http: HttpClient) {
  }


  getNotification(notifType: string) {
    return this.http.get(`${environment.api}/notification/` + notifType).pipe(shareReplay());
  }

  getNotificationType() {
    return this.http.get(`${environment.api}/notificationTypes`).pipe(shareReplay());
  }


  getNotificationTypesWithId() {
    return this.http.get(`${environment.api}/notificationTypesWithId`).pipe(shareReplay());
  }

  updateNotificationType(id: string, newName: string) {
    return this.http.post(`${environment.api}/updateNotificationType`, { id: id, newName: newName }).pipe(shareReplay());
  }

  deleteNotifType(id: string) {
    return this.http.post(`${environment.api}/deleteNotifType`, { id: id }).pipe(shareReplay());
  }

addNotifType(name: string){
  //console.log("IME" + name);
  return this.http.post(`${environment.api}/addNotifType`, { name:name }).pipe(shareReplay());
}

  addNotification(notification: Notification) {
    return this.http.post(`${environment.api}/addNotif`, { notification: notification }).pipe(shareReplay());
  }



}
