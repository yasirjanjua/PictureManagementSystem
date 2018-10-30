import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albums$: Observable<any>;

  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.albums$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.albumService.getAlbumById(+params.get('id')))
    );
  }

  // getAlbum(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.albumService.getAlbumById(id)
  //     .subscribe(album => {
  //       console.log(album);
  //       return this.albums = album;
  //     });
  // }

}
