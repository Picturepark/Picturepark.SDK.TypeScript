import { Injectable, Inject, Optional, LOCALE_ID } from '@angular/core';

import { PICTUREPARK_API_URL } from './api-services';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NoopAuthService extends AuthService {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    @Optional() @Inject(PICTUREPARK_API_URL) pictureparkApiUrl?: string
  ) {
    super(pictureparkApiUrl!);
  }

  get isAuthenticated(): boolean {
    return true;
  }

  transformHttpRequestOptions(options: any) {
    if (options.headers && this.locale) {
      options.headers = options.headers.append('Picturepark-Language', this.locale);
    }
    return Promise.resolve(options);
  }

  async requireLogin(redirectRoute?: string) {
    await Promise.resolve();
  }
}
