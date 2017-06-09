# Picturepark Content Platform Widgets

## picturepark-sdk-v1-ng2-widgets

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-widgets/api/index.html)

### Downloads

Latest version from master branch (use for development only): 

- [picturepark-widgets.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js)
- [picturepark-widgets.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts)

### Samples

To run the [samples](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/src/picturepark-sdk-v1-widgets/samples) navigate to the root of the repository and run: 

    npm run start:widgets

### Usage

Load the script in your website: 

```Html
<script src="picturepark-widgets.js"></script>
```

**Embed a shared content**

To embed a shared content item, insert the following HTML snippet into your website: 

```JavaScript
<script src="https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js"
        data-picturepark-server="YOUR_SERVER_URL" 
        data-picturepark-token="YOUR_TOKEN"></script>
```

If you'd like to customize the template, you can provide own templates: 

TODO

### Options

- data-picturepark-server
- data-picturepark-token
- data-template: basic | card | list
- data-width: number
- data-height: number
- data-render-styles: true (default) | false

**"basic" template**

- data-show-legend: true (default) | false

### Browser support

- pictureparkWidgets.processScriptTag(): 
  - Requires a polyfill for [window.fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) and [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) (bundled)
