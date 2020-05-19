import { Pipe, PipeTransform, LOCALE_ID, Inject, Injectable } from '@angular/core';

// LIBRARIES
import { TranslatedStringDictionary } from '@picturepark/sdk-v1-angular';

// INTERFACES
import { translate } from '../../utilities/translations';
@Injectable({ providedIn: 'root' })
@Pipe({ name: 'pptranslate' })
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: string | TranslatedStringDictionary | undefined | null, replacement?: any): string {
    if (value) {
      if (value instanceof TranslatedStringDictionary) {
        return value.translate(this.locale);
      } else if (typeof value === 'string' && typeof replacement !== 'object') {
        return translate(value, this.locale).replace('{0}', replacement);
      } else if (replacement && replacement.length === 2) {
        return translate(value, this.locale).replace('{0}', replacement[0]).replace('{1}', replacement[1]);
      }
    }
    return '';
  }
}
