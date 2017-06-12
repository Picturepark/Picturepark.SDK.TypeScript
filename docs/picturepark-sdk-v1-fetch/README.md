# Picturepark Content Platform Fetch Clients

## picturepark-sdk-v1-fetch

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-fetch/api/index.html)

### Downloads

Latest version from master branch (use for development only): 

- [picturepark.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/picturepark.js)
- [picturepark.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts)

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
var client = new picturepark.PublicAccessClient('https://my-picturepark-server.com');
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
import { PublicAccessClient } from '@picturepark/sdk-v1-fetch';
 
let publicAccessClient = new PublicAccessClient('https://qanext04.preview-picturepark.com');
```