import { enableProdMode, importProvidersFrom } from '@angular/core';
import { oidcConfigFactory, getViewModeFactory, getAttribute } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PictureparkUiModule } from '@picturepark/sdk-v2-angular-ui';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, HammerModule, bootstrapApplication } from '@angular/platform-browser';
import { VIEW_MODE } from 'projects/picturepark-sdk-v2-angular-ui/src/lib/configuration';
import { PictureparkOidcModule } from '@picturepark/sdk-v2-angular-oidc';
import { getDevCdnUrl } from 'src/config';
import { PICTUREPARK_CDN_URL, LocaleModule } from '@picturepark/sdk-v2-angular';
import 'hammerjs';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { MatNativeDateModule } from '@angular/material/core';

function getCdnUrl(): string | null {
  if (!environment.production) {
    return getDevCdnUrl();
  }

  return getAttribute('picturepark-cdn-url');
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      PictureparkUiModule,
      PictureparkOidcModule.forRoot(oidcConfigFactory),
      HammerModule,
      LocaleModule.forRoot('system'),
      MatProgressBarModule,
      MatDialogModule,
      MatNativeDateModule
    ),
    { provide: PICTUREPARK_CDN_URL, useFactory: getCdnUrl },
    { provide: VIEW_MODE, useFactory: getViewModeFactory },
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
