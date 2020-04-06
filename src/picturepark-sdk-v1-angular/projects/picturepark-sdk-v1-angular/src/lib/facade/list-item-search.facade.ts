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
} from '../services/api-services';
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
      limit: this.searchRequestState.pageSize,
      searchString: this.searchRequestState.searchString,
      sort: this.searchRequestState.sort,
      searchBehaviors: this.searchRequestState.searchBehavior
        ? [
            this.searchRequestState.searchBehavior,
            SearchBehavior.DropInvalidCharactersOnFailure,
            SearchBehavior.WildcardOnSingleTerm,
          ]
        : [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
      schemaIds: this.searchRequestState.schemaIds,
      filter: this.searchRequestState.baseFilter,
      aggregationFilters: this.searchRequestState.aggregationFilters,
      aggregators: this.searchRequestState.aggregators,
      includeAllSchemaChildren: true,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      debugMode: false,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      resolveBehaviors: [ListItemResolveBehavior.Content, ListItemResolveBehavior.InnerDisplayValueName],
    });

    return this.listItemService.search(request);
  }
}
