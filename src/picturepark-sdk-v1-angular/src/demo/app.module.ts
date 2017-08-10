import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PictureparkOidcModule } from "picturepark.module";
import { PictureparkConfiguration } from "picturepark.config";
import { PICTUREPARK_CONFIGURATION } from "picturepark.servicebase";

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
      { path: 'pcpToken/:type', redirectTo: '' },
    ])
  ],
  providers: [
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: "https://devnext-api.preview-picturepark.com",
        stsServer: "https://devnext-identity.preview-picturepark.com",
        redirectUrl: "http://localhost:4200", 
        customerAlias: "dev"
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
