import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) { }

  downloadFile(subjectCode: string): any {
    return this.http.get(`${environment.api}/${subjectCode}/notifMaterials`, { responseType: 'blob' });
  }

}