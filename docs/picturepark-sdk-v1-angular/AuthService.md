# AuthService

**NPM Package:** @picturepark/sdk-v1-angular

A client which provides methods to authenticate/login and logout a user from the Picturepark server.

Methods:

- login(username, password, saveCredentials)
- logout()

Properties:

- isLoggedIn: A value indicating whether the user is logged in
- username: The username of the currently logged in user

Events:

- isLoggedInChange: Event which triggers when `isLoggedIn` has changed

Implementations: 

- [TokenAuthService](TokenAuthService.md)
- [OidcAuthService](../picturepark-sdk-v1-angular-oidc/README.md)

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

Depending on the chosen auth service implementation, you need to provide a configuration object with more properties: 

- TokenAuthService: `import { PictureparkTokenAuthConfiguration } from '@picturepark/sdk-v1-angular';`
- OidcAuthService: `import { PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v1-angular-oidc';`

[Sample implementation](https://github.com/Picturepark/Picturepark.SDK.TypeScript/blob/master/src/picturepark-sdk-v1-angular-app/src/app/app.module.ts)