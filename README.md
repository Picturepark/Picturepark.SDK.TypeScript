# Picturepark Content Platform TypeScript/JavaScript SDK
## Picturepark.Sdk.TypeScript

[![Build status](https://img.shields.io/appveyor/ci/Picturepark/picturepark-sdk-typescript.svg?label=build)](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript)
[![npm](https://img.shields.io/npm/v/@picturepark/sdk-v1-angular.svg)](https://www.npmjs.com/~picturepark)
[![Build status](https://img.shields.io/appveyor/ci/Picturepark/picturepark-sdk-typescript-hgo7c.svg?label=CI+build)](https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-hgo7c)

Links:

- [Picturepark Website](https://picturepark.com/)
- [SDK Documentation](docs/README.md)
- [Sources](src/)

## Projects

### JavaScript

**[picturepark-sdk-v1-fetch](docs/picturepark-sdk-v1-fetch/README.md)**

Contains client classes to access the Picturepark API with `window.fetch`. 

**[picturepark-sdk-v1-pickers](docs/picturepark-sdk-v1-pickers/README.md)**

Provides functions to show a content picker to select existing assets in 3rd party applications.

**[picturepark-sdk-v1-widgets](docs/picturepark-sdk-v1-widgets/README.md)**

Contains widgets to embed Picturepark content into other websites.

### Angular

**Run Projects:**

In the repository directory:

- Run `npm install`
- Run `npm run link` to locally link all Angular projects

In the project directory (e.g. in `src/picturepark-sdk-v1-angular-app`):

- Run `npm install`
- Run `npm start` to start the Angular project
- Open the URL `http://localhost:4200` in the browser

**[picturepark-sdk-v1-angular](docs/picturepark-sdk-v1-angular/README.md)**

Contains Angular service components to access the public Picturepark API.

**[picturepark-sdk-v1-angular-ui](docs/picturepark-sdk-v1-angular-ui/README.md)**

Contains reusable Angular UI components

**[picturepark-sdk-v1-angular-app](docs/picturepark-sdk-v1-angular-app/README.md)**

Contains embeddable UI components. This app is usually distributed alongside a Picturepark server instance.

## SDK Development

Links: 

- [Build scripts](SCRIPTS.md)
- [Sources](src/)

### CI Builds

Branch: master

- NPM CI Feed: tbd
- AppVeyor CI Build: https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript-hgo7c

### Release Builds

Branch: release

- NPM Feed: tbd
- AppVeyor Build: https://ci.appveyor.com/project/Picturepark/picturepark-sdk-typescript
