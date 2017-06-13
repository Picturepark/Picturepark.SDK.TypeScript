import * as React from 'react';
import './Hello.css';
import { ShareEmbedDetailViewItem } from '@picturepark/sdk-v1-fetch';

export interface Props {
  loading?: boolean;
  share?: ShareEmbedDetailViewItem | null;
  requestShare?: () => void;
}

function Hello({ loading, share, requestShare }: Props) {
  return (
    <div className="hello">
      <div>
        <button onClick={requestShare}>Load share</button>
      </div>
      <div className="greeting">
        Loading: {loading ? 'true' : 'false'}<br />
        JSON: <br />
      </div>
      <pre>
        {share ? JSON.stringify(share, null, 2) : 'n/a'}
      </pre>
    </div>
  );
}

export default Hello;