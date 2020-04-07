import { Injectable } from '@angular/core';
import { SearchFacade, SearchInputState } from './search.facade';
import { Share, ShareService, ShareSearchResult, ShareSearchRequest, SearchBehavior, AggregatorBase, AggregationResult } from '../services/api-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareSearchFacade extends SearchFacade<Share, SearchInputState> {
  constructor(private shareService: ShareService) {
    super({});
  }

  search(): Observable<ShareSearchResult> | undefined {
    const request = new ShareSearchRequest({
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
    });

    return this.shareService.search(request);
  }

  searchAggregations(aggregators: AggregatorBase[]): Observable<AggregationResult[]> | undefined {
    throw new Error("Method not implemented.");
  }
}
