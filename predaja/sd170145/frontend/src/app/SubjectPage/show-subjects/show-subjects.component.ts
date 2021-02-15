import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { BasicInfoSubject } from '../../model/BasicInfoSubject';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-show-subjects',
  templateUrl: './show-subjects.component.html',
  styleUrls: ['./show-subjects.component.css']
})
export class ShowSubjectsComponent implements OnInit, OnDestroy {

  constructor(
    private share: ShareLoginDataService,
    private subjectService: SubjectService, private activeRouter: ActivatedRoute, private router: Router) {

  }

  title: string;
  ngOnInit(): void {
    this.subjectsInfo = [[{}]] as BasicInfoSubject[][];
    this.changeDepartment = this.activeRouter.params.subscribe((value) => {
      this.title = value.odsek;
      this.changeNumOfSemester(value.odsek);
      this.getAllSubjects(value.odsek);
      this.share.obojiDeo('odsek');
    });
    this.title = this.activeRouter.snapshot.params.odsek;
    this.odsek = this.activeRouter.snapshot.params.odsek;
    this.changeNumOfSemester(this.odsek);
    this.getAllSubjects(this.odsek);
    this.share.obojiDeo('odsek');

  }

  master = [1, 2];
  osnovne = [1, 2, 3, 4, 5, 6, 7, 8];

  getAllSubjects(odsek: string) {
    this.subjectService.getAllSubjects(odsek).subscribe((subjects: BasicInfoSubject[][]) => {
      this.subjectsInfo = subjects;
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  changeNumOfSemester(odsek: string) {
    if (odsek === "master") this.semestars = this.master;
    else this.semestars = this.osnovne;
  }

  subjectsInfo: BasicInfoSubject[][];
  odsek: string;
  semestars: number[];

  changeDepartment: Subscription;

  ngOnDestroy() {
    this.changeDepartment.unsubscribe();
  }


}
