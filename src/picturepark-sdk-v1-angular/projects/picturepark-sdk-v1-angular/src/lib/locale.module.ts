import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';
import { LanguageService } from './services/language.service';
import { LocalStorageService } from './services/local-storage.service';
import { StorageKey } from './utilities/storage-key.enum';

export const LOCALE_LANGUAGE = new InjectionToken<string>('LOCALE_LANGUAGE');
export const CDN_URL = new InjectionToken<string>('CDN_URL');
export const ALLOWED_LANGUAGE = new InjectionToken<'system' | 'all'>('ALLOWED_LANGUAGE');

export function getLocaleFactory(localStorageService: LocalStorageService): string {
  return localStorageService.get(StorageKey.LanguageCode) || (navigator.language || navigator.languages[0]).slice(0, 2);
}

export function loadLanguagesFactory(
  localStorageService: LocalStorageService,
  languageService: LanguageService,
  allowedLanguages: 'system' | 'all',
  language?: string,
  cdnUrl?: string
): () => Promise<boolean> {
  const languageToSelect = language || getLocaleFactory(localStorageService);
  return () => {
    return languageService.loadLanguages(allowedLanguages, languageToSelect, cdnUrl).toPromise();
  };
}

@NgModule({})
export class LocaleModule {
  static forRoot(allowedLanguages: 'system' | 'all', language?: string, cdnUrl?: string | null): ModuleWithProviders {
    return {
      ngModule: LocaleModule,
      providers: [
        LanguageService,
        { provide: LOCALE_LANGUAGE, useValue: language ?? '' },
        { provide: CDN_URL, useValue: cdnUrl },
        { provide: ALLOWED_LANGUAGE, useValue: allowedLanguages },
        {
          provide: APP_INITIALIZER,
          useFactory: loadLanguagesFactory,
          deps: [LocalStorageService, LanguageService, ALLOWED_LANGUAGE, LOCALE_LANGUAGE, CDN_URL],
          multi: true,
        },
        { provide: LOCALE_ID, useFactory: getLocaleFactory, deps: [LocalStorageService] },
      ],
    };
  }
}
