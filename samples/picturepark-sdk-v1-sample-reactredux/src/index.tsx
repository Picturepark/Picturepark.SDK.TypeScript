import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Hello from './containers/Hello';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

import './index.css';

// Authenticate
let serverUrl = 'http://localhost:3000';
let apiServerUrl = 'https://devnext-api.preview-picturepark.com';
let stsServerUrl = 'https://devnext-identity.preview-picturepark.com';
let customerAlias = 'dev';
let customerId = 'e852e2c209f0438bbf963b862d2ef1fa';
let clientId = 'TestRico';
let scope = 'openid profile picturepark_api all_scopes';

let settings = {
  client_id: clientId,
  scope: scope,
  authority: stsServerUrl,
  response_type: "id_token token",
  filterProtocolClaims: true,
  loadUserInfo: true,
  redirect_uri: serverUrl + '/auth-callback',
  post_logout_redirect_uri: serverUrl,
  acr_values: 'tenant:{"id":"' +
    customerId + '","alias":"' +
    customerAlias + '"}'
} as UserManagerSettings;

let manager = new UserManager(settings);
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
}, error => {
  manager.signinRedirect();
});
