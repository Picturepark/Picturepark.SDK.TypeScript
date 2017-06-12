
import { KnownActions } from '../actions';
import { StoreState } from '../types/index';
import { REQUEST_SHARE, RECEIVE_SHARE } from '../constants/index';
import { PublicAccessClient } from '@picturepark/sdk-v1-fetch';

export function enthusiasm(state: StoreState, action: KnownActions): StoreState {
  switch (action.type) {
    case REQUEST_SHARE:
      return { ...state, loading: true, share: undefined };
    case RECEIVE_SHARE:
      return { ...state, loading: false, share: action.payload };
    default:
      return state;
  }
}