import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import LabInfo from 'src/app/model/LabInfo';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sho-lab-subject',
  templateUrl: './sho-lab-subject.component.html',
  styleUrls: ['./sho-lab-subject.component.css']
})

export class ShoLabSubjectComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private subjectService: SubjectService) { }




  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getAllSubjectLabMaterials(this.id);
    this.activatedRoute.params.subscribe((res) => {
      this.id = this.activatedRoute.snapshot.params.id;
      this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${this.id}/labovi`;
    })
    this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${this.id}/labovi`;
  }

  getAllSubjectLabMaterials(id: string) {
    this.subjectService.getAllSubjectLabMaterials(id).subscribe((result: any) => {
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
  }



  labs: LabInfo[];
  labInfo: string;
  labNumber: number;
  id: string;
  baseUrl: string;




}
