import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { LanguageService } from './services/language.service';
import { LocalStorageService } from './services/local-storage.service';
import { StorageKey } from './utilities/storage-key.enum';

export function languageFactory(
  localStorageService: LocalStorageService,
  languageService: LanguageService
): () => Promise<boolean> {
  const languageToSelect = localeFactory(localStorageService);
  return () => {
    return languageService.loadLanguages(languageToSelect);
  };
}

export function localeFactory(localStorageService: LocalStorageService): string {
  return localStorageService.get(StorageKey.LanguageCode) || (navigator.language || navigator.languages[0]).slice(0, 2);
}

@NgModule({})
export class LocaleModule {
  static forRoot(factory: Function = localeFactory): ModuleWithProviders {
    return {
      ngModule: LocaleModule,
      providers: [
        LanguageService,
        {
          provide: APP_INITIALIZER,
          useFactory: languageFactory,
          deps: [LocalStorageService, LanguageService],
          multi: true,
        },
        { provide: LOCALE_ID, useFactory: factory, deps: [LocalStorageService] },
      ],
    };
  }
}
