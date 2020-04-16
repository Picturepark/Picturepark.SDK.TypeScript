import { InjectionToken } from '@angular/core';

export const PICTUREPARK_CDN = new InjectionToken<string>('PICTUREPARK_CDN');

export interface PictureparkCdnConfiguration {
    cdnUrl: string;
}


