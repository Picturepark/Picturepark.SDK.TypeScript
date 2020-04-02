import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { InfoFacade } from '../info.facade';
import { LocaleModule } from '../locale.module';
import { StorageKey } from '../utilities/storage-key.enum';
import { Language } from './api-services';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: LocaleModule })
export class LanguageService {
  private defaultLanguage: string;
  public currentLanguage: Language;
  public languages: Language[];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private infoFacade: InfoFacade,
    private localStorageService: LocalStorageService
  ) {}

  public loadLanguages(): Promise<boolean> {
    return this.infoFacade
      .getInfo()
      .pipe(
        map(info => {
          this.languages = this.filterLanguages(info.languages, info.languageConfiguration.systemLanguages);
          this.defaultLanguage = info.languageConfiguration.defaultLanguage ?? info.languages[0].ietf;
          this.changeCurrentLanguage(this.locale || this.defaultLanguage);
          return this.locale === this.currentLanguage.ietf;
        })
      )
      .toPromise();
  }

  public changeCurrentLanguage(languageCode: string): void {
    this.currentLanguage = this.getLanguage(languageCode);
    this.localStorageService.set(StorageKey.LanguageCode, this.currentLanguage.ietf);
  }

  private filterLanguages(languages: Language[], systemLanguages?: string[]): Language[] {
    return systemLanguages ? languages.filter(l => systemLanguages.some(sl => sl === l.ietf)) : languages;
  }

  private findLanguage(languageCode: string): Language | undefined {
    return this.languages.find(l => l.ietf === languageCode);
  }

  private getLanguage(languageCode: string): Language {
    return this.findLanguage(languageCode) ?? this.findLanguage(this.defaultLanguage) ?? this.languages[0];
  }
}
