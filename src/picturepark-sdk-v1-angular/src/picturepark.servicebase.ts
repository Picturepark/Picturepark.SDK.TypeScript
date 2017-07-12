import { Inject, OpaqueToken } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';
import { AuthService } from './index';

export const PICTUREPARK_REFRESH_TOKEN = new OpaqueToken('PICTUREPARK_REFRESH_TOKEN');

export class PictureparkServiceBase {
    public constructor(private authService: AuthService) {
    }

    protected transformOptions(options: RequestOptionsArgs) {
        return this.authService.updateTokenIfRequired().then(() => {
            if (options.headers) {
                if (this.authService.token) {
                    options.headers.append("Authorization", "Bearer " + this.authService.token);
                }
                options.headers.append("CustomerAlias", "dev");
            }

            debugger;
            return options;
        });
    }
}