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
  ContentAggregationRequest,
} from '../api-services';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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

    return this.contentService.search(request).pipe(
      switchMap(searchResponse => {
        // TODO BRO: Remove additional aggregation when backend is fixed
        return this.contentService
          .aggregate(
            new ContentAggregationRequest({
              aggregators: this.searchRequestState.aggregators,
              brokenDependenciesFilter: BrokenDependenciesFilter.All,
              lifeCycleFilter: LifeCycleFilter.ActiveOnly,
              searchType: ContentSearchType.MetadataAndFullText,
              aggregationFilters: this.searchRequestState.aggregationFilters,
              channelId: this.searchRequestState.channelId,
              filter: this.searchRequestState.baseFilter,
              searchBehaviors: searchBehaviors,
              searchString: this.searchRequestState.searchString,
            })
          )
          .pipe(
            map(aggregate => {
              // Patch wrong serialized data
              searchResponse.aggregationResults = aggregate.aggregationResults;
              return searchResponse;
            })
          );
      })
    );
  }
}
