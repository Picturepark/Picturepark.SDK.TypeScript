import { Injectable } from '@angular/core';
import { SearchFacade, SearchInputState } from './search.facade';
import { Share, ShareService, ShareSearchResult, ShareSearchRequest, SearchBehavior } from '../api-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareSearchFacade extends SearchFacade<Share, SearchInputState> {
  constructor(private shareService: ShareService) {
    super({});
  }

  getSearchRequest(): Observable<ShareSearchResult> | undefined {
    const request = new ShareSearchRequest({
      debugMode: false,
      pageToken: this.searchResultState.nextPageToken,
      filter: this.searchInputState.baseFilter,
      limit: this.searchInputState.pageSize,
      searchString: this.searchInputState.searchString,
      searchBehaviors: [
        SearchBehavior.SimplifiedSearch,
        SearchBehavior.DropInvalidCharactersOnFailure,
        SearchBehavior.WildcardOnSingleTerm,
      ],
      aggregationFilters: this.searchInputState.aggregationFilters,
      aggregators: this.searchInputState.aggregators,
      sort: this.searchInputState
        .sort /*this.activeSortingType.field === 'relevance' ? [] : [
              new SortInfo({
                field: this.activeSortingType.field,
                direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
              })
            ]*/, // TODO BRO: Check that handling is in place
    });

    return this.shareService.search(request);
  }
}
