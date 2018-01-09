# AuthService

**NPM Package:** @picturepark/sdk-v1-angular

The abstract `AuthService` class provides methods to authenticate a user on the Picturepark server. There are two available implementations:

- [AccessTokenAuthService](AccessTokenAuthService.md): Authenticates with an access token
- [OidcAuthService](OidcAuthService.md): Authenticates with the OpenID Connect implicit flow

Base properties:

- apiServer: Gets the configured URL of the API server
- isAuthenticated: Gets a value indicating whether a user is authenticated

Base methods:

- (transformHttpRequestOptions)
