import { Observable, of } from 'rxjs';
import { Component, Input } from '@angular/core';

import {
  BrokenDependenciesFilter, LifeCycleFilter,
  ObjectAggregationResult, ListItemAggregationRequest, ListItemService
} from '@picturepark/sdk-v1-angular';

import { AggregationListComponent } from '../aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-list-item-aggregation-list',
  templateUrl: './list-item-aggregation-list.component.html',
  styleUrls: ['./list-item-aggregation-list.component.scss'],
})
export class ListItemAggregationListComponent extends AggregationListComponent {
  @Input() schemaId: string;
  constructor(private listItemService: ListItemService) {
    super();
  }

  protected fetchData(): Observable<ObjectAggregationResult | null> {
    if (this.aggregators && this.aggregators.length) {
      this.isLoading.next(true);

      const request = new ListItemAggregationRequest({
        schemaIds: [this.schemaId],
        aggregators: this.aggregators,
        searchString: this.query,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        aggregationFilters: this.aggregationFilters,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly,
        includeAllSchemaChildren: true,
      });

      return this.listItemService.aggregate(request);
    }

    return of(null);
  }
}
