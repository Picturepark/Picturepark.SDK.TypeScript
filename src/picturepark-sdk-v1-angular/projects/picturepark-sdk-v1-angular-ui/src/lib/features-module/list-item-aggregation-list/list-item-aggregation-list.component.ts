import { Observable, of } from 'rxjs';
import { Component, Input, Injector } from '@angular/core';

// LIBRARIES
import {
  BrokenDependenciesFilter, LifeCycleFilter,
  ObjectAggregationResult, ListItemAggregationRequest, ListItemService, AggregatorBase
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { AggregationListComponent } from '../../shared-module/components/aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-list-item-aggregation-list',
  templateUrl: './list-item-aggregation-list.component.html',
  styleUrls: [
    '../../shared-module/components/aggregation-list/aggregation-list.component.scss',
    './list-item-aggregation-list.component.scss'
  ],
})
export class ListItemAggregationListComponent extends AggregationListComponent {
  @Input() schemaId: string;
  constructor(private listItemService: ListItemService,
    protected injector: Injector) {
    super(injector);
  }

  protected fetchData(): Observable<ObjectAggregationResult | null> {
    if (this.aggregators && this.aggregators.length) {
      this.isLoading.next(true);

      const request = new ListItemAggregationRequest({
        schemaIds: [this.schemaId],
        aggregators: this.aggregators,
        searchString: this.searchString || '',
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        aggregationFilters: this.aggregationFilters,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly,
        includeAllSchemaChildren: true,
      });

      return this.listItemService.aggregate(request);
    }

    return of(null);
  }

  public fetchSearchData = (searchString: string, aggregator: AggregatorBase): Observable<ObjectAggregationResult | null> => {
    const request = new ListItemAggregationRequest({
      schemaIds: [this.schemaId],
      searchString: this.searchString || '',
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      aggregators: [aggregator],
      aggregationFilters: this.aggregationFilters,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      includeAllSchemaChildren: false
    });

    return this.listItemService.aggregate(request);
  }
}
