import { Observable } from 'rxjs';
import { Component, Input, Injector } from '@angular/core';

import {
  ContentService, ContentAggregationRequest, BrokenDependenciesFilter,
  ContentSearchType, LifeCycleFilter, ObjectAggregationResult, AggregatorBase, ContentSearchFacade
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { AggregationListComponent } from '../../shared-module/components/aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-content-aggregation-list',
  templateUrl: './content-aggregation-list.component.html',
  styleUrls: [
    '../../shared-module/components/aggregation-list/aggregation-list.component.scss',
    './content-aggregation-list.component.scss'
  ],
})
export class ContentAggregationListComponent extends AggregationListComponent {

  @Input() public channelId: string | undefined;

  constructor(protected injector: Injector,
    private contentService: ContentService,
    public facade: ContentSearchFacade) {
    super(injector);
  }
}
