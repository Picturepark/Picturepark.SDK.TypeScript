import { Observable, of } from 'rxjs';
import { Component, Injector } from '@angular/core';

import {
  ObjectAggregationResult, AggregatorBase, ShareService, ShareAggregationRequest, ShareSearchFacade
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { AggregationListComponent } from '../../shared-module/components/aggregation-list/aggregation-list.component';

@Component({
  selector: 'pp-share-aggregation-list',
  templateUrl: './share-aggregation-list.component.html',
  styleUrls: [
    '../../shared-module/components/aggregation-list/aggregation-list.component.scss',
    './share-aggregation-list.component.scss'
  ],
})
export class ShareAggregationListComponent extends AggregationListComponent {
  constructor(private shareService: ShareService,
    protected injector: Injector,
    public facade: ShareSearchFacade) {
    super(injector);
  }
}
