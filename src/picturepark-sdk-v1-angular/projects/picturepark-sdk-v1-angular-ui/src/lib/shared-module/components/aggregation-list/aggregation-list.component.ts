import { Component, Input, OnInit } from '@angular/core';
import {
  AggregationResult,
  AggregationResultItem,
  AggregatorBase,
  IEntityBase,
  SearchFacade,
  SearchInputState,
} from '@picturepark/sdk-v1-angular';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { BaseComponent } from '../../components/base.component';

@Component({
  selector: 'pp-aggregation-list',
  templateUrl: './aggregation-list.component.html',
  styleUrls: ['./aggregation-list.component.scss'],
})
export class AggregationListComponent extends BaseComponent implements OnInit {
  @Input()
  public facade: SearchFacade<IEntityBase, SearchInputState>;

  aggregators$: Observable<AggregatorBase[]>;
  loading$: Observable<boolean>;
  aggregationResults$: Observable<AggregationResult[]>;

  ngOnInit(): void {
    this.aggregators$ = this.facade.aggregators$.pipe(map((items) => this.filterDisabledAggregators(items)));

    // Show loading if it takes more than 100ms
    this.loading$ = this.facade.getLoadingInfos('initial').pipe(debounceTime(100));

    this.aggregationResults$ = this.facade.aggregationResults$.pipe(
      map((aggregationResults) => (!!aggregationResults ? this.processAggregationResults(aggregationResults) : []))
    );
  }

  public clearFilters(): void {
    this.facade.patchRequestState({ aggregationFilters: [] });
  }

  public trackByName(_index, aggregator: AggregatorBase) {
    return aggregator.name;
  }

  private processAggregationResults(aggregationResults: AggregationResult[]) {
    const aggregations: AggregationResult[] = [];
    const aggregationResultItemsToRemove: AggregationResultItem[] = [];
    const filteredAggregators = this.filterDisabledAggregators(this.facade.searchRequestState.aggregators);
    const disabledAggregators = this.facade.searchRequestState.aggregators.filter(
      (item) => !item.uiBehavior?.enableFilter
    );

    aggregationResults.forEach((aggregationResult) => {
      const nested = this.facade.expandAggregationResult(aggregationResult);
      const aggregatorIndex = filteredAggregators.findIndex(
        (aggregator) => nested.name === aggregator.name || nested.name === aggregator.aggregators?.[0]?.name
      );

      if (aggregatorIndex > -1) {
        aggregations[aggregatorIndex] = aggregationResult;
      }

      if (nested.aggregationResultItems) {
        const nestedToRemove = nested.aggregationResultItems.filter(
          (item) => item.active && disabledAggregators.find((da) => item.filter?.aggregationName === da.name)
        );

        aggregationResultItemsToRemove.push(...nestedToRemove);
      }
    });

    if (aggregationResultItemsToRemove?.length > 0) {
      this.facade.removeAggregationFilters(aggregationResultItemsToRemove);
    }

    return aggregations;
  }

  private filterDisabledAggregators(items: AggregatorBase[]) {
    return items.filter((item) => item.uiBehavior?.enableFilter);
  }
}
