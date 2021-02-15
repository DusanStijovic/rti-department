import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubjectService } from '../../services/subject.service';
import LabInfo from '../../model/LabInfo';

@Component({
  selector: 'app-azuriraj-labove',
  templateUrl: './azuriraj-labove.component.html',
  styleUrls: ['./azuriraj-labove.component.css']
})
export class AzurirajLaboveComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private subjectService: SubjectService) { }



  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getAllSubjectLabMaterials(this.id);

    this.getShowLabs();
  }

  change() {
    this.subjectService.azurirajPrikaz(this.id, this.showLabs, 'lab').subscribe((res: any) => {
      this.message2 = res;
    })
  }

  getShowLabs() {
    this.subjectService.getShow(this.id, 'lab').subscribe((res: any) => {
      this.showLabs = res;
    })
  }

  getAllSubjectLabMaterials(id: string) {
    this.subjectService.getGeneralSubjectInfoByObjectId(id).subscribe((res: any) => {
      this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${res.generalInfo.id}/labovi`;
      this.subjectService.getAllSubjectLabMaterials(res.generalInfo.id).subscribe((result: any) => {
        if (result.lab) {
          this.labNumber = result.lab.count;
          this.labInfo = result.lab.info;
          this.labs = result.lab.labs;
          console.log(this.labs);
        }
        console.log(this.labs);
      },
        (err: any) => {
          this.router.navigate(['errorPage']);
        });
    });
  }
  mongoose = require('mongoose')

  dodajLab() {
    let newLab = {} as LabInfo;
    newLab.description = ' '
    newLab._id = this.mongoose.Types.ObjectId();
    newLab.materials = [];
    this.subjectService.addSubjectLab(this.id, newLab).subscribe((res: any) => {
      this.message = res;
    })
    this.labs.push(newLab);
    this.labNumber = this.labs.length;
    this.azurirajOpsteInformacijeOLabu();
  }

  obrisi(id: string) {
    this.subjectService.obrisiLab(this.id, id).subscribe((res: any) => {
      this.message2 = res;
    })
    this.labs = this.labs.filter((oneLab: LabInfo) => {
      return oneLab._id != id
    })
    this.labNumber = this.labs.length;
    this.azurirajOpsteInformacijeOLabu();
  }

  message2: string;
  azurirajOpsteInformacijeOLabu() {
    this.message2 = "";
    this.subjectService.azurirajOpsteInformacijeOLabu(this.id, { labInfo: this.labInfo, labNumber: this.labNumber }).subscribe((res: any) => {
      this.message2 = res;
    })
  }

  showLabs: boolean;

  message: string;

  labs: LabInfo[] = [];
  labInfo: string;
  labNumber: number;
  id: string;
  baseUrl: string;



}
