import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({ server, apiServer, customerAlias, accessToken, loading, data }: StoreState) {
  return {
    server,
    apiServer,
    customerAlias,
    accessToken,
    loading,
    data
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.KnownActions>) {
  return {
    requestShare: (server: string, token: string, customerAlias: string) =>
      dispatch<any>(actions.requestShare(server, token, customerAlias)),

    requestContent: (server: string, token: string, customerAlias: string, accessToken: string) =>
      dispatch<any>(actions.requestContent(server, token, customerAlias, accessToken)),
  };
}

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps)(Hello);