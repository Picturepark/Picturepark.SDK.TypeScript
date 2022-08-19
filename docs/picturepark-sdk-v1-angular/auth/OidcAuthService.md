# OidcAuthService

**NPM Package:** @picturepark/sdk-v1-angular

Extends [AuthService](AuthService.md)

Authenticates with the OpenID Connect implicit flow.

**Additional methods:**

- requireLogin(redirectRoute?)
- login(redirectRoute?)
- logout(redirectRoute?)

Both methods redirect the user to the external Identity Server which authenticates the user and redirects the user back to the specified route of the application.

**Additional properties:**

- username

### Usage

**1. Installation**

Install the required NPM package:

    npm install @picturepark/sdk-v1-angular-oidc

**2. Module registration**

Register the Picturepark OIDC module in your Angular app module and define the `PictureparkOidcAuthConfiguration` configuration:

```typescript
import {
  PictureparkOidcModule,
  PICTUREPARK_CONFIGURATION,
  PictureparkOidcAuthConfiguration
} from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    PictureparkOidcModule
  ],
  providers: [
    {
      provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkOidcAuthConfiguration>{
        apiServer: 'tbd',
        customerAlias: 'tbd',
        stsServer: 'tbd';
        redirectServer: 'tbd';
        customerId: 'tbd';
        clientId: 'tbd';
        scope: 'tbd';
      }
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**3. Silent refresh**

In order to be able to refresh the access_token, create a new file in your apps "assets" folder called silent-refresh.html with the following content:
[silent-refresh.html](../../../src/picturepark-sdk-v1-angular/projects/picturepark-sdk-v1-angular-oidc/assets/silent-refresh.html)

**4. Authenticate**

To authenticate and redirect to `/welcome`, inject the `OidcAuthService` instance and call `requireLogin()`: 

```typescript
import { AuthService, OidcAuthService } from '@picturepark/sdk-v1-angular';

@Component({
  ...
})
export class WelcomeComponent implements OnInit {
  constructor(@Inject(AuthService) public authService: OidcAuthService) {
  }

  ngOnInit() {
    this.authService.requireLogin('/welcome');
  }

  ...
```

**4. Inject API services**

All required services are registered in the dependency injection container and can be used via constructor injection:

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

[Sample implementation](https://github.com/Picturepark/Picturepark.SDK.TypeScript/blob/master/src/picturepark-sdk-v1-angular/src/app/app.module.ts)
