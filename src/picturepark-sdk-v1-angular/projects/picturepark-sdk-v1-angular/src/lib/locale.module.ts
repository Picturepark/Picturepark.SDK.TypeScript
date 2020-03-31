import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { StorageKey } from './storage-key.enum';

export function LocaleIdFactory(localStorageService: LocalStorageService): string {
  return (
    localStorageService.get(StorageKey.LanguageCode) ||
    ((<any>navigator).languages ? (<any>navigator).languages[0] : navigator.language)
  );
}

@NgModule({})
export class LocaleModule {
  static forRoot(config: Function = LocaleIdFactory): ModuleWithProviders {
    return {
      ngModule: LocaleModule,
      providers: [LocalStorageService, { provide: LOCALE_ID, useFactory: config, deps: [LocalStorageService] }],
    };
  }
}
