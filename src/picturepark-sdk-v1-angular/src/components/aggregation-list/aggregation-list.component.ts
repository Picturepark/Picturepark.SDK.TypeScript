import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

import {
  AggregationFilter, AggregationResult, ObjectAggregationResult,
  Channel, AggregatorBase, FilterBase, OrFilter, AndFilter
} from '../../services/services';

export abstract class AggregationListComponent implements OnChanges {
  @Input()
  public channel: Channel;

  @Input()
  public query = '';

  // Filter used for search. E.g.: Nested filter,And filter,Or filter.
  @Output()
  public filterChange = new EventEmitter<FilterBase | null>();

  // Aggregation filters used for Aggregation function.
  public aggregationFiltersFlat: AggregationFilter[] = [];

  // Aggregation filters connected to aggregators by index.
  private aggregationFilters: Array<AggregationFilter[]> = [];

  public isLoading = true;

  public aggregators: AggregatorBase[] = [];

  public aggregationResults: AggregationResult[] = [];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['channel'] && this.channel) {
      this.aggregators = this.channel.aggregations || [];
      this.aggregationResults = []
      this.aggregationFilters = [];
      this.aggregationFiltersFlat = [];
      this.filterChange.emit(null);
    }

    if (changes['channel'] || changes['query']) {
      this.updateData();
    }
  }

  protected abstract fetchData(): Observable<ObjectAggregationResult | null>;

  public clearFilters(): void {
    this.aggregationFilters = [];
    this.aggregationFiltersFlat = [];
    this.filterChange.emit(null);
    this.updateData();
  }

  public aggregationFiltersChanged(aggregatorIndex: number, aggregationFilters: AggregationFilter[]): void {
    this.aggregationFilters[aggregatorIndex] = aggregationFilters;

    // flatten array and remove undefined.
    this.aggregationFiltersFlat = ([] as AggregationFilter[]).concat(...this.aggregationFilters).filter(item => item);
    const resultFilter = this.getFilter(this.aggregationFilters);
    this.filterChange.emit(resultFilter);

    this.updateData();
  }

  private updateData() {
    this.fetchData()
      .pipe(filter((result) => result !== null))
      .subscribe((result: ObjectAggregationResult) => {
        this.processAggregationResults(result.aggregationResults || []);
        this.isLoading = false;
      });
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
      default: return new AndFilter({ filters: preparedFilters as FilterBase[] })
    }
  }

  private processAggregationResults(aggregationResults: AggregationResult[]) {
    this.aggregationResults = [];

    aggregationResults.forEach(aggregationResult => {
      const aggregatorIndex = this.aggregators.findIndex(aggregator => aggregator.name === aggregationResult.name);

      if (aggregatorIndex > -1) {
        this.aggregationResults[aggregatorIndex] = aggregationResult;
      }
    });
  }
}

