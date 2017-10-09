export interface PictureparkConfiguration {
    customerId?: string;
    customerAlias?: string;

    // Oidc
    apiServer?: string;
    stsServer?: string;

    // Token
    accessToken?: string;
}
