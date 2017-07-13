import { Inject, OpaqueToken } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';
import { AuthService } from './picturepark.services';

export abstract class PictureparkServiceBase {
    public constructor(private authService: AuthService) {
    }
    
    getBaseUrl(defaultUrl: string) {
        return this.authService.apiServer;
    }

    protected transformOptions(options: RequestOptionsArgs) {
        return this.authService.updateTokenIfRequired().then(() => {
            if (options.headers) {
                if (this.authService.token) {
                    options.headers.append("Authorization", "Bearer " + this.authService.token);
                }
                
                if (this.authService.customerAlias) {
                    options.headers.append("Picturepark-CustomerAlias", this.authService.customerAlias);
                }
            }

            return options;
        });
    }
}