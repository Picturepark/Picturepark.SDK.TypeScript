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

  /**
   * Must accept type string because using undefined as the correspondent to 'AdvancedSearch'
   * is liable to cause problems
   */
  @Input()
  public searchBehavior: SearchBehavior | string;

  @Input()
  public showSearchBehaviorPicker = false;

  @Output()
  public searchStringChange = new EventEmitter<string>();

  @Output()
  public searchBehaviorChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchBehaviorChange.emit(this.searchBehavior);
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['searchString']) {
      this.search();
    }
    if (changes['searchBehavior']) {
      if (!this.searchBehavior) {
        this.searchBehavior = SearchBehavior.SimplifiedSearch;
      }
      this.searchBehaviorChange.emit(this.searchBehavior);
    }
  }

  public search() {
    this.searchStringChange.emit(this.searchString);
  }

  public clear() {
    this.searchString = '';
  }

  public setSearchBehavior(searchBehavior) {
    this.searchBehavior = searchBehavior;
    this.searchBehaviorChange.emit(this.searchBehavior);
  }
}
