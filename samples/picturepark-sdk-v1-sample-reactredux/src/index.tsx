import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Hello from './containers/Hello';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';

import { OidcClientSettings } from '@picturepark/sdk-v1-fetch';
import { UserManager } from 'oidc-client';

import './index.css';

// Authenticate (Implicit OIDC)
let appUrl = 'http://localhost:3000';
let serverUrl = 'https://devnext.preview-picturepark.com';
let apiServerUrl = 'https://devnext-api.preview-picturepark.com';
let customerAlias = 'dev';

let oidcSettings = OidcClientSettings.create({
  serverUrl: appUrl,
  stsServerUrl: 'https://devnext-identity.preview-picturepark.com',
  clientId: 'TestClient',
  customerAlias: customerAlias,
  customerId: 'c2b8e0525e694776879bf986d506f1bc',
  scope: 'openid profile picturepark_api all_scopes'
});

let manager = new UserManager(oidcSettings);
manager.signinRedirectCallback(window.location.href).then(user => {
  let initialState = {
    server: serverUrl,
    apiServer: apiServerUrl,
    customerAlias: customerAlias,
    accessToken: user.access_token,
    loading: false,
    share: null
  };

  window.history.pushState(undefined, '', appUrl);

  // Render UI
  const store = createStore<StoreState>(enthusiasm, initialState, applyMiddleware(thunk));
  ReactDOM.render(
    <Provider store={store}>
      <Hello />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
}).catch(error => {
  // Redirect to STS server
  manager.signinRedirect();
});
