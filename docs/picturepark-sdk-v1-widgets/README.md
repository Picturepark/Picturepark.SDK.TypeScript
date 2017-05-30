# Picturepark Content Platform Widgets

## picturepark-sdk-v1-ng2-widgets

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-widgets/api/index.html)

### Downloads

Latest version from master branch (use for development only): 

- [picturepark-widgets.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js)
- [picturepark-widgets.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts)

### Usage

**Embed a shared content**

To embed a shared content item, insert the following HTML snippet into your website: 

```JavaScript
<script src="https://cdnjs.cloudflare.com/ajax/libs/picturepark-sdk-v1-widgets/0.0.1/picturepark-sdk-v1-widgets.js"
        data-picturepark-server="YOUR_SERVER_URL" 
        data-picturepark-token="YOUR_TOKEN"></script>
```

If you'd like to customize the template, you can provide own templates: 

TODO

### Browser support

- pictureparkWidgets.processScriptTag(): 
  - Requires a polyfill for [window.fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) and [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) (bundled)
