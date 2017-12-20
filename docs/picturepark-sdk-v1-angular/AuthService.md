# AuthService

**NPM Package:** @picturepark/sdk-v1-angular

The abstract `AuthService` class provides methods to authenticate/login and logout a user from the Picturepark server. There are two available implementations: 

- [AccessTokenAuthService](AccessTokenAuthService.md)
- [OidcAuthService](../picturepark-sdk-v1-angular-oidc/README.md)

Base properties:

- apiServer: Gets the configured URL of the API server
- isAuthenticated: Gets a value indicating whether a user is authenticated

Base methods:

- (transformHttpRequestOptions)

## Configuration

In your app module, import the configuration injection token: 

```typescript
import { PICTUREPARK_CONFIGURATION, PictureparkConfiguration } from '@picturepark/sdk-v1-angular';
```

Register an instance of the configuration in the module (you can also use `useFactory`): 

```typescript
@NgModule({
  ...
  providers: [
    { provide: PICTUREPARK_CONFIGURATION, useValue: <PictureparkConfiguration>{ ... } }
  ],
  ...
})
export class AppModule {
}
```

Depending on the chosen authentication service implementation, you need to provide a different configuration object: 

- AccessTokenAuthService: `import { PictureparkAccessTokenAuthConfiguration } from '@picturepark/sdk-v1-angular';`
- OidcAuthService: `import { PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v1-angular-oidc';`

[Sample implementation](https://github.com/Picturepark/Picturepark.SDK.TypeScript/blob/master/src/picturepark-sdk-v1-angular-app/src/app/app.module.ts)