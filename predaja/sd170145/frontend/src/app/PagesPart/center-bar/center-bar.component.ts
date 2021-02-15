import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';


@Component({
  selector: 'app-center-bar',
  templateUrl: './center-bar.component.html',
  styleUrls: ['./center-bar.component.css']
})
export class CenterBarComponent implements OnInit {

  constructor(
    private active: ActivatedRoute,
    private share: ShareLoginDataService,
    private _router: Router
  ) { }

  oboji: boolean[] = [];

  @Output() messageEvent = new EventEmitter<string>()


  ngOnInit(): void {

    for (let i = 0; i < 8; i++) {
      this.oboji.push(false);
    }


    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        console.log(evt)
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB" + evt);
        let number_s = localStorage.getItem('MeniAzuriranjeNastavnika');
        if (number_s != null) {
          let number = JSON.parse(number_s);
          this.oboji = [];
          for (let i = 0; i < 12; i++) {
            this.oboji.push(false);
          }
          this.oboji[number] = true;
        }
      }
    });


    // this.active.params.subscribe((res) => {
    //   console.log(res)
    //   console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB" + res);
    //   let number_s = localStorage.getItem('MeniAzuriranjeNastavnika');
    //   if (number_s == null) return;
    //   let number = JSON.parse(number_s);
    //   for (let i = 0; i < 8; i++) {
    //     this.oboji.push(false);
    //   }
    //   this.oboji[number] = true;
    //   localStorage.removeItem("MeniAzuriranjeNastavnika")
    // })
  }

  sendMessage(baseName: string, name: string, i: number) {
    localStorage.setItem('MeniAzuriranjeNastavnika', JSON.stringify(i));
    let base = '/employeeHomePage/podesavanja predmeta';
    if (this.share.getUser().type == 'admin') {
      base = '/adminHomePage/azuriraj predmete';
    }
    if (baseName != "") base += `/${baseName}`;
    base += `/${name}`
    this.messageEvent.emit(base);
    console.log(i);
  }

}
