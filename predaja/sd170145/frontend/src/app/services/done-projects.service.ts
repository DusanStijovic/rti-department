import { HttpClient } from '@angular/common/http';
import { getPlatform, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import EmployeeProject from '../model/EmployeeProject';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProjectsService {

  constructor(private http: HttpClient) { }


  getAllEmployeeProjectProjects(): any {
    return this.http.get(`${environment.api}/employeeProjects`).pipe(shareReplay());
  }

  makeEmployeeProjectroject(project: EmployeeProject) {
    return this.http.post(`${environment.api}/makeEmployeeProject`, { project: project }).pipe(shareReplay());
  }

}
