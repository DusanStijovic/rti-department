import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.css']
})
export class InformationCardComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() link: string;
  @Input() date: Date;

  
  constructor() { }

  ngOnInit(): void {
  }

}
