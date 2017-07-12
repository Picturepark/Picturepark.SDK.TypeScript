import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PICTUREPARK_API_URL, PICTUREPARK_CONFIGURATION, PictureparkConfiguration, PictureparkOidcModule } from '../index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PictureparkOidcModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
    ])
  ],
  providers: [
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: "https://devnext-api.preview-picturepark.com/",
        stsServer: "https://devnext-identity.preview-picturepark.com",
        redirectUrl: "http://localhost:4200"
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
