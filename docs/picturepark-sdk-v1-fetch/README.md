# Picturepark Content Platform TypeScript SDK: Fetch Clients

## picturepark-sdk-v1-fetch

**NPM Package:** [@picturepark/sdk-v1-fetch](https://www.npmjs.com/package/@picturepark/sdk-v1-fetch)

The `@picturepark/sdk-v1-fetch` NPM package provides client classes to access the Picturepark API by using the `window.fetch` APIs. These are common APIs which are present in modern browsers. The library is suitable for all web applications (e.g. React/Redux, JQuery, Vanilla.JS, etc.) but offers only the service clients and no controls/components. 

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-fetch/api/index.html)

Dependencies: 

- [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [window.promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### Downloads

NPM Package:

- [@picturepark/sdk-v1-fetch](https://www.npmjs.com/package/@picturepark/sdk-v1-fetch)

Latest version from master branch (use for development only): 

- [index.umd.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/index.umd.js)
- [index.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/index.d.ts)

### Samples

To run the [samples](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/src/picturepark-sdk-v1-fetch/samples) navigate to the root of the repository and run: 

    npm run start:fetch

To run the [node express sample](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/src/picturepark-sdk-v1-fetch/samples/node-express) navigate to the repository and run: 

    npm install

    node index.mjs

## Usage

### Global module

Load the script in your website: 

```html
<script src="dist/index.umd.js"></script>
```

The available classes are now available in the global namespace `picturepark`: 

```js
var authClient = new picturepark.AuthClient('https://my-picturepark-server.com', 'yourCustomerAlias');
var client = new picturepark.PublicAccessClient(authClient);
client.getShare('4rgTsG52').then(function(result) {
    // TODO: Process result
}).catch(function(error) {
    // TODO: Handle exception
});
```

### ESM module

Install the NPM package: 

```
npm install @picturepark/sdk-v1-fetch
```

Import and instantiate the client:

```js
import { AuthClient, PublicAccessClient } from '@picturepark/sdk-v1-fetch';
 
let authClient = new AuthClient('https://my-picturepark-server.com', 'yourCustomerAlias');
let publicAccessClient = new PublicAccessClient(authClient);
```

## Authentication

The fetch client currently supports two authentication modes: 

**AuthClient**

No authentication, only public data can be accessed

```js
let authClient = new AuthClient(server, customerAlias);
```

**AccessTokenAuthClient**

Token based authentication to access the Picturepark API

```js
let authClient = new AccessTokenAuthClient(server, customerAlias, accessToken);
```

### Authenticate with OIDC implicit flow

For authenticating with the OIDC implicit flow, you can use the JavaScript library [oidc-client](https://github.com/IdentityModel/oidc-client-js): 

```
npm install oidc-client
```

For this sample, import the Picturepark OIDC settings helper `OidcClientSettings`, the `AccessTokenAuthClient`, `ContentClient` and the oidc-client `UserManager` classes:

```js
import { OidcClientSettings, AccessTokenAuthClient, ContentClient } from '@picturepark/sdk-v1-fetch';
import { UserManager } from 'oidc-client';
```

Next, initialize the settings: 

```js
let serverUrl = 'http://localhost:3000';
let apiServerUrl = 'https://devnext-api.preview-picturepark.com';
let customerAlias = 'dev';

let oidcSettings = OidcClientSettings.create({
  serverUrl: serverUrl,
  stsServerUrl: 'https://devnext-identity.preview-picturepark.com',
  clientId: 'TestClient',
  customerAlias: customerAlias,
  customerId: 'e852e2c209f0438bbf963b862d2ef1fa',
  scope: 'openid profile picturepark_api all_scopes'
});
```

With the created `oidcSettings` you can initialize an oidc-client `UserManager` and try to process the redirect callback with `signinRedirectCallback`. If this call fails call `signinRedirect` which redirects the browser to the login page: 

```js
let manager = new UserManager(oidcSettings);
manager.signinRedirectCallback(window.location.href).then(user => {
  ...
}, error => {
  manager.signinRedirect();
});
```

In the successful callback of `signinRedirectCallback` you get a `User` instance where you can read the access token to use with the `AccessTokenAuthClient`: 

```js
let authClient = new AccessTokenAuthClient(apiServerUrl, customerAlias, user.access_token);

let contentClient = new ContentClient(authClient);
contentClient.get('myContentId', true).then(content => {
  ...
});
```
