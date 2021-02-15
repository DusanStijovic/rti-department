import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowImageService {

  constructor(private http: HttpClient) { }

  getImage(imageUrl: string) {
    return this.http
      .get(imageUrl, { responseType: 'blob' }).pipe(shareReplay());
  }





}


