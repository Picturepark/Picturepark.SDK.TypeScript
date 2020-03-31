import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { InfoService, Language, LocalStorageService, StorageKey } from '@picturepark/sdk-v1-angular';
import { IOptionModel } from '../../models/ioption.model';
import { LocalizationService } from '../localization/localization.service';
import { FALLBACK_LANGUAGE } from '../../../utilities/constants';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly locale: string;
  public currentLanguage: Language;
  public languages: Language[];
  public languageOptions: IOptionModel[];

  public get currentLanguageCode(): string {
    return this.currentLanguage.ietf;
  }

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private infoService: InfoService,
    private localizationService: LocalizationService,
    private localStorageService: LocalStorageService
  ) {
    this.locale = this.localeId?.split('-', 1)[0];
  }

  public loadLanguages(): Promise<boolean> {
    return this.infoService
      .getInfo()
      .pipe(
        map(result => {
          this.languages = result.languages;
          this.setCurrentLanguage(true);
          this.processLanguages(
            result.languageConfiguration.systemLanguages ?? [FALLBACK_LANGUAGE],
            result.languageConfiguration.defaultLanguage ?? FALLBACK_LANGUAGE
          );
          return true;
        })
      )
      .toPromise();
  }

  public changeCurrentLanguage(languageCode: string): void {
    this.localStorageService.set(StorageKey.LanguageCode, languageCode);
    this.setCurrentLanguage();
  }

  private findLanguage(languageCode: string): Language | undefined {
    return this.languages.find(l => l.ietf === languageCode);
  }

  private getCurrentLanguage(): Language {
    return (
      this.findLanguage(this.localStorageService.get(StorageKey.LanguageCode)) ??
      this.findLanguage(this.locale) ??
      this.languages[0]
    );
  }

  private processLanguages(systemLanguages: string[], systemDefaultLanguage: string): void {
    this.languageOptions = this.languages.reduce((processedLanguages: IOptionModel[], lang: Language) => {
      if (systemLanguages.indexOf(lang.ietf) !== -1) {
        processedLanguages.push(<IOptionModel>{
          name: this.localizationService.localizeLang(
            lang.name,
            this.currentLanguageCode ?? systemDefaultLanguage,
            systemLanguages
          ),
          value: lang.ietf,
        });
      }

      return processedLanguages;
    }, []);
  }

  private setCurrentLanguage(persist: boolean = false): void {
    this.currentLanguage = this.getCurrentLanguage();
    if (persist) {
      this.localStorageService.set(StorageKey.LanguageCode, this.currentLanguage.ietf);
    }
  }
}
