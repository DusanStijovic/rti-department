import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  @Input() position: string;
  @Input() name: string;
  @Input() phone : string;
  @Input() mail: string;
  @Input() icons: String[];
  constructor() { }

  ngOnInit(): void {
  }

}
