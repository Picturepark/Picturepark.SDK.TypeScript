# Build scripts

First, install the node modules:

    npm install

Regenerate all clients based on the Swagger specifications located in the "/swagger" directory run:

    npm run nswag

Run all unit tests:

    npm run tests

## Build

Rebuild and minimize the Fetch "picturepark.js" bundle in "src/picturepark-sdk-v1-fetch/dist":

    npm run build:fetch

Rebuild and minimize the pickers "picturepark-pickers.js" bundle in "src/picturepark-sdk-v1-pickers/dist":

    npm run build:pickers

Rebuild and minimize the widgets "picturepark-widgets.js" bundle in "src/picturepark-sdk-v1-widgets/dist":

    npm run build:widgets

Rebuild the Angular project:

    npm run build:ng

Rebuild the API documentation for all project:

    npm run docs

Run all build scripts (`build:fetch`, `build:widgets`, `build:ng`) and regenererate the API documentation (`docs`):

    npm run build

## Development

Run a local development server under "src/picturepark-sdk-v1-fetch" and open the Fetch sample page in the browser.

    npm run start:fetch

Run a local development server under "src/picturepark-sdk-v1-widgets" and open the widgets sample page in the browser.

    npm run start:widgets
