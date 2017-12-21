# Picturepark Content Platform TypeScript SDK: Angular Clients

## picturepark-sdk-v1-angular

Dependencies:

- @angular/*

The `@picturepark/sdk-v1-angular` package provides Angular (4.3+) service classes to access the Picturepark API.

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-angular/api/index.html)

### Usage

To use the clients with authentication, check out one of the [AuthService](AuthService.md) implementations:

- [AccessTokenAuthService](AccessTokenAuthService.md): Authenticates with an access token
- [OidcAuthService](../picturepark-sdk-v1-angular-oidc/OidcAuthService.md): Authenticates with the OpenID Connect implicit flow

**1. Installation**

Install the NPM package:

    @picturepark/sdk-v1-angular

**2. Module registration**

Register the Picturepark module in your Angular app module and define the Picturepark server URL with the `PICTUREPARK_API_URL` token:

```typescript
import { PICTUREPARK_API_URL, PictureparkModule } from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    PictureparkModule
  ],
  providers: [
    { provide: PICTUREPARK_API_URL, useValue: "https://devnext-api.preview-picturepark.com" }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**3. Inject services**

All required services are now registered in the dependency injection container and can be used via constructor injection: 

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { PublicAccessClient } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  constructor(public publicAccessClient: PublicAccessClient) {
  }

  ngAfterViewInit() {
    this.publicAccessClient.getShare("myShareToken").subscribe(share => {
      alert(JSON.stringify(share));
    });
  }
}
```

## Sample

- [picturepark-sdk-v1-sample-angular](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/samples/picturepark-sdk-v1-sample-angular)
