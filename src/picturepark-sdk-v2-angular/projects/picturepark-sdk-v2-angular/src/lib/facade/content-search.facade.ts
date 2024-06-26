import { Injectable } from '@angular/core';
import { SearchFacade, SearchInputState } from './search.facade';
import {
  Content,
  ContentService,
  SearchBehavior,
  ContentSearchRequest,
  BrokenDependenciesFilter,
  LifeCycleFilter,
  ContentSearchType,
  AggregatorBase,
} from '../services/api-services';
import { map, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

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

  search() {
    if (!this.searchRequestState.channelId) {
      return;
    }
    const request = new ContentSearchRequest(this.getRequest());
    this.setLoading(true, request.pageToken);
    return this.contentService.search(request).pipe(finalize(() => this.setLoading(false)));
  }

  searchAggregations(aggregators: AggregatorBase[]) {
    if (!this.searchRequestState.channelId) {
      return of([]);
    }

    const params = { ...this.getRequest(), aggregators: aggregators, pageToken: undefined, limit: 0 };
    const request = new ContentSearchRequest(params);
    return this.contentService.search(request).pipe(map(i => i.aggregationResults ?? [])); // TODO BRO: Exception handling
  }

  private getRequest() {
    const searchBehavior = this.toSearchBehavior(this.searchRequestState.searchMode);
    const searchBehaviors = searchBehavior
      ? [searchBehavior, SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm]
      : [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm];

    return {
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
    };
  }
}
