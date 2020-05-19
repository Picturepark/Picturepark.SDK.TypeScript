import * as React from 'react';
import './Hello.css';
import { StoreState } from '../types/index';
import { showContentPicker } from '@picturepark/sdk-v1-pickers';

export interface Props {
  loading?: boolean;
  data?: string;

  server?: string;
  apiServer?: string;
  customerAlias?: string;
  accessToken?: string;

  requestShare?: (server: string, customerAlias: string, token: string) => void;
  requestContent?: (server: string, token: string, customerAlias: string, accessToken: string) => void;
}

class Hello extends React.Component<Props, StoreState> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      token: ''
    };
  }

  requestShare = () => {
    if (this.props.requestShare && this.props.apiServer && this.state.token && this.props.customerAlias) {
      this.props.requestShare(this.props.apiServer, this.state.token, this.props.customerAlias);
    }
  }

  requestContent = () => {
    if (this.props.requestContent && this.props.apiServer &&
      this.state.token && this.props.customerAlias && this.props.accessToken) {

      this.props.requestContent(this.props.apiServer, this.state.token,
                                this.props.customerAlias, this.props.accessToken);
    }
  }

  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  pickContent = () => {
    showContentPicker(this.props.server!).then(share => {
      if (share.items && share.items[0].token) {
        this.setState({
          token: share.items[0].token
        });
      }
    });
  }

  render() {
    return (
      <div className="hello">
        <p>
          <strong>Server: </strong><br />
          {this.props.server}
        </p>
        <p>
          <strong>Share Token or Content ID: </strong><br />
          <input
            name="token"
            value={this.state.token}
            onChange={this.handleChange}
            style={{ 'width': '100%' }}
          />
        </p>
        <p>
          <button onClick={this.requestShare} disabled={!this.state.token}>Load share</button>
          <button onClick={this.requestContent} disabled={!this.state.token}>Load content</button>
          <button onClick={this.pickContent}>Pick content</button>
        </p>
        <p>
          <strong>Access Token: </strong><br />
          {this.props.accessToken ? this.props.accessToken.substr(0, 10) + '...' : 'n/a'}
        </p>
        <p>
          <strong>Loading: </strong>{this.props.loading ? 'true' : 'false'}
        </p>
        <p>
          <strong>JSON: </strong>
          <pre>
            {this.props.data !== undefined ? this.props.data : 'n/a'}
          </pre>
        </p>
      </div>
    );
  }
}

export default Hello;