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
} from '@picturepark/sdk-v2-angular';

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
  shouldExpand: boolean;

  @Input()
  facade: SearchFacade<IEntityBase, SearchInputState>;

  pagingSize = 0;

  aggregationsFiltersCount = 0;

  aggregationQuery = new FormControl();

  expandedAggregator: TermsAggregator;

  expandedAggregationResult: AggregationResult | null = null;

  autoCompleteOptions: Observable<AggregationResultItem[]>;

  expanded = false;

  active = true;

  isLoading = false;

  constructor(@Inject(LOCALE_ID) public locale: string, protected injector: Injector) {
    super(injector);
    this.autoCompleteOptions = this.aggregationQuery.valueChanges.pipe(
      debounce(() => timer(500)),
      map((value: string | AggregationResultItem) => (typeof value === 'string' ? value : value.name || '')),
      flatMap(value => this.searchAggregator(value))
    );
  }

  ngOnInit() {
    this.sub = this.facade.searchRequest$.subscribe(request => {
      this.aggregationsFiltersCount = request.aggregationFilters.filter(
        item => item.aggregationName === this.aggregator.name
      ).length;

      this.expanded = this.shouldExpand || this.expanded || this.aggregationsFiltersCount > 0;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['aggregator']) {
      this.expandedAggregator = this.expandAggregator(this.aggregator);
      this.pagingSize = this.expandedAggregator.size || 0;
    }

    if (changes['aggregationResult']) {
      this.updateAggregationResult(this.aggregationResult);
      this.aggregationQuery.setValue('');
    }

    if (changes['shouldExpand']) {
      this.expanded = this.shouldExpand && this.active;
    }
  }

  loadMore(): void {
    this.expandedAggregator.size = (this.expandedAggregator.size || 0) + this.pagingSize;

    this.sub = this.facade.searchAggregations([this.aggregator])!.subscribe(result => {
      this.updateAggregationResult(result ? result[0] || null : null);
    });
  }

  loadLess(): void {
    this.expandedAggregator.size = (this.expandedAggregator.size || 0) - this.pagingSize;

    this.sub = this.facade.searchAggregations([this.aggregator])!.subscribe(result => {
      this.updateAggregationResult(result ? result[0] || null : null);
    });
  }

  searchAggregator(searchString: string): Observable<AggregationResultItem[]> {
    if (searchString === '') {
      return from([]);
    }

    const sizeStore = this.expandedAggregator.size;

    this.expandedAggregator.searchString = searchString;
    this.expandedAggregator.size = this.pagingSize;

    this.isLoading = true;
    const observableResult = this.facade.searchAggregations([this.aggregator])!.pipe(
      map(result => {
        this.hideLoader();

        if (result !== undefined) {
          const items = this.facade.expandAggregationResult(result[0]).aggregationResultItems || [];

          const currentSelectedValues =
            this.expandedAggregationResult?.aggregationResultItems?.filter(agr => agr.active === true) ?? [];

          return items.filter(item => !currentSelectedValues.some(value => value.name === item.name));
        }

        return [];
      })
    );

    this.expandedAggregator.searchString = undefined;
    this.expandedAggregator.size = sizeStore;

    return observableResult;
  }

  queryDisplay(aggregationResultItem: AggregationResultItem): string {
    return aggregationResultItem ? aggregationResultItem.name : '';
  }

  autoCompleteOptionSelected(value: AggregationResultItem): void {
    this.aggregationQuery.setValue('');
    this.facade.toggleAggregationResult(value);
  }

  selectionChanged(changedItem: AggregationResultItem): void {
    this.facade.toggleAggregationResult(changedItem);
  }

  get showLess(): boolean {
    return (
      !!this.expandedAggregationResult &&
      !!this.expandedAggregationResult.aggregationResultItems &&
      this.expandedAggregationResult.aggregationResultItems.filter(x => x && !x.active).length > this.pagingSize
    );
  }

  trackByName(_index, aggregationResultItem: AggregationResultItem): string {
    return aggregationResultItem.name;
  }

  clear() {
    const aggregationFilters = this.facade.searchRequestState.aggregationFilters.filter(
      i => i.aggregationName !== this.aggregator.name
    );
    this.facade.patchRequestState({ aggregationFilters });
  }

  private updateAggregationResult(aggregationResult: AggregationResult | null): void {
    this.expandedAggregationResult = aggregationResult ? this.facade.expandAggregationResult(aggregationResult) : null;
    this.checkExpandedAggregationResult();
  }

  private checkExpandedAggregationResult() {
    const aggregationResultItems = this.expandedAggregationResult?.aggregationResultItems;
    if (aggregationResultItems) {
      if (aggregationResultItems.filter(item => item.count > 0 || item.active).length >= 1) {
        this.active = true;
      } else {
        this.active = false;
        this.expanded = false;
      }
    }
  }

  private expandAggregator(aggregator: AggregatorBase): TermsAggregator {
    if (aggregator.aggregators && aggregator.aggregators.length > 0) {
      return this.expandAggregator(aggregator.aggregators[0]);
    }

    return aggregator as TermsAggregator;
  }

  handleUserClick() {
    this.shouldExpand = this.expanded;
  }

  handleUserEnter(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.shouldExpand = this.expanded;
    }
  }

  hideLoader(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
