import { Component, Input, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-department-image-slide',
  templateUrl: './department-image-slide.component.html',
  styleUrls: ['./department-image-slide.component.css']
})
export class DepartmentImageSlideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.carousel').carousel();
    })
  }

  @Input("imgNames")
  imgNames: string[];

}
