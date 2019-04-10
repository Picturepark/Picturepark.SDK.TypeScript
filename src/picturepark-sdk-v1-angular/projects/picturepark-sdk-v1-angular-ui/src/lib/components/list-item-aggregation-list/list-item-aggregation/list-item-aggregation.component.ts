import { Observable } from 'rxjs';
import { Component, LOCALE_ID, Inject, Input } from '@angular/core';

import {
  ObjectAggregationResult, ListItemAggregationRequest, BrokenDependenciesFilter,
  LifeCycleFilter, ListItemService
} from '@picturepark/sdk-v1-angular';

import { AggregationComponent } from '../../aggregation-list/aggregation.component';


@Component({
  selector: 'pp-list-item-aggregation',
  templateUrl: './list-item-aggregation.component.html',
  styleUrls: ['./list-item-aggregation.component.scss']
})
export class ListItemAggregationComponent extends AggregationComponent {
  // Used for performing aggregate request (autocomplete functionality).
  @Input() schemaId: string;

  // Used for expanding aggregation list (by default only first element is expanded).
  @Input()
  public isExpanded: boolean;

  constructor(@Inject(LOCALE_ID) public locale: string, private listItemService: ListItemService) {
    super();
  }

  protected fetchData(): Observable<ObjectAggregationResult> {
    const request = new ListItemAggregationRequest({
      schemaIds: [this.schemaId],
      searchString: this.query,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      aggregators: [this.aggregator],
      aggregationFilters: this.globalAggregationFilters,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      includeAllSchemaChildren: false
    });

    return this.listItemService.aggregate(request);
  }
}
