import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import OfferedProject from '../model/OfferedProject';

@Injectable({
  providedIn: 'root'
})
export class OfferedProjectService {

  constructor(private http: HttpClient) { }


  getAllOfferedProjects() {
    return this.http.get(`${environment.api}/offeredProjects`).pipe(shareReplay());
  }

  makeOfferedProject(offeredProject: OfferedProject) {
    return this.http.post(`${environment.api}/makeOfferedProjects`, {project: offeredProject}).pipe(shareReplay());
  }

}
