import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.marker = new Array<any>();
    this.marker.push({latitude:44.80552782659459, longitude: 20.476131477031387, label:'RTI katedrea' });
  }

  latitude = 44.80552782659459;
  longitude =  20.476131477031387;
  mapType = 'satelite';
  zoom = 18;

  marker: Array<any>;


}

