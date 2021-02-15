import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sideBarOptions: string[] = [
    'registruj studente',
    'registruj zaposlenog',
    'azuriraj-obrisi studente',
    'azuriraj-obrisi zaposlene',
    'dodaj tip obavestenja',
    'dodaj novo obavestenje',
    'obrisi predmete',
    'azuriraj predmete',
    'dodaj novi predmet',
    'prijavi studenta na predmer',
    'pravljenje plana angazovanja',
    'dodaj novi projekat koji se nudi',
    'dodaj novi projekat koji je odradjen',
    'readCSVstudents'
  ];
  sideBarTitle: string = "Admin meni";

  navigate($event: any) {
    this.router.navigate(['/adminHomePage', $event]);

  }
}
