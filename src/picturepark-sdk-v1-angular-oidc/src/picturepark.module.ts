import { NgModule, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { PictureparkModule, AuthService, PictureparkConfiguration, PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from './oidc-auth.service';

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    PictureparkModule
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
