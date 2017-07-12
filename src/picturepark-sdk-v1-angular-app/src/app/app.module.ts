import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component'; 
import { HomeComponent } from './home/home.component'; 
import { ShareCardComponent } from './share-card/share-card.component'; 
import { ContentPickerComponent } from './content-picker/content-picker.component';

import { TranslatePipe } from "pipes/translate.pipe";

import { PICTUREPARK_API_URL, PICTUREPARK_REFRESH_TOKEN } from '@picturepark/sdk-v1-angular';
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular-ui';

// Load configuration
let appRootTag = document.getElementsByTagName('app-root')[0];
let pictureparkUrl = appRootTag.getAttribute('picturepark-url');
let pictureparkRefreshToken = appRootTag.getAttribute('picturepark-refresh-token') !== 'false'; // default: true

let userLanguage = (<any>navigator).languages ? (<any>navigator).languages[0] : navigator.language; 

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    
    ShareCardComponent, 
    ContentPickerComponent, 
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    AppRoutingModule, 
    PictureparkUiModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: userLanguage },
    { provide: PICTUREPARK_API_URL, useValue: pictureparkUrl }, 
    { provide: PICTUREPARK_REFRESH_TOKEN, useValue: pictureparkRefreshToken }     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }