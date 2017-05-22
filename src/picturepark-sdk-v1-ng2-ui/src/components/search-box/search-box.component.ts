import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { InputConverter, BooleanConverter, StringConverter } from '../converter';

import { ContentService, ContentSearchRequest, ContentSearchResult } from 'picturepark-sdk-v1-ng2';

@Component({
  selector: 'pp-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnChanges {
  result: ContentSearchResult | null = null;

  @Input()
  label = '';

  @Input()
  query = '';
  @Output()
  queryChange = new EventEmitter<string>();

  constructor(private contentService: ContentService) {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['query'])
      this.search(); // TODO: Add throttling
  }

  async search() {
    try {
      this.queryChange.emit(this.query);

      var request = new ContentSearchRequest();
      request.searchString = this.query;
      
      this.result = await this.contentService.search(request).toPromise();
    } catch (error) {
      // TODO: Add error message
    }
  }
}