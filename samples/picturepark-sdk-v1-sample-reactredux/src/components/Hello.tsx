import * as React from 'react';
import './Hello.css';
import { ShareDetail } from '@picturepark/sdk-v1-fetch';
import { StoreState } from '../types/index';

export interface Props {
  loading?: boolean;
  share?: ShareDetail | null;
  requestShare?: (server: string, token: string) => void;
}

class Hello extends React.Component<Props, StoreState> {
  constructor() {
    super();
    this.state = {
      server: 'https://devnext-api.preview-picturepark.com',
      token: ''
    };
  }

  requestShare() {
    if (this.props.requestShare && this.state.server && this.state.token) {
      this.props.requestShare(this.state.server, this.state.token);
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
          <input name="server" 
                 value={this.state.server} 
                 onChange={this.handleChange.bind(this)}
                 style={{'width': '100%'}} />
        </div>
        <div>
          <label>Token:</label><br />
          <input name="token"
                 value={this.state.token} 
                 onChange={this.handleChange.bind(this)}
                 style={{"width": "100%"}} />
          <br />
        </div>
        <div>
          <button onClick={this.requestShare.bind(this)}>Load share</button>
        </div>
        <div className="greeting">
          Loading: {this.props.loading ? 'true' : 'false'}<br />
          JSON: <br />
        </div>
        <pre>
          {this.props.share !== undefined ? JSON.stringify(this.props.share, null, 2) : 'n/a'}
        </pre>
      </div>
    );
  }
}

export default Hello;