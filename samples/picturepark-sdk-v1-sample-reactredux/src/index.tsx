import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Hello from './containers/Hello';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';

import { OidcClientSettings } from '@picturepark/sdk-v1-fetch';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

import './index.css';

// Authenticate (implicit OIDC)
let serverUrl = 'http://localhost:3000';
let apiServerUrl = 'https://devnext-api.preview-picturepark.com';

let oidcSettings = OidcClientSettings.create({
  serverUrl: serverUrl,
  stsServerUrl: 'https://devnext-identity.preview-picturepark.com',
  clientId: 'TestRico2',
  customerAlias: 'dev',
  customerId: 'bb31716579e84aae8cd3282195ec58aa',
  scope: 'openid profile picturepark_api all_scopes'
});

let manager = new UserManager(oidcSettings);
manager.signinRedirectCallback(window.location.href).then(user => {
  let initialState = {
    server: apiServerUrl,
    accessToken: user.access_token,
    loading: false,
    share: null,
  };

  window.history.pushState(undefined, '', serverUrl);

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
