import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from "moment";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string) {
    return this.http.post(`${environment.api}/login`, { username, password }).pipe(shareReplay());
  }


  public setSession(authResult: any) {
    //const expiresAt = moment().add(authResult.expiresIn, 'second');
    //console.log("SETOVANJE")
    //console.log("aaaaaaa" + JSON.stringify(authResult));
    localStorage.setItem('idToken', authResult.idToken);
    //localStorage.setItem('user', authResult.user);
    //localStorage.setItem('expiresIn', JSON.stringify(expiresAt.valueOf));
  }

  logut() {
    this.clearSession();
  }
  private clearSession() {
    localStorage.clear();
  }

  changeLogin(userName: string, oldPassword: string, newPassword: string) {
    return this.http.post(`${environment.api}/changePassword`, { userName, oldPassword, newPassword }).pipe(shareReplay());
  }
  
  getToken() {
    if (localStorage.getItem('idToken')) {
      return localStorage.getItem('idToken')
    } else {
      return "";
    }
  }

}
