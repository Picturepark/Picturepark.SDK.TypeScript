import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, OnInit } from '@angular/core';

// LIBRARIES
import { ContentSearchResult, Channel, ContentService, ContentAggregationRequest, LifeCycleFilter, ContentSearchType,
  BrokenDependenciesFilter, AggregatorBase, TermsAggregator, AggregationFilter, AggregationResult, AggregationResultItem
} from '@picturepark/sdk-v1-angular';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { flatMap } from '../../utilities/helper';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'pp-search-suggest-box',
  templateUrl: './search-suggest-box.component.html',
  styleUrls: ['./search-suggest-box.component.scss']
})
export class SearchSuggestBoxComponent implements OnChanges, OnInit {

  constructor(private contentService: ContentService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      suggestBox: new FormControl('')
    });

  }

  public isLoading = false;
  public result: ContentSearchResult | null = null;
  public suggestAutocomplete: AggregationResultItem[];
  form: FormGroup;

  @Input()
  public aggregations: AggregatorBase[];

  @Input()
  public searchString = '';

  @Output()
  public searchStringChange = new EventEmitter<string>();

  @Output()
  public filterAdd = new EventEmitter<AggregationFilter>();

  public ngOnInit() {
    this.form.controls['suggestBox']
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
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
        return this.contentService.aggregate(new ContentAggregationRequest({
          aggregators: aggs,
          lifeCycleFilter: LifeCycleFilter.ActiveOnly,
          searchType: ContentSearchType.Metadata,
          brokenDependenciesFilter: BrokenDependenciesFilter.All
        })).pipe(
          finalize(() => this.isLoading = false),
        );
      })
    )
    .subscribe(aggregationResult => {
      const results = aggregationResult.aggregationResults.map(i => this.expandAggregationResult(i));
      this.suggestAutocomplete = flatMap(results, i => i.aggregationResultItems!);
    });
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

  public add(event: MatChipInputEvent): boolean {
    console.log(event);
    return false;
  }

  public search() {
    this.form.controls['suggestBox'].setValue(this.searchString);
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
      aggregationResult.aggregationResultItems[0].aggregationResults![0]) {

      return this.expandAggregationResult(aggregationResult.aggregationResultItems[0].aggregationResults![0]);
    }

    return aggregationResult;
  }
}



import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }
}
