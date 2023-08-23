import { StorageKey } from '@picturepark/sdk-v2-angular';
import { environment } from '../environments/environment';
import { TRANSLATIONS } from 'projects/picturepark-sdk-v2-angular-ui/src/lib/utilities/translations';
import { PictureparkCdnConfiguration } from '../models/cdn-config';
import { shareTranslations } from './translations/share-translations';
import { getDevCdnUrl, PictureparkAppSetting } from 'src/config';

const translations = TRANSLATIONS;
translations['ShareViewer'] = shareTranslations;

function getAttribute(attribute: string) {
  const appRootTag = document.getElementsByTagName('app-root')[0];
  return appRootTag.getAttribute(attribute);
}

function getCdnUrl(): string | null {
  if (!environment.production) {
    return getDevCdnUrl();
  }

  return getAttribute('picturepark-cdn-url');
}

export function PictureparkConfigurationFactory() {
  if (!environment.production) {
    const settings = PictureparkAppSetting();
    return <PictureparkCdnConfiguration>{
      apiServer: settings.apiServer,
      customerAlias: settings.customerAlias,
      cdnUrl: getCdnUrl(),
    };
  }

  return <PictureparkCdnConfiguration>{
    apiServer: getAttribute('picturepark-api-server'),
    customerAlias: getAttribute('picturepark-customer-alias'),
    cdnUrl: getCdnUrl(),
  };
}

export function PictureparkUIScriptPathFactory() {
  return getAttribute('picturepark-script-path');
}

export function getLanguageFactory(): string {
  const storedLanguage = localStorage.getItem(StorageKey.LanguageCode);
  const language = getAttribute('language');
  return storedLanguage ?? language ?? '';
}

export function getViewModeFactory(): 'grid' | 'list' {
  return getAttribute('view-mode') === 'list' ? 'list' : 'grid';
}

export function getDisableCookieConsentFactory(): boolean {
  return getAttribute('disable-cookie-consent') === 'true';
}

export function getTermsFactory(): boolean {
  return getAttribute('terms') === 'true';
}
