import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InfoFacade } from '../facade/info.facade';
import { StorageKey } from '../utilities/storage-key.enum';
import { Language } from './api-services';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private defaultLanguage: string;
  public currentLanguage: Language;
  public languages: Language[];

  constructor(private infoFacade: InfoFacade, private localStorageService: LocalStorageService) {}

  public loadLanguages(locale?: string, cdnUrl?: string): Observable<boolean> {
    return this.infoFacade.getInfo(cdnUrl).pipe(
      map((info) => {
        this.languages = this.filterLanguages(info.languages, info.languageConfiguration.systemLanguages);
        this.defaultLanguage = info.languageConfiguration.defaultLanguage ?? info.languages[0].ietf;
        this.changeCurrentLanguage(locale || this.defaultLanguage);
        return locale === this.currentLanguage.ietf;
      })
    );
  }

  public changeCurrentLanguage(languageCode: string): void {
    this.currentLanguage = this.getLanguage(languageCode);
    this.localStorageService.set(StorageKey.LanguageCode, this.currentLanguage.ietf);
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
