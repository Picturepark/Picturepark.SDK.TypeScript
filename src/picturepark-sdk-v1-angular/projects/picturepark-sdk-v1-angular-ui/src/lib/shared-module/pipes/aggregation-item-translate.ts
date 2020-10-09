import { Pipe, PipeTransform, Injectable } from '@angular/core';

// LIBRARIES
import { AggregationResultItem } from '@picturepark/sdk-v1-angular';
import { TranslationService } from '@picturepark/sdk-v1-angular-ui';

@Injectable({ providedIn: 'root' })
@Pipe({ name: 'ppAggregationItemTranslate' })
export class AggregationItemTranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(item: AggregationResultItem, locale: string): string {
    const displayName = item.getDisplayName(locale);

    if (displayName === '') {
      return this.translationService.translate('AggregationItemTranslatePipe.noValue');
    } else {
      return displayName;
    }
  }
}
