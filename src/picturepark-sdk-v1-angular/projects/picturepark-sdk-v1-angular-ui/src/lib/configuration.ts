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
            download: true,
            select: true,
            share: true,
            preview: true
        },
        'BasketComponent': {
            download: true,
            select: false,
            share: true
        },
        'ListBrowserComponent': {
            download: true,
            select: true,
            share: true
        }
    };
}
