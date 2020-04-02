import { APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { LanguageService } from './services/language.service';
import { LocalStorageService } from './services/local-storage.service';
import { StorageKey } from './utilities/storage-key.enum';

export function languageFactory(languageService: LanguageService) {
  const result = () => languageService.loadLanguages();
  return result;
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
          deps: [LanguageService],
          multi: true,
        },
        { provide: LOCALE_ID, useFactory: factory, deps: [LocalStorageService] },
      ],
    };
  }
}
