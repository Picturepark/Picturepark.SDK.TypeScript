import { BehaviorSubject, Observable } from 'rxjs';
import {
  AggregationFilter,
  FilterBase,
  SearchBehavior,
  AggregatorBase,
  AggregationResult,
  SortInfo,
} from '../api-services';

export interface SearchInputState {
  searchString: string;
  searchBehavior: SearchBehavior;
  aggregationFilters: AggregationFilter[];
  baseFilter?: FilterBase | undefined;
  aggregators: AggregatorBase[];
  pageSize: number;
  sort: SortInfo[];
}

export interface SearchResultState<T> {
  totalResults: number;
  results: T[];
  nextPageToken: string | undefined;
  aggregationResults?: AggregationResult[];
}

export abstract class SearchFacade<T, TState extends SearchInputState> {
  searchInputState: TState;

  searchResultState: SearchResultState<T> = {
    totalResults: 0,
    nextPageToken: '',
    results: [],
  };

  searchInput$ = new BehaviorSubject(this.searchInputState);
  searchResults$ = new BehaviorSubject(this.searchResultState);

  abstract getSearchRequest():
    | Observable<{
        results: T[];
        totalResults: number;
        pageToken?: string | undefined;
        aggregationResults?: AggregationResult[];
      }>
    | undefined;

  constructor(partialState: Partial<TState>) {
    this.searchInputState = {
      searchString: '',
      searchBehavior: SearchBehavior.SimplifiedSearch,
      pageSize: 75,
      aggregationFilters: [],
      aggregators: [],
      sort: [],
      ...partialState,
    } as any; // TODO BRO: Check
  }

  patchInputState(partial: Partial<TState>) {
    this.setInputState({ ...this.searchInputState, ...partial });
  }

  setInputState(inputState: TState) {
    this.searchInputState = inputState;
    this.searchInput$.next(this.searchInputState);
  }

  setResultState(resultState: SearchResultState<T>) {
    this.searchResultState = resultState;
    this.searchResults$.next(resultState);
  }
}
