# Picturepark Angular modules

To improve the final app file distrubution size, you should only import used modules (i.e. do not import **PictureparkModule** but only the used "service" modules).

## PictureparkModule

- **PictureparkJsonSchemaModule**
  - JsonSchemaService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkContentModule**
  - ContentService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkBusinessProcessModule**
  - BusinessProcessService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkDocumentHistoryModule**
  - DocumentHistoryService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkJsonSchemaModule**
  - JsonSchemaService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkUserModule**
  - UserService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkContentPermissionSetModule**
  - ContentPermissionSetService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkSchemaPermissionSetModule**
  - SchemaPermissionSetService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkPublicAccessModule**
  - PublicAccessService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkShareModule**
  - ShareService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkTransferModule**
  - TransferService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
- **PictureparkServiceProviderModule**
  - ServiceProviderService
  - [AccessTokenAuthService](auth/AccessTokenAuthService.md)
    
## PictureparkUiModule

- **PictureparkUserModule**
- **PictureparkPublicAccessModule**
- **PictureparkContentModule**
- [LoginComponent](pp-login.md)
- [LogoutComponent](pp-logout.md)
- [ShareCardComponent](pp-share-card.md)
- [ChannelPickerComponent](pp-content-picker.md)
- [ContentBrowserComponent](pp-content-browser.md)
- [SearchBoxComponent](pp-search-box.md)
- [AggregationFilterComponent](pp-aggregation-filter.md)
- [OutputDownloadMenuComponent](pp-output-download-menu.md)
- TranslatePipe

## PictureparkOidcModule

- [OidcAuthService](auth/OidcAuthService.md)