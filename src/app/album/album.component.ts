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
  photosList = [];
  canActivate = false;

  albumContent = [];

  constructor(private albumService: AlbumService, private photoService: PhotoService, private route: ActivatedRoute) { }

  ngOnInit() {
    let albumsStock;
    let albumsUrl;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.onChange();
        // this.canActivate = true;
        return this.albumService.getAlbumById(+params.get('id'));
      })
    ).subscribe(albums => {
      albumsStock = albums;
      albumsUrl = albumsStock.map(album => {
        return 'albumId=' + album.id + '&';
      }).join('').slice(0, -1);

      this.photoService.getPhotosByUrl(albumsUrl)
        .subscribe(data => {
          this.albumContent = this.getAlbumContent(albumsStock, data);
        });
    });
  }

  getAlbumContent(albumList, photoList) {
    return albumList.map((album) => {
      const photoCount = photoList.reduce((acc, curr) => {
        if (album.id === curr.albumId) {
          return acc += 1;
        } else {
          return acc;
        }
      }, 0);

      return { title: album.title, albumId: album.id, photoCount: photoCount };
    });
  }

  onChange(event?, album?) {

    if (album) {
      album.checked = !album.checked;

      if (!this.photosList.length) {
        this.canActivate = false;
      }

      if (album.checked) {
        this.photoService.getPhotosByAlbumId(album.albumId).subscribe(data => {
          this.photosList.push(data);
          this.photosList = this.photosList.reduce((acc, val) => acc.concat(val), []);
          //  console.log(this.photosList);
        });
      } else {
        this.photosList = this.photosList.filter(val => val.albumId !== album.albumId);
        // console.log(this.photosList);
      }
    } else {
      this.photosList = [];
    }

  }

}
