import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, OnInit } from '@angular/core';

// LIBRARIES
import { ContentSearchResult, SearchMode } from '@picturepark/sdk-v2-angular';
import { SearchParameters } from '../../shared-module/search-utils';

@Component({
  selector: 'pp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnChanges, OnInit {
  result: ContentSearchResult | null = null;

  @Input()
  searchString = '';

  @Input()
  searchMode: SearchMode = SearchMode.And;

  @Input()
  showSearchBehaviorPicker = false;

  @Output()
  searchStringChange = new EventEmitter<string>();

  @Output()
  searchParametersChange = new EventEmitter<SearchParameters>();

  ngOnInit(): void {
    this.emitValues();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['searchString']) {
      this.search();
    }
    if (changes['searchMode']) {
      if (!this.searchMode) {
        this.searchMode = SearchMode.And;
      }
      this.emitValues();
    }
  }

  search() {
    this.emitValues();
  }

  clear() {
    this.searchString = '';
    this.emitValues();
  }

  setSearchMode(searchMode: any) {
    this.searchMode = searchMode;
    this.emitValues();
  }

  emitValues() {
    this.searchParametersChange.emit({
      searchString: this.searchString,
      searchMode: this.searchMode,
    });
    this.searchStringChange.emit(this.searchString);
  }
}
