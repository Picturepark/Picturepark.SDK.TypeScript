import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';

import { translate } from '../utilities/translations';
import { TranslatedStringDictionary } from '../services/picturepark.services';

@Pipe({ name: 'pptranslate' })
export class TranslatePipe implements PipeTransform {
  constructor( @Inject(LOCALE_ID) private locale: string) {
  }

  transform(value: string | TranslatedStringDictionary, replacement?: string): string | null {
    if (value instanceof TranslatedStringDictionary) {
      return value.translate(this.locale);
    } else if (typeof value === 'string') {
      return translate(value, this.locale).replace('{0}', replacement);
    }
    return null;
  }
}
