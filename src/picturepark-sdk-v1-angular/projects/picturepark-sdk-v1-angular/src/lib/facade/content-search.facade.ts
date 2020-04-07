import { Injectable } from '@angular/core';
import { SearchFacade, SearchInputState } from './search.facade';
import {
  Content,
  ContentService,
  ContentSearchResult,
  SearchBehavior,
  ContentSearchRequest,
  BrokenDependenciesFilter,
  LifeCycleFilter,
  ContentSearchType,
} from '../services/api-services';
import { Observable } from 'rxjs';

export interface ContentSearchInputState extends SearchInputState {
  channelId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContentSearchFacade extends SearchFacade<Content, ContentSearchInputState> {
  constructor(private contentService: ContentService) {
    super({});
  }

  getSearchRequest(): Observable<ContentSearchResult> | undefined {
    if (!this.searchRequestState.channelId) {
      return;
    }

    const searchBehaviors = this.searchRequestState.searchBehavior
      ? [
          this.searchRequestState.searchBehavior,
          SearchBehavior.DropInvalidCharactersOnFailure,
          SearchBehavior.WildcardOnSingleTerm,
        ]
      : [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm];

    const request = new ContentSearchRequest({
      debugMode: false,
      pageToken: this.searchResultState.nextPageToken,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      aggregationFilters: this.searchRequestState.aggregationFilters,
      aggregators: this.searchRequestState.aggregators,
      filter: this.searchRequestState.baseFilter,
      channelId: this.searchRequestState.channelId,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      limit: this.searchRequestState.pageSize,
      searchString: this.searchRequestState.searchString,
      searchType: ContentSearchType.MetadataAndFullText,
      searchBehaviors: searchBehaviors,
      sort: this.searchRequestState.sort,
    });

    return this.contentService.search(request);
  }
}
