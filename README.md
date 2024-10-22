# Picturepark Content Platform TypeScript/JavaScript SDK
## Picturepark.Sdk.TypeScript

[![npm](https://img.shields.io/npm/v/@picturepark/sdk-v2-angular.svg)](https://www.npmjs.com/~picturepark)

Links:

- [Picturepark Website](https://picturepark.com/)
- [Available NPM packages](https://www.npmjs.com/~picturepark)
- [Sources](src/)

## Projects

**[picturepark-sdk-v2-angular](docs/picturepark-sdk-v2-angular/README.md)** 

Contains Angular service classes to access the Picturepark API.

NPM package: `@picturepark/sdk-v2-angular`

**[picturepark-sdk-v2-angular-oidc](docs/picturepark-sdk-v2-angular/README.md)** 

Contains Angular service classes to access the Picturepark authentication endpoints.

NPM package: `@picturepark/sdk-v2-angular-oidc`

**[picturepark-sdk-v1-fetch](docs/picturepark-sdk-v1-fetch/README.md)**

Contains client classes to access the Picturepark API with `window.fetch`. 

NPM package: `@picturepark/sdk-v1-fetch`

**[picturepark-sdk-v1-pickers](docs/picturepark-sdk-v1-pickers/README.md)**

Provides functions to show a content picker to select existing assets in 3rd party applications.

NPM package: `@picturepark/sdk-v1-pickers`

## Compatibility matrix

| SDK version | Picturepark CP version | Branch |
| ----------- | ---------------------- | -----------
| `11.12.x`   | `11.12.x`              | [11.12.x](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/11.12.x)
| `11.13.x`   | `11.13.x`              | [11.13.x](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/11.13.x)
| `11.14.x`   | `11.14.x`              | [master](https://github.com/Picturepark/Picturepark.SDK.TypeScript/tree/master)
	
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

- picturepark-sdk-v2-angular
- picturepark-sdk-v2-angular-oidc
- picturepark-sdk-v1-fetch
- picturepark-sdk-v1-pickers

> NOTE:   
For pre-release packages, the version should include the "pre" identifier.  
Ex: 11.13.0-pre.0

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
