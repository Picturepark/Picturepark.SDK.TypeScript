import { Injectable } from '@angular/core';
import { SearchFacade, SearchInputState } from './search.facade';
import { Share, ShareService, ShareSearchResult, ShareSearchRequest, SearchBehavior, AggregatorBase, AggregationResult } from '../services/api-services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShareSearchFacade extends SearchFacade<Share, SearchInputState> {
  constructor(private shareService: ShareService) {
    super({});
  }

  search(): Observable<ShareSearchResult> | undefined {
    const request = new ShareSearchRequest(this.getRequest());
    return this.shareService.search(request);
  }

  searchAggregations(aggregators: AggregatorBase[]): Observable<AggregationResult[]> | undefined {
    const params = { ...this.getRequest(), aggregators: aggregators, pageToken: undefined, limit: 0 };
    const request = new ShareSearchRequest(params);
    return this.shareService.search(request).pipe(map(i => i.aggregationResults!)); // TODO BRO: Exception handling
  }

  private getRequest() {
    return {
      debugMode: false,
      pageToken: this.searchResultState.nextPageToken,
      filter: this.searchRequestState.baseFilter,
      limit: this.searchRequestState.pageSize,
      searchString: this.searchRequestState.searchString,
      searchBehaviors: [
        SearchBehavior.SimplifiedSearch,
        SearchBehavior.DropInvalidCharactersOnFailure,
        SearchBehavior.WildcardOnSingleTerm,
      ],
      aggregationFilters: this.searchRequestState.aggregationFilters,
      aggregators: this.searchRequestState.aggregators,
      sort: this.searchRequestState
        .sort /*this.activeSortingType.field === 'relevance' ? [] : [
              new SortInfo({
                field: this.activeSortingType.field,
                direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
              })
            ]*/, // TODO BRO: Check that handling is in place
    };
  }
}
