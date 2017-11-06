import { Output, EventEmitter, Injectable, Inject, Optional } from '@angular/core';

import { PICTUREPARK_CONFIGURATION } from './picturepark.servicebase';
import { PictureparkConfiguration } from './picturepark.config';
import { AuthService, PICTUREPARK_API_URL } from './picturepark.services';

@Injectable()
export class TokenAuthService extends AuthService {
  private _isAuthorizing = false;
  private _isAuthorized = false;
  private _token: string | undefined = undefined;
  private _username: string | undefined = undefined;

  constructor(
    @Optional() @Inject(PICTUREPARK_API_URL) private pictureparkApiUrl?: string,
    @Optional() @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration?: PictureparkTokenAuthConfiguration) {
    super(pictureparkConfiguration && pictureparkConfiguration.apiServer ? pictureparkConfiguration.apiServer : pictureparkApiUrl!);
  }

  get isAuthorized(): boolean {
    return this.pictureparkConfiguration &&
      this.pictureparkConfiguration.accessToken &&
      this.pictureparkConfiguration.accessToken !== '' ? true : false;
  }

  transformHttpRequestOptions(options: any) {
    if (options.headers) {
      if (this.pictureparkConfiguration && this.pictureparkConfiguration.accessToken) {
        options.headers = options.headers.append('Authorization', 'Bearer ' + this.pictureparkConfiguration.accessToken);
      }

      if (this.pictureparkConfiguration && this.pictureparkConfiguration.customerAlias) {
        options.headers = options.headers.append('Picturepark-CustomerAlias', this.pictureparkConfiguration.customerAlias);
      }
    }
    return Promise.resolve(options);
  }
}

export interface PictureparkTokenAuthConfiguration extends PictureparkConfiguration {
  accessToken?: string;
}