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
    if (!this.searchInputState.channelId) {
      return;
    }

    const searchBehaviors = this.searchInputState.searchBehavior
      ? [
          this.searchInputState.searchBehavior,
          SearchBehavior.DropInvalidCharactersOnFailure,
          SearchBehavior.WildcardOnSingleTerm,
        ]
      : [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm];

    const request = new ContentSearchRequest({
      debugMode: false,
      pageToken: this.searchResultState.nextPageToken,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      aggregationFilters: this.searchInputState.aggregationFilters,
      aggregators: this.searchInputState.aggregators,
      filter: this.searchInputState.baseFilter,
      channelId: this.searchInputState.channelId,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      limit: this.searchInputState.pageSize,
      searchString: this.searchInputState.searchString,
      searchType: ContentSearchType.MetadataAndFullText,
      searchBehaviors: searchBehaviors,
      sort: this.searchInputState.sort,
    });

    return this.contentService.search(request).pipe(
      switchMap(searchResponse => {
        // TODO BRO: Remove additional aggregation when backend is fixed
        return this.contentService
          .aggregate(
            new ContentAggregationRequest({
              aggregators: this.searchInputState.aggregators,
              brokenDependenciesFilter: BrokenDependenciesFilter.All,
              lifeCycleFilter: LifeCycleFilter.ActiveOnly,
              searchType: ContentSearchType.MetadataAndFullText,
              aggregationFilters: this.searchInputState.aggregationFilters,
              channelId: this.searchInputState.channelId,
              filter: this.searchInputState.baseFilter,
              searchBehaviors: searchBehaviors,
              searchString: this.searchInputState.searchString,
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
