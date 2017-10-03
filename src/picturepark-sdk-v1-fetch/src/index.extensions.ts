import { AuthClient, TokenAuthClient } from './auth';

export { AuthClient, TokenAuthClient };

export class PictureparkClientBase {
    constructor(private authClient: AuthClient) {

    }

    getBaseUrl(defaultUrl: string) {
        return this.authClient ? this.authClient.getBaseUrl(defaultUrl) : defaultUrl;        
    }

    transformOptions(options: RequestInit): Promise<RequestInit> {
        return this.authClient ? this.authClient.transformHttpRequestOptions(options) : Promise.resolve(options);
    }
}