import { Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// LIBRARIES
import {
  AggregationFilter, AggregationResult, ObjectAggregationResult,
  AggregatorBase, FilterBase, SearchFacade, SearchInputState
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../components/base.component';

export abstract class AggregationListComponent extends BaseComponent implements OnInit {
  // Filter used for search. E.g.: Nested filter,And filter,Or filter.
  @Output()
  public filterChange = new EventEmitter<FilterBase | null>();

  // Aggregation filters states connected to aggregators by index.
  private aggregationFiltersStates: Array<AggregationFilter[]> = [];

  public isLoading = new BehaviorSubject(false);

  public aggregationResults: AggregationResult[] = [];

  public abstract facade: SearchFacade<any, SearchInputState>;

  aggregators$: Observable<AggregatorBase[]>;

  ngOnInit(): void {
    this.aggregators$ = this.facade.aggregators$;

    this.sub = this.facade.searchResults$.subscribe(i => {
      if (i.aggregationResults) {
        this.processAggregationResults(i.aggregationResults)
      }
     });
  }

  public clearFilters(): void {
    this.aggregationFiltersStates = [];
    this.filterChange.emit(null);
    this.facade.patchRequestState({ aggregationFilters: [] });
  }

  public aggregationFiltersChanged(aggregatorIndex: number, aggregationFilters: AggregationFilter[]): void {
    this.aggregationFiltersStates[aggregatorIndex] = aggregationFilters;

    // flatten array and remove undefined.
    const aggFilters = ([] as AggregationFilter[]).concat(...this.aggregationFiltersStates).filter(item => item);

    this.facade.patchRequestState({ aggregationFilters: aggFilters });
  }

  public trackByName(index, aggregator: AggregatorBase) {
    return aggregator.name;
  }

  private processAggregationResults(aggregationResults: AggregationResult[]) {
    this.aggregationResults = [];

    aggregationResults.forEach(aggregationResult => {
      const nested = this.getNestedAggregator(aggregationResult);
      // tslint:disable-next-line:no-non-null-assertion
      const aggregatorIndex = this.facade.searchRequestState.aggregators.findIndex(aggregator => {
        return nested.name.indexOf(aggregator.name) !== -1;
      });

      if (aggregatorIndex > -1) {
        this.aggregationResults[aggregatorIndex] = aggregationResult;
      }
    });
  }

  private getNestedAggregator(aggregation: AggregationResult): AggregationResult {
    if (aggregation.aggregationResultItems) {

      const filtered: AggregationResult[][] = aggregation.aggregationResultItems.filter(item =>
        item.aggregationResults != null
      ).map(m => m.aggregationResults as AggregationResult[]);

      const aggs = filtered.reduce((acc, val) => acc.concat(val), []);

      if (aggs.length === 1) {
        return aggs[0];
      }
    }

    return aggregation;
  }
}
