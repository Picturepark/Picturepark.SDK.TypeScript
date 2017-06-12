# Picturepark Content Platform Angular Components

## @picturepark/sdk-v1-angular-ui

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-angular/api/index.html)

### Usage

Install the following NPM packages:

- @picturepark/sdk-v1-angular: The client proxies to access the Picturepark API
- @picturepark/sdk-v1-angular-ui: The predefined Picturepark UI components

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

### Classes

**NPM Package:** @picturepark/sdk-v1-angular

- [AuthService](AuthService.md): Authenticates the user on the Picturepark server.

### Components

**NPM Package:** @picturepark/sdk-v1-angular-ui

- [pp-channel-picker](pp-channel-picker.md)
- [pp-content-browser](pp-content-browser.md)
- [pp-login](pp-login.md)
- [pp-logout](pp-logout.md)
- [pp-search-box](pp-search-box.md)
- [pp-share-card](pp-share-card.md)
