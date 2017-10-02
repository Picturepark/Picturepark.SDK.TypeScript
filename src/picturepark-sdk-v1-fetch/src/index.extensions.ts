import { AuthClient, TokenAuthClient } from './auth';

export class PictureparkClientBase {
    constructor(private authClient: AuthClient) {

    }

    getBaseUrl(defaultUrl: string) {
        return this.authClient.getBaseUrl(defaultUrl);        
    }

    transformOptions(options: RequestInit): Promise<RequestInit> {
        return this.authClient.transformHttpRequestOptions(options);
    }
}