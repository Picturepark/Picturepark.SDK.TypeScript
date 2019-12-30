import { PictureparkOidcAuthConfiguration } from '@picturepark/sdk-v1-angular-oidc';


/*
This is the template file for the config.ts file that should be local only
If when running the project the following error appears:
     ERROR in app/app.module.ts:19:39 - error TS2307: Cannot find module 'src/config'.
     import { PictureparkAppSetting } from 'src/config';

Then the config.ts file is probably not there and needs to be added manually 
*/

export function PictureparkAppSetting() {
    return <PictureparkOidcAuthConfiguration> {
        apiServer: 'https://api.qa-picturepark.com',
        stsServer: 'https://identity.qa-picturepark.com/',
        customerId: '8ae0dd5f03ce4csj40c376ea93772106',
        clientId: '1fd1249k378a4690027e0582kca39192',
        customerAlias: 'democustomer',
        redirectServer: 'http://localhost:4300',
        scope: 'openid profile picturepark_api all_scopes'
    };
}



