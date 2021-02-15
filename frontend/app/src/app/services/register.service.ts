import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student } from '../model/Student';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  registerStudent(student: Student) {
    return this.http.post(`${environment.api}/registerStudent`, { student: student }).pipe(shareReplay());
  }
}
