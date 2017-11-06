import { NgModule, Inject } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration, BrowserStorage } from 'angular-auth-oidc-client';

import { PictureparkModule, AuthService, PictureparkConfiguration, PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';
import { OidcAuthService, PictureparkOidcAuthConfiguration } from './oidc-auth.service';

@NgModule({
  imports: [
    HttpModule, // required for angular-auth-oidc-client
    HttpClientModule,
    PictureparkModule,
    AuthModule.forRoot({ storage: BrowserStorage })
  ],
  providers: [
    { provide: AuthService, useClass: OidcAuthService }
  ]
})
export class PictureparkOidcModule {
  constructor(
    @Inject(AuthService) authService: OidcAuthService,
    @Inject(OidcSecurityService) oidcSecurityService: OidcSecurityService,
    @Inject(PICTUREPARK_CONFIGURATION) pictureparkConfiguration: PictureparkOidcAuthConfiguration) {

    const redirectRoute = '/pcpToken';
    const configuration = new OpenIDImplicitFlowConfiguration();
    configuration.response_type = 'id_token token';
    configuration.client_id =
      pictureparkConfiguration.clientId ? pictureparkConfiguration.clientId : 'picturepark_frontend';
    configuration.scope = pictureparkConfiguration.scope ?
      pictureparkConfiguration.scope : 'offline_access profile picturepark_api picturepark_account openid';

    const url = pictureparkConfiguration.redirectServer ?
      pictureparkConfiguration.redirectServer : window.location.origin;
    const search = window.location.search;

    configuration.stsServer = pictureparkConfiguration.stsServer;
    configuration.redirect_url = url + redirectRoute + '/Success' + search;
    configuration.post_logout_redirect_uri = url + redirectRoute + '/Logout' + search;
    configuration.startup_route = url + redirectRoute + '/Success' + search;
    configuration.forbidden_route = url + redirectRoute + '/Forbidden' + search;
    configuration.unauthorized_route = url + redirectRoute + '/Unauthorized' + search;

    configuration.log_console_warning_active = true;
    configuration.log_console_debug_active = true;
    configuration.max_id_token_iat_offset_allowed_in_seconds = 10;
    configuration.override_well_known_configuration = false;
    configuration.auto_userinfo = true;
    configuration.silent_renew = true;

    oidcSecurityService.setupModule(configuration);
    oidcSecurityService.setCustomRequestParameters({
      'acr_values': 'tenant:{"id":"' + pictureparkConfiguration.customerId + '","alias":"' + pictureparkConfiguration.customerAlias + '"}'
    });

    if (typeof location !== 'undefined' && window.location.hash && window.location.hash.startsWith('#id_token=')) {
      authService.processAuthorizationRedirect();
    }
  }
}
