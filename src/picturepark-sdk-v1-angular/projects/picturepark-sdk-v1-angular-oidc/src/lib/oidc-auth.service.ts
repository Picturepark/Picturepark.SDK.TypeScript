import { Output, EventEmitter, Injectable, Inject, Optional } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';

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

      const redirect = this.pictureparkConfiguration.redirectServer ?
      this.pictureparkConfiguration.redirectServer : window.location.origin;
      console.log(redirect);

      const config: AuthConfig = {
        issuer: this.pictureparkConfiguration.stsServer,
        redirectUri: redirect + '/content-picker',
        clientId: this.pictureparkConfiguration.clientId ? this.pictureparkConfiguration.clientId : 'picturepark_frontend',
        responseType: 'code', // code flow + PKCE
        scope:  this.pictureparkConfiguration.scope ? this.pictureparkConfiguration.scope : 'offline_access profile picturepark_api picturepark_account openid',
        postLogoutRedirectUri: 'https://localhost:44363/Unauthorized',
        sessionChecksEnabled: false,
        strictDiscoveryDocumentValidation: false,
        customQueryParams: {
          acr_values: 'tenant:{"id":"' +
            this.pictureparkConfiguration.customerId + '","alias":"' +
            this.pictureparkConfiguration.customerAlias + '"}'
        }
        // : false,
        // silent_renew_url: 'https://localhost:44363/silent-renew.html',
        // post_login_route: '/dataeventrecords',

//         forbidden_route: '/Forbidden',
        // HTTP 401
        //unauthorized_route: '/Unauthorized',
        //log_console_warning_active: true,
        //log_console_debug_active: true,
        // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
        // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
        //max_id_token_iat_offset_allowed_in_seconds: 10,
    };

    this.oauthService.showDebugInformation = true;
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
   * Redirects the user to the identity server to authenticate.
   * Does nothing and returns false if a user is already logged in.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  login(redirectRoute?: string) {
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  /**
   * Redirects the user to the identity server to logout.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  logout(redirectRoute?: string) {
    this.oauthService.logOut();
  }

  /** Processes an identity server redirect result if available, returns false if no redirect has happened. */
  processAuthorizationRedirect() {
    return Promise.resolve();
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
