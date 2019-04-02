import { Observable } from 'rxjs';
import { Component, LOCALE_ID, Inject, Input } from '@angular/core';

import {
  ObjectAggregationResult, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ContentService, AggregationResultItem
} from '@picturepark/sdk-v1-angular';

import { AggregationComponent } from '../../aggregation-list/aggregation.component';

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


  get showLess(): boolean {
    return !!this.expandedAggregationResult && !!this.expandedAggregationResult.aggregationResultItems && this.expandedAggregationResult.aggregationResultItems.filter(x => x && !x.active).length > this.pagingSize;
  }

  get active(): boolean {
    return !!this.expandedAggregationResult && !!this.expandedAggregationResult.aggregationResultItems && this.expandedAggregationResult.aggregationResultItems.filter(x => x && x.count > 0 || x.active).length >= 1;
  }

  public trackByName(index, aggregationResultItem: AggregationResultItem) {
    return aggregationResultItem.name;
  }
}
