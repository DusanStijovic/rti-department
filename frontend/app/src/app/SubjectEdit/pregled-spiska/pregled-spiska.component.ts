import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SpisakApplication from 'src/app/model/SpisakApplication';
import SubjectApplication from 'src/app/model/SubjectApplication';
import { SubjectService } from 'src/app/services/subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pregled-spiska',
  templateUrl: './pregled-spiska.component.html',
  styleUrls: ['./pregled-spiska.component.css']
})
export class PregledSpiskaComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private active: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getSubjectApplication();
  }

  subjectApplication: SpisakApplication[];

  subject_id: string;
  spisak_id: string;

  subject_name_id: string;

  getSubjectNameId() {
    this.subjectService.getGeneralSubjectInfoByObjectId(this.subject_id).subscribe((res: any) => {
      console.log("APPLI" + JSON.stringify(res));
      this.subject_name_id = res.generalInfo.id;
      this.baseUrl = `${environment.api}/predmetiSacuvaniFajlovi/${this.subject_name_id}/spiskovi`;
    })
  }

  getSubjectApplication() {
    this.subject_id = this.active.snapshot.params.id;
    this.spisak_id = this.active.snapshot.params.spisak;
    this.getSubjectNameId();
    this.subjectService.getAllSpisakApplication(this.subject_id, this.spisak_id).subscribe((result: any) => {
      this.subjectApplication = result;

    }, (err) => {
      this.router.navigate(['errorPage']);
    })
  }

  baseUrl: string;

  download(username: string, filename: string = null): void {
    this.http.get(`${this.baseUrl}/${username}/${filename}`, { responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (filename)
          downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

}

