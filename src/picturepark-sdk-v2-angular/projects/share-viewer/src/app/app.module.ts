import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule, SharedModule } from '@picturepark/sdk-v2-angular-ui';
import {
  AuthService,
  AccessTokenAuthService,
  PICTUREPARK_CONFIGURATION,
  StorageKey,
  LocaleModule,
  PICTUREPARK_CDN_URL,
} from '@picturepark/sdk-v2-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareDetailModule } from './share-detail/share-detail.module';
import { environment } from '../environments/environment';
import { TRANSLATIONS } from 'projects/picturepark-sdk-v2-angular-ui/src/lib/utilities/translations';
import { COOKIE_CONSENT, PICTUREPARK_UI_SCRIPTPATH, VIEW_MODE } from 'projects/picturepark-sdk-v2-angular-ui/src/lib/configuration';
import { PictureparkCdnConfiguration } from '../models/cdn-config';
import { shareTranslations } from './translations/share-translations';
import { getDevCdnUrl, PictureparkAppSetting } from 'src/config';

const translations = TRANSLATIONS;
translations['ShareViewer'] = shareTranslations;

function getAttribute(attribute: string) {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute(attribute);
}

function getCdnUrl(): string | null {
  if (!environment.production) {
    return getDevCdnUrl();
  }

  return getAttribute('picturepark-cdn-url');
}

export function PictureparkConfigurationFactory() {
  if (!environment.production) {
    const settings = PictureparkAppSetting();
    return <PictureparkCdnConfiguration>{
      apiServer: settings.apiServer,
      customerAlias: settings.customerAlias,
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

export function getViewModeFactory(): 'grid' | 'list' {
  return getAttribute('view-mode') === 'list' ? 'list' : 'grid';
}

export function getCookieConsentFactory(): boolean {
  return getAttribute('cookie-consent') === 'true';
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
    { provide: VIEW_MODE, useFactory: getViewModeFactory },
    { provide: COOKIE_CONSENT, useFactory: getCookieConsentFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
