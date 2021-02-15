import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { env } from 'process';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../../model/User';
import { AuthServiceService } from '../../services/auth-service.service';
import { EncrDecrService } from '../../services/encr-decr.service';
import { ShareLoginDataService } from '../../services/share-login-data.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit, OnDestroy {

  constructor(private route: Router, private authService: AuthServiceService, private encDec: EncrDecrService, private sharedLogin: ShareLoginDataService) { }


  ngOnInit(): void {
    this.subscription =  this.sharedLogin.currentLoginUser.subscribe((user) => { this.loginUser = user;})
  }

  oldPassword: string;
  newPassword: string;


  subscription: Subscription;
  loginUser: User;


  change() {
    let sendOld: string, sendNew: string;
    console.log("@@@@" + JSON.stringify(this.loginUser));
    if (this.oldPassword) {
      sendOld = this.encDec.set(environment.key, this.oldPassword);
    }
    if (this.newPassword) {
      sendNew = this.encDec.set(environment.key, this.newPassword);
    }
    this.authService.changeLogin(this.loginUser.username, sendOld, sendNew).subscribe(() => {
      this.sharedLogin.changeLoginUser({} as User);
      this.route.navigate(['']);
    }, (err) => {
      this.errorMessage = err.error;
    })
  }

  errorMessage: string;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
