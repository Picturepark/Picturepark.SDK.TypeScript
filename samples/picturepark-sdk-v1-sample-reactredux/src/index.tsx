import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Hello from './containers/Hello';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';

import './index.css';

let initialState = { loading: false, share: null };
const store = createStore<StoreState>(enthusiasm, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
