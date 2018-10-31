import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhotoService } from './../services/photo.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnChanges {

  @Input() photos: object[];
  photos$: Observable<any>;

  @Input() isActive: boolean;

  end = 0;
  start = 0;

  pageSize = 10;
  length = 0;
  currentPage = 0;

  constructor(private photoService: PhotoService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const photoList: SimpleChange = changes.photos;
    if (photoList.currentValue) {
      console.log(photoList.currentValue);
      this.photos$ = of(photoList.currentValue);
      this.getPhotos();
    }
  }

  getPhotos() {
    this.photos$
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
