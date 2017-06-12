import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { TranslatedStringDictionary } from '@picturepark/sdk-v1-angular';
import { translate } from '../translations';

@Pipe({ name: 'pptranslate' })
export class TranslatePipe implements PipeTransform {
  constructor( @Inject(LOCALE_ID) private locale: string) {
  }

  transform(value: string, replacement?: string): string | null {
    if (typeof value === 'string')
      return translate(value, this.locale).replace('{0}', replacement);
    return null;
  }
}