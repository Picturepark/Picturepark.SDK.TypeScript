import { Injectable } from '@angular/core';
import { FALLBACK_LANGUAGE } from '../../../utilities/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor() {}

  public localize(langObj: Object, customerInfo: any): string {
    if (!langObj) {
      // language object not defined,
      // return empty string.
      return '';
    }
    let lang = customerInfo.languageConfiguration.systemLanguages[0];
    const languages = customerInfo.languageConfiguration.systemLanguages;

    if (languages.indexOf(lang) === -1) {
      lang = languages[0];
    }

    if (!langObj.hasOwnProperty(lang)) {
      // language object doesn't have lang entry,
      // take first language property from language object.
      return langObj[Object.keys(langObj)[0]];
    }

    return langObj[lang];
  }

  public localizeLang(langObj: Object, lang: string, systemLanguages: string[]): string {
    if (!langObj) {
      // language object not defined,
      // return empty string.
      return '';
    }

    if (systemLanguages.indexOf(lang) === -1) {
      // Try to fall back,
      // otherwise take first language from supported languages.
      if (langObj.hasOwnProperty(FALLBACK_LANGUAGE)) {
        lang = FALLBACK_LANGUAGE;
      } else {
        lang = systemLanguages[0];
      }
    }

    if (!langObj.hasOwnProperty(lang)) {
      // language object doesn't have lang entry,
      // take first language property from language object.
      return langObj[Object.keys(langObj)[0]];
    }

    return langObj[lang];
  }
}
