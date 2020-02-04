import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, OnInit } from '@angular/core';

// LIBRARIES
import { ContentSearchResult } from '@picturepark/sdk-v1-angular';
import { ExtendedSearchBehavior, SearchParameters } from '../../shared-module/search-utils';



@Component({
  selector: 'pp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnChanges, OnInit {

  public result: ContentSearchResult | null = null;

  @Input()
  public searchString = '';

  /**
   * Must accept type string because using undefined as the correspondent to 'AdvancedSearch'
   * is liable to cause problems
   */
  @Input()
  public searchBehavior: ExtendedSearchBehavior = ExtendedSearchBehavior.SimplifiedSearch;

  @Input()
  public showSearchBehaviorPicker = false;

  @Output()
  public searchStringChange = new EventEmitter<string>();

  @Output()
  public searchParametersChange = new EventEmitter<SearchParameters>();

  ngOnInit(): void {
    this.onValuesChange();
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['searchString']) {
      this.search();
    }
    if (changes['searchBehavior']) {
      if (!this.searchBehavior) {
        this.searchBehavior = ExtendedSearchBehavior.SimplifiedSearch;
      }
      this.onValuesChange();
    }
  }

  public search() {
    this.onValuesChange();
  }

  public clear() {
    this.searchString = '';
  }

  public setSearchBehavior(searchBehavior) {
    this.searchBehavior = searchBehavior;
    this.onValuesChange();
  }

  public onValuesChange() {
    this.searchParametersChange.emit({
      searchString: this.searchString,
      searchBehavior: this.searchBehavior
    });
    this.searchStringChange.emit(this.searchString);
  }
}
