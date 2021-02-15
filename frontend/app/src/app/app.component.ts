import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import User from './model/User';
import { ShareLoginDataService } from './services/share-login-data.service';
import { TranslateService } from './translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private _translate: TranslateService, private _data: ShareLoginDataService) { }


  ngOnInit(): void {
    this._translate.use('srpski_latinica');
    this.subscription = this._data.currentLoginUser.subscribe(user => this.logInUser = user);

    
  }

 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscription: Subscription;
  logInUser: User;
}
