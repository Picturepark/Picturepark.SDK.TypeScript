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

  requestShare() {
    if (this.props.requestShare && this.props.server && this.state.token) {
      this.props.requestShare(this.props.server, this.state.token);
    }
  }

  requestContent() {
    if (this.props.requestContent && this.props.server && this.state.token && this.props.accessToken) {
      this.props.requestContent(this.props.server, this.state.token, this.props.accessToken);
    }
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="hello">
        <div>
          <label>Server:</label><br />
          {this.props.server}
        </div>
        <div>
          <label>ID:</label><br />
          <input name="token"
            value={this.state.token}
            onChange={this.handleChange.bind(this)}
            style={{ "width": "100%" }} />
          <br />
        </div>
        <p>
        <button onClick={this.requestShare.bind(this)}>Load share</button>
        <button onClick={this.requestContent.bind(this)}>Load content</button>
        </p>
        <div className="greeting">
          <strong>Access Token: </strong><br />
          {this.props.accessToken ? this.props.accessToken.substr(0, 10) + '...' : 'n/a'}<br />
          <br />

          <strong>Loading: </strong>{this.props.loading ? 'true' : 'false'}<br />
          <br />

          <strong>JSON: </strong>
        </div>
        <pre>
          {this.props.data !== undefined ? this.props.data : 'n/a'}
        </pre>
      </div>
    );
  }
}

export default Hello;