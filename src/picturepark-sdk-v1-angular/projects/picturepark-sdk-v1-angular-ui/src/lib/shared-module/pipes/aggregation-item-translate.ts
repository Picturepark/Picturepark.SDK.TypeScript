import { Pipe, PipeTransform, Injectable } from '@angular/core';

// LIBRARIES
import { AggregationResultItem } from '@picturepark/sdk-v1-angular';

@Injectable({ providedIn: 'root' })
@Pipe({ name: 'ppAggregationItemTranslate' })
export class AggregationItemTranslatePipe implements PipeTransform {
  constructor() {}

  transform(item: AggregationResultItem, locale: string): string {
    if (item) {
      return item.getDisplayName(locale);
    }
    return '';
  }
}
