import { Observable, of } from 'rxjs';
import { Component, Injector } from '@angular/core';

import {
  ObjectAggregationResult, AggregatorBase, ShareService, ShareAggregationRequest
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { AggregationListComponent } from '../../shared-module/components/aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-share-aggregation-list',
  templateUrl: './share-aggregation-list.component.html',
  styleUrls: [
    '../../shared-module/components/aggregation-list/aggregation-list.component.scss',
    './share-aggregation-list.component.scss'
  ],
})
export class ShareAggregationListComponent extends AggregationListComponent {
  constructor(private shareService: ShareService,
    protected injector: Injector) {
    super(injector);
  }

  protected fetchData(): Observable<ObjectAggregationResult | null> {
    if (this.aggregators && this.aggregators.length) {
      this.isLoading.next(true);
      const request = new ShareAggregationRequest({
        aggregators: this.aggregators,
        searchString: this.searchString || '',
        aggregationFilters: this.aggregationFilters
      });

      return this.shareService.aggregate(request);
    }

    return of(null);
  }

  public fetchSearchData = (searchString: string, aggregator: AggregatorBase): Observable<ObjectAggregationResult> => {
    const request = new ShareAggregationRequest({
      searchString: this.searchString || '',
      aggregators: [aggregator],
      aggregationFilters: this.aggregationFilters
    });

    return this.shareService.aggregate(request);
  }
}
