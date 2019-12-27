import { PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v1-angular-oidc';


export function PictureparkAppSetting() {
    return <PictureparkOidcAuthConfiguration> {
        apiServer: 'https://api.qa-picturepark.com/',
        stsServer: 'https://identity.qa-picturepark.com/',
        customerId: '8ae0dd5f03ce4csj40c376ea93772106',
        clientId: '1fd1249k378a4690027e0582kca39192',
        customerAlias: 'democustomer',
        redirectServer: 'http://localhost:4300',
        scope: 'openid profile picturepark_api all_scopes'
    };
}



