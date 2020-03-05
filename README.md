# Picturepark Content Platform TypeScript/JavaScript SDK
## Picturepark.Sdk.TypeScript

[![Build status](https://img.shields.io/appveyor/ci/Picturepark/picturepark-sdk-typescript.svg?label=build)](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript)
[![npm](https://img.shields.io/npm/v/@picturepark/sdk-v1-angular.svg)](https://www.npmjs.com/~picturepark)
[![Build status](https://img.shields.io/appveyor/ci/Picturepark/picturepark-sdk-typescript-hgo7c.svg?label=CI+build)](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-hgo7c)

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

**[picturepark-sdk-v1-widgets](docs/picturepark-sdk-v1-widgets/README.md)**

Contains widgets to embed Picturepark content into other websites.

## Samples

- [picturepark-sdk-v1-sample-angular8](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/samples/picturepark-sdk-v1-sample-angular8)
    - picturepark-sdk-v1-angular
- [picturepark-sdk-v1-sample-reactredux](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master/samples/picturepark-sdk-v1-sample-reactredux)
    - picturepark-sdk-v1-fetch
    - picturepark-sdk-v1-pickers

## Compatibility matrix

| SDK version | Picturepark CP version |
| ----------- | ---------------------- |
| `1.0.x`     | `10.0.x`               |
| `1.1.x`     | `10.1.x`               |
| `1.2.x`     | `10.2.x`               |
| `1.3.x`     | `10.3.x`               |
| `1.4.x`     | `10.4.x`               |
| `1.5.x`     | `10.5.x`               |
	
SDK Development

Links: 

- [Build scripts](SCRIPTS.md)
- [Sources](src/)

### Regenerate clients from Swagger specification

Run the following commands to regenerate the clients based on the Swagger specifications in `/swagger`: 

    npm install
  	npm run nswag

For more information, see [NSwag](http://nswag.org).

### Release new package versions

1. Change package versions in the following projects and delete all `package-lock.json` files: 

- picturepark-sdk-v1-angular
- picturepark-sdk-v1-angular-oidc
- picturepark-sdk-v1-angular-ui
- picturepark-sdk-v1-fetch
- picturepark-sdk-v1-pickers

> NOTE:   
For pre-release packages, the version should include the "pre" identifier.  
Ex: 1.5.0-pre.0

2. Run the following command to regenerate the `package-lock.json` files and build all projects:

    npm run build

3. Commit and push changes, then merge into the "pre-release" or "release" branch. The NPM packages are now [automatically published by AppVeyor](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript).

> NOTE:  
"pre-release - to generate pre-release packages  
"release" - to generate release packages

### CI Builds

Branch: master

- AppVeyor CI Build: [Picturepark.SDK.TypeScript CI](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-hgo7c)

### Pre-Release Builds

Branch: pre-release

- NPM Feed: https://www.npmjs.com/~picturepark
- AppVeyor Build: [Picturepark.SDK.TypeScript PRE](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-pre)

### Release Builds

Branch: release

- NPM Feed: https://www.npmjs.com/~picturepark
- AppVeyor Build: [Picturepark.SDK.TypeScript](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript)
