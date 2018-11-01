import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreateAlbumComponent } from '../create-album/create-album.component';

export interface DialogData {
  title: string;
  albumId: number;
  userId: number;
  photos: number;
}

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  photosList = [];
  canActivate = false;

  userId: number;

  albumContent = [];
  progressBarMode: string;

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    let albumsStock;
    let albumsUrl;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.onChange();
        // this.canActivate = true;
        this.userId = +params.get('id');
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAlbumComponent, {
      width: '350px',
      data: { userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.albumService.createAlbum(result.albumId, result.userId, result.title).subscribe(data => {
          console.log('album is added!');
          this.albumContent.push(result);
        });
      }
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
    this.progressBarMode = 'indeterminate';
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
    this.progressBarMode = null;
  }

}
