
import { KnownActions } from '../actions';
import { StoreState } from '../types/index';
import { REQUEST_SHARE, REQUEST_CONTENT, RECEIVE_DATA } from '../constants/index';

export function enthusiasm(state: StoreState, action: KnownActions): StoreState {
  switch (action.type) {
    case REQUEST_SHARE:
      return { ...state, loading: true, data: undefined };
    case REQUEST_CONTENT:
      return { ...state, loading: true, data: undefined };
    case RECEIVE_DATA:
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
}