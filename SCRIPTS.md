# Build scripts

First, install the node modules:

    npm install

Then, run one of the following scripts:

    npm run link

Creates local node_modules directory links so that

- picturepark-sdk-v1-ng2
- picturepark-sdk-v1-ng2-ui

are locally linked and all projects can be built.

    npm run nswag

Regenerates all clients based on the Swagger specifications located in the "/swagger" directory

    npm run tests

Runs all unit tests.

    npm run build:fetch

Rebuilds and minimizes the Fetch "bundle.js" in "src/picturepark-sdk-v1-fetch/dist"

    npm run build:widgets

Rebuilds and minimizes the widgets "bundle.js" in "src/picturepark-sdk-v1-widgets/dist"

    npm run build:ng

Rebuilds all Angular projects.

    npm run docs

Rebuilds the API documentation for all projects.

    npm run build

Runs all build scripts (`build:fetch`, `build:widgets`, `build:ng`) and regenererates the API documentation (`docs`).

    npm run start:fetch

Runs a local development server under "src/picturepark-sdk-v1-fetch" and opens the Fetch sample page in the browser.

    npm run start:widgets

Runs a local development server under "src/picturepark-sdk-v1-widgets" and opens the widgets sample page in the browser.