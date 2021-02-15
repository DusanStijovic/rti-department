import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offered-project-card',
  templateUrl: './offered-project-card.component.html',
  styleUrls: ['./offered-project-card.component.css']
})
export class OfferedProjectCardComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() link: string;
  @Input() type: string;

  
  constructor() { }


  ngOnInit(): void {
  }

}
