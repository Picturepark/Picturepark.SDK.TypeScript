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
  public query = '';

  @Output()
  public queryChange = new EventEmitter<string>();
  
  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['query']) {
      this.search();
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
