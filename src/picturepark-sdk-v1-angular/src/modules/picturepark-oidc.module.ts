import { NgModule, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { PictureparkModule } from './picturepark.module';
import { AuthService } from '../services/services';
import { PictureparkConfiguration } from '../services/configuration';
import { OidcAuthService } from '../auth/oidc-auth.service';

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
