import { Output, EventEmitter, Injectable, Inject, Optional } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

import {
  PICTUREPARK_CONFIGURATION,
  PICTUREPARK_API_URL,
  AuthService,
  PictureparkConfiguration
} from '@picturepark/sdk-v1-angular';

@Injectable({providedIn: 'root'})
export class OidcAuthService extends AuthService {

  @Output()
  isAuthenticatedChanged = new EventEmitter<boolean>();

  constructor(
    @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration: PictureparkOidcAuthConfiguration,
    @Optional() @Inject(PICTUREPARK_API_URL) pictureparkApiUrl: string,
    public oauthService: OAuthService) {
    super(pictureparkConfiguration && pictureparkConfiguration.apiServer ?
      pictureparkConfiguration.apiServer : pictureparkApiUrl);

      const redirect = this.pictureparkConfiguration.redirectServer ? this.pictureparkConfiguration.redirectServer : window.location.href;

      const config: AuthConfig = {
        issuer: this.pictureparkConfiguration.stsServer,
        redirectUri: redirect,
        clientId: this.pictureparkConfiguration.clientId,
        responseType: 'code',
        scope: this.pictureparkConfiguration.scope ? this.pictureparkConfiguration.scope : 'offline_access profile picturepark_api picturepark_account openid',
        sessionChecksEnabled: false,
        clearHashAfterLogin: true,
        customQueryParams: {
          acr_values: 'tenant:{"id":"' +
            this.pictureparkConfiguration.customerId + '","alias":"' +
            this.pictureparkConfiguration.customerAlias + '"}'
        }
        // : false,
        // silent_renew_url: 'https://localhost:44363/silent-renew.html',
    };

    this.oauthService.showDebugInformation = true;
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  get username() {
    const claims = this.oauthService.getIdentityClaims();
    return claims['name'];
  }

  get isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  /**
   * Redirects the user to the identity server to authenticate.
   * Does nothing and returns false if a user is already logged in.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  login(redirectRoute?: string) {
    this.oauthService.redirectUri = redirectRoute ? (window.location.origin + redirectRoute) : window.location.origin;
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  /**
   * Redirects the user to the identity server to logout.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  logout(redirectRoute?: string) {
    this.oauthService.redirectUri = redirectRoute ? (window.location.origin + redirectRoute) : window.location.origin;
    this.oauthService.logOut();
  }

  transformHttpRequestOptions(options: any) {
    return this.updateTokenIfRequired().then(() => {
      if (options.headers) {
        if (this.oauthService.getAccessToken()) {
          options.headers = options.headers.append('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
        }

        if (this.pictureparkConfiguration && this.pictureparkConfiguration.customerAlias) {
          options.headers = options.headers.append('Picturepark-CustomerAlias', this.pictureparkConfiguration.customerAlias);
        }
      }
      return options;
    });
  }

  private async updateTokenIfRequired() {
    if (!this.isAuthenticated) {
      return this.oauthService.loadDiscoveryDocumentAndLogin();
    }
  }
}

export interface PictureparkOidcAuthConfiguration extends PictureparkConfiguration {
  stsServer: string;
  redirectServer?: string;
  customerId?: string;
  clientId?: string;
  scope?: string;
}
