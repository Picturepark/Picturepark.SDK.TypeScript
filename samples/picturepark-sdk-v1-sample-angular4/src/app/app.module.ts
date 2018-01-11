import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { PICTUREPARK_CONFIGURATION, PictureparkOidcModule, PictureparkUiModule } from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PictureparkOidcModule,
    PictureparkUiModule
  ],
  providers: [
    { provide: PICTUREPARK_CONFIGURATION, useValue: 'https://devnext.preview-picturepark.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
