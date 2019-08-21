import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

// LIBRARIES
import { ContentSearchResult } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnChanges {

  public result: ContentSearchResult | null = null;

  @Input()
  public searchString = '';

  @Output()
  public searchStringChange = new EventEmitter<string>();

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['searchString']) {
      this.search();
    }
  }

  public search() {
    this.searchStringChange.emit(this.searchString);
  }

  public clear() {
    this.searchString = '';
    this.searchStringChange.emit(this.searchString);
  }
}
