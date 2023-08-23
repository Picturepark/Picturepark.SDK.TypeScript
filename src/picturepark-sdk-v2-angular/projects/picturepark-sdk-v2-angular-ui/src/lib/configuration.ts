import { InjectionToken } from '@angular/core';

export interface ConfigActions {
  [key: string]: boolean;
}

export interface PictureparkUIConfiguration {
  ContentBrowserComponent: ConfigActions;
  BasketComponent: ConfigActions;
  BrowserToolbarComponent: ConfigActions;
  ListBrowserComponent: ConfigActions;
}

export const PICTUREPARK_UI_CONFIGURATION = new InjectionToken<PictureparkUIConfiguration>(
  'PICTUREPARK_UI_CONFIGURATION'
);
export const PICTUREPARK_UI_SCRIPTPATH = new InjectionToken<string>('PICTUREPARK_UI_SCRIPTPATH');
export const VIEW_MODE = new InjectionToken<string>('VIEW_MODE');
export const DISABLE_COOKIE_CONSENT = new InjectionToken<string>('DISABLE_COOKIE_CONSENT');
export const TERMS = new InjectionToken<string>('TERMS');

export function PictureparkUIConfigurationFactory() {
  return <PictureparkUIConfiguration>{
    ContentBrowserComponent: {
      download: true,
      select: true,
      share: true,
      preview: true,
      basket: true,
    },
    BasketComponent: {
      download: true,
      select: false,
      share: true,
    },
    BrowserToolbarComponent: {
      select: true,
    },
    ListBrowserComponent: {
      download: true,
      select: true,
      share: true,
    },
  };
}
