import { Input, OnChanges, SimpleChanges, Component, Inject, LOCALE_ID, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, map, flatMap } from 'rxjs/operators';
import { timer, Observable, from } from 'rxjs';

// LIBRARIES
import {
  AggregationResult,
  AggregatorBase,
  AggregationResultItem,
  TermsAggregator,
  SearchFacade,
  SearchInputState,
  IEntityBase,
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../base.component';

@Component({
  selector: 'pp-aggregation-item',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.scss'],
})
export class AggregationComponent extends BaseComponent implements OnInit, OnChanges {
  @Input()
  aggregator: AggregatorBase;

  @Input()
  aggregationResult: AggregationResult | null = null;

  // Used for expanding aggregation list (by default only first element is expanded).
  @Input()
  public isExpanded: boolean;

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

  public constructor(@Inject(LOCALE_ID) public locale: string, protected injector: Injector) {
    super(injector);
    this.autoCompleteOptions = this.aggregationQuery.valueChanges.pipe(
      debounce(() => timer(500)),
      map((value: string | AggregationResultItem) => (typeof value === 'string' ? value : value.name || '')),
      flatMap((value) => this.searchAggregator(value))
    );
  }

  ngOnInit() {
    this.sub = this.facade.searchRequest$.subscribe((request) => {
      this.aggregationsFiltersCount = request.aggregationFilters.filter(
        (item) => item.aggregationName === this.aggregator.name
      ).length;

      this.canExpand = this.isExpanded || this.canExpand || this.aggregationsFiltersCount > 0;
    });
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

    this.sub = this.facade.searchAggregations([this.aggregator])!.subscribe((result) => {
      this.updateAggregationResult(result ? result[0] || null : null);
    });
  }

  public loadLess(): void {
    this.expandedAggregator.size = (this.expandedAggregator.size || 0) - this.pagingSize;

    this.sub = this.facade.searchAggregations([this.aggregator])!.subscribe((result) => {
      this.updateAggregationResult(result ? result[0] || null : null);
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
    const observableResult = this.facade.searchAggregations([this.aggregator])!.pipe(
      map((result) => {
        this.hideLoader();

        if (result !== undefined) {
          const items = this.facade.expandAggregationResult(result[0]).aggregationResultItems || [];

          const currentSelectedValues =
            this.expandedAggregationResult?.aggregationResultItems?.filter((agr) => agr.active === true) ?? [];

          return items.filter((item) => !currentSelectedValues.some((value) => value.name === item.name));
        }

        return [];
      })
    );

    this.expandedAggregator.searchString = undefined;
    this.expandedAggregator.size = sizeStore;

    return observableResult;
  }

  public queryDisplay(aggregationResultItem: AggregationResultItem): string {
    return aggregationResultItem ? aggregationResultItem.name : '';
  }

  public autoCompleteOptionSelected(value: AggregationResultItem): void {
    this.aggregationQuery.setValue('');
    this.facade.toggleAggregationResult(value);
  }

  public selectionChanged(changedItem: AggregationResultItem): void {
    this.facade.toggleAggregationResult(changedItem);
  }

  public get showLess(): boolean {
    return (
      !!this.expandedAggregationResult &&
      !!this.expandedAggregationResult.aggregationResultItems &&
      this.expandedAggregationResult.aggregationResultItems.filter((x) => x && !x.active).length > this.pagingSize
    );
  }

  public get active(): boolean {
    return (
      !!this.expandedAggregationResult &&
      !!this.expandedAggregationResult.aggregationResultItems &&
      this.expandedAggregationResult.aggregationResultItems.filter((x) => (x && x.count > 0) || x.active).length >= 1
    );
  }

  public trackByName(_index, aggregationResultItem: AggregationResultItem): string {
    return aggregationResultItem.name;
  }

  public clear() {
    const aggregationFilters = this.facade.searchRequestState.aggregationFilters.filter(
      (i) => i.aggregationName !== this.aggregator.name
    );
    this.facade.patchRequestState({ aggregationFilters });
  }

  private updateAggregationResult(aggregationResult: AggregationResult | null): void {
    this.expandedAggregationResult = aggregationResult ? this.facade.expandAggregationResult(aggregationResult) : null;
  }

  private expandAggregator(aggregator: AggregatorBase): TermsAggregator {
    if (aggregator.aggregators && aggregator.aggregators.length > 0) {
      return this.expandAggregator(aggregator.aggregators[0]);
    }

    return aggregator as TermsAggregator;
  }

  public hideLoader(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
