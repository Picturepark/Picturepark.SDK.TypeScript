import { Pipe, PipeTransform, Injectable } from '@angular/core';

// LIBRARIES
import { AggregationResultItem } from '@picturepark/sdk-v2-angular';
import { TranslationService } from '../services/translations/translation.service';

@Injectable({ providedIn: 'root' })
@Pipe({ name: 'ppAggregationItemTranslate' })
export class AggregationItemTranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(item: AggregationResultItem, locale: string): string {
    let displayName = item.getDisplayName(locale);

    if (displayName === '') {
      displayName = this.translationService.translate('AggregationItemTranslatePipe.noValue');
    } else if (displayName === 'false' || displayName === 'true') {
      displayName = this.translationService.translate(`AggregationItemTranslatePipe.${displayName}`);
    }

    return displayName;
  }
}
