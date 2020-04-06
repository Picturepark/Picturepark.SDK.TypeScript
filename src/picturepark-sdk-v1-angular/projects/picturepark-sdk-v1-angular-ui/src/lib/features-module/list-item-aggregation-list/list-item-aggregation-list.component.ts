import { Observable, of } from 'rxjs';
import { Component, Injector } from '@angular/core';

// LIBRARIES
import {
  BrokenDependenciesFilter, LifeCycleFilter,
  ObjectAggregationResult, ListItemAggregationRequest, ListItemService, AggregatorBase, ListItemSearchFacade
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
  constructor(private listItemService: ListItemService,
    protected injector: Injector,
    public facade: ListItemSearchFacade) {
    super(injector);
  }

  protected fetchData(): Observable<ObjectAggregationResult | null> {
    const aggregators = this.facade.searchRequestState.aggregators;

    if (aggregators && aggregators.length) {
      this.isLoading.next(true);

      const request = new ListItemAggregationRequest({
        schemaIds: this.facade.searchRequestState.schemaIds,
        aggregators: aggregators,
        searchString: this.facade.searchRequestState.searchString,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        aggregationFilters: this.facade.searchRequestState.aggregationFilters,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly,
        includeAllSchemaChildren: true,
      });

      return this.listItemService.aggregate(request);
    }

    return of(null);
  }

  public fetchSearchData = (searchString: string, aggregator: AggregatorBase): Observable<ObjectAggregationResult> => {
    const request = new ListItemAggregationRequest({
      schemaIds: this.facade.searchRequestState.schemaIds,
      searchString: this.facade.searchRequestState.searchString,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      aggregators: [aggregator],
      aggregationFilters: this.facade.searchRequestState.aggregationFilters,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      includeAllSchemaChildren: false
    });

    return this.listItemService.aggregate(request);
  }
}
