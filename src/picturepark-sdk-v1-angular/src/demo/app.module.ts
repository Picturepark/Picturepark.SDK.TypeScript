import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PictureparkModule } from '../picturepark.module';
import { PictureparkConfiguration } from '../picturepark.config';
import { PICTUREPARK_CONFIGURATION } from '../picturepark.servicebase';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PictureparkModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent }
    ])
  ],
  providers: [
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: 'https://devnext-api.preview-picturepark.com',
        accessToken: 'foobar',
        customerAlias: 'dev'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
