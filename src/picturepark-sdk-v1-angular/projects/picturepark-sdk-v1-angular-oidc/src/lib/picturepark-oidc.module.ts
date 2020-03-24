import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService, PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';
import { OidcAuthService, PictureparkOidcAuthConfiguration } from './oidc-auth.service';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [
    { provide: OAuthStorage, useFactory: storageFactory },
    { provide: AuthService, useClass: OidcAuthService },
  ],
})
export class PictureparkOidcModule {
  public static forRoot(config: PictureparkOidcAuthConfiguration | Function): ModuleWithProviders {
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
