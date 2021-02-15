import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../model/User';
import jwt_decode from 'jwt-decode';
import { UserType } from "../model/UserType"
import { Jsonp } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ShareLoginDataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeLoginUser(user: User) {
    this.userSource.next(user);
  }
  obojiDeo(deo: string) {
    this.dropDownOption.next(deo);
  }

  private userSource = new BehaviorSubject<User>({} as User);
  currentLoginUser = this.userSource.asObservable();


  private dropDownOption = new BehaviorSubject<string>('nista');
  currentDropDownOption = this.dropDownOption.asObservable();

  getUserType() {
    let token = localStorage.getItem("idToken");
    console.log(token);
    if (!token)
      return UserType.None;
    let decoded: any;
    decoded = jwt_decode(token);
    let user = JSON.parse(decoded.sub);
    console.log(user);
    switch (user.type) {
      case 'student':
        return UserType.Student;
      case 'admin':
        return UserType.Admin;
      case 'zaposlen':
        return UserType.Employee;
    }
  }

  getUser(): User {
    let token = localStorage.getItem("idToken");
    console.log(token);
    if (!token)
      return null;
    let decoded: any;
    decoded = jwt_decode(token);
    return JSON.parse(decoded.sub);
  }

}


