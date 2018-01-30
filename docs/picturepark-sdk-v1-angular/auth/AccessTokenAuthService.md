# AccessTokenAuthService

**NPM Package:** @picturepark/sdk-v1-angular

Extends [AuthService](AuthService.md)

Authenticates with an access token. To create an access token, go to "Settings" > "API Clients" in your Picturepark backend, create a new client with "Password" authentication flow and create a new token.

### Usage

**1. Installation**

Install the required NPM package:

    @picturepark/sdk-v1-angular

**2. Module registration**

Register the Picturepark OIDC module in your Angular app module and define the `PictureparkAccessTokenAuthConfiguration` configuration:

```typescript
import {
  PictureparkModule,
  PICTUREPARK_CONFIGURATION,
  PictureparkAccessTokenAuthConfiguration 
} from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    PictureparkModule
  ],
  providers: [
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkAccessTokenAuthConfiguration>{
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

**3. Inject services**

All required services are now registered in the dependency injection container and can be used via constructor injection:

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { ContentService, ContentSearchRequest } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  constructor(public contentService: ContentService) {
  }

  ngAfterViewInit() {
    const request = new ContentSearchRequest();
    request.searchString = 'm';

    this.contentService.search(request).subscribe(response => {
      alert(JSON.stringify(response));
    });
  }
}
```