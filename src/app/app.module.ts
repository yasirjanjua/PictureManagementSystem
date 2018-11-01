import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AlbumComponent } from './album/album.component';
import { PhotoComponent } from './photo/photo.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateAlbumComponent } from './create-album/create-album.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AlbumComponent,
    PhotoComponent,
    CreateAlbumComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [CreateAlbumComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
