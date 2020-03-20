import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from './oidc-auth.service';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    { provide: OAuthStorage, useFactory: storageFactory },
    { provide: AuthService, useClass: OidcAuthService }
  ]
})
export class PictureparkOidcModule {
}
