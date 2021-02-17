import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InfoFacade } from '../facade/info.facade';
import { StorageKey } from '../utilities/storage-key.enum';
import { Language } from './api-services';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public defaultLanguage: string;
  public currentLanguage: Language;
  public languages: Language[];
  public shareLanguages: Language[];

  constructor(private infoFacade: InfoFacade, private localStorageService: LocalStorageService) {}

  public loadLanguages(
    allowedLanguages: 'system' | 'share' | 'all',
    locale?: string,
    cdnUrl?: string
  ): Observable<boolean> {
    return this.infoFacade.getInfo(cdnUrl).pipe(
      map((info) => {
        this.languages = this.filterLanguages(
          info.languages,
          allowedLanguages === 'system'
            ? info.languageConfiguration.systemLanguages
            : allowedLanguages === 'share'
            ? info.languageConfiguration.shareLanguages
            : undefined
        );
        this.defaultLanguage = info.languageConfiguration.defaultLanguage ?? info.languages[0].ietf;
        this.changeCurrentLanguage(locale || this.defaultLanguage, false);
        this.shareLanguages = this.filterLanguages(info.languages, info.languageConfiguration.shareLanguages);
        return locale === this.currentLanguage.ietf;
      })
    );
  }

  public changeCurrentLanguage(languageCode: string, saveToStorage = true): void {
    this.currentLanguage = this.getLanguage(languageCode);
    if (saveToStorage) {
      this.localStorageService.set(StorageKey.LanguageCode, this.currentLanguage.ietf);
    }
  }

  private filterLanguages(languages: Language[], systemLanguages?: string[]): Language[] {
    return systemLanguages ? languages.filter((l) => systemLanguages.some((sl) => sl === l.ietf)) : languages;
  }

  private findLanguage(languageCode: string): Language | undefined {
    return this.languages.find((l) => l.ietf === languageCode);
  }

  private getLanguage(languageCode: string): Language {
    return this.findLanguage(languageCode) ?? this.findLanguage(this.defaultLanguage) ?? this.languages[0];
  }
}
