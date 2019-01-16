import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

import {
  AggregationFilter, AggregationResult, ObjectAggregationResult,
  AggregatorBase, FilterBase, OrFilter, AndFilter
} from '@picturepark/sdk-v1-angular';
import { BaseComponent } from '../base.component';

export abstract class AggregationListComponent extends BaseComponent implements OnChanges {
  @Input()
  public query = '';

  @Input()
  public aggregators: AggregatorBase[] | null = [];

  // Filter used for search. E.g.: Nested filter,And filter,Or filter.
  @Output()
  public filterChange = new EventEmitter<FilterBase | null>();

  @Input()
  // Aggregation filters used for Aggregation function.
  public aggregationFilters: AggregationFilter[] = [];

  @Output()
  public aggregationFiltersChange = new EventEmitter<AggregationFilter[]>();

  // Aggregation filters states connected to aggregators by index.
  private aggregationFiltersStates: Array<AggregationFilter[]> = [];

  public isLoading = true;

  public aggregationResults: AggregationResult[] = [];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['aggregators'] && changes['aggregators'].previousValue && this.aggregators) {
      this.aggregationResults = [];
      this.aggregationFiltersStates = [];
      this.aggregationFilters = [];
      this.aggregationFiltersChange.emit([]);
      this.filterChange.emit(null);
    }

    if (changes['aggregators'] || changes['query'] || changes['aggregationFilters']) {
      this.updateData();
    }
  }

  protected abstract fetchData(): Observable<ObjectAggregationResult | null>;

  public clearFilters(): void {
    this.aggregationFiltersStates = [];
    this.aggregationFilters = [];
    this.aggregationFiltersChange.emit([]);
    this.filterChange.emit(null);
    this.updateData();
  }

  public aggregationFiltersChanged(aggregatorIndex: number, aggregationFilters: AggregationFilter[]): void {
    this.aggregationFiltersStates[aggregatorIndex] = aggregationFilters;

    // flatten array and remove undefined.
    this.aggregationFilters = ([] as AggregationFilter[]).concat(...this.aggregationFiltersStates).filter(item => item);
    const resultFilter = this.getFilter(this.aggregationFiltersStates);

    this.aggregationFiltersChange.emit(this.aggregationFilters);
    this.filterChange.emit(resultFilter);

    this.updateData();
  }

  private updateData() {
    const fetchDataSubscription = this.fetchData()
      .pipe(filter((result) => result !== null))
      .subscribe((result: ObjectAggregationResult) => {
        this.processAggregationResults(result.aggregationResults || []);
        this.isLoading = false;
      });
    this.subscription.add(fetchDataSubscription);
  }

  private getFilter(aggregationFilters: Array<AggregationFilter[]>): FilterBase | null {
    const preparedFilters = aggregationFilters
      .map(array => {
        const filtered = array.filter(aggregationFilter => aggregationFilter.filter)
          .map(aggregationFilter => aggregationFilter.filter as FilterBase);

        switch (filtered.length) {
          case 0: return null;
          case 1: return filtered[0];
          default: return new OrFilter({ filters: filtered });
        }
      })
      .filter(value => value !== null);

    switch (preparedFilters.length) {
      case 0: return null;
      case 1: return preparedFilters[0];
      default: return new AndFilter({ filters: preparedFilters as FilterBase[] });
    }
  }

  private processAggregationResults(aggregationResults: AggregationResult[]) {
    this.aggregationResults = [];

    aggregationResults.forEach(aggregationResult => {
      // tslint:disable-next-line:no-non-null-assertion
      const aggregatorIndex = this.aggregators!.findIndex(aggregator => aggregator.name === aggregationResult.name);

      if (aggregatorIndex > -1) {
        this.aggregationResults[aggregatorIndex] = aggregationResult;
      }
    });
  }
}

