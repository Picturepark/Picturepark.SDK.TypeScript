import { BehaviorSubject, Observable } from 'rxjs';
import {
  AggregationFilter,
  FilterBase,
  SearchBehavior,
  AggregatorBase,
  AggregationResult,
  SortInfo,
} from '../api-services';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

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
  searchRequestState: TState;

  searchResultState: SearchResultState<T> = {
    totalResults: 0,
    nextPageToken: '',
    results: [],
  };

  searchRequest$ = new BehaviorSubject(this.searchRequestState);
  searchResults$ = new BehaviorSubject(this.searchResultState);

  totalResults$ = this.searchResults$.pipe(
    filter(i => !!i),
    map(i => i.totalResults),
    distinctUntilChanged()
  );

  items$ = this.searchResults$.pipe(
    filter(i => !!i),
    map(i => i.results),
    distinctUntilChanged()
  );

  aggregationResults$ = this.searchResults$.pipe(
    filter(i => !!i),
    map(i => i.aggregationResults),
    distinctUntilChanged()
  );

  aggregators$ = this.searchRequest$.pipe(
    filter(i => !!i),
    map(i => i.aggregators),
    distinctUntilChanged()
  );

  abstract getSearchRequest():
    | Observable<{
        results: T[];
        totalResults: number;
        pageToken?: string | undefined;
        aggregationResults?: AggregationResult[];
      }>
    | undefined;

  constructor(partialState: Partial<TState>) {
    this.searchRequestState = {
      searchString: '',
      searchBehavior: SearchBehavior.SimplifiedSearch,
      pageSize: 75,
      aggregationFilters: [],
      aggregators: [],
      sort: [],
      ...partialState,
    } as any; // TODO BRO: Check
  }

  patchRequestState(partial: Partial<TState>) {
    this.setRequestState({ ...this.searchRequestState, ...partial });
  }

  setRequestState(inputState: TState) {
    this.searchRequestState = inputState;
    this.searchRequest$.next(this.searchRequestState);
  }

  setResultState(resultState: SearchResultState<T>) {
    this.searchResultState = resultState;
    this.searchResults$.next(resultState);
  }
}
