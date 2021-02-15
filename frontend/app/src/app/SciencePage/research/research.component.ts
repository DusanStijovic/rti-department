import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.componentsInfo = new Array<any>();
    this.componentsInfo.push({
      title:'SLAC National Accelerator Laboratory', 
      link:'http://slac.stanford.edu/', 
      picture:'research1.jpg'
    });
    this.componentsInfo.push({
      title:'Hoover Institution', 
      link:'http://hoover.org/', 
      picture:'research2.jpg'
    });
    this.componentsInfo.push({
      title:'Stanford Woods Institute for the Environment', 
      link:'https://woods.stanford.edu/', 
      picture:'research3.jpg'
    });
    this.componentsInfo.push({
      title:'Stanford Bio-X', 
      link:'https://biox.stanford.edu/', 
      picture:'research4.jpg'
    })
  }

  componentsInfo : Array<any>;
}
