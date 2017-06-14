import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ loading, share }: StoreState) {
  return {
    loading,
    share
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.KnownActions>) {
  return {
    requestShare: (server: string, token: string) => dispatch(actions.requestShare(server, token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
