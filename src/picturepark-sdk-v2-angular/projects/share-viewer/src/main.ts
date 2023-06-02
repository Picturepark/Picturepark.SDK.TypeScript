import { enableProdMode, importProvidersFrom } from '@angular/core';

import {
  PictureparkConfigurationFactory,
  PictureparkUIScriptPathFactory,
  getLanguageFactory,
  getViewModeFactory,
  getDisableCookieConsentFactory,
  getTermsFactory,
} from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { SharedModule } from '@picturepark/sdk-v2-angular-ui';
import { MatDialogModule } from '@angular/material/dialog';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, HammerModule, bootstrapApplication } from '@angular/platform-browser';
import {
  PICTUREPARK_UI_SCRIPTPATH,
  VIEW_MODE,
  DISABLE_COOKIE_CONSENT,
  TERMS,
} from 'projects/picturepark-sdk-v2-angular-ui/src/lib/configuration';
import { getDevCdnUrl } from 'src/config';
import {
  AuthService,
  AccessTokenAuthService,
  PICTUREPARK_CONFIGURATION,
  PICTUREPARK_CDN_URL,
  LocaleModule,
} from '@picturepark/sdk-v2-angular';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';

function getCdnUrl(): string | null {
  if (!environment.production) {
    return getDevCdnUrl();
  }

  return getAttribute('picturepark-cdn-url');
}

function getAttribute(attribute: string) {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute(attribute);
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HammerModule,
      MatDialogModule,
      SharedModule.forRoot(),
      LocaleModule.forRoot('share', getLanguageFactory(), getCdnUrl())
    ),
    { provide: AuthService, useClass: AccessTokenAuthService },
    { provide: PICTUREPARK_CONFIGURATION, useFactory: PictureparkConfigurationFactory },
    { provide: PICTUREPARK_UI_SCRIPTPATH, useFactory: PictureparkUIScriptPathFactory },
    { provide: PICTUREPARK_CDN_URL, useFactory: getCdnUrl },
    { provide: VIEW_MODE, useFactory: getViewModeFactory },
    { provide: DISABLE_COOKIE_CONSENT, useFactory: getDisableCookieConsentFactory },
    { provide: TERMS, useFactory: getTermsFactory },
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
