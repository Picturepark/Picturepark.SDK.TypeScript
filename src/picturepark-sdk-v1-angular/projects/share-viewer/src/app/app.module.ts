import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule, SharedModule } from '@picturepark/sdk-v1-angular-ui';
import { AuthService, AccessTokenAuthService, PICTUREPARK_CONFIGURATION, PictureparkAccessTokenAuthConfiguration } from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDetailModule } from './share-detail/share-detail.module';
import { environment } from '../environments/environment';
import { TRANSLATIONS } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/utilities/translations';

export function PictureparkConfigurationFactory() {
  const translations = TRANSLATIONS;
  translations['ShareViewer'] = {
    Expired: {
      en: 'This share has expired and is no longer available. Please contact the person who sent you this link.',
      de: 'Dieses Share ist abgelaufen und ist nicht mehr länger verfügbar. Bitte kontaktieren Sie die Person, die Ihnen diesen Link geschickt hat.'
    }
  };

  if (!environment.production) {
    return <PictureparkAccessTokenAuthConfiguration>{
      apiServer: 'http://localhost:8085',
      customerAlias: 'bro',
      accessToken: ''
    };
  }

  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkAccessTokenAuthConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    customerAlias: appRootTag.getAttribute('picturepark-customer-alias'),
    accessToken: ''
  };
}

// Get locale from the config provided
export function LocaleFactory() {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  const language = appRootTag.getAttribute('language');
  return language || 'en';
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareDetailModule,
    HttpClientModule,

    // Picturepark
    SearchBoxModule,
    SharedModule.forRoot()
  ],
  providers: [
    { provide: AuthService, useClass: AccessTokenAuthService },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory },
    { provide: LOCALE_ID, useFactory: LocaleFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
