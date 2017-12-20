# Picturepark Content Platform TypeScript SDK: Angular App (Pickers)

## picturepark-sdk-v1-angular-app

Dependencies: 

- @angular/*
- @picturepark/picturepark-sdk-v1-angular
- @picturepark/picturepark-sdk-v1-angular-oidc
    - [oidc-client](https://www.npmjs.com/package/oidc-client)
- @picturepark/picturepark-sdk-v1-angular-ui
    - [angular2-virtual-scroll](https://www.npmjs.com/package/angular2-virtual-scroll)

The `picturepark-sdk-v1-angular-app` is an Angular app which uses `picturepark-sdk-v1-angular` and `picturepark-sdk-v1-angular-ui` to render a content picker to select content items and create an embedded share. The app is usually distributed alongside a Picturepark server instance. 

## Local testing

In the Picturepark backend, create a new API Client on the "Settings" > "API Clients" page with the following settings: 

- Authorization Flow: Implicit
- Allowed Scopes: all_scopes
- Redirect URIs: (use the correct development port, same as in `picturepark-redirect-server`) 
    - `http://localhost:4200`
    - `http://localhost:4200/*`
- Enabled: Checked

After creating the client, open [src/picturepark-sdk-v1-angular-app/src/index.html](https://github.com/Picturepark/Picturepark.SDK.TypeScript/blob/master/src/picturepark-sdk-v1-angular-app/src/index.html) and update the configuration: 

```html
<app-root picturepark-api-server="https://devnext-api.preview-picturepark.com" 
          picturepark-sts-server="https://devnext-identity.preview-picturepark.com"
          picturepark-redirect-server="http://localhost:4200"
          picturepark-scope="openid profile picturepark_api all_scopes"
          picturepark-client-id="TestRico"
          picturepark-customer-id="86cd782357684da0a829b1ffd5195c11"
          picturepark-customer-alias="dev">
```

The `picturepark-customer-id` can be retrieved by navigating to "Settings" > "System Information" in your Picturepark backend.
