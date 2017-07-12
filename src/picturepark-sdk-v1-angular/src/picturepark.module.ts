import { OpaqueToken } from "@angular/core";
import { NgModule, Inject, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';

export const PICTUREPARK_AUTH_CONFIG = new OpaqueToken('PICTUREPARK_AUTH_CONFIG');

export interface IPictureparkAuthConfig {
  stsServer: string;
  redirectUrl?: string;
}

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
    AuthService]
})
export class PictureparkModule {
}

@NgModule({
  imports: [
    HttpModule,
    PictureparkModule,
    AuthModule.forRoot()
  ]
})
export class PictureparkOidcModule {
  constructor(
    @Inject(OidcSecurityService) oidcSecurityService: OidcSecurityService,
    @Inject(PICTUREPARK_AUTH_CONFIG) pictureparkAuthConfig: IPictureparkAuthConfig) {

    let configuration = new OpenIDImplicitFlowConfiguration();
    configuration.stsServer = pictureparkAuthConfig.stsServer;
    configuration.redirect_url = pictureparkAuthConfig.redirectUrl ? pictureparkAuthConfig.redirectUrl : window.location.origin;
    configuration.client_id = 'picturepark_frontend';
    configuration.response_type = 'id_token token';
    configuration.scope = 'offline_access profile picturepark_api picturepark_account openid';
    configuration.post_logout_redirect_uri = 'http://localhost:56980/login';
    configuration.startup_route = '/login';
    configuration.forbidden_route = '/Forbidden';
    configuration.unauthorized_route = '/Unauthorized';
    configuration.log_console_warning_active = true;
    configuration.log_console_debug_active = false;
    configuration.max_id_token_iat_offset_allowed_in_seconds = 10;
    configuration.override_well_known_configuration = false; 
    configuration.storage = localStorage;

    oidcSecurityService.setupModule(configuration);

    if (typeof location !== "undefined" && window.location.hash) {
      oidcSecurityService.authorizedCallback();
    }
  }
}