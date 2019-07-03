import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

// LIBRARIES
import { AuthService } from '@picturepark/sdk-v1-angular';

@Injectable()
export class ProxyAuthService extends AuthService {

  constructor(
    @Inject(APP_BASE_HREF) href: string,
    @Inject(LOCALE_ID) private locale: string) {
    super(href + 'api');
  }

  public get isAuthenticated(): boolean {
    return true;
  }

  public async transformHttpRequestOptions(options: any): Promise<any> {
    return this.transformHttpRequestOptionsSync(options);
  }

  public transformHttpRequestOptionsSync(options: any): any {
    const sessionString = localStorage.getItem('ppSession');
    if (!sessionString) {
      return options;
    }
    const session = JSON.parse(sessionString);

    if (options.headers) {
      options.headers = options.headers
        .append('Authorization', 'Bearer ' + session.token)
        .append('Picturepark-Language', this.locale);
    }

    return options;
  }
}
