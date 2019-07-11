import { Observable } from 'rxjs';
import { Component, LOCALE_ID, Inject, Input } from '@angular/core';

// LIBRARIES
import {
  ObjectAggregationResult, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ContentService
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { AggregationComponent } from '../../../../shared-module/components/aggregation/aggregation.component';

@Component({
  selector: 'pp-content-aggregation',
  templateUrl: '../../../../shared-module/components/aggregation/aggregation.component.html',
  styleUrls: [
    '../../../../shared-module/components/aggregation/aggregation.component.scss',
    './content-aggregation.component.scss'
  ]
})
export class ContentAggregationComponent extends AggregationComponent {
  // Used for performing aggregate request (autocomplete functionality).
  @Input()
  public channelId: string | undefined;

  constructor(@Inject(LOCALE_ID) public locale: string, private contentService: ContentService) {
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
