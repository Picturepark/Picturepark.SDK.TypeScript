import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AuthService, PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v2-angular';
import { OidcAuthService, PictureparkOidcAuthConfiguration } from './oidc-auth.service';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

// IMPORTANT: Update docs/picturepark-sdk-v2-angular/modules.md when changing modules

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({ imports: [OAuthModule.forRoot()], providers: [
        { provide: OAuthStorage, useFactory: storageFactory },
        { provide: AuthService, useClass: OidcAuthService },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class PictureparkOidcModule {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static forRoot(config: PictureparkOidcAuthConfiguration | Function): ModuleWithProviders<PictureparkOidcModule> {
    return {
      ngModule: PictureparkOidcModule,
      providers: [
        typeof config === 'function'
          ? { provide: PICTUREPARK_CONFIGURATION, useFactory: config }
          : { provide: PICTUREPARK_CONFIGURATION, useValue: config },
      ],
    };
  }
}
