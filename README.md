# Picturepark Content Platform TypeScript/JavaScript SDK
## Picturepark.Sdk.TypeScript

[![npm](https://img.shields.io/npm/v/@picturepark/sdk-v1-angular.svg)](https://www.npmjs.com/~picturepark)

Links:

- [Picturepark Website](https://picturepark.com/)
- [Available NPM packages](https://www.npmjs.com/~picturepark)
- [Sources](src/)

## Projects

**[picturepark-sdk-v1-angular](docs/picturepark-sdk-v1-angular/README.md)** 

Contains Angular service classes to access the Picturepark API.

NPM package: `@picturepark/sdk-v1-angular`

**[picturepark-sdk-v1-angular-oidc](docs/picturepark-sdk-v1-angular/README.md)** 

Contains Angular service classes to access the Picturepark authentication endpoints.

NPM package: `@picturepark/sdk-v1-angular-oidc`

**[picturepark-sdk-v1-angular-ui](docs/picturepark-sdk-v1-angular/README.md)** 

Contains Angular UI components based on Angular Material.

NPM package: `@picturepark/sdk-v1-angular-ui`

**[picturepark-sdk-v1-fetch](docs/picturepark-sdk-v1-fetch/README.md)**

Contains client classes to access the Picturepark API with `window.fetch`. 

NPM package: `@picturepark/sdk-v1-fetch`

**[picturepark-sdk-v1-pickers](docs/picturepark-sdk-v1-pickers/README.md)**

Provides functions to show a content picker to select existing assets in 3rd party applications.

NPM package: `@picturepark/sdk-v1-pickers`

## Compatibility matrix

| SDK version | Picturepark CP version | Branch |
| ----------- | ---------------------- | -----------
| `11.6.x`    | `11.6.x`               | [11.6.x](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/11.6.x)
| `11.7.x`    | `11.7.x`               | [11.7.x](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/11.7.x)
| `11.8.x`    | `11.8.x`               | [11.8.x](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/11.8.x)
| `11.9.x`    | `11.9.x`               | [master](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master)
	
SDK Development

Links: 

- [Build scripts](SCRIPTS.md)
- [Sources](src/)

### Regenerate clients from Swagger specification

Run the following commands to regenerate the clients based on the Swagger specifications in `/swagger`: 

    npm install
  	npm run nswag

For more information, see [NSwag](http://nswag.org).

After nswag was run, manually revert change for removed block: import { ... } from './api-services'; from auto generated file: src\picturepark-sdk-v1-angular\projects\picturepark-sdk-v1-angular\src\lib\services\frontend-services.ts

### Release new package versions

1. Change package versions in the following projects and delete all `package-lock.json` files: 

- picturepark-sdk-v1-angular
- picturepark-sdk-v1-angular-oidc
- picturepark-sdk-v1-angular-ui
- picturepark-sdk-v1-fetch
- picturepark-sdk-v1-pickers

> NOTE:   
For pre-release packages, the version should include the "pre" identifier.  
Ex: 11.8.0-pre.0

2. Run the following command to regenerate the `package-lock.json` files and build all projects:

    npm run build

3. Commit and push changes, then merge into the "pre-release" or "release" branch. The NPM packages are now [automatically published by AppVeyor](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript).

> NOTE:  
"pre-release - to generate pre-release packages  
"release" - to generate release packages

### CI Builds

Branch: master

- AppVeyor CI Build: [Picturepark.SDK.TypeScript CI](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-hgo7c)

### Release Builds

Branch: release

- NPM Feed: https://www.npmjs.com/~picturepark
- AppVeyor Build: [Picturepark.SDK.TypeScript](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript)
