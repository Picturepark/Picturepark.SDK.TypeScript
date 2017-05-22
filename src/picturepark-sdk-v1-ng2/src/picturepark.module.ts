import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

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
  AuthService } from './picturepark.services';  

@NgModule({
  imports: [ HttpModule ],
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
    AuthService ]
})
export class PictureparkModule {
  
}