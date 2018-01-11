import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AccessTokenAuthService } from '../auth/access-token-auth.service';
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
  ServiceProviderService,
  AuthService
} from '../services/services';

@NgModule({
  imports: [
    HttpClientModule
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
    ServiceProviderService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkModule {
}
