export abstract class AuthService {
  private _pictureparkApiUrl: string;
  constructor(pictureparkApiUrl: string) {
    this._pictureparkApiUrl = pictureparkApiUrl;
  }
  get apiServer() {
    return this._pictureparkApiUrl;
  }
  abstract get isAuthenticated(): boolean;
  abstract transformHttpRequestOptions(options: any): Promise<any>;
}
