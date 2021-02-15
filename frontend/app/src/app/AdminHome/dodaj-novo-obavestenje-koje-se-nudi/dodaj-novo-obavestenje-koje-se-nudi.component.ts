import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import OfferedProject from '../../model/OfferedProject';
import { OfferedProjectService } from '../../services/offered-project.service';

@Component({
  selector: 'app-dodaj-novo-obavestenje-koje-se-nudi',
  templateUrl: './dodaj-novo-obavestenje-koje-se-nudi.component.html',
  styleUrls: ['./dodaj-novo-obavestenje-koje-se-nudi.component.css']
})
export class DodajNovoObavestenjeKojeSeNudiComponent implements OnInit {

  constructor(private router: Router, private projects: OfferedProjectService) { }

  ngOnInit(): void {


  }

  dodaj() {
    this.projects.makeOfferedProject(this.offeredProject).subscribe((result: any) => {
      this.message = result.message;
    }, (err) => {
      this.message = err.error.error;
    })
  }


  message: string;
  offeredProject: OfferedProject = {} as OfferedProject;
}
