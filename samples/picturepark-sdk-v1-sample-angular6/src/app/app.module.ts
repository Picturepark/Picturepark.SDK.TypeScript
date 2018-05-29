import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {
  PICTUREPARK_CONFIGURATION,
  PictureparkPublicAccessModule,
  PictureparkConfiguration,
  PictureparkUiModule
} from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PictureparkPublicAccessModule,
    PictureparkUiModule
  ],
  providers: [
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

