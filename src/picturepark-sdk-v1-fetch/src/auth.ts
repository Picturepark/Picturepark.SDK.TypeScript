export class AuthClient {
    constructor(private pictureparkApiUrl: string) {
    }

    getBaseUrl(defaultUrl: string) {
        return this.pictureparkApiUrl;
    }

    transformHttpRequestOptions(options: RequestInit): Promise<RequestInit> {
        return Promise.resolve(options);
    }
}

export class TokenAuthClient extends AuthClient {
    constructor(pictureparkApiUrl: string, private accessToken: string, private customerAlias?: string) {
        super(pictureparkApiUrl);
    }

    transformHttpRequestOptions(options: RequestInit): Promise<RequestInit> {
        if (options.headers) {
            if (this.accessToken) {
                options.headers['Authorization'] = 'Bearer ' + this.accessToken;
            }

            if (this.customerAlias) {
                options.headers['Picturepark-CustomerAlias'] = this.customerAlias;
            }
        }
        
        return Promise.resolve(options);
    }
}