import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SubjectMaterialsInfo from 'src/app/model/SubjectMaterialsInfo';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-one-lab-info',
  templateUrl: './one-lab-info.component.html',
  styleUrls: ['./one-lab-info.component.css']
})
export class OneLabInfoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  id: string;

  @Input() labName: string;
  @Input() description: string;
  @Input() labMaterials: SubjectMaterialsInfo[];
  @Input() baseUrl: string;
  @Input() moreOptions: boolean;
  @Input() lab_id: string;


  message: string;

  azurirajInfo() {
    this.subjectService.azurirajLabInfo(this.id, this.lab_id, { labInfo: this.description }).subscribe((res: any) => {
      this.message = res;
    })
  }



}
