import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';

import {
  ContentService, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ObjectAggregationResult
} from '../../services/services';

import { AggregationListComponent } from '../aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-content-aggregation-list',
  templateUrl: './content-aggregation-list.component.html',
  styleUrls: ['./content-aggregation-list.component.scss'],
})
export class ContentAggregationListComponent extends AggregationListComponent {

  constructor(private contentService: ContentService) {
    super();
  }

  protected fetchData(): Observable<ObjectAggregationResult | null> {
    if (this.channel) {
      this.isLoading = true;
      const request = new ContentAggregationRequest({
        aggregators: this.aggregators,
        channelId: this.channel.id,
        searchString: this.query,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        aggregationFilters: this.aggregationFiltersFlat,
        searchType: ContentSearchType.MetadataAndFullText,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly
      });

      return this.contentService.aggregate(request);
    }

    return of(null);
  }
}
