import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student } from '../model/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(private http: HttpClient) { }



  getAllStudents(status: string) {
    return this.http.get(`${environment.api}/getAllStudents/${status}`).pipe(shareReplay());
  }

  removeStudent(studentId: string) {
    return this.http.post(`${environment.api}/removeStudent`, { studentId: studentId }).pipe(shareReplay());
  }

  getStudent(studentid: string) {
    return this.http.get(`${environment.api}/getStudent/${studentid}`).pipe(shareReplay());
  }

  updateStudent(student: Student, oldUserName: string) {
    return this.http.post(`${environment.api}/updateStudent`, { student: student, id: oldUserName }).pipe(shareReplay());
  }

  applyStudents(students: string[], subjects: string[]) {
    return this.http.post(`${environment.api}/applySelectedStudents`, { students: students, subjects: subjects }).pipe(shareReplay());
  }

  getAllApplys() {
    return this.http.get(`${environment.api}/getAllApplys`).pipe(shareReplay());
  }
  createNewStudents(students: any) {
    return this.http.post(`${environment.api}/createNewStudents`, { students: students }).pipe(shareReplay());
  }

}
