import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, OnInit, Injector, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';

// LIBRARIES
import {
  AggregatorBase,
  TermsAggregator,
  AggregationFilter,
  AggregationResult,
  AggregationResultItem,
  ObjectAggregationResult,
} from '@picturepark/sdk-v1-angular';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap, map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ExtendedSearchBehavior } from '../../shared-module/search-utils';

@Component({
  selector: 'pp-search-suggest-box',
  templateUrl: './search-suggest-box.component.html',
  styleUrls: ['./search-suggest-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSuggestBoxComponent extends BaseComponent implements OnChanges, OnInit {
  constructor(injector: Injector, private formBuilder: FormBuilder, @Inject(LOCALE_ID) public locale: string) {
    super(injector);
  }

  isLoading = false;
  hasFocus = false;
  typed = false;

  form = this.formBuilder.group({
    suggestBox: new FormControl(''),
  });

  @Input()
  public showSearchBehaviorPicker = false;

  @Input()
  aggregate: (aggregations: AggregatorBase[]) => Observable<ObjectAggregationResult>;

  @Input()
  public aggregations: AggregatorBase[];

  @Input()
  public searchBehavior: ExtendedSearchBehavior = ExtendedSearchBehavior.SimplifiedSearch;

  @Input()
  public searchString = '';

  @Output()
  public searchStringChange = new EventEmitter<string>();

  @Output()
  public filterAdd = new EventEmitter<AggregationFilter>();

  suggestions$: Observable<{name: string, results: AggregationResultItem[]}[]>;

  public get suggestBox() {
    return this.form.controls['suggestBox'];
  }

  focus() {
    this.hasFocus = true;
  }

  blur() {
    this.hasFocus = false;
  }

  public ngOnInit() {
    this.suggestions$ = this.suggestBox.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.typed = true;
      }),
      switchMap(value => {
        this.searchString = value;
        const aggs: AggregatorBase[] = [];
        this.aggregations.forEach(aggregation => {
          const expanded = this.expandAggregator(aggregation);
          if (expanded.searchFields && expanded.searchFields.length) {
            expanded.searchString = value;
            aggs.push(aggregation);
          }
        });
        return this.aggregate(aggs).pipe(
          catchError(error => of(null))
        );
      }),
      map(aggregationResult => {
        if(!aggregationResult) {
          return [];
        }
        const results = aggregationResult.aggregationResults.map(i => { 
          const expanded = this.expandAggregationResult(i).aggregationResultItems!;
          const name = this.aggregations.find(j => j.name === i.name);
          return { name: name?.names?.translate(this.locale) ?? i.name, results: expanded }}
        );
        return results.filter(i => i.results.length > 0);
        }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['searchString']) {
      this.search();
    }
  }

  public optionSelected(event: MatAutocompleteSelectedEvent): void {
    const element = event.option.value as AggregationResultItem;
    this.searchString = element.name;
    this.search();
  }

  public search() {
    this.suggestBox.setValue(this.searchString);
    this.searchStringChange.emit(this.searchString);
  }

  public clear() {
    this.searchString = '';
    this.search();
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
      aggregationResult.aggregationResultItems[0].aggregationResults[0]
    ) {
      return this.expandAggregationResult(aggregationResult.aggregationResultItems[0].aggregationResults[0]);
    }

    return aggregationResult;
  }
}
