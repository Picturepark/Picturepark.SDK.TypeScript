import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule, SharedModule } from '@picturepark/sdk-v1-angular-ui';
import {
  AuthService,
  AccessTokenAuthService,
  PICTUREPARK_CONFIGURATION,
  PictureparkAccessTokenAuthConfiguration,
} from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDetailModule } from './share-detail/share-detail.module';
import { environment } from '../environments/environment';
import { TRANSLATIONS } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/utilities/translations';
import { PICTUREPARK_UI_SCRIPTPATH } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/configuration';

const translations = TRANSLATIONS;
translations['ShareViewer'] = {
  Expired: {
    en: 'This share has expired and is no longer available. Please contact the person who sent you this link.',
    de:
      'Dieses Share ist abgelaufen und ist nicht mehr länger verfügbar. Bitte kontaktieren Sie die Person, die Ihnen diesen Link geschickt hat.',
  },
  Consent: {
    en: `By continuing to browse this website, you agree to the use of cookies to improve your user experience and to collect statistics about your visits.<br />
    Read the <a href="https://picturepark.com/en/terms/cookies" target="_blank">Cookie Policy</a>.`,
    de: `Indem Sie die Website weiterhin verwenden, stimmen Sie der Nutzung von Cookies,
    zur Verbesserung Ihrer Nutzungserfahrung und um Statistiken von Ihrem Besuch zu sammeln, zu.<br />
    Lesen Sie die <a href="https://picturepark.com/de/terms/cookies" target="_blank">Cookie-Richtlinien</a>.`,
  },
  OK: {
    en: 'OK',
    de: 'OK',
  },
  CreationDate: {
    en: 'Creation date',
    de: 'Erstellungsdatum',
  },
  ExpirationDate: {
    en: 'Expiration date',
    de: 'Ablaufdatum',
  },
  Creator: {
    en: 'From',
    de: 'Von',
  },
  DownloadAll: {
    en: 'Download all',
    de: 'Alles herunterladen',
  },
};

export function PictureparkConfigurationFactory() {
  if (!environment.production) {
    return <PictureparkAccessTokenAuthConfiguration>{
      apiServer: 'https://api.01.qa-picturepark.com',
      customerAlias: 'santest',
      accessToken: '',
    };
  }

  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkAccessTokenAuthConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    customerAlias: appRootTag.getAttribute('picturepark-customer-alias'),
    accessToken: '',
  };
}

export function PictureparkUIScriptPathFactory() {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute('picturepark-script-path');
}

// Get locale from the config provided
export function LocaleFactory() {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  const language = appRootTag.getAttribute('language');
  return language || 'en';
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareDetailModule,
    HttpClientModule,
    HammerModule,

    // Picturepark
    SearchBoxModule,
    SharedModule.forRoot(),
  ],
  providers: [
    { provide: AuthService, useClass: AccessTokenAuthService },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory },
    { provide: PICTUREPARK_UI_SCRIPTPATH, useFactory: PictureparkUIScriptPathFactory },
    { provide: LOCALE_ID, useFactory: LocaleFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
