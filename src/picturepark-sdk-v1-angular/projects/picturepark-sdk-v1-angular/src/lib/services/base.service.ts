import { InjectionToken } from '@angular/core';
import { AuthService } from './auth.service';

export const PICTUREPARK_CONFIGURATION = new InjectionToken<string>('PICTUREPARK_CONFIGURATION');

export abstract class PictureparkServiceBase {
  public constructor(private authService: AuthService) {}

  getBaseUrl(defaultUrl: string) {
    return this.authService.apiServer;
  }

  protected transformOptions(options: any) {
    return this.authService.transformHttpRequestOptions(options);
  }
}
