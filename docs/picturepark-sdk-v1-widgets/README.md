# Picturepark Content Platform Widgets

## picturepark-sdk-v1-widgets

The `picturepark-widgets.js` library provides the functionality to embed Picturepark content items in third party websites. 

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-widgets/api/index.html)

### Downloads

Latest version from master branch (use for development only): 

- [picturepark-widgets.js](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js)
- [picturepark-widgets.d.ts](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts)

### Browser support

- pictureparkWidgets.processScriptTag(): 
  - Requires a polyfill for [window.fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) and [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) (bundled)

## Usage

**Embed a shared content**

To embed a shared content item, insert the following HTML snippet into your website: 

```html
<script src="https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js"
        data-picturepark-server="YOUR_SERVER_URL" 
        data-token="YOUR_TOKEN"></script>
```

If you'd like to customize the template, you can provide own templates: 

```html
<script type="text/template" 
        data-picturepark-server="YOUR_SERVER_URL" 
        data-token="YOUR_TOKEN">
  <template id="loading">
    My loading template.
  </template>
  <template id="content">
    My content template.
  </template>
  <template id="error">
    My error template.
  </template>
</script>
<script src="https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js" async></script>
```

### Options

- data-picturepark-server
- data-token
- data-template: card (default) | gallery | list
- data-width: number
- data-height: number
- data-render-styles: true (default) | false

**"card" template**

- data-show-legend: true (default) | false
- data-show-logo: true (default) | false
- data-show-navigation: true (default) | false
- data-show-overlay: true | false (default)

### Styling

To change the styling and behavior of the widgets, you have the following options: 

- Use the basic styling options which can be set via attributes
- Extend existing CSS classes with own classes
- Completely disable the generation of CSS classes and provide own classes (using the `data-render-styles` option)
- Provide own Liquid templates for full control over the styling

## Samples

To run the [samples](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/src/picturepark-sdk-v1-widgets/samples) navigate to the root of the repository and run: 

    npm run start:widgets
