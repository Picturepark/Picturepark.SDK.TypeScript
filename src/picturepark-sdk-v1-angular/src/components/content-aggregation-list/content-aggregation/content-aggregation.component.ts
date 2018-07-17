import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import {
  ObjectAggregationResult, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ContentService
} from 'services/services';

import { AggregationComponent } from '../../aggregation-list/aggregation.component';

@Component({
  selector: 'pp-content-aggregation',
  templateUrl: './content-aggregation.component.html',
  styleUrls: ['./content-aggregation.component.scss']
})
export class ContentAggregationComponent extends AggregationComponent {

  constructor(private contentService: ContentService) {
    super();
  }

  protected fetchData(): Observable<ObjectAggregationResult> {
    const request = new ContentAggregationRequest({
      channelId: this.channelId,
      searchString: this.query,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      aggregators: [this.aggregator],
      aggregationFilters: this.globalAggregationFilters,
      searchType: ContentSearchType.MetadataAndFullText,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly
    });

    return this.contentService.aggregate(request);
  }
}
