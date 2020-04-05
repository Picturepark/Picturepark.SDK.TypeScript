import { SearchInputState, SearchFacade } from './search.facade';
import { Injectable } from '@angular/core';
import {
  ListItem,
  ListItemService,
  ListItemSearchResult,
  ListItemSearchRequest,
  SearchBehavior,
  BrokenDependenciesFilter,
  LifeCycleFilter,
  ListItemResolveBehavior,
} from '../api-services';
import { Observable } from 'rxjs';

export interface ListItemSearchInputState extends SearchInputState {
  schemaIds: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ListItemSearchFacade extends SearchFacade<ListItem, ListItemSearchInputState> {
  constructor(private listItemService: ListItemService) {
    super({ schemaIds: [] });
  }

  getSearchRequest(): Observable<ListItemSearchResult> | undefined {
    const request = new ListItemSearchRequest({
      pageToken: this.searchResultState.nextPageToken,
      limit: this.searchInputState.pageSize,
      searchString: this.searchInputState.searchString,
      sort: this.searchInputState.sort,
      searchBehaviors: this.searchInputState.searchBehavior
        ? [
            this.searchInputState.searchBehavior,
            SearchBehavior.DropInvalidCharactersOnFailure,
            SearchBehavior.WildcardOnSingleTerm,
          ]
        : [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
      schemaIds: this.searchInputState.schemaIds,
      filter: this.searchInputState.baseFilter,
      aggregationFilters: this.searchInputState.aggregationFilters,
      aggregators: this.searchInputState.aggregators,
      includeAllSchemaChildren: true,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      debugMode: false,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      resolveBehaviors: [ListItemResolveBehavior.Content, ListItemResolveBehavior.InnerDisplayValueName],
    });

    return this.listItemService.search(request);
  }
}
