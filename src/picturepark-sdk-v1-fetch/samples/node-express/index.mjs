import { AuthClient, ShareClient } from '@picturepark/sdk-v1-fetch'
import fetch from 'node-fetch';
import express from 'express';

const apiUrl = 'https://api.01.k8s.qa-picturepark.com';
const customerAlias = 'stadev001';
const shareToken = 'AfnSazBM';

const http = { fetch: fetch };

const authClient = new AuthClient(apiUrl, customerAlias);

const shareClient = new ShareClient(authClient, '', http);


const app = express();
const port = 3000;

app.get('/', (req, res) => {
shareClient.getShareJson(shareToken).then(result => {
    res.send(JSON.stringify(result, undefined, 4));
});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
