import { Output, EventEmitter, Injectable, Inject, Optional } from '@angular/core';
import { OidcSecurityService, AuthWellKnownEndpoints } from 'angular-auth-oidc-client';

import { PICTUREPARK_CONFIGURATION, PictureparkConfiguration, AuthService, PICTUREPARK_API_URL } from '@picturepark/sdk-v1-angular';

@Injectable()
export class OidcAuthService extends AuthService {
  private _isAuthorizing = false;
  private _isAuthorized = false;
  private _token: string | undefined = undefined;
  private _username: string | undefined = undefined;

  @Output()
  isAuthorizedChanged = new EventEmitter<boolean>();

  constructor(
    @Optional() @Inject(OidcSecurityService) private oidcSecurityService: OidcSecurityService,
    @Optional() @Inject(AuthWellKnownEndpoints) private authWellKnownEndpoints: AuthWellKnownEndpoints,
    @Optional() @Inject(PICTUREPARK_API_URL) private pictureparkApiUrl?: string,
    @Optional() @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration?: PictureparkOidcAuthConfiguration) {
    super(pictureparkConfiguration && pictureparkConfiguration.apiServer ? pictureparkConfiguration.apiServer : pictureparkApiUrl!);
    if (this.oidcSecurityService) {
      this.oidcSecurityService.getUserData().subscribe((userData) => this.userDataChanged(userData));
    }
  }

  get username() {
    return this._username;
  }

  get isAuthorizing() {
    return this._isAuthorizing;
  }

  get isAuthorized() {
    return this._isAuthorized;
  }

  login() {
    if (!this.authWellKnownEndpoints.authorization_endpoint) {
      this.authWellKnownEndpoints.onWellKnownEndpointsLoaded.subscribe(() => { this.oidcSecurityService.authorize(); });
    } else {
      this.oidcSecurityService.authorize();
    }
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  processAuthorizationRedirect() {
    this._isAuthorizing = true;
    this.oidcSecurityService.authorizedCallback();
  }

  transformHttpRequestOptions(options: any) {
    return this.updateTokenIfRequired().then(() => {
      if (options.headers) {
        if (this._token) {
          options.headers = options.headers.append('Authorization', 'Bearer ' + this._token);
        }

        if (this.pictureparkConfiguration && this.pictureparkConfiguration.customerAlias) {
          options.headers = options.headers.append('Picturepark-CustomerAlias', this.pictureparkConfiguration.customerAlias);
        }
      }
      return options;
    });
  }

  private userDataChanged(userData: any) {
    this._username = userData && userData.name ? <string>userData.name : undefined;
    this._token = this.oidcSecurityService.getToken();

    if (!this._isAuthorized && this._token) {
      this._isAuthorizing = false;
      this._isAuthorized = true;
      this.isAuthorizedChanged.emit(this._isAuthorized);
    } else if (this._isAuthorized) {
      this._isAuthorized = false;
      this.isAuthorizedChanged.emit(this._isAuthorized);
    }
  }

  private updateTokenIfRequired() {
    // TODO: Implement refresh
    return Promise.resolve();
  }
}

export interface PictureparkOidcAuthConfiguration extends PictureparkConfiguration {
  stsServer: string;
  clientId: string;
  scope: string;
}