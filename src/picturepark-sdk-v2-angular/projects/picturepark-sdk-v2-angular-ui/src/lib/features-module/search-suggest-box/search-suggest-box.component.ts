import { Component, Input, OnInit, Injector, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';

// LIBRARIES
import {
  AggregatorBase,
  TermsAggregator,
  AggregationResultItem,
  SearchFacade,
  SearchInputState,
  IEntityBase,
} from '@picturepark/sdk-v2-angular';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap, map, catchError, distinctUntilChanged, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BaseComponent } from '../../shared-module/components/base.component';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'pp-search-suggest-box',
  templateUrl: './search-suggest-box.component.html',
  styleUrls: ['./search-suggest-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSuggestBoxComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private formBuilder: UntypedFormBuilder, @Inject(LOCALE_ID) public locale: string) {
    super(injector);
  }

  isLoading = false;
  hasFocus = false;
  typed = false;

  form = this.formBuilder.group({
    suggestBox: new UntypedFormControl(''),
  });

  @Input()
  showSearchBehaviorPicker = false;

  @Input()
  minCharacters = 2;

  @Input()
  facade: SearchFacade<IEntityBase, SearchInputState>;

  suggestions$: Observable<{ name: string; results: AggregationResultItem[] }[]>;

  get suggestBox() {
    return this.form.controls['suggestBox'];
  }

  focus() {
    this.hasFocus = true;
  }

  blur() {
    this.hasFocus = false;
  }

  ngOnInit() {
    this.sub = this.facade.searchString$
      .pipe(filter(searchString => searchString !== this.suggestBox.value))
      .subscribe(searchString => this.suggestBox.setValue(searchString));

    this.suggestions$ = this.suggestBox.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.typed = true;
      }),
      switchMap(searchString => {
        // Don't call the backend if we have an empty search string or less than the requested minCharacters
        if (!searchString || searchString.length < this.minCharacters) {
          return of(null);
        }

        const aggs = this.setSearchString(searchString);
        return this.facade.searchAggregations(aggs)?.pipe(catchError(error => of(null))) ?? of(null);
      }),
      map(aggregationResult => {
        if (!aggregationResult) {
          return [];
        }
        const results = aggregationResult.map(i => {
          const expanded = this.facade.expandAggregationResult(i).aggregationResultItems?.filter(j => !j.active);
          const name = this.facade.searchRequestState.aggregators.find(j => j.name === i.name);
          return { name: name?.names?.translate(this.locale) ?? i.name, results: expanded ?? [] };
        });
        return results.filter(i => i.results.length > 0);
      }),
      tap(() => {
        this.isLoading = false;
        this.setSearchString(undefined);
      })
    );
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const element = event.option.value as AggregationResultItem;
    this.suggestBox.setValue('');
    if (element.filter) {
      this.facade.toggleAggregationResult(element);
    }
  }

  search() {
    if (this.facade.searchRequestState.searchString !== this.suggestBox.value) {
      this.facade.patchRequestState({ searchString: this.suggestBox.value });
    }
  }

  setSearchString(searchString: string | undefined) {
    const aggs: AggregatorBase[] = [];
    this.facade.searchRequestState.aggregators.forEach(aggregation => {
      if (!aggregation.uiBehavior?.enableSuggestions) {
        return;
      }

      const expanded = this.expandAggregator(aggregation);
      if (expanded.searchFields && expanded.searchFields.length) {
        expanded.searchString = searchString;
        aggs.push(aggregation);
      }
    });

    return aggs;
  }

  searchModeChange($event: MatRadioChange) {
    this.facade.patchRequestState({ searchMode: $event.value });
  }

  clear() {
    this.suggestBox.setValue('');
    this.facade.patchRequestState({ searchString: '' });
  }

  private expandAggregator(aggregator: AggregatorBase): TermsAggregator {
    if (aggregator.aggregators && aggregator.aggregators.length > 0) {
      return this.expandAggregator(aggregator.aggregators[0]);
    }

    return aggregator as TermsAggregator;
  }
}
