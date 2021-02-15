import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stat } from 'fs';
import { share, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Employee from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  getAllEmployees(status: string) {
    return this.http.get(`${environment.api}/employeeList/${status}`).pipe(shareReplay());
  }

  getEmployee(userId: string) {
    return this.http.get(`${environment.api}/employee/` + userId).pipe(shareReplay());
  }


  createNewEmployee(employee: Employee) {
    return this.http.post(`${environment.api}/registrujZaposlenog`, { zaposlen: employee }).pipe(shareReplay());
  }

  getAllEmployeesUserName(status: string) {
    return this.http.get(`${environment.api}/employeesUsername/${status}`).pipe(shareReplay());
  }
  getAllTeachersUserName(status: string) {
    return this.http.get(`${environment.api}/getAllTeachersUserName/${status}`).pipe(shareReplay());
  }

  removeEmployee(employeeId: string) {
    return this.http.post(`${environment.api}/obrisiZaposlenog`, { employeeId }).pipe(shareReplay());
  }

  changeEmployee(employee: any) {
    return this.http.post(`${environment.api}/changeEmployee`, { employee }).pipe(shareReplay());
  }

  getEmployeeId(username: string) {
    return this.http.get(`${environment.api}/employeeID1/${username}`).pipe(shareReplay());
  }

  getEmployeeSubjects(username: string) {
    return this.http.get(`${environment.api}/employeeSubjects/${username}`).pipe(shareReplay());
  }

  getEmployeNamebyUserName(username: string) {
    return this.http.get(`${environment.api}/getEmployeNamebyUserName/${username}`).pipe(shareReplay());
  }
}
