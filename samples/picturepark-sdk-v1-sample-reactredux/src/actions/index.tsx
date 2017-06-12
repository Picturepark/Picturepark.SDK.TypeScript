import * as constants from '../constants';
import { PublicAccessClient, ShareEmbedDetailViewItem } from '@picturepark/sdk-v1-fetch';

let publicAccessClient = new PublicAccessClient("https://qanext04.preview-picturepark.com");

export interface RequestShare {
  type: constants.REQUEST_SHARE;
  payload: string;
}

export interface ReceiveShare {
  type: constants.RECEIVE_SHARE;
  payload: ShareEmbedDetailViewItem | null;
}

export type KnownActions = RequestShare | ReceiveShare;

export function requestShare(token: string) {
  return (dispatch: any) => {
    dispatch({
      type: constants.REQUEST_SHARE,
      payload: token
    });

    publicAccessClient.getShare('IrXW3aF8').then((share) => {
      dispatch(receiveShare(share));
    });
  }
}

export function receiveShare(share: ShareEmbedDetailViewItem | null): ReceiveShare {
  return {
    type: constants.RECEIVE_SHARE,
    payload: share
  };
}