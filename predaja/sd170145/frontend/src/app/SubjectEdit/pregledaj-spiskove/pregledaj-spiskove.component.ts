import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
import SubjectApplication from 'src/app/model/SubjectApplication';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-pregledaj-spiskove',
  templateUrl: './pregledaj-spiskove.component.html',
  styleUrls: ['./pregledaj-spiskove.component.css']
})
export class PregledajSpiskoveComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private active: ActivatedRoute,
    private share: ShareLoginDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSubjectApplication();
  }


  getAllSubjectApplication() {
    this.subjectService.getAllSubjectAllApplications(this.active.snapshot.params.id).subscribe((result: any) => {
      for (let one of result) {
        one.isOpen = this.isOpen(one);
      }
      console.log(result);
      this.spiskovi = result;

    }, (err) => {
      this.router.navigate(['errorPage']);
    });
  }

  zatvori(id: string) {
    this.subjectService.zatvoriSpisak(id, this.active.snapshot.params.id).subscribe((result: any) => {
      this.message = result;
      this.getAllSubjectApplication();
    }, (err) => {
      this.message = "Neuspesno, probajte opet";
    })
  }

  pregled(id: string) {
    console.log(id);
    let base = '/employeeHomePage/podesavanja predmeta/spiskovi/';
    if (this.share.getUser().type == 'admin') {
      base = '/adminHomePage/azuriraj predmete/spiskovi/'
    }
    this.router.navigate([base, this.active.snapshot.params.id, id]);
  }

  message: string;

  isOpen(oneApply: SubjectApplication) {
    if (!oneApply.open) return false;
    let rok = new Date(oneApply.deadline);
    // console.log(rok);
    let sadasnjiDatum = new Date();
    if (!rok) return true;
    if (sadasnjiDatum.getTime() > rok.getTime()) {
      return false;
    }
    return true;
  }

  spiskovi: SubjectApplication[] = [{}] as SubjectApplication[];

  id: string;



}
