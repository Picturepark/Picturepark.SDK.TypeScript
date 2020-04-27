import { BehaviorSubject, Observable } from 'rxjs';
import {
  AggregationFilter,
  FilterBase,
  SearchBehavior,
  AggregatorBase,
  AggregationResult,
  SortInfo,
  AggregationResultItem,
} from '../services/api-services';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

export function flatMap<T, U>(array: T[], mapFunc: (x: T) => U[]): U[] {
  return array.reduce((cumulus: U[], next: T) => [...mapFunc(next), ...cumulus], <U[]>[]);
}

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

export interface LoadingState {
  loading: boolean;
  action?: 'initial' | 'nextpage';
}

export abstract class SearchFacade<T, TState extends SearchInputState> {
  searchRequestState: TState;

  searchResultState: SearchResultState<T> = {
    totalResults: 0,
    nextPageToken: '',
    results: [],
  };

  private searchRequest = new BehaviorSubject(this.searchRequestState);
  private searchResults = new BehaviorSubject(this.searchResultState);

  protected loading = new BehaviorSubject<LoadingState>({ loading: false });

  searchResults$ = this.searchResults.pipe(filter((i) => !!i));
  searchRequest$ = this.searchRequest.pipe(filter((i) => !!i));
  loading$ = this.loading.asObservable();

  totalResults$ = this.searchResults$.pipe(
    map((i) => i.totalResults),
    distinctUntilChanged()
  );

  items$ = this.searchResults$.pipe(
    map((i) => i.results),
    distinctUntilChanged()
  );

  aggregationResults$ = this.searchResults$.pipe(
    map((i) => i.aggregationResults),
    distinctUntilChanged()
  );

  aggregators$ = this.searchRequest$.pipe(
    map((i) => i.aggregators),
    distinctUntilChanged()
  );

  aggregationFilters$ = this.searchRequest$.pipe(
    map((i) => i.aggregationFilters),
    distinctUntilChanged()
  );

  abstract search():
    | Observable<{
        results: T[];
        totalResults: number;
        pageToken?: string | undefined;
        aggregationResults?: AggregationResult[];
      }>
    | undefined;

  abstract searchAggregations(aggregators: AggregatorBase[]): Observable<AggregationResult[]> | undefined;

  constructor(partialState: Partial<TState>) {
    this.searchRequestState = {
      searchString: '',
      searchBehavior: SearchBehavior.SimplifiedSearch,
      pageSize: 75,
      aggregationFilters: [],
      aggregators: [],
      sort: [],
      ...partialState,
    } as any;
  }

  patchRequestState(partial: Partial<TState>) {
    this.setRequestState({ ...this.searchRequestState, ...partial });
  }

  setRequestState(inputState: TState) {
    this.searchRequestState = inputState;
    this.searchRequest.next(this.searchRequestState);
  }

  setResultState(resultState: SearchResultState<T>) {
    this.searchResultState = resultState;
    this.searchResults.next(resultState);
  }

  /** Returns the loading infos based on a specified state */
  getLoadingInfos(loadingState: 'all' | 'initial' | 'nextpage') {
    return this.loading$.pipe(
      filter((i) => loadingState === 'all' || i.action === loadingState || !i.loading),
      map((i) => i.loading)
    );
  }

  protected setLoading(loading: boolean, pageToken?: string) {
    if (loading) {
      this.loading.next({ loading: true, action: pageToken ? 'nextpage' : 'initial' });
    } else {
      this.loading.next({ loading: false });
    }
  }

  toggleAggregationResult(changedItem: AggregationResultItem) {
    const add = !changedItem.active;
    if (add) {
      this.patchRequestState({
        aggregationFilters: [...this.searchRequestState.aggregationFilters, changedItem.filter],
      } as any);
    } else {
      const expanded = this.searchResultState.aggregationResults!.map((i) => this.expandAggregationResult(i));
      const active = flatMap(expanded, (i) => i.aggregationResultItems!).filter((i) => i && i.active);

      const aggregationName = changedItem.filter?.aggregationName;
      const toRemove = active.find((i) => i.filter?.aggregationName === aggregationName && i.name === changedItem.name);
      if (toRemove) {
        const remaining = active
          .map((i) => i.filter)
          .map((i) => i)
          .filter((i) => i !== toRemove.filter);

        this.patchRequestState({ aggregationFilters: remaining } as any);
      }
    }
  }

  expandAggregationResult(aggregationResult: AggregationResult): AggregationResult {
    if (
      aggregationResult &&
      aggregationResult.aggregationResultItems &&
      aggregationResult.aggregationResultItems[0] &&
      aggregationResult.aggregationResultItems[0].aggregationResults &&
      aggregationResult.aggregationResultItems[0].aggregationResults[0]
    ) {
      return this.expandAggregationResult(aggregationResult.aggregationResultItems[0].aggregationResults[0]);
    }

    return aggregationResult;
  }
}
