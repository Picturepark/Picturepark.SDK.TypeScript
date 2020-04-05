import { Input, OnChanges, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// LIBRARIES
import {
  AggregationFilter, AggregationResult, ObjectAggregationResult,
  AggregatorBase, FilterBase, SearchFacade
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../components/base.component';
import { filter } from 'rxjs/operators';

export abstract class AggregationListComponent extends BaseComponent implements OnInit, OnChanges {
  @Input()
  public aggregators: AggregatorBase[] | undefined = [];

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

  public isLoading = new BehaviorSubject(false);

  public aggregationResults: AggregationResult[] = [];

  public abstract facade: SearchFacade<any, any>;

  ngOnInit(): void {
    this.sub = this.facade.searchResults$.subscribe(i => {
      if (i.aggregationResults) {
        this.processAggregationResults(i.aggregationResults)
      }
     });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['aggregators'] && changes['aggregators'].previousValue && this.aggregators) {
      this.aggregationResults = [];
      this.aggregationFiltersStates = [];
      this.aggregationFilters = [];
      this.aggregationFiltersChange.emit([]);
      this.filterChange.emit(null);
    }

    if (changes['aggregators'] || changes['aggregationFilters']) {
      this.updateData();
    }
  }

  protected abstract fetchData(): Observable<ObjectAggregationResult | null>;
  protected abstract fetchSearchData(searchString: string, aggregator: AggregatorBase): Observable<ObjectAggregationResult | null>;

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

    this.facade.patchInputState({ aggregationFilters: this.aggregationFilters });

    this.updateData();
  }

  public trackByName(index, aggregator: AggregatorBase) {
    return aggregator.name;
  }

  private updateData() {
    /*
    this.sub = this.fetchData()
      .pipe(filter((result) => result !== null))
      .subscribe((result: ObjectAggregationResult) => {
        console.log(result.aggregationResults.map(i => i.toJSON()));
        this.processAggregationResults(result.aggregationResults || []);

        this.isLoading.next(false);
      });*/
  }

  private processAggregationResults(aggregationResults: AggregationResult[]) {
    this.aggregationResults = [];

    aggregationResults.forEach(aggregationResult => {
      const nested = this.getNestedAggregator(aggregationResult);
      // tslint:disable-next-line:no-non-null-assertion
      const aggregatorIndex = this.aggregators!.findIndex(aggregator => {
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
