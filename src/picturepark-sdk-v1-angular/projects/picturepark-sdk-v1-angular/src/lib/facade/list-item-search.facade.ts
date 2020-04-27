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
  AggregatorBase,
  AggregationResult,
} from '../services/api-services';
import { Observable } from 'rxjs';
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

  search(): Observable<ListItemSearchResult> | undefined {
    const request = new ListItemSearchRequest(this.getRequest());
    this.setLoading(true, request.pageToken);
    return this.listItemService.search(request).pipe(tap(() => this.setLoading(false)));
  }

  searchAggregations(aggregators: AggregatorBase[]): Observable<AggregationResult[]> | undefined {
    const params = { ...this.getRequest(), aggregators: aggregators, pageToken: undefined, limit: 0 };
    const request = new ListItemSearchRequest(params);
    return this.listItemService.search(request).pipe(map((i) => i.aggregationResults!)); // TODO BRO: Exception handling
  }

  private getRequest() {
    return {
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
    };
  }
}
