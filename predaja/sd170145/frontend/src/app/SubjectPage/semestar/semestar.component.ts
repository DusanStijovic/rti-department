import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/model/UserType';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BasicInfoSubject } from '../../model/BasicInfoSubject';

@Component({
  selector: 'app-semestar',
  templateUrl: './semestar.component.html',
  styleUrls: ['./semestar.component.css']
})
export class SemestarComponent implements OnInit {

  @Input() subjects: Array<BasicInfoSubject>;
  @Input() semestarNumber: number;

  constructor(private subjectService: SubjectService, private share: ShareLoginDataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllStudentSubject();
  }
  prijaviSe(subjectId: string) {
    let username = this.share.getUser().username;
    this.subjectService.applyStudentToSubject(username, subjectId).subscribe((result: any) => {
      console.log(result.message);
      this.getAllStudentSubject();
    }, (err: any) => {
      console.log(err);
      this.router.navigate(['errorPage']);
    });
  }

  prikaziPredmet(subjectId: string) {
    //console.log(subjectId);
    this.router.navigate(['/predmet', subjectId, 'Obavestenja']);
  }


  havePrivilege() {
    let type = this.share.getUserType();
    if (type != UserType.Student) return false;
    return true;
  }

  dozvoljenPregledStranica(subjectId: string) {
    let type = this.share.getUserType();
    if (type != UserType.Student) return false;

    let subject = this.studentSubject.find((subject: string) => {
      return subject === subjectId;
    });
    if (subject == null) return false;

    return true;

  }

  mozeDaSePrijaviNaPredmet(subjectId: string) {
    let type = this.share.getUserType();
    if (type != UserType.Student) return false;

    let subject = this.studentSubject.find((subject: string) => {
      return subject === subjectId;
    });
    if (subject == null) return true;

    return false;
  }

  mozeDaSePrijavi: boolean;
  dozvoljenPregled: boolean;


  getAllStudentSubject() {
    let user = this.share.getUser();
    let username = null
    if (user) username = user.username;
    if (username == null) {
      this.studentSubject = [];
      return;
    }
    this.subjectService.getAllStudentSubject(username).subscribe((res: any) => {
      this.studentSubject = res.subjects;
    }, (err: any) => {
      this.router.navigate(['errorPage']);
    });
  }

  studentSubject: string[];

}