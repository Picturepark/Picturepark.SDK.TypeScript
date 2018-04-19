import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    JsonSchemaService
  ]
})
export class PictureparkJsonSchemaModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ContentService
  ]
})
export class PictureparkContentModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    BusinessProcessService
  ]
})
export class PictureparkBusinessProcessModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    DocumentHistoryService
  ]
})
export class PictureparkDocumentHistoryModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SchemaService
  ]
})
export class PictureparkSchemaModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    UserService
  ]
})
export class PictureparkUserModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    PermissionService
  ]
})
export class PictureparkPermissionModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    PublicAccessService
  ]
})
export class PictureparkPublicAccessModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ShareService
  ]
})
export class PictureparkShareModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    TransferService
  ]
})
export class PictureparkTransferModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ServiceProviderService
  ]
})
export class PictureparkServiceProviderModule {
}

@NgModule({
  imports: [
    HttpClientModule,

    PictureparkJsonSchemaModule,
    PictureparkContentModule,
    PictureparkBusinessProcessModule,
    PictureparkDocumentHistoryModule,
    PictureparkJsonSchemaModule,
    PictureparkUserModule,
    PictureparkPermissionModule,
    PictureparkPublicAccessModule,
    PictureparkShareModule,
    PictureparkTransferModule,
    PictureparkServiceProviderModule
  ],
  providers: []
})
export class PictureparkModule {
}
