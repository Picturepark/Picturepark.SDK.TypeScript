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
}
