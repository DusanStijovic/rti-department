
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-subject-information-card',
  templateUrl: './subject-information-card.component.html',
  styleUrls: ['./subject-information-card.component.css']
})

export class SubjectInformationCardComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() links: string[];
  @Input() date: Date;
  @Input() showStar: boolean
  @Input() subjectCode: string;

  constructor(
    private http: HttpClient,
    private fileService: FileService) { }

  ngOnInit(): void {
    this.url = `${environment.api}/predmetiSacuvaniFajlovi/all/information_materials`;
  }


  url: string;

  download(filename: string = null): void {


    this.http.get(`${this.url}/${filename}`, { responseType: 'blob' as 'json' }).subscribe(
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
