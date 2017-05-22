import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { TranslatedStringDictionary } from 'picturepark-sdk-v1-ng2';
import { translate } from '../translations';

@Pipe({name: 'pptranslate'})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
  }
  
  transform(value: string | TranslatedStringDictionary): string | null {
    if (value instanceof TranslatedStringDictionary)
      return value.translate(this.locale);
    else if (typeof value === 'string')
      return translate(value, this.locale);
    return null;
  }
}