import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TokenAuthService } from './token-auth.service';
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
} from './picturepark.services';

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
    { provide: AuthService, useClass: TokenAuthService }
  ]
})
export class PictureparkModule {
}
