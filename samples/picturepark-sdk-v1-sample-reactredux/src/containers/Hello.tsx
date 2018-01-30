import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ server, accessToken, loading, data }: StoreState) {
  return {
    server,
    accessToken,
    loading,
    data
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.KnownActions>) {
  return {
    requestShare: (server: string, token: string) =>
      dispatch(actions.requestShare(server, token)),

    requestContent: (server: string, token: string, accessToken: string) =>
      dispatch(actions.requestContent(server, token, accessToken)),
  };
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps)(Hello);