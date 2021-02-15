import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-detailed-info',
  templateUrl: './subject-detailed-info.component.html',
  styleUrls: ['./subject-detailed-info.component.css']
})
export class SubjectDetailedInfoComponent implements OnInit {

  constructor(private router: Router, private activeRouter: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    console.log("IZ OCA" + this.activeRouter.snapshot.params.id);
    this.id = this.activeRouter.snapshot.params.id;
    this.checkIfShouldShowLabProjectExam(this.id);
  }

  name: "Stranica predmeta";
  options = ["Obavestenja", "O predmetu", "Predavanja", "Vezbe", "Spiskovi"];

  id: string;

  changeShowInfo($event: any) {
    console.log(this.id);
    this.router.navigate(['predmet', this.id, $event])
  }

  checkIfShouldShowLabProjectExam(id: string) {

    this.subjectService.getLabProjectExamFlag(id).subscribe((result: any) => {
      let showProject = result.showProject;
      let showLab = result.showLab;
      let showExamExamples = result.showExamExamples;
      console.log(JSON.stringify(result));
      if (showProject) this.options.push("Projekat");
      if (showLab) this.options.push("Laboratorija");
      if (showExamExamples) {
        this.options.push("Ispitna pitanja");
        this.options.push("Ispitna resenja");
      }
    })
  }

}
