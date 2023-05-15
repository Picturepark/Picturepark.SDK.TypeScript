import { InjectionToken, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { LiquidRenderingService } from './liquid-rendering.service';

export const PICTUREPARK_CONFIGURATION = new InjectionToken<string>('PICTUREPARK_CONFIGURATION');

export abstract class PictureparkServiceBase {
  liquidRenderingService = inject(LiquidRenderingService);

  constructor(private authService: AuthService) {}

  getBaseUrl(defaultUrl: string) {
    return this.authService.apiServer;
  }

  protected transformOptions(options: any) {
    return this.authService.transformHttpRequestOptions(options);
  }
}
