import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() sideBarTitle: string;
  @Input() baseName: string;
  @Input() sideBarOptions: string[];


  @Output() messageEvent = new EventEmitter<string>();

  constructor(private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
    for (const oneOption of this.sideBarOptions) {
      this.obojiTrenutnuStranicu.push(false);
    }
  }

  @Input() obojiTrenutnuStranicu: boolean[] = [];

  sendMessage(message: string, i: number) {
    localStorage.removeItem("MeniAzuriranjeNastavnika")
    localStorage.setItem('DrugiMeni', JSON.stringify(i));
    this.messageEvent.emit(message);
    console.log(i);
  }

}
