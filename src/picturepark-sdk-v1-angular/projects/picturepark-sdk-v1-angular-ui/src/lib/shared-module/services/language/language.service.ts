import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { InfoService, Language, LocalStorageService, StorageKey } from '@picturepark/sdk-v1-angular';
import { FALLBACK_LANGUAGE } from '../../../utilities/constants';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly locale: string;
  private fallbackLanguage: string;
  public currentLanguage: Language;
  public languages: Language[];

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private infoService: InfoService,
    private localStorageService: LocalStorageService
  ) {
    this.locale = this.localeId.split('-', 1)[0];
    this.localStorageService.set(StorageKey.LanguageCode, this.locale);
  }

  public loadLanguages(): Promise<boolean> {
    return this.infoService
      .getInfo()
      .pipe(
        map(result => {
          this.fallbackLanguage = result.languageConfiguration.defaultLanguage ?? FALLBACK_LANGUAGE;
          this.languages = result.languages;
          this.currentLanguage = this.getCurrentLanguage();
          return true;
        })
      )
      .toPromise();
  }

  public changeCurrentLanguage(languageCode: string): void {
    this.localStorageService.set(StorageKey.LanguageCode, languageCode);
    this.currentLanguage = this.getCurrentLanguage();
  }

  private findLanguage(languageCode: string): Language | undefined {
    return this.languages.find(l => l.ietf === languageCode);
  }

  private getCurrentLanguage(): Language {
    return this.findLanguage(this.locale) ?? this.findLanguage(this.fallbackLanguage) ?? this.languages[0];
  }
}
