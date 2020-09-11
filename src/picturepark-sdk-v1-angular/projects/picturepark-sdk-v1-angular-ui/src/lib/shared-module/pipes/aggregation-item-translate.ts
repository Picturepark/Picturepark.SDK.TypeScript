import { Pipe, PipeTransform, LOCALE_ID, Inject, Injectable } from '@angular/core';

// LIBRARIES
import { AggregationResultItem } from '@picturepark/sdk-v1-angular';

@Injectable({ providedIn: 'root' })
@Pipe({ name: 'ppAggregationItemTranslate' })
export class AggregationItemTranslatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(item: AggregationResultItem): string {
    if (item) {
      return item.getDisplayName(this.locale);
    }
    return '';
  }
}
