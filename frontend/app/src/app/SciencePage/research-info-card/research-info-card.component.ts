import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-research-info-card',
  templateUrl: './research-info-card.component.html',
  styleUrls: ['./research-info-card.component.css']
})
export class ResearchInfoCardComponent implements OnInit {

  @Input() picture: string;
  @Input() title: string;
  @Input() link: string;
  
  constructor() { }

  ngOnInit(): void {
  
  }
    
}
