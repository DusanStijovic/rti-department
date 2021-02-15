import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mongo } from 'mongoose';
import { environment } from 'src/environments/environment';
import OneProject from '../../model/OneProject';
import SubjectProject from '../../model/SubjectProject';
import { SubjectService } from '../../services/subject.service';


@Component({
  selector: 'app-azuriraj-projekte',
  templateUrl: './azuriraj-projekte.component.html',
  styleUrls: ['./azuriraj-projekte.component.css']
})
export class AzurirajProjekteComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getAllSubjectProject(this.id);
    this.getShowProjects();
  }

  mongoose = require('mongoose')

  getAllSubjectProject(id: string) {

    this.subjectService.getGeneralSubjectInfoByObjectId(id).subscribe((res: any) => {
      this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${res.generalInfo.id}/projekti`;
      this.subjectService.getAllSubjectProject(res.generalInfo.id).subscribe((result: any) => {
        console.log("CCCCC" + JSON.stringify(result));
        if (result.project) {
          this.projects = result.project;
        }
      },
        (err: any) => {
          this.router.navigate(['errorPage']);
        });
    })
  }


  getShowProjects() {
    this.subjectService.getShow(this.id, 'project').subscribe((res: any) => {
      this.showProjects = res;
    })
  }

  dodajProjekat() {
    let one = {} as OneProject
    one._id = this.mongoose.Types.ObjectId();
    one.info = ''
    one.materials = []
    this.projects.projects.push(one)
    console.log("iD jE" + one._id);
    this.subjectService.dodajProjekat(this.activatedRoute.snapshot.params.id, one).subscribe((result: any) => {
      this.message = result;
    }, (err) => {
      this.message = err.error;
    })
  }

  message: string;

  showProjects: boolean;



  pikaziProjekte() {
    console.log("CHECK BOX" + this.showProjects)
    this.subjectService.azurirajPrikaz(this.id, this.showProjects, 'project').subscribe((res: any) => {
    })
  }

  azurirajInformacijeOProjektu(oneProject: OneProject) {
    this.subjectService.azurirajInformacijeOProjektu(this.activatedRoute.snapshot.params.id, oneProject).subscribe((res: any) => {
      this.message = res;
    }), (err) => {
      this.message = err.error;
    }
  }

  obrisiProjekat(id: string) {
    this.projects.projects = this.projects.projects.filter((one) => {
      return one._id != id;
    })
    this.subjectService.obrisiProjekat(this.id, id).subscribe((res: string) => {
      this.message = res;
    })
  }



  projects: SubjectProject;
  id: string;
  baseUrl: string;



}
