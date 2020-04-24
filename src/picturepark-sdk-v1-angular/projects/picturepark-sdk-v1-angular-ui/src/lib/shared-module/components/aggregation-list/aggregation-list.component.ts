import { OnInit, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

// LIBRARIES
import {
  AggregationResult,
  AggregatorBase,
  SearchFacade,
  SearchInputState,
  IEntityBase,
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../components/base.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pp-aggregation-list',
  templateUrl: './aggregation-list.component.html',
  styleUrls: ['./aggregation-list.component.scss'],
})
export class AggregationListComponent extends BaseComponent implements OnInit {
  @Input()
  public facade: SearchFacade<IEntityBase, SearchInputState>;

  public aggregationResults: AggregationResult[] = [];

  aggregators$: Observable<AggregatorBase[]>;
  loading$: Observable<boolean>;

  ngOnInit(): void {
    this.aggregators$ = this.facade.aggregators$;

    // Show loading if it takes more than 100ms
    this.loading$ = this.facade.getLoadingInfos('initial').pipe(debounceTime(100));

    this.sub = this.facade.aggregationResults$.subscribe((i) => {
      if (i) {
        this.processAggregationResults(i);
      }
    });
  }

  public clearFilters(): void {
    this.facade.patchRequestState({ aggregationFilters: [] });
  }

  public trackByName(_index, aggregator: AggregatorBase) {
    return aggregator.name;
  }

  private processAggregationResults(aggregationResults: AggregationResult[]) {
    this.aggregationResults = [];

    aggregationResults.forEach((aggregationResult) => {
      const nested = this.facade.expandAggregationResult(aggregationResult);
      const aggregatorIndex = this.facade.searchRequestState.aggregators.findIndex((aggregator) =>
        nested.name.includes(aggregator.name)
      );

      if (aggregatorIndex > -1) {
        this.aggregationResults[aggregatorIndex] = aggregationResult;
      }
    });
  }
}
