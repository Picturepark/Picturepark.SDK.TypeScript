# Picturepark Content Platform TypeScript/JavaScript SDK
## Picturepark.Sdk.TypeScript

[![Build status](https://img.shields.io/appveyor/ci/Picturepark/picturepark-sdk-typescript.svg?label=build)](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript)
[![npm](https://img.shields.io/npm/v/@picturepark/sdk-v1-angular.svg)](https://www.npmjs.com/~picturepark)
[![Build status](https://img.shields.io/appveyor/ci/Picturepark/picturepark-sdk-typescript-hgo7c.svg?label=CI+build)](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-hgo7c)

Links:

- [Picturepark Website](https://picturepark.com/)
- [Sources](src/)
- [All NPM packages](https://www.npmjs.com/~picturepark)

## Projects

**[picturepark-sdk-v1-angular](docs/picturepark-sdk-v1-angular/README.md)** 

Contains Angular service classes and UI components to access the Picturepark API.

NPM package: `@picturepark/sdk-v1-angular`

**[picturepark-sdk-v1-fetch](docs/picturepark-sdk-v1-fetch/README.md)**

Contains client classes to access the Picturepark API with `window.fetch`. 

NPM package: `@picturepark/sdk-v1-fetch`

**[picturepark-sdk-v1-pickers](docs/picturepark-sdk-v1-pickers/README.md)**

Provides functions to show a content picker to select existing assets in 3rd party applications.

NPM package: `@picturepark/sdk-v1-pickers`

**[picturepark-sdk-v1-widgets](docs/picturepark-sdk-v1-widgets/README.md)**

Contains widgets to embed Picturepark content into other websites.

## SDK Development

Links: 

- [Build scripts](SCRIPTS.md)
- [Sources](src/)

### Client generation

Run the following commands to regenerate the clients based on the Swagger specifications in `/swagger`: 

    npm install
	npm run nswag

### Bump package versions

1. Change package versions in the following projects and delete all `package-lock.json` files: 

- picturepark-sdk-v1-angular
- picturepark-sdk-v1-fetch
- picturepark-sdk-v1-pickers

2. Run the following command to regenerate the `package-lock.json` files and build all projects:

    npm run build

3. Commit and push changes, then merge into the "release" branch

### CI Builds

Branch: master

- NPM CI Feed: tbd
- AppVeyor CI Build: https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-hgo7c

### Release Builds

Branch: release

- NPM Feed: https://www.npmjs.com/~picturepark
- AppVeyor Build: https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript
