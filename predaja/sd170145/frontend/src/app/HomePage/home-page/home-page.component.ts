import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import User from 'src/app/model/User';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private share: ShareLoginDataService) { }

  ngOnInit(): void {
    this.subscription = this.share.currentLoginUser.subscribe((user) => { this.logInUser = user; })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  boja: boolean = true;

  subscription: Subscription;
  logInUser: User;
}
