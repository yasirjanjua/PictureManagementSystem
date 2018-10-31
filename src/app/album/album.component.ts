import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albums$: Observable<any>;
  photosList = [];
  canActivate = false;

  constructor(private albumService: AlbumService, private photoService: PhotoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.albums$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.onChange();
        this.canActivate = true;
        return this.albumService.getAlbumById(+params.get('id'));
      })
    );
  }

  onChange(event?, album?) {
    if (album) {
      album.checked = !album.checked;

      if (album.checked) {
        this.photoService.getPhotosByAlbumId(album.id).subscribe(data => {
          this.photosList.push(data);
          this.photosList = this.photosList.reduce((acc, val) => acc.concat(val), []);
          //  console.log(this.photosList);
        });
      } else {
        this.photosList = this.photosList.filter(val => val.albumId !== album.id);
        // console.log(this.photosList);
      }
    } else {
      this.photosList = [];
    }

  }

}
