import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'xyasdskdasmdai'
    })
  };

  constructor(private http: HttpClient, private config: ConfigService) { }

  getPhotos(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.config.handleError)
      );
  }

  getPhotosByAlbumId(id): Observable<any> {
    return this.http.get(this.apiUrl + '?albumId=' + id, this.httpOptions)
      .pipe(
        catchError(this.config.handleError)
      );
  }

  getPhotosByUrl(url: string): Observable<any> {
    const endpoint = this.apiUrl + '?' + url;
    return this.http.get(endpoint, this.httpOptions)
      .pipe(
        catchError(this.config.handleError)
      );
  }
}
