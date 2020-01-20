import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, OnInit } from '@angular/core';

// LIBRARIES
import { ContentSearchResult, SearchBehavior } from '@picturepark/sdk-v1-angular';



@Component({
  selector: 'pp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnChanges, OnInit {

  public result: ContentSearchResult | null = null;

  @Input()
  public searchString = '';

  @Input()
  public searchBehavior: SearchBehavior | undefined = SearchBehavior.SimplifiedSearch;

  @Input()
  public showSearchBehaviorPicker = false;

  @Output()
  public searchStringChange = new EventEmitter<string>();

  @Output()
  public searchBehaviorChange = new EventEmitter<string>();

  public searchBehaviorMapper = {
    'simple-all': SearchBehavior.SimplifiedSearch,
    'simple-any': SearchBehavior.SimplifiedSearchOr,
    'advanced': undefined
  };

  ngOnInit(): void {
    this.searchBehaviorChange.emit(this.searchBehavior);
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['searchString']) {
      this.search();
    }
    if (changes['searchBehavior']) {
      this.searchBehaviorChange.emit(this.searchBehavior);
    }
  }

  public search() {
    this.searchStringChange.emit(this.searchString);
  }

  public clear() {
    this.searchString = '';
  }

  public setSearchBehavior(searchType) {
    this.searchBehavior = this.searchBehaviorMapper[searchType];
  }

  public checkSearchBehavior() {
    if (this.searchBehavior === SearchBehavior.SimplifiedSearch) {
      return 'simple-all';
    } else if (this.searchBehavior === SearchBehavior.SimplifiedSearchOr) {
      return 'simple-any';
    } else if (!this.searchBehavior) {
      return 'advanced';
    }
  }

  //   export declare enum SearchBehavior {
  //     DropInvalidCharactersOnFailure = "DropInvalidCharactersOnFailure",
  //     WildcardOnSingleTerm = "WildcardOnSingleTerm",
  //     SimplifiedSearch = "SimplifiedSearch",
  //     WildcardOnEveryTerm = "WildcardOnEveryTerm",
  //     SimplifiedSearchOr = "SimplifiedSearchOr"
  // }
}
