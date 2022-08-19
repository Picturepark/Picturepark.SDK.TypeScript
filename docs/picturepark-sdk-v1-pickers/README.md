# Picturepark Content Platform TypeScript SDK: Pickers

## picturepark-sdk-v1-pickers

**NPM Package:** [@picturepark/sdk-v1-pickers](https://www.npmjs.com/package/@picturepark/sdk-v1-pickers)

The `picturepark-pickers.js` library provides methods to open the Picturepark content picker dialog to select a content item in a third party application. 

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-pickers/api/index.html)

### Downloads

NPM Package:

- [@picturepark/sdk-v1-pickers](https://www.npmjs.com/package/@picturepark/sdk-v1-pickers)

Latest version from master branch (use for development only): 

- [picturepark-pickers.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js)
- [picturepark-pickers.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts)

### Samples

To run the [samples](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/src/picturepark-sdk-v1-pickers/samples) navigate to the root of the repository and run: 

    npm run start:pickers

### Browser support

- pictureparkPickers.showContentPicker(): 
  - Uses [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to send messages from the popup to the opener window ([caniuse.com](http://caniuse.com/#feat=x-doc-messaging))

## Usage

Load the required JavaScript library: 

### Global module

```Html
<script src="picturepark-pickers.js"></script>
```

Open the picker and handle the response: 

```js
pictureparkPickers.showContentPicker("https://your-picturepark-server.com").then(function (result) {
  if (result) {
    // TODO: The user selected some content items and an embedded share has been created
  } else {
    // TODO: The user clicked cancel
  }
});
```

The `result` is undefined if the user clicked cancel or looks like: 

```json
{
  "token": "nGmmbMyX",
  "shareId": "114bddcf617f4becbc4da981b457ba22",
  "items": [
    {
      "token": "JQTe0hgT",
      "url": "https://devnext.preview-picturepark.com/Embed/JQTe0hgT"
    },
    {
      "token": "7EEpblZt",
      "url": "https://devnext.preview-picturepark.com/Embed/7EEpblZt"
    },
    {
      "token": "bnNGJUUp",
      "url": "https://devnext.preview-picturepark.com/Embed/bnNGJUUp"
    }
  ]
}
```

### AMD module

Install the NPM package: 

```
npm install @picturepark/sdk-v1-pickers
```

Next, import the `` function and call it: 

```javascript
import { showContentPicker } from '@picturepark/sdk-v1-pickers';

showContentPicker('https://devnext.preview-picturepark.com').then(...);
```