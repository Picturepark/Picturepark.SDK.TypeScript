import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule, SharedModule } from '@picturepark/sdk-v1-angular-ui';
import {
  AuthService,
  AccessTokenAuthService,
  PICTUREPARK_CONFIGURATION,
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
import { PICTUREPARK_CDN_URL } from 'projects/picturepark-sdk-v1-angular/src/lib/services/frontend-services';

const translations = TRANSLATIONS;
translations['ShareViewer'] = shareTranslations;

function getAttribute(attribute: string) {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute(attribute);
}

function getCdnUrl(): string | null {
  if (!environment.production) {
    return '';
  }

  return getAttribute('picturepark-cdn-url');
}

export function PictureparkConfigurationFactory() {
  if (!environment.production) {
    return <PictureparkCdnConfiguration>{
      apiServer: 'https://api.01.qa-picturepark.com',
      customerAlias: 'brodev001',
      cdnUrl: getCdnUrl(),
    };
  }

  return <PictureparkCdnConfiguration>{
    apiServer: getAttribute('picturepark-api-server'),
    customerAlias: getAttribute('picturepark-customer-alias'),
    cdnUrl: getCdnUrl(),
  };
}

export function PictureparkUIScriptPathFactory() {
  return getAttribute('picturepark-script-path');
}

export function getLanguageFactory(): string {
  const storedLanguage = localStorage.getItem(StorageKey.LanguageCode);
  const language = getAttribute('language');
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
    { provide: PICTUREPARK_CDN_URL, useFactory: getCdnUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
