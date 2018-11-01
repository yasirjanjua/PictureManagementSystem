import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getAlbumById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '?userId=' + id, this.httpOptions);
  }

  createAlbum(albumId: number, userId: number, title: string): Observable<any> {
    const body = {
      'userId': userId,
      'id': albumId,
      'title': title
    };

    return this.http.post(this.apiUrl, body, this.httpOptions);
  }
}
