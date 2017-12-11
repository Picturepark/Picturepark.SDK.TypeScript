import * as React from 'react';
import './Hello.css';
import { ContentDetail } from '@picturepark/sdk-v1-fetch';
import { StoreState } from '../types/index';

export interface Props {
  loading?: boolean;
  data?: string;

  server?: string;
  accessToken?: string;

  requestShare?: (server: string, token: string) => void;
  requestContent?: (server: string, token: string, accessToken: string) => void;
}

class Hello extends React.Component<Props, StoreState> {
  constructor() {
    super();
    this.state = {
      token: ''
    };
  }

  requestShare = () => {
    if (this.props.requestShare && this.props.server && this.state.token) {
      this.props.requestShare(this.props.server, this.state.token);
    }
  }

  requestContent = () => {
    if (this.props.requestContent && this.props.server && this.state.token && this.props.accessToken) {
      this.props.requestContent(this.props.server, this.state.token, this.props.accessToken);
    }
  }

  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
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
          <input name="token"
            value={this.state.token}
            onChange={this.handleChange}
            style={{ 'width': '100%' }} />
        </p>
        <p>
          <button onClick={this.requestShare} disabled={!this.state.token}>Load share</button>
          <button onClick={this.requestContent} disabled={!this.state.token}>Load content</button>
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