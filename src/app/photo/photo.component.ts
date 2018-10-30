import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhotoService } from './../services/photo.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photos = [];
  end = 0;
  start = 0;

  pageSize = 10;
  length = 0;
  currentPage = 0;

  constructor(private photoService: PhotoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.route.paramMap
    .pipe(switchMap((params: ParamMap) => this.photoService.getPhotosByAlbumId(+params.get('id'))))
    .subscribe(data => {
      this.photos = data;
      this.length = data.length;
      this.end = this.pageSize;
    });
  }

  handlePage(event: PageEvent) {
    const nextPage = this.currentPage + 1;
    const prevPage = this.currentPage - 1;

    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.end = this.start + this.pageSize;
    }

    if (event.pageIndex === nextPage) {
      this.start += this.pageSize;
      this.end += this.pageSize;
    } else if (event.pageIndex === prevPage) {
      this.start -= this.pageSize;
      this.end -= this.pageSize;
    }
    this.currentPage = event.pageIndex;
  }


}
