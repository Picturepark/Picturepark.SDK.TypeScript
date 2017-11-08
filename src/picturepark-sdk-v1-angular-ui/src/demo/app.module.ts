import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PICTUREPARK_CONFIGURATION, PictureparkConfiguration } from '@picturepark/sdk-v1-angular';
import { PictureparkUiModule } from '../picturepark-ui.module';

const userLanguage = (<any>navigator).languages ? (<any>navigator).languages[0] : navigator.language;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    PictureparkUiModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: userLanguage },
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: 'https://devnext-api.preview-picturepark.com',
        customerAlias: 'dev'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
