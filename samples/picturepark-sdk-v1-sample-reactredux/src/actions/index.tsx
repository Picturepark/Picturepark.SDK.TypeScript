import * as constants from '../constants';
import {
  ContentClient,
  AccessTokenAuthClient,
  AuthClient,
  ShareClient,
} from '@picturepark/sdk-v1-fetch';

export interface RequestShare {
  type: constants.REQUEST_SHARE;
  payload: string;
}

export interface RequestContent {
  type: constants.REQUEST_CONTENT;
  payload: string;
}

export interface ReciveData {
  type: constants.RECEIVE_DATA;
  payload: string;
}

export type KnownActions = RequestShare | RequestContent | ReciveData;

export function requestShare(server: string, token: string, customerAlias: string) {
  return (dispatch: (action: {}) => void) => {
    dispatch({
      type: constants.REQUEST_SHARE,
      payload: token
    });
    
    const authClient = new AuthClient(server, customerAlias);
    const clientInfo = new ShareClient(authClient);
    clientInfo.getShareJson(token).then((share) => {
      dispatch(receiveData(JSON.stringify(share, null, 2)));
    }).catch(error => {
      dispatch(receiveData('Error: \n\n' + JSON.stringify(error, null, 2)));
    });
  };
}

export function requestContent(server: string, token: string, customerAlias: string, accessToken: string) {
  return (dispatch: (action: {}) => void) => {
    dispatch({
      type: constants.REQUEST_SHARE,
      payload: token
    });

    let authClient = new AccessTokenAuthClient(server, customerAlias, accessToken);
    let contentClient = new ContentClient(authClient);
    contentClient.get(token, []).then(content => {
      dispatch(receiveData(JSON.stringify(content, null, 2)));
    }).catch(error => {
      dispatch(receiveData('Error: \n\n' + JSON.stringify(error, null, 2)));
    });
  };
}

export function receiveData(data: string): ReciveData {
  return {
    type: constants.RECEIVE_DATA,
    payload: data
  };
}