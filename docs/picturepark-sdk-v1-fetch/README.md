# Picturepark Content Platform TypeScript SDK: Fetch Clients

## picturepark-sdk-v1-fetch

Dependencies: 

- [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [window.promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

The `@picturepark/sdk-v1-fetch` NPM package or `picturepark.js` library provides client classes to access the Picturepark API by using the `window.fetch` APIs. These are common APIs which are present in modern browsers (use polyfills for older browsers). The library is suitable for all web applications (e.g. React/Redux, JQuery, Vanilla.JS, etc.) but offers only the service clients and no controls/components. 

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-fetch/api/index.html)

### Downloads

NPM Package:

- [@picturepark/sdk-v1-fetch](https://www.npmjs.com/package/@picturepark/sdk-v1-fetch)

Latest version from master branch (use for development only): 

- [picturepark.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/picturepark.js)
- [picturepark.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts)

### Polyfills

In order to use the library in older browsers you need the polyfills for `window.fetch` and `Promise`: 

- Polyfills: 
    - [window.fetch polyfill](https://github.com/github/fetch) ([CDN](https://cdnjs.com/libraries/fetch))
    - [ES6 Promise polyfill](https://github.com/es-shims/es6-shim/) ([CDN](https://cdnjs.com/libraries/es6-shim))
- Typings: 
    - [whatwg-fetch.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/whatwg-fetch/index.d.ts)
    - [es6-promise.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/es6-promise/index.d.ts)

### Samples

To run the [samples](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/src/picturepark-sdk-v1-fetch/samples) navigate to the root of the repository and run: 

    npm run start:fetch

## Usage

### Global module

Load the script in your website: 

```html
<script src="picturepark.js"></script>
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

### AMD module

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
  clientId: 'TestRico',
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

This implementation can also be found in the [picturepark-sdk-v1-sample-reactredux/src/index.tsx](https://github.com/Picturepark/Picturepark.SDK.TypeScript/blob/master/samples/picturepark-sdk-v1-sample-reactredux/src/index.tsx) sample.

## Sample application

- [picturepark-sdk-v1-sample-reactredux](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/samples/picturepark-sdk-v1-sample-reactredux)
