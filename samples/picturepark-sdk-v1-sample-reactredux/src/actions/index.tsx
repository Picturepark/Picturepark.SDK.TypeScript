import * as constants from '../constants';
import { PublicAccessClient, ShareEmbedDetailViewItem } from '@picturepark/sdk-v1-fetch';

export interface RequestShare {
  type: constants.REQUEST_SHARE;
  payload: string;
}

export interface ReceiveShare {
  type: constants.RECEIVE_SHARE;
  payload: ShareEmbedDetailViewItem | null;
}

export type KnownActions = RequestShare | ReceiveShare;

export function requestShare(server: string, token: string) {
  return (dispatch: (action: {}) => void) => {
    dispatch({
      type: constants.REQUEST_SHARE,
      payload: token
    });

    let publicAccessClient = new PublicAccessClient(server);
    publicAccessClient.getShare(token).then((share) => {
      dispatch(receiveShare(share));
    }).catch(() => {
      dispatch(receiveShare(null));
    });
  };
}

export function receiveShare(share: ShareEmbedDetailViewItem | null): ReceiveShare {
  return {
    type: constants.RECEIVE_SHARE,
    payload: share
  };
}