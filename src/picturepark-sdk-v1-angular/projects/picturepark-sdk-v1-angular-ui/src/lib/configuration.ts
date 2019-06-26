import { InjectionToken } from '@angular/core';

export interface ConfigActions {
    [key: string]: boolean;
}

export interface PictureparkUIConfiguration {
    'ContentBrowserComponent': ConfigActions;
    'BasketComponent': ConfigActions;
}

export const PICTUREPARK_UI_CONFIGURATION = new InjectionToken<string>('PICTUREPARK_UI_CONFIGURATION');

export function PictureparkUIConfigurationFactory() {
    return<PictureparkUIConfiguration> {
        'ContentBrowserComponent': {
            select: true,
            downloadContent: true,
            shareContent: true
        },
        'BasketComponent': {
            downloadContent: true,
            shareContent: true
        }
    };
}
