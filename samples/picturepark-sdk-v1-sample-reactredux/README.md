# Sample: picturepark-sdk-v1-sample-reactredux
## React/Redux sample app with OIDC Implicit authentication

The `picturepark-sdk-v1-sample-reactredux` sample project shows how to authenticate with the Picturepark API and load shares or content items.

## Setup

In order to use the sample app, you need to setup an OIDC Implicit client in the Picturepark backend settings: 

- Login to your Picturepark backend, navigate to `Settings` > `API Clients` and create a new client
- Define a Client ID and a Client Name and the following fields:
  - "Authorization Flow": `Implicit`
  - "Allowed Scopes": `all_scopes`
  - "Redirect Uris" and "Allowed CORS origins": `http://localhost:3000/*` 
  - Enable the client ("Enabled")
- After creating the client, open `picturepark-sdk-v1-sample-reactredux/src/index.tsx` and change the settings accordingly.
- Start the sample app by navigating to `samples/picturepark-sdk-v1-sample-reactredux` with the command line and running `npm start`