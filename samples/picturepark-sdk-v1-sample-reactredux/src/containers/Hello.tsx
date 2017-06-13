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
    requestShare: () => dispatch(actions.requestShare('oIS3Axu1')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
