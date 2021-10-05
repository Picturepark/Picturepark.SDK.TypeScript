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
  public result: ContentSearchResult | null = null;

  @Input()
  public searchString = '';

  @Input()
  public searchMode: SearchMode = SearchMode.And;

  @Input()
  public showSearchBehaviorPicker = false;

  @Output()
  public searchStringChange = new EventEmitter<string>();

  @Output()
  public searchParametersChange = new EventEmitter<SearchParameters>();

  ngOnInit(): void {
    this.emitValues();
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
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

  public search() {
    this.emitValues();
  }

  public clear() {
    this.searchString = '';
    this.emitValues();
  }

  public setSearchMode(searchMode: any) {
    this.searchMode = searchMode;
    this.emitValues();
  }

  public emitValues() {
    this.searchParametersChange.emit({
      searchString: this.searchString,
      searchMode: this.searchMode,
    });
    this.searchStringChange.emit(this.searchString);
  }
}
