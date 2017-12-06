export class AuthClient {
  constructor(private pictureparkApiUrl: string, private customerAlias?: string) {
  }

  getBaseUrl(defaultUrl: string) {
    return this.pictureparkApiUrl;
  }

  transformHttpRequestOptions(options: RequestInit): Promise<RequestInit> {
    if (options.headers && this.customerAlias) {
      options.headers.set('Picturepark-CustomerAlias', this.customerAlias);
    }

    return Promise.resolve(options);
  }
}

export class AccessTokenAuthClient extends AuthClient {
  constructor(pictureparkApiUrl: string, customerAlias: string, private accessToken: string) {
    super(pictureparkApiUrl, customerAlias);
  }

  transformHttpRequestOptions(options: RequestInit): Promise<RequestInit> {
    if (options.headers) {
      if (this.accessToken) {
        options.headers.set('Authorization', 'Bearer ' + this.accessToken);
      }
    }

    return super.transformHttpRequestOptions(options);
  }
}

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