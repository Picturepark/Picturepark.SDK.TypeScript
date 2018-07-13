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
  ContentPermissionSetService,
  SchemaPermissionSetService,
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
    JsonSchemaService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkJsonSchemaModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ContentService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkContentModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    BusinessProcessService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkBusinessProcessModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    DocumentHistoryService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkDocumentHistoryModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SchemaService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkSchemaModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    UserService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkUserModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ContentPermissionSetService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkContentPermissionSetModule {
}


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SchemaPermissionSetService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkSchemaPermissionSetModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    PublicAccessService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkPublicAccessModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ShareService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkShareModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    TransferService,
    { provide: AuthService, useClass: AccessTokenAuthService }
  ]
})
export class PictureparkTransferModule {
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ServiceProviderService,
    { provide: AuthService, useClass: AccessTokenAuthService }
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
    PictureparkContentPermissionSetModule,
    PictureparkSchemaPermissionSetModule,
    PictureparkPublicAccessModule,
    PictureparkShareModule,
    PictureparkTransferModule,
    PictureparkServiceProviderModule
  ],
  providers: []
})
export class PictureparkModule {
}
