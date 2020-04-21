import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { CustomerInfo } from '@picturepark/sdk-v1-angular';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  public localize(langObj: Object, customerInfo: CustomerInfo): string {
    if (!langObj) {
      // language object not defined,
      // return empty string.
      return '';
    }

    let lang = this.locale;

    if (!langObj.hasOwnProperty(this.locale)) {
      const sl = customerInfo.languageConfiguration.systemLanguages;

      if (!sl || (sl && (sl.length === 0 || !langObj.hasOwnProperty(sl[0])))) {
        // language object doesn't have lang entry,
        // take default or first language property from language object.
        return langObj['x-default'] || langObj[Object.keys(langObj)[0]];
      }

      lang = sl[0];
    }

    return langObj[lang];
  }
}
