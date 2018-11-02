import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'xyasdskdasmdai'
    })
  };

  constructor(private http: HttpClient, private config: ConfigService) { }

  getUserList(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.config.handleError)
      );
  }
}
