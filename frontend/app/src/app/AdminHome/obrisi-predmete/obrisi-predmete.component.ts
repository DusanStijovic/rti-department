import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-obrisi-predmete',
  templateUrl: './obrisi-predmete.component.html',
  styleUrls: ['./obrisi-predmete.component.css']
})
export class ObrisiPredmeteComponent implements OnInit {

  constructor(
    private router: Router,
    private subjectService: SubjectService

  ) { }


  subjects: { id: string, _id: string }[] = []
  ngOnInit(): void {
    this.getAllSubject();
  }

  obrisi(id: string) {
    //Da l proveriri neka ogranicenja u bazi?
    this.subjectService.deleteSubject(id).subscribe((result: any) => {
      this.message = result;
      this.getAllSubject();
    }, (err) => {
      this.message = "Greska, probajte ponovo";
    });
  }

  message: string;

  getAllSubject() {
    this.subjectService.getAllSubjectsAllOdsek().subscribe((result: any) => {
      this.subjects = result;
      console.log(result);
    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

}
