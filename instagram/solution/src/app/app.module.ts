import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { ImageListComponent } from './image/image-list/image-list.component';
import { ImageDetailsComponent } from './image/image-details/image-details.component';
import { DataService } from './data.service'
import { ImageService } from './image/image.service';
import { HeaderComponent } from './header/header.component';
import { EditComponent } from './edit/edit.component';
import { DialogComponent } from './dialog/dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './error.interceptor'


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ImageListComponent,
    ImageDetailsComponent,
    HeaderComponent,
    EditComponent,
    DialogComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [DataService, ImageService,
    
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
