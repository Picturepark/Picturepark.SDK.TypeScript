import { Params, Router } from '@angular/router';
import { SearchInputState } from '../facade/search.facade';
import { SearchMode } from '../models/search-mode';
import { AggregationFilter } from '../services/api-services';

export function updateUrlFromSearchState(searchState: SearchInputState, query: Params, router: Router) {
  delete query['filter'];

  Object.keys(searchState).forEach(key => {
    const value = (searchState as any)[key];
    if (key === 'aggregators' || key === 'pageSize' || key === 'channelId' || key === 'schemaIds') {
      return;
    }

    if (!value) {
      delete query[key];
      return;
    }

    if (Array.isArray(value)) {
      delete query[key];
      if (value.length && key === 'aggregationFilters') {
        query['filter'] = value.map((f: any) => JSON.stringify(f.toJSON()));
      }
    } else {
      query[key] = value;
    }
  });

  router.navigate([], { queryParams: query });
}

export function getSearchState(searchInfo: { searchString: string; searchMode: string; filter: AggregationFilter[] }): Partial<SearchInputState> {
  const patchState: Partial<SearchInputState> = {};

  patchState.searchString = searchInfo.searchString;

  const searchMode = searchInfo.searchMode as SearchMode;
  if (searchMode) {
    patchState.searchMode = searchMode;
  }

  if (searchInfo.filter) {
    patchState.aggregationFilters = searchInfo.filter;
  }

  return patchState;
}
