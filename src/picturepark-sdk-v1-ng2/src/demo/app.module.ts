import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PICTUREPARK_URL, PictureparkModule } from '../index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    PictureparkModule
  ],
  providers: [
    { provide: PICTUREPARK_URL, useValue: "https://devnext.preview-picturepark.com" }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
