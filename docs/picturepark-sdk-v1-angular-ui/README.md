# Picturepark Content Platform Angular Components

## @picturepark/sdk-v1-angular-ui

### Usage

Install the following NPM packages:

- [@picturepark/sdk-v1-angular](https://www.npmjs.com/package/@picturepark/sdk-v1-angular): The client proxies to access the Picturepark API
- [@picturepark/sdk-v1-angular-ui](https://www.npmjs.com/package/@picturepark/sdk-v1-angular-ui): The predefined Picturepark UI components

Register the Picturepark SDK modules in your Angular app module and define the Picturepark server URL with the `PICTUREPARK_URL` token:

```ts
import { PICTUREPARK_URL } from '@picturepark/sdk-v1-angular';
import { PictureparkUiModule } from '@picturepark/sdk-v1-angular-ui';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    PictureparkUiModule
  ],
  providers: [
    { provide: PICTUREPARK_URL, useValue: "https://devnext.preview-picturepark.com" }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

The `PictureparkUiModule` automatically imports the `PictureparkModule`. If you do not need the UI components, just install `@picturepark/sdk-v1-angular` and import `PictureparkModule`.

### Components

**NPM Package:** @picturepark/sdk-v1-angular-ui

- [pp-channel-picker](pp-channel-picker.md)
- [pp-content-browser](pp-content-browser.md)
- [pp-login](pp-login.md)
- [pp-logout](pp-logout.md)
- [pp-search-box](pp-search-box.md)
- [pp-share-card](pp-share-card.md)

### Sample

- [picturepark-sdk-v1-sample-angular](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/samples/picturepark-sdk-v1-sample-angular)
