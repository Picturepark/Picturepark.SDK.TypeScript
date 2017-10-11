import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PictureparkOidcModule } from '../picturepark.module';
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
    PictureparkOidcModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'pcpToken/:type', redirectTo: '' },
    ])
  ],
  providers: [
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: 'https://devnext-api.preview-picturepark.com',
        stsServer: 'https://devnext-identity.preview-picturepark.com',
        redirectUrl: 'http://localhost:4200',
        customerId: '-enter-id-here-',
        customerAlias: 'dev'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
