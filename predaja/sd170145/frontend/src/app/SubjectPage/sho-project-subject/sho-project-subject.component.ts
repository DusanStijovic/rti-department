import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SubjectProject from 'src/app/model/SubjectProject';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sho-project-subject',
  templateUrl: './sho-project-subject.component.html',
  styleUrls: ['./sho-project-subject.component.css']
})
export class ShoProjectSubjectComponent implements OnInit {


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getAllSubjectProject(this.id);
    this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${this.id}/projekti`;
    this.activatedRoute.params.subscribe((res) => {
      this.id = this.activatedRoute.snapshot.params.id;
      this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${this.id}/projekti`;
    })
  }

  getAllSubjectProject(id: string) {
    this.subjectService.getAllSubjectProject(id).subscribe((result: any) => {
      if (result.project) {
        this.projects = result.project;
        console.log(this.projects);
      }
    },
      (err: any) => {
        this.router.navigate(['errorPage']);
      });
  }



  projects: SubjectProject;
  id: string;
  baseUrl: string;

}
