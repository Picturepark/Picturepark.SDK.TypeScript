import { Injectable, Inject, Optional, LOCALE_ID } from '@angular/core';

import { PictureparkConfiguration } from '../models/configuration';
import { PICTUREPARK_API_URL } from './api-services';
import { AuthService } from './auth.service';
import { PICTUREPARK_CONFIGURATION } from './picturepark-configuration';

@Injectable({ providedIn: 'root' })
export class AccessTokenAuthService extends AuthService {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    @Optional() @Inject(PICTUREPARK_API_URL) pictureparkApiUrl?: string,
    @Optional()
    @Inject(PICTUREPARK_CONFIGURATION)
    private pictureparkConfiguration?: PictureparkAccessTokenAuthConfiguration
  ) {
    super(pictureparkConfiguration?.apiServer || pictureparkApiUrl || '');
  }

  get isAuthenticated(): boolean {
    return this.pictureparkConfiguration &&
      this.pictureparkConfiguration.accessToken &&
      this.pictureparkConfiguration.accessToken !== ''
      ? true
      : false;
  }

  transformHttpRequestOptions(options: any) {
    if (options.headers) {
      if (this.pictureparkConfiguration && this.pictureparkConfiguration.accessToken) {
        options.headers = options.headers.append(
          'Authorization',
          'Bearer ' + this.pictureparkConfiguration.accessToken
        );
      }

      if (this.pictureparkConfiguration && this.pictureparkConfiguration.customerAlias) {
        options.headers = options.headers.append(
          'Picturepark-CustomerAlias',
          this.pictureparkConfiguration.customerAlias
        );
      }

      if (this.locale) {
        options.headers = options.headers.append('Picturepark-Language', this.locale);
      }
    }
    return Promise.resolve(options);
  }

  async requireLogin(redirectRoute?: string) {
    await Promise.resolve();
  }
}

export interface PictureparkAccessTokenAuthConfiguration extends PictureparkConfiguration {
  accessToken?: string;
}
