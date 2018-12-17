import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {
  PICTUREPARK_CONFIGURATION,
  PictureparkAccessTokenAuthConfiguration,
  AccessTokenAuthService,
  AuthService
} from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: AuthService, useClass: AccessTokenAuthService },
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkAccessTokenAuthConfiguration>{
        apiServer: 'https://devnext-api.preview-picturepark.com',
        customerAlias: 'dev',
        accessToken: ''
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

