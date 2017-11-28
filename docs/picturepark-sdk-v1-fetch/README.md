# Picturepark Content Platform Fetch Clients

## picturepark-sdk-v1-fetch

Dependencies: 

- [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [window.promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

The `@picturepark/sdk-v1-fetch` package / `picturepark.js` library provides client classes to access the Picturepark API by using the `window.fetch` APIs. These are common APIs which are present in modern browsers (use polyfills for older browsers). The library is suitable for all web applications (e.g. React/Redux, JQuery, Vanilla.JS, etc.) but offers only the service clients and no controls/components. 

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

### Usage of the global module

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

### Usage of the AMD module

Install the NPM package: 

    npm i @picturepark/sdk-v1-fetch

Import and instantiate the client:

```js
import { AuthClient, PublicAccessClient } from '@picturepark/sdk-v1-fetch';
 
let authClient = new AuthClient('https://my-picturepark-server.com', 'yourCustomerAlias');
let publicAccessClient = new PublicAccessClient(authClient);
```

### Authentication

The fetch client currently supports two authentication modes: 

**AuthClient**

No authentication, only public data can be accessed

    let authClient = new AuthClient(server, customerAlias);

**AccessTokenAuthClient**

Token based authentication to access the Picturepark API

    let authClient = new AccessTokenAuthClient(server, customerAlias, accessToken);

### Sample application

- [picturepark-sdk-v1-sample-reactredux](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/samples/picturepark-sdk-v1-sample-reactredux)
