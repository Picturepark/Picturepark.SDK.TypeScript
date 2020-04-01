import { Observable, of } from 'rxjs';
import { Component, Input, Injector } from '@angular/core';

import {
  ContentService, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ObjectAggregationResult, AggregatorBase
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { AggregationListComponent } from '../../shared-module/components/aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-content-aggregation-list',
  templateUrl: './content-aggregation-list.component.html',
  styleUrls: [
    '../../shared-module/components/aggregation-list/aggregation-list.component.scss',
    './content-aggregation-list.component.scss'
  ],
})
export class ContentAggregationListComponent extends AggregationListComponent {
  @Input()
  public channelId: string;

  constructor(protected injector: Injector,
    private contentService: ContentService) {
    super(injector);
  }

  protected fetchData(): Observable<ObjectAggregationResult | null> {
    if (this.channelId && this.aggregators && this.aggregators.length) {
      this.isLoading.next(true);
      const request = new ContentAggregationRequest({
        aggregators: this.aggregators,
        channelId: this.channelId,
        searchString: this.searchString,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        aggregationFilters: this.aggregationFilters,
        filter: this.baseFilter,
        searchType: ContentSearchType.MetadataAndFullText,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly
      });

      return this.contentService.aggregate(request);
    }

    return of(null);
  }

  public fetchSearchData = (searchString: string, aggregator: AggregatorBase): Observable<ObjectAggregationResult> => {
    const request = new ContentAggregationRequest({
      channelId: this.channelId,
      searchString: this.searchString,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      aggregators: [aggregator],
      aggregationFilters: this.aggregationFilters,
      filter: this.baseFilter,
      searchType: ContentSearchType.MetadataAndFullText,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly
    });

    return this.contentService.aggregate(request);
  }
}
