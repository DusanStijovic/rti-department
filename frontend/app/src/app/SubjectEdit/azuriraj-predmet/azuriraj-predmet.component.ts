import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShareLoginDataService } from 'src/app/services/share-login-data.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-azuriraj-predmet',
  templateUrl: './azuriraj-predmet.component.html',
  styleUrls: ['./azuriraj-predmet.component.css']
})
export class AzurirajPredmetComponent implements OnInit {

  constructor(
    private share: ShareLoginDataService,
    private subjectService: SubjectService,
    private employeeService: EmployeeService,
    private router: Router,
    private active: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllSubject();
  }


  getAllSubject() {
    let user = this.share.getUser().type;
    console.log("CAO" + user);
    if (user == 'admin') {
      this.subjectService.getAllSubjectsAllOdsek().subscribe((result: any) => {
        this.subjects = [];
        console.log(this.subjects);
        for (const one of result) {
          this.subjects.push({
            subject: one.id,
            _id: one._id
          })
        }
        console.log(this.subjects);
      }, (err) => { this.router.navigate['errorPage'] });
    } else {
      this.employeeService.getEmployeeSubjects(this.share.getUser().username).subscribe((result: any) => {
        console.log(result);
        this.subjects = result;
      }, (err) => { this.router.navigate['errorPage'] });
    }
  }

  selectedSubject: string = null;
  subjects: { subject: string, _id: string }[];

  promenjenPredmet(subject: string) {
    this.message = "";
    if (subject == 'default') {
      this.selectedSubject = null;
      return;
    }
    localStorage.removeItem("MeniAzuriranjeNastavnika")
    console.log(subject);
    this.selectedSubject = subject;
    let base = '/employeeHomePage/podesavanja predmeta';
    if (this.share.getUser().type == 'admin') {
      base = '/adminHomePage/azuriraj predmete';
    }
    this.router.navigate([base, 'opste', subject]);
  }

  message: string;

  promeniKomponentu(url: string) {
    if (this.selectedSubject == null) {
      this.message = "Predmet nije izabran";
      return;
    } 
    this.message = "";
    this.router.navigate([url, this.selectedSubject]);

  }


  pocetna() {
    if (this.selectedSubject == null) {
      this.message = "Predmet nije izabran";
      return;
    }
    localStorage.removeItem("MeniAzuriranjeNastavnika")
    console.log(this.selectedSubject);
    let base = '/employeeHomePage/podesavanja predmeta';
    if (this.share.getUser().type == 'admin') {
      base = '/adminHomePage/azuriraj predmete';
    }
    this.router.navigate([base, 'opste', this.selectedSubject]);
  }



}
