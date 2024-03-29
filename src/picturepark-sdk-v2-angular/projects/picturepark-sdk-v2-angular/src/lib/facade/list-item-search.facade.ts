import { SearchInputState, SearchFacade } from './search.facade';
import { Injectable } from '@angular/core';
import {
  ListItem,
  ListItemService,
  ListItemSearchRequest,
  SearchBehavior,
  BrokenDependenciesFilter,
  LifeCycleFilter,
  ListItemResolveBehavior,
  AggregatorBase,
} from '../services/api-services';
import { map, tap } from 'rxjs/operators';

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

  search() {
    const request = new ListItemSearchRequest(this.getRequest());
    this.setLoading(true, request.pageToken);
    return this.listItemService.search(request).pipe(tap(() => this.setLoading(false)));
  }

  searchAggregations(aggregators: AggregatorBase[]) {
    const params = { ...this.getRequest(), aggregators: aggregators, pageToken: undefined, limit: 0 };
    const request = new ListItemSearchRequest(params);
    return this.listItemService.search(request).pipe(map(i => i.aggregationResults ?? [])); // TODO BRO: Exception handling
  }

  private getRequest() {
    const searchBehavior = this.toSearchBehavior(this.searchRequestState.searchMode);
    return {
      pageToken: this.searchResultState.nextPageToken,
      limit: this.searchRequestState.pageSize,
      searchString: this.searchRequestState.searchString,
      sort: this.searchRequestState.sort,
      searchBehaviors: searchBehavior
        ? [searchBehavior, SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm]
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
    };
  }
}
