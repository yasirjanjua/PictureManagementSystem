import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../album/album.component';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateAlbumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
