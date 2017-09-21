import { Inject, OpaqueToken } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';
import { AuthService } from './picturepark.services';

export const PICTUREPARK_CONFIGURATION = new OpaqueToken('PICTUREPARK_CONFIGURATION');

export abstract class PictureparkServiceBase {
    public constructor(private authService: AuthService) {
    }

    getBaseUrl(defaultUrl: string) {
        return this.authService.apiServer;
    }

    protected transformOptions(options: RequestOptionsArgs) {
        return this.authService.transformHttpRequestOptions(options);
    }
}
