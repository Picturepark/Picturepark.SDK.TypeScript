import { Observable, of } from 'rxjs';
import { Component, Input } from '@angular/core';

import {
  ContentService, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ObjectAggregationResult, Channel
} from '@picturepark/sdk-v1-angular';

import { AggregationListComponent } from '../aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-content-aggregation-list',
  templateUrl: './content-aggregation-list.component.html',
  styleUrls: ['./content-aggregation-list.component.scss'],
})
export class ContentAggregationListComponent extends AggregationListComponent {
  @Input()
  public channelId: string;

  constructor(private contentService: ContentService) {
    super();
  }

  protected fetchData(): Observable<ObjectAggregationResult | null> {
    if (this.channelId && this.aggregators) {
      this.isLoading = true;
      const request = new ContentAggregationRequest({
        aggregators: this.aggregators,
        channelId: this.channelId,
        searchString: this.query,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        aggregationFilters: this.aggregationFilters,
        searchType: ContentSearchType.MetadataAndFullText,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly
      });

      return this.contentService.aggregate(request);
    }

    return of(null);
  }
}
