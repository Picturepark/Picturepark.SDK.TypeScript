# Picturepark Content Platform TypeScript SDK: Angular

## picturepark-sdk-v1-angular

**NPM Package:** [@picturepark/sdk-v1-angular](https://www.npmjs.com/package/@picturepark/sdk-v1-angular)

The `@picturepark/sdk-v1-angular` package provides Angular 6.1+ service classes and UI components to access the Picturepark API.

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-angular/api/index.html)

### Installation

1. Install the NPM package:

```
npm install @picturepark/sdk-v1-angular liquidjs@8.2.1 lazy-get-decorator@2.2.0
```

2. Register one of the Picturepark modules: 

- **PictureparkOidcModule:** Registers the [OidcAuthService](auth/OidcAuthService.md) to authenticate using the OIDC implict flow. 
- **PictureparkUiModule:** Registers the UI components.

**Important:** To improve the final app file distrubution size, you should [only import required modules](modules.md).

### Use the API services

To use the client service classes with authentication, you need to use one of the [AuthService](auth/AuthService.md) implementations:

- [AccessTokenAuthService](auth/AccessTokenAuthService.md): Authenticates with an access token (`PictureparkModule`)
- [OidcAuthService](auth/OidcAuthService.md): Authenticates with the OpenID Connect implicit flow (`PictureparkOidcModule`)

**1. Module registration**

Register the `PictureparkModule` or `PictureparkOidcModule` in your Angular app module and define the Picturepark configuration with the `PICTUREPARK_CONFIGURATION` token:

```typescript
import { 
  PICTUREPARK_CONFIGURATION,
  PictureparkConfiguration,
  AuthService,
  AccessTokenAuthService
} from '@picturepark/sdk-v1-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    HttpClientModule
  ],
  providers: [
    { provide: AuthService, useClass: AccessTokenAuthService },
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{
        apiServer: 'tbd',
        customerAlias: 'tbd',
        accessToken: 'tbd'
      }
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**2. Inject services**

All required services are now registered in the Angular's dependency injection container and can be used via constructor injection: 

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { ShareService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  constructor(public shareService: ShareService) {
  }

  ngAfterViewInit() {
    this.shareService.getShareJson("myShareToken").subscribe(share => {
      alert(JSON.stringify(share));
    });
  }
}
```

### Use the UI components

Register the `PictureparkUiModule` in your Angular app module:

```ts
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    PictureparkUiModule
  ],
  providers: [
    ...
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

The `PictureparkUiModule` automatically imports the required client services. If you do not need the UI components, just import `PictureparkModule`.

The package provides the following Angular components for your views: 

- [pp-aggregation-filter](pp-aggregation-filter.md)
- [pp-channel-picker](pp-channel-picker.md)
- [pp-content-browser](pp-content-browser.md)
- [pp-search-box](pp-search-box.md)
- [pp-share-card](pp-share-card.md)

## Start the picker app

The `picturepark-sdk-v1-angular` also contains an Angular app which renders a content picker to select content items and create an embedded share. The app is usually distributed alongside a Picturepark server instance. 

**Start project:**

In the project directory `src/picturepark-sdk-v1-angular`:

- Run `npm start` to start the Angular project
- Open the URL `http://localhost:4200` in the browser

### Enable testing with authentication

In the Picturepark backend, create a new API Client on the "Settings" > "API Clients" page with the following settings: 

- Authorization Flow: Implicit
- Allowed Scopes: all_scopes
- Redirect URIs: (use the correct development port, same as in `picturepark-redirect-server`) 
    - `http://localhost:4200`
    - `http://localhost:4200/*`
- Enabled: Checked

After creating the client, open [src/picturepark-sdk-v1-angular/src/index.html](https://github.com/Picturepark/Picturepark.SDK.TypeScript/blob/master/src/picturepark-sdk-v1-angular/src/index.html) and update the configuration: 

```html
<app-root picturepark-api-server="https://devnext-api.preview-picturepark.com" 
          picturepark-sts-server="https://devnext-identity.preview-picturepark.com"
          picturepark-redirect-server="http://localhost:4200"
          picturepark-scope="openid profile picturepark_api all_scopes"
          picturepark-client-id="TestRico"
          picturepark-customer-id="86cd782357684da0a829b1ffd5195c11"
          picturepark-customer-alias="dev">
```

The `picturepark-customer-id` can be retrieved by navigating to "Settings" > "System Information" in your Picturepark backend.
