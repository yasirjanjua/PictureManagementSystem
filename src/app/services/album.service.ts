import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'xyasdskdasmdai'
    })
  };

  constructor(private http: HttpClient, private config: ConfigService) { }

  getAlbumById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '?userId=' + id, this.httpOptions)
      .pipe(
        catchError(this.config.handleError)
      );
  }

  createAlbum(albumId: number, userId: number, title: string): Observable<any> {
    const body = {
      'userId': userId,
      'id': albumId,
      'title': title
    };

    return this.http.post(this.apiUrl, body, this.httpOptions)
      .pipe(
        catchError(this.config.handleError)
      );
  }
}
