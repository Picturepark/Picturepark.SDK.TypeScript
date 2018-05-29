import { Output, EventEmitter, Injectable, Inject, Optional } from '@angular/core';

import { PICTUREPARK_CONFIGURATION } from '../services/base.service';
import { PictureparkConfiguration } from '../services/configuration';
import { AuthService, PICTUREPARK_API_URL } from '../services/services';

@Injectable({providedIn: 'root'})
export class AccessTokenAuthService extends AuthService {
  constructor(
    @Optional() @Inject(PICTUREPARK_API_URL) private pictureparkApiUrl?: string,
    @Optional() @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration?: PictureparkAccessTokenAuthConfiguration) {
    super(pictureparkConfiguration && pictureparkConfiguration.apiServer ? pictureparkConfiguration.apiServer : pictureparkApiUrl!);
  }

  get isAuthenticated(): boolean {
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

export interface PictureparkAccessTokenAuthConfiguration extends PictureparkConfiguration {
  accessToken?: string;
}
