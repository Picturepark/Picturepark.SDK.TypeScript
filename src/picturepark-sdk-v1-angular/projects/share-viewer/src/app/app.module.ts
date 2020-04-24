import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule, SharedModule } from '@picturepark/sdk-v1-angular-ui';
import {
  AuthService,
  AccessTokenAuthService,
  PICTUREPARK_CONFIGURATION,
  LocalStorageService,
  StorageKey,
  LocaleModule,
} from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDetailModule } from './share-detail/share-detail.module';
import { environment } from '../environments/environment';
import { TRANSLATIONS } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/utilities/translations';
import { PICTUREPARK_UI_SCRIPTPATH } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/configuration';
import { PictureparkCdnConfiguration } from '../models/cdn-config';

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

function getCdnUrl(): string | null {
  if (!environment.production) {
    return '';
  }

  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute('picturepark-cdn-url');
}

export function PictureparkConfigurationFactory() {
  if (!environment.production) {
    return <PictureparkCdnConfiguration>{
      apiServer: 'https://dev.picturepark.com',
      customerAlias: 'testalias',
      cdnUrl: getCdnUrl(),
    };
  }

  const appRootTag = document.getElementsByTagName('app-root')[0];
  return <PictureparkCdnConfiguration>{
    apiServer: appRootTag.getAttribute('picturepark-api-server'),
    customerAlias: appRootTag.getAttribute('picturepark-customer-alias'),
    cdnUrl: getCdnUrl(),
  };
}

export function PictureparkUIScriptPathFactory() {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute('picturepark-script-path');
}

// Get locale from the config provided
export function localeFactory(localStorageService: LocalStorageService): string {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  const language = appRootTag.getAttribute('language');

  return (
    language ||
    localStorageService.get(StorageKey.LanguageCode) ||
    (navigator.language || navigator.languages[0]).slice(0, 2)
  );
}

export function getLanguageFactory(): string {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  const language = appRootTag.getAttribute('language');

  return language ?? '';
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
    LocaleModule.forRoot(getLanguageFactory(), getCdnUrl()),
  ],
  providers: [
    { provide: AuthService, useClass: AccessTokenAuthService },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory },
    { provide: PICTUREPARK_UI_SCRIPTPATH, useFactory: PictureparkUIScriptPathFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
