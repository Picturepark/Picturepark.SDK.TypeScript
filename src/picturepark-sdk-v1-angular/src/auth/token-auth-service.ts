import { Output, EventEmitter, Injectable, Inject, Optional } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';

import { PICTUREPARK_CONFIGURATION } from '../picturepark.servicebase';
import { PictureparkConfiguration } from '../picturepark.config';
import { AuthService, PICTUREPARK_API_URL } from '../picturepark.services';

@Injectable()
export class TokenAuthService extends AuthService {
    private _isAuthorizing = false;
    private _isAuthorized = false;
    private _token: string | undefined = undefined;
    private _username: string | undefined = undefined;

    constructor(
        @Optional() @Inject(PICTUREPARK_API_URL) private pictureparkApiUrl?: string,
        @Optional() @Inject(PICTUREPARK_CONFIGURATION) private pictureparkConfiguration?: PictureparkConfiguration) {
        super(pictureparkConfiguration && pictureparkConfiguration.apiServer ? pictureparkConfiguration.apiServer : pictureparkApiUrl!);
    }

    transformHttpRequestOptions(options: RequestOptionsArgs): Promise<RequestOptionsArgs> {
        if (options.headers) {
            if (this.pictureparkConfiguration && this.pictureparkConfiguration.accessToken) {
                options.headers.append('Authorization', 'Bearer ' + this.pictureparkConfiguration.accessToken);
            }

            if (this.pictureparkConfiguration && this.pictureparkConfiguration.customerAlias) {
                options.headers.append('Picturepark-CustomerAlias', this.pictureparkConfiguration.customerAlias);
            }
        }
        return Promise.resolve(options);
    }
}
