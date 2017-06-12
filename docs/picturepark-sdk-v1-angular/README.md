# Picturepark Content Platform Angular Components

## @picturepark/sdk-v1-angular

- [API Documentation](https://rawgit.com/Picturepark/Picturepark.SDK.TypeScript/master/docs/picturepark-sdk-v1-angular/api/index.html)

### Usage

Install the following NPM package:

- [@picturepark/sdk-v1-angular](https://www.npmjs.com/package/@picturepark/sdk-v1-angular): The client proxies to access the Picturepark API

Register the Picturepark SDK module in your Angular app module and define the Picturepark server URL with the `PICTUREPARK_URL` token:

```ts
import { PICTUREPARK_URL, PictureparkModule } from '@picturepark/sdk-v1-angular';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    PictureparkModule
  ],
  providers: [
    { provide: PICTUREPARK_URL, useValue: "https://devnext.preview-picturepark.com" }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### Classes

- [AuthService](AuthService.md): Authenticates the user on the Picturepark server.