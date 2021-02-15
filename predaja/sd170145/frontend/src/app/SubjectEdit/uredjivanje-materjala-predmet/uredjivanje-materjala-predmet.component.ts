import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SubjectMaterialsInfo from 'src/app/model/SubjectMaterialsInfo';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-uredjivanje-materjala-predmet',
  templateUrl: './uredjivanje-materjala-predmet.component.html',
  styleUrls: ['./uredjivanje-materjala-predmet.component.css']
})
export class UredjivanjeMaterjalaPredmetComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private employeeServise: EmployeeService,
    private share: ShareLoginDataService,
    private router: Router, private activeRouted: ActivatedRoute, private subjectServie: SubjectService) { }


  _id: string
  ngOnInit(): void {
    this._id = this.activeRouted.snapshot.params.id;
    let name = this.activeRouted.snapshot.params.tipMaterijala;
    console.log(this.activeRouted.snapshot.params)
    this.matName = name;
    this.getSubjectByObjectId(this._id)

    this.activeRouted.params.subscribe((url: any) => {
      this._id = this.activeRouted.snapshot.params.id;
      this.matName = url.tipMaterijala;
      this.getSubjectByObjectId(url.id);

    });
  }





  subjectId: string;
  matName: string;
  getSubjectByObjectId(id: string) {
    this.subjectServie.getGeneralSubjectInfoByObjectId(id).subscribe((result: any) => {
      this.subjectId = result.generalInfo.id;
      console.log(this.matName);
      this.setHeading(this.matName, this.subjectId);
      this.getShowSubjectExamExamples();
      this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${this.subjectId}/${this.urlPart}`;
    })
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


  getShowSubjectExamExamples() {
    this.subjectServie.getShow(this._id, 'primeri ispita').subscribe((res: any) => {
      this.showExamExamples = res;
    })
  }

  enableShow: boolean = false;
  showExamExamples: boolean;

  message: string;

  change() {
    this.message = "";
    this.subjectServie.azurirajPrikaz(this._id, this.showExamExamples, 'primeri ispita').subscribe((res: any) => {
      this.message = res;
    })
  }

  setHeading(name: string, id: string) {
    this.enableShow = false;
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
      this.heading = "Ispitna pitanja";
      this.urlPart = "Ispitna pitanja";
      this.getAllSubjectExamTextMaterials(id);
      this.getShowSubjectExamExamples();
      this.enableShow = true;
    }
    if (name === "Ispitna resenja") {
      this.heading = "Resenja ispitnih zadataka";
      this.urlPart = "Ispitna resenja";
      this.getAllSubjectExamSolutionMaterials(id);
      this.getShowSubjectExamExamples();
      this.enableShow = true;
    }
  }

  heading: string;
  urlPart: string;
  materials: SubjectMaterialsInfo[];
  baseUrl: string




}
