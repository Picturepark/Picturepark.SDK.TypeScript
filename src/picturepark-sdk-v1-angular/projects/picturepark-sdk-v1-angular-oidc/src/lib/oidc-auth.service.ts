import { Output, EventEmitter, Injectable, Inject, Optional, LOCALE_ID } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

import {
  PICTUREPARK_CONFIGURATION,
  PICTUREPARK_API_URL,
  AuthService,
  PictureparkConfiguration,
} from '@picturepark/sdk-v1-angular';

@Injectable({ providedIn: 'root' })
export class OidcAuthService extends AuthService {
  private refreshInitialized = false;

  @Output()
  isAuthenticatedChanged = new EventEmitter<boolean>();

  constructor(
    @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration: PictureparkOidcAuthConfiguration,
    @Optional() @Inject(PICTUREPARK_API_URL) pictureparkApiUrl: string,
    public oauthService: OAuthService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    super(
      pictureparkConfiguration && pictureparkConfiguration.apiServer
        ? pictureparkConfiguration.apiServer
        : pictureparkApiUrl
    );

    const redirect = this.pictureparkConfiguration.redirectServer
      ? this.pictureparkConfiguration.redirectServer
      : window.location.href;

    const base = (document.querySelector('base') || {}).href;

    const config: AuthConfig = {
      issuer: this.pictureparkConfiguration.stsServer,
      redirectUri: redirect,
      clientId: this.pictureparkConfiguration.clientId,
      responseType: 'code',
      scope: this.pictureparkConfiguration.scope
        ? this.pictureparkConfiguration.scope
        : 'profile picturepark_api picturepark_account openid',
      silentRefreshRedirectUri: base + 'assets/silent-refresh.html',
      useSilentRefresh: true,
      sessionChecksEnabled: false,
      clearHashAfterLogin: true,
      customQueryParams: {
        acr_values:
          'tenant:{"id":"' +
          this.pictureparkConfiguration.customerId +
          '","alias":"' +
          this.pictureparkConfiguration.customerAlias +
          '"}',
      },
    };

    this.oauthService.configure(config);
  }

  get username() {
    const claims = this.oauthService.getIdentityClaims();
    return claims['name'];
  }

  get isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  /**
   * Requires a user login. If there is a valid access_token, we just set up token refresh, otherwise a redirect to the login page is triggered
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  async requireLogin(redirectRoute?: string) {
    if (!this.isAuthenticated) {
      await this.login(redirectRoute);
    } else {
      await this.setupAutomaticSilentRefresh();
    }
  }

  /**
   * Redirects the user to the identity server to authenticate.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  async login(redirectRoute?: string) {
    this.oauthService.redirectUri = redirectRoute ? window.location.origin + redirectRoute : window.location.origin;
    await this.oauthService.loadDiscoveryDocumentAndLogin();

    this.initSilentRefresh();
  }

  /**
   * If a valid token is available and login is not called, this method should be called to setup the token refresh
   */
  async setupAutomaticSilentRefresh() {
    await this.oauthService.loadDiscoveryDocument();
    this.initSilentRefresh();
  }

  private initSilentRefresh() {
    if (!this.refreshInitialized) {
      this.oauthService.setupAutomaticSilentRefresh();
      this.refreshInitialized = true;
    }
  }

  /**
   * Redirects the user to the identity server to logout.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  logout(redirectRoute?: string) {
    this.oauthService.redirectUri = redirectRoute ? window.location.origin + redirectRoute : window.location.origin;
    this.oauthService.logOut();
  }

  async transformHttpRequestOptions(options: any) {
    await this.updateTokenIfRequired();
    if (options.headers) {
      if (this.oauthService.getAccessToken()) {
        options.headers = options.headers.append('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
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
    return options;
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
