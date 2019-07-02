import { Observable } from 'rxjs';
import { Component, LOCALE_ID, Inject, Input } from '@angular/core';

// LIBRARIES
import {
  ObjectAggregationResult, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ContentService
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { AggregationComponent } from '../../../../shared-module/components/aggregation-list/aggregation.component';

@Component({
  selector: 'pp-content-aggregation',
  templateUrl: './content-aggregation.component.html',
  styleUrls: ['./content-aggregation.component.scss']
})
export class ContentAggregationComponent extends AggregationComponent {
  // Used for performing aggregate request (autocomplete functionality).
  @Input()
  public channelId: string | undefined;

  // Used for expanding aggregation list (by default only first element is expanded).
  @Input()
  public isExpanded: boolean;

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
