import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.contactPerson = new Array<any>();
    this.contactPerson.push({
      position: 'Sef katedre',
      name:'prof. dr Jelica Protić',
      phone:'065/9690907',
      mail:'sef.katedre@rti.etf.rs',
      icon: 'bi-person-fill'
    });
    this.contactPerson.push({
      position: 'Sekretar',
      name:'prof. dr Marko Mišić',
      phone:'065/9690907',
      mail:'sekretar@rti.etf.rs',
      icon: 'bi-person-fill'
    });
    this.contactPerson.push({
      position: 'Adresa',
      name:'AdresaKatedre',
      phone:'011/132423',
      mail:'rti@rti.etf.rs',
      icon: 'bi-geo-alt-fill'
    });
  }
  contactPerson : Array<any>;
}
