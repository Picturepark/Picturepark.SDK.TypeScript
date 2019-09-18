import { PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v1-angular-oidc';

export function PictureparkAppSetting() {
    return <PictureparkOidcAuthConfiguration> {
        apiServer: 'http://localhost:8085',
        stsServer: 'http://localhost:8081',
        customerId: '99bc7499daf64318b554c1ab464cdfb4',
        clientId: '47d64d44d4854206838a5a096e15ef3b',
        customerAlias: 'bro',
        redirectServer: 'http://localhost:4300',
        scope: 'openid profile picturepark_api all_scopes'
    };
}
