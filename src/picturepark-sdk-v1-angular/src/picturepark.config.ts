export interface PictureparkConfiguration {
    customerId?: string;
    customerAlias?: string;

    // Oidc
    apiServer?: string;
    stsServer?: string;
    clientId?: string;
    scope?: string;

    // Token
    accessToken?: string;
}
