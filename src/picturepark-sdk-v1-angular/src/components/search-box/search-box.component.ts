import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

import { ContentSearchResult } from '../../services/services';

@Component({
  selector: 'pp-search-box',
  templateUrl: './search-box.component.html'
})
// TODO: rename to search component.
// TODO(possibly in next iterations): Add autocomplete here.
export class SearchBoxComponent implements OnChanges {
  public result: ContentSearchResult | null = null;

  @Input()
  public query = '';
  @Output()
  public queryChange = new EventEmitter<string>();

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['query']) {
      this.search(); // TODO: Add throttling
    }
  }

  public search() {
    this.queryChange.emit(this.query);
  }

  public clear() {
    this.query = '';
    this.queryChange.emit(this.query);
  }
}
