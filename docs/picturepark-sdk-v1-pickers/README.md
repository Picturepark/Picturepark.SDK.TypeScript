# Picturepark Content Platform Widgets

## picturepark-sdk-v1-ng2-pickers

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-pickers/api/index.html)

### Downloads

Latest version from master branch (use for development only): 

- [picturepark-pickers.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js)
- [picturepark-pickers.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts)

### Usage

Load the required JavaScript library: 

    <script src="picturepark-pickers.js"></script>

Open the picker and handle the response: 

    pictureparkPickers.showContentPicker("https://your-picturepark-server.com").then(function (result) {
        // TODO: Handle response
    });

To run the [samples](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/src/picturepark-sdk-v1-pickers/samples) navigate to the root of the repository and run: 

    npm run start:pickers

### Browser support

- pictureparkPickers.showContentPicker(): 
  - Uses [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to send messages from the popup to the opener window ([caniuse.com](http://caniuse.com/#feat=x-doc-messaging))
