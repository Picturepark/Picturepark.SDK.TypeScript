import { NgModule, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from './oidc-auth.service';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: AuthService, useClass: OidcAuthService }
  ]
})
export class PictureparkOidcModule {
  constructor(@Inject(AuthService) authService: OidcAuthService) {
    authService.processAuthorizationRedirect();
  }
}
