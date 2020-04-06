import { Input, OnChanges, Output, EventEmitter, SimpleChanges, Component, Inject, LOCALE_ID, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, map, flatMap } from 'rxjs/operators';
import { timer, Observable, from } from 'rxjs';

// LIBRARIES
import {
  AggregationFilter, AggregationResult, AggregatorBase,
  AggregationResultItem, TermsAggregator, ObjectAggregationResult, SearchFacade, SearchInputState, IEntityBase
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../base.component';

@Component({
  selector: 'pp-aggregation-item',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss']
})
export class AggregationComponent extends BaseComponent implements OnChanges {

  @Input()
  aggregator: AggregatorBase;

  @Input()
  aggregationResult: AggregationResult | null = null;

  // Used for expanding aggregation list (by default only first element is expanded).
  @Input()
  public isExpanded: boolean;

  @Output()
  aggregationFiltersChange: EventEmitter<AggregationFilter[]> = new EventEmitter();

  @Input()
  fetchSearchData: (searchString: string, aggregator: AggregatorBase) => Observable<ObjectAggregationResult>;

  @Input()
  facade: SearchFacade<IEntityBase, SearchInputState>;

  public pagingSize = 0;

  public aggregationsFiltersCount = 0;

  public aggregationQuery = new FormControl();

  public expandedAggregator: TermsAggregator;

  public expandedAggregationResult: AggregationResult | null = null;

  public autoCompleteOptions: Observable<AggregationResultItem[]>;

  public canExpand = false;

  public isLoading = false;

  public constructor(@Inject(LOCALE_ID) public locale: string,
    protected injector: Injector) {
    super(injector);
    this.autoCompleteOptions = this.aggregationQuery.valueChanges.pipe(
      debounce(() => timer(500)),
      map((value: string | AggregationResultItem) => typeof value === 'string' ? value : (value.name || '')),
      flatMap(value => this.searchAggregator(value)));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['aggregator']) {
      this.expandedAggregator = this.expandAggregator(this.aggregator);
      this.pagingSize = this.expandedAggregator.size || 0;
    }

    if (changes['aggregationResult']) {
      this.updateAggregationResult(this.aggregationResult);
      this.aggregationQuery.setValue('');
    }

    if (changes['globalAggregationFilters']) {
      this.aggregationsFiltersCount = this.facade.searchRequestState.aggregationFilters.filter(
        (item) => item.aggregationName === this.aggregator.name).length;
    }

    if (changes['expandedAggregationResult'] || changes['isExpanded']) {
      if (this.expandedAggregationResult && this.expandedAggregationResult.aggregationResultItems) {
        this.canExpand = this.isExpanded && this.expandedAggregationResult.aggregationResultItems.length > 0;
      } else {
        this.canExpand = false;
      }
    }
  }

  public loadMore(): void {
    this.expandedAggregator.size = (this.expandedAggregator.size || 0) + this.pagingSize;

    this.sub = this.fetchSearchData(this.facade.searchRequestState.searchString, this.aggregator).subscribe(result => {
      this.updateAggregationResult(result.aggregationResults ? result.aggregationResults[0] || null : null);
    });
  }

  public loadLess(): void {
    this.expandedAggregator.size = (this.expandedAggregator.size || 0) - this.pagingSize;

    this.sub = this.fetchSearchData(this.facade.searchRequestState.searchString, this.aggregator).subscribe(result => {
      this.updateAggregationResult(result.aggregationResults ? result.aggregationResults[0] || null : null);
    });
  }

  public searchAggregator(searchString: string): Observable<AggregationResultItem[]> {
    if (searchString === '') {
      return from([]);
    }

    const sizeStore = this.expandedAggregator.size;

    this.expandedAggregator.searchString = searchString;
    this.expandedAggregator.size = this.pagingSize;

    this.isLoading = true;
    const observableResult = this.fetchSearchData(searchString, this.aggregator).pipe(map(result => {
      this.hideLoader();

      if (result.aggregationResults !== undefined) {
        const items = this.expandAggregationResult(result.aggregationResults[0]).aggregationResultItems || [];

        const currentSelectedValues = this.expandedAggregationResult!.aggregationResultItems ?
          this.expandedAggregationResult!.aggregationResultItems!.filter(agr => agr.active === true) : [];

        return items.filter((item) => !currentSelectedValues.some((value => value.name === item.name)));

      }

      return [];
    }));

    this.expandedAggregator.searchString = undefined;
    this.expandedAggregator.size = sizeStore;

    return observableResult;
  }

  public queryDisplay(aggregationResultItem: AggregationResultItem): string {
    return aggregationResultItem ? aggregationResultItem.name : '';
  }

  public autoCompleteOptionSelected(value: AggregationResultItem): void {
    const filters = this.expandedAggregationResult!.aggregationResultItems ?
      this.expandedAggregationResult!.aggregationResultItems!
        .filter(agr => agr.active === true && agr.filter)
        .map(agr => agr.filter as AggregationFilter) : [];

    if (value.filter !== undefined) {
      filters.push(value.filter);
    }

    this.aggregationFiltersChange.emit(filters);
  }

  public selectionChanged(changedItem: AggregationResultItem): void {
    changedItem.active = !changedItem.active;

    const filters = this.expandedAggregationResult!.aggregationResultItems ?
      this.expandedAggregationResult!.aggregationResultItems!
        .filter(agr => agr.active === true && agr.filter)
        .map(agr => agr.filter as AggregationFilter) : [];

    this.aggregationFiltersChange.emit(filters);
  }

  public get showLess(): boolean {
    return !!this.expandedAggregationResult
      && !!this.expandedAggregationResult.aggregationResultItems
      && this.expandedAggregationResult.aggregationResultItems.filter(x => x && !x.active).length > this.pagingSize;
  }

  public get active(): boolean {
    return !!this.expandedAggregationResult
      && !!this.expandedAggregationResult.aggregationResultItems
      && this.expandedAggregationResult.aggregationResultItems.filter(x => x && x.count > 0 || x.active).length >= 1;
  }

  public trackByName(index, aggregationResultItem: AggregationResultItem): string {
    return aggregationResultItem.name;
  }

  private updateAggregationResult(aggregationResult: AggregationResult | null): void {
    this.expandedAggregationResult = aggregationResult ? this.expandAggregationResult(aggregationResult) : null;
  }

  private expandAggregator(aggregator: AggregatorBase): TermsAggregator {

    if (aggregator.aggregators && aggregator.aggregators.length > 0) {
      return this.expandAggregator(aggregator.aggregators[0]);
    }

    return aggregator as TermsAggregator;
  }

  private expandAggregationResult(aggregationResult: AggregationResult): AggregationResult {
    if (
      aggregationResult &&
      aggregationResult.aggregationResultItems &&
      aggregationResult.aggregationResultItems[0] &&
      aggregationResult.aggregationResultItems[0].aggregationResults &&
      aggregationResult.aggregationResultItems[0].aggregationResults![0]) {

      return this.expandAggregationResult(aggregationResult.aggregationResultItems[0].aggregationResults![0]);
    }

    return aggregationResult;
  }

  public hideLoader(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

}
