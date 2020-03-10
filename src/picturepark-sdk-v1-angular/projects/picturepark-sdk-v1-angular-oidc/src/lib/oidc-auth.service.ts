import { Output, EventEmitter, Injectable, Inject, Optional } from '@angular/core';
import { UserManager } from 'oidc-client';

import { PICTUREPARK_CONFIGURATION, PICTUREPARK_API_URL, AuthService, PictureparkConfiguration } from '@picturepark/sdk-v1-angular';

@Injectable({ providedIn: 'root' })
export class OidcAuthService extends AuthService {
  private _isAuthenticating = false;
  private _isAuthenticated = false;
  private _accessToken: string | undefined = undefined;
  private _username: string | undefined = undefined;
  private _signinRedirectCallbackPromise: Promise<boolean>;

  @Output()
  isAuthenticatedChanged = new EventEmitter<boolean>();

  constructor(
    @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration: PictureparkOidcAuthConfiguration,
    @Optional() @Inject(PICTUREPARK_API_URL) pictureparkApiUrl: string
  ) {
    super(pictureparkConfiguration && pictureparkConfiguration.apiServer ? pictureparkConfiguration.apiServer : pictureparkApiUrl);
  }

  get username() {
    return this._username;
  }

  get isAuthenticating() {
    return this._isAuthenticating;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  /**
   * Redirects the user to the identity server to authenticate.
   * Does nothing and returns false if a user is already logged in.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  login(redirectRoute?: string) {
    return this._signinRedirectCallbackPromise.then(result => {
      if (result === false) {
        const manager = this.createOidcManager(redirectRoute);
        manager.signinRedirect();
        return true;
      }
      return false;
    });
  }

  /**
   * Redirects the user to the identity server to logout.
   * @param redirectRoute The optional route to redirect after login (e.g. '/content-picker')
   */
  logout(redirectRoute?: string) {
    return this._signinRedirectCallbackPromise.then(() => {
      const manager = this.createOidcManager(redirectRoute);
      manager.signoutRedirect();
    });
  }

  /** Processes an identity server redirect result if available, returns false if no redirect has happened. */
  processAuthorizationRedirect() {
    this._isAuthenticating = true;

    const manager = this.createOidcManager();
    this._signinRedirectCallbackPromise = manager.signinRedirectCallback().then(
      user => {
        this._isAuthenticating = false;

        this.userChanged(user);
        if (window.history.pushState) {
          const url = window.location.href.replace(window.location.hash, '');
          window.history.pushState(undefined, '', url);
        }

        return true;
      },
      error => {
        this._isAuthenticating = false;
        return false;
      }
    );

    return this._signinRedirectCallbackPromise;
  }

  transformHttpRequestOptions(options: any) {
    return this.updateTokenIfRequired().then(() => {
      if (options.headers) {
        if (this._accessToken) {
          options.headers = options.headers.append('Authorization', 'Bearer ' + this._accessToken);
        }

        if (this.pictureparkConfiguration && this.pictureparkConfiguration.customerAlias) {
          options.headers = options.headers.append('Picturepark-CustomerAlias', this.pictureparkConfiguration.customerAlias);
        }
      }
      return options;
    });
  }

  private createOidcManager(redirectRoute?: string) {
    const url = this.pictureparkConfiguration.redirectServer ? this.pictureparkConfiguration.redirectServer : window.location.origin;
    const search = window.location.search;

    const oidcSettings = {
      client_id: this.pictureparkConfiguration.clientId ? this.pictureparkConfiguration.clientId : 'picturepark_frontend',
      scope: this.pictureparkConfiguration.scope ? this.pictureparkConfiguration.scope : 'offline_access profile picturepark_api picturepark_account openid',
      authority: this.pictureparkConfiguration.stsServer,
      response_type: 'id_token token',
      filterProtocolClaims: true,
      loadUserInfo: true,
      redirect_uri: url + (redirectRoute ? redirectRoute : ''),
      post_logout_redirect_uri: url + (redirectRoute ? redirectRoute : ''),
      acr_values: 'tenant:{"id":"' + this.pictureparkConfiguration.customerId + '","alias":"' + this.pictureparkConfiguration.customerAlias + '"}'
    };

    return new UserManager(oidcSettings);
  }

  private userChanged(user: any) {
    this._username = user && user.profile && user.profile.name ? <string>user.profile.name : undefined;
    this._accessToken = user.access_token;

    if (!this._isAuthenticated && this._accessToken) {
      this._isAuthenticated = true;
      this.isAuthenticatedChanged.emit(this._isAuthenticated);
    } else if (this._isAuthenticated) {
      this._isAuthenticated = false;
      this.isAuthenticatedChanged.emit(this._isAuthenticated);
    }
  }

  private updateTokenIfRequired() {
    // TODO: Implement refresh
    return Promise.resolve();
  }
}

export interface PictureparkOidcAuthConfiguration extends PictureparkConfiguration {
  stsServer: string;
  redirectServer?: string;
  customerId?: string;
  clientId?: string;
  scope?: string;
}
