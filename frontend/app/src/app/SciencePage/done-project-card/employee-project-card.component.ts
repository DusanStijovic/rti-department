import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-project-card',
  templateUrl: './employee-project-card.component.html',
  styleUrls: ['./employee-project-card.component.css']
})
export class EmployeeProjectCardComponent implements OnInit {

@Input() title: string;
@Input() text: string;
@Input() link: string;
@Input() peopleNames: string[];


  constructor() { }

  ngOnInit(): void {
  }

}
