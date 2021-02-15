import { Component, Input, OnInit } from '@angular/core';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-employee-card-info',
  templateUrl: './employee-card-info.component.html',
  styleUrls: ['./employee-card-info.component.css']
})
export class EmployeeCardInfoComponent implements OnInit {

  @Input() name: string;
  @Input() role: string;
  @Input() subjects: string[];
  @Input() readMore: string;

  constructor(
    private share: ShareLoginDataService
    , private subejctService: SubjectService
  ) { }

  applySubjects: string[] = [];

  ngOnInit(): void {
    this.share.currentLoginUser.subscribe((user) => {
      this.isLogin = user.type == 'student';
    })
    if (this.share.getUser()) {
      this.subejctService.getAllStudentSubject(this.share.getUser().username).subscribe((result: any) => {
        this.applySubjects = result.subjects;

      })
    }
  }

  shoudlShow(subject: string) {
    if (!this.isLogin) return false;
    let ok = this.applySubjects.find((one) => {
      return one == subject;
    })
    if (ok) return true;
    else return false;
  }
  isLogin: boolean;

}
