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
import { shareTranslations } from './translations/share-translations';

const translations = TRANSLATIONS;
translations['ShareViewer'] = shareTranslations;

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

export function getLanguageFactory(): string {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  const storedLanguage = localStorage.getItem(StorageKey.LanguageCode);
  const language = appRootTag.getAttribute('language');
  return storedLanguage ?? language ?? '';
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HammerModule,

    // Picturepark
    ShareDetailModule,
    SearchBoxModule,
    SharedModule.forRoot(),
    LocaleModule.forRoot('share', getLanguageFactory(), getCdnUrl()),
  ],
  providers: [
    { provide: AuthService, useClass: AccessTokenAuthService },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory },
    { provide: PICTUREPARK_UI_SCRIPTPATH, useFactory: PictureparkUIScriptPathFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
