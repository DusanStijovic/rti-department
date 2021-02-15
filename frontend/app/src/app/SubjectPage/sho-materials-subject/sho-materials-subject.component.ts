import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StringifyOptions } from 'querystring';
import { Action } from 'rxjs/internal/scheduler/Action';
import { environment } from 'src/environments/environment';
import SubjectMaterialsInfo from '../../model/SubjectMaterialsInfo';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-sho-materials-subject',
  templateUrl: './sho-materials-subject.component.html',
  styleUrls: ['./sho-materials-subject.component.css']
})
export class ShoMaterialsSubjectComponent implements OnInit {

  constructor(private router: Router, private activeRouted: ActivatedRoute, private subjectServie: SubjectService) { }



  ngOnInit(): void {
    let id = this.activeRouted.snapshot.params.id;
    let name = this.activeRouted.snapshot.params.matName;
    this.setHeading(name, id);
    this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${id}/${this.urlPart}`;

    this.activeRouted.params.subscribe((url: any) => {
      this.setHeading(url.matName, url.id);
      this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${id}/${this.urlPart}`;
    });
  }

  getAllSubjectLectureMaterials(id: string) {
    this.subjectServie.getAllSubjectLectureMaterials(id).subscribe((result: any) => {
      this.materials = result;
      console.log(this.materials);
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  getAllSubjectExerciseMaterials(id: string) {
    this.subjectServie.getAllSubjectExerciseMaterials(id).subscribe((result: any) => {
      this.materials = result;
      console.log(this.materials);
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  getAllSubjectExamTextMaterials(id: string) {
    this.subjectServie.getAllSubjectExamTextMaterials(id).subscribe((result: any) => {
      this.materials = result;
      console.log(this.materials);
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  getAllSubjectExamSolutionMaterials(id: string) {
    this.subjectServie.getAllSubjectExamSolutionMaterials(id).subscribe((result: any) => {
      this.materials = result;
      console.log(this.materials);
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  setHeading(name: string, id: string) {
    if (name === "Predavanja") {
      this.heading = "Materijali za predavanja";
      this.urlPart = "Predavanja";
      this.getAllSubjectLectureMaterials(id);
    }
    if (name === "Vezbe") {
      this.heading = "Materijali za vezbe";
      this.urlPart = "Vezbe";
      this.getAllSubjectExerciseMaterials(id);
    }
    if (name === "Ispitna pitanja") {
      this.heading = "Ispitni zadaci";
      this.urlPart = "Ispitna pitanja";
      this.getAllSubjectExamTextMaterials(id);
    }
    if (name === "Ispitna resenja") {
      this.heading = "Resenja ispitnih zadataka";
      this.urlPart = "Ispitna resenja";
      this.getAllSubjectExamSolutionMaterials(id);
    }
  }

  heading: string;
  urlPart: string;
  materials: SubjectMaterialsInfo[];
  baseUrl: string

}
