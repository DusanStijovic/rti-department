import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from '../../model/User'
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private encDec: EncrDecrService, private authService: AuthServiceService, private router: Router, private _data: ShareLoginDataService) { }

  ngOnInit(): void {
    this.logInUsersub = this._data.currentLoginUser.subscribe(user => { this.logInUser = user; });
  }

  logInUsersub: Subscription;

  username: string;
  password: string;
  message: string;

  logInUser: User;

  login() {
    let sendPassword: string;
    if (this.password) {
      sendPassword = this.encDec.set(environment.key, this.password);
    }
    //console.log(JSON.stringify(this.password));
    this.authService.login(this.username, sendPassword)
      .subscribe((resp: any) => {
        let user = resp.user as User;
        if (user.firstLogin === "yes") {
          this.setUserFirstTimeLogIn(user);
          this.router.navigate(['firstLogin']);
        } else {
          this.setUserAsLogIn(user);
          this.authService.setSession(resp);
          this.navigate(user);
        }

      }, (err) => {
        this._data.changeLoginUser({} as User);
        this.message = err.error.errorMessage;
      })
  }

  navigate(user: User) {
    switch (user.type) {
      case "admin":
        this.router.navigate(['adminHomePage']);
        break;
      case "zaposlen":
        this.router.navigate(['employeeHomePage']);
        break;
      case "student":
        this.router.navigate(['studentHomePage']);
        break;
    }
  }


  logut() {
    this.authService.logut();
    this._data.changeLoginUser({} as User);
    this.router.navigate(['']);
  }

  newMessage(message: string) {
    this._data.changeMessage(message);
  }

  ngOnDestroy() {
    this.logInUsersub.unsubscribe();
  }

  private setUserFirstTimeLogIn(user: User): void {
    user.isLogIn = false;
    this._data.changeLoginUser(user);
  }

  private setUserAsLogIn(user: User): void {
    user.isLogIn = true;
    this._data.changeLoginUser(user);

  }


}
