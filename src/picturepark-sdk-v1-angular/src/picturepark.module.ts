import { OpaqueToken } from '@angular/core';
import { NgModule, Inject, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration, BrowserStorage } from 'angular-auth-oidc-client';

import { OidcAuthService } from './auth/oidc-auth-service';
import { TokenAuthService } from './auth/token-auth-service';
import { PictureparkConfiguration } from './picturepark.config';
import { PICTUREPARK_CONFIGURATION } from './picturepark.servicebase';
import {
  JsonSchemaService,
  ContentService,
  BusinessProcessService,
  DocumentHistoryService,
  SchemaService,
  UserService,
  PermissionService,
  PublicAccessService,
  ShareService,
  TransferService,
  AuthService
} from './picturepark.services';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    JsonSchemaService,
    ContentService,
    BusinessProcessService,
    DocumentHistoryService,
    SchemaService,
    UserService,
    PermissionService,
    PublicAccessService,
    ShareService,
    TransferService,
    { provide: AuthService, useClass: TokenAuthService }
  ]
})
export class PictureparkModule {
}

@NgModule({
  imports: [
    HttpModule,
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
    @Inject(PICTUREPARK_CONFIGURATION) pictureparkConfiguration: PictureparkConfiguration) {

    const redirectRoute = '/pcpToken';
    const configuration = new OpenIDImplicitFlowConfiguration();
    configuration.client_id = 'picturepark_frontend';
    configuration.response_type = 'id_token token';
    configuration.scope = 'offline_access profile picturepark_api picturepark_account openid';

    const url = window.location.origin;
    const search = window.location.search;

    configuration.stsServer = pictureparkConfiguration.stsServer!;
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
    oidcSecurityService.setCustomRequestParameters({'acr_values':'tenant:{"id":"' + pictureparkConfiguration.customerId + '","alias":"' + pictureparkConfiguration.customerAlias + '"}'});
    if (typeof location !== 'undefined' && window.location.hash && window.location.hash.startsWith('#id_token=')) {
      authService.processAuthorizationRedirect();
    }
  }
}
