import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShareCardComponent } from './share-card/share-card.component';
import { ContentPickerComponent } from './content-picker/content-picker.component';

import { TranslatePipe } from "pipes/translate.pipe";

import { PICTUREPARK_CONFIGURATION, PictureparkConfiguration } from '@picturepark/sdk-v1-angular';
import { PictureparkModule } from '@picturepark/sdk-v1-angular';
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular-ui';

// Load configuration
let appRootTag = document.getElementsByTagName('app-root')[0];
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
    PictureparkModule,
    PictureparkUiModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'pcpToken/:type', redirectTo: 'content-picker' }
    ])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: userLanguage },
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: appRootTag.getAttribute('picturepark-api-server'),
        stsServer: appRootTag.getAttribute('picturepark-sts-server'),
        customerAlias: appRootTag.getAttribute('customer-alias')
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }