import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from 'src/app/model/User';
import { UserType } from 'src/app/model/UserType';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { TranslateService } from '../../translate';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(private _translate: TranslateService,
    private _data: ShareLoginDataService,
    private _router: Router,
    private authService: AuthServiceService,
    private active: ActivatedRoute
  ) { }


  obojiDropDown: boolean[] = [false, false];

  subscription: Subscription;
  logInUser: User;

  obojiTrenutnuStranicu: boolean[] = [];


  dropDown: Subscription;


  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.obojiTrenutnuStranicu.push(false);
    }

    this.active.url.subscribe((rel) => {
      let i_string = localStorage.getItem('DrugiMeni');
      if (i_string == null) return;
      let i = JSON.parse(i_string);
      this.obojiTrenutnuStranicu = [];
      for (let oneOption of this.obojiTrenutnuStranicu) {
        this.obojiTrenutnuStranicu.push(false);
      }
      this.obojiTrenutnuStranicu[i] = true;
      localStorage.removeItem('DrugiMeni');

    })





    this.dropDown = this._data.currentDropDownOption.subscribe((name) => {
      // switch (name) {
      //   case 'odsek':
      //     this.obojiDropDown[1] = false;
      //     this.obojiDropDown[0] = true;
      //     break;
      //   case 'nauka':
      //     this.obojiDropDown[0] = false;
      //     this.obojiDropDown[1] = true;
      //     break;
      //   case 'jezik':
      //     this.obojiJezik[0] = false;
      //     this.obojiJezik[1] = false;
      //     this.obojiJezik[2] = false;
      //     if ('en') {
      //       this.obojiJezik[0] = true;
      //     }
      //     if ('srl') {
      //       this.obojiJezik[1] = true;
      //     }
      //     if ('src') {
      //       this.obojiJezik[2] = true;
      //     }
      //     break;
      // }
    })




    this.pictureUrl = "assets/img/etf.png";
    this.subscription = this._data.currentLoginUser.subscribe(user => this.logInUser = user);
    let user = this._data.getUser();
    if (user != null) {
      user.isLogIn = true;
    } else {
      user = {} as User;
      user.isLogIn = false;
    }
    this._data.changeLoginUser(user);
    console.log(this.logInUser);
  }



  obojiDropOdsek() {
    //alert(this._router.url)
    console.log(this._router.url)
    if (this._router.url.match(/\/predmeti\/(rti|si|oo)/)) {
      return true;
    }
    return false;
  }



  obojiDropNauka() {
    //alert(this._router.url)
    console.log(this._router.url)

    if (this._router.url.match(/\/istrazivanja/) || this._router.url.match(/\/uradjeniprojekti/)) {
      return true;
    }
    return false;
  }


  obojiJezik: boolean[] = [];

  pictureUrl: String;

  changeLanguage(language: string): void {
    this._translate.use(language);
    return;
  }

  logout() {
    //console.log("CAO")
    this._data.changeLoginUser({} as User);
    this.authService.logut();
    this._router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  homePage() {
    switch (this._data.getUserType()) {
      case UserType.Student:
        this._router.navigate(['/studentHomePage']);
        break;
      case UserType.Employee:
        this._router.navigate(['/employeeHomePage']);
        break;
      case UserType.Admin:
        this._router.navigate(['/adminHomePage']);
        break;
    }
  }

}
