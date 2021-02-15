import { Component, OnInit } from '@angular/core';
import User from '../model/User';
import { ShareLoginDataService } from '../services/share-login-data.service';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  constructor(private shareLogin: ShareLoginDataService) { }

  ngOnInit(): void {
    let user:User = this.shareLogin.getUser();
    this.name = user.username;
  }


  name:string;

}
