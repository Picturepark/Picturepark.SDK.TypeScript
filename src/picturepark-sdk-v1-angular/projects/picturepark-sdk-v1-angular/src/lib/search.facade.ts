import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AggregationFilter, FilterBase, SearchBehavior, Content, ListItem, Schema, Share, AggregatorBase, AggregationResult, LifeCycleFilter, BrokenDependenciesFilter, ContentSearchRequest, ContentSearchResult, ContentService, ContentSearchType, ContentAggregationRequest, SortInfo, ListItemSearchResult, SchemaSearchResult, ShareSearchResult, SchemaDetail, OrFilter, PrefixFilter, TermFilter, SchemaSearchRequest, SchemaService, ListItemResolveBehavior, ListItemService, ListItemSearchRequest, ShareSearchRequest, ShareService } from '../lib/api-services';
import { switchMap, map } from 'rxjs/operators';

export interface SearchInputState {
    searchString: string;
    searchBehavior: SearchBehavior;
    aggregationFilters: AggregationFilter[];
    baseFilter?: FilterBase | undefined;
    aggregators: AggregatorBase[];
    pageSize: number;
    sort: SortInfo[];
}

export interface ContentSearchInputState extends SearchInputState {
  channelId: string;
}

export interface SchemaSearchInputState extends SearchInputState {
  parentSchema: Schema;
}

export interface ListItemSearchInputState extends SearchInputState {
  schemaIds: string[];
}
  

export interface SearchResultState<T> {
    totalResults: number,
    results: T[];
    nextPageToken: string | undefined;
    aggregationResults?: AggregationResult[];
}

export abstract class SearchFacade<T, TState extends SearchInputState> {
    
    searchInputState: TState;

    searchResultState: SearchResultState<T> = {
        totalResults: 0,
        nextPageToken: '',
        results: []
    };

    searchInput$ = new BehaviorSubject(this.searchInputState);
    searchResults$ = new BehaviorSubject(this.searchResultState);

    abstract getSearchRequest(): Observable<{ results: T[]; totalResults: number; pageToken?: string | undefined, aggregationResults?: AggregationResult[] }> | undefined;

    constructor(partialState: Partial<TState>) {
        this.searchInputState = {
            searchString: '',
            searchBehavior: SearchBehavior.SimplifiedSearch,
            pageSize: 75,
            aggregationFilters: [],
            aggregators: [],
            sort: [],
            ...partialState
        } as any; // TODO BRO: Check
    }

    patchInputState(partial: Partial<TState>) {
        this.setInputState({...this.searchInputState, ...partial});
    }

    setInputState(inputState: TState) {
        console.log(inputState);
        this.searchInputState = inputState;
        this.searchInput$.next(this.searchInputState);
    }

    setResultState(resultState: SearchResultState<T>) {
        this.searchResultState = resultState;
        this.searchResults$.next(resultState);
    }

}

@Injectable({
    providedIn: 'root',
})
export class ContentSearchFacade extends SearchFacade<Content, ContentSearchInputState> {
    constructor(private contentService: ContentService) {
        super({});
    }

    getSearchRequest(): Observable<ContentSearchResult> | undefined {
        if (!this.searchInputState.channelId) { return; }
    
        const searchBehaviors = this.searchInputState.searchBehavior ? [
          this.searchInputState.searchBehavior,
          SearchBehavior.DropInvalidCharactersOnFailure,
          SearchBehavior.WildcardOnSingleTerm,
        ] : [
            SearchBehavior.DropInvalidCharactersOnFailure,
            SearchBehavior.WildcardOnSingleTerm,
          ];
    
        const request = new ContentSearchRequest({
          debugMode: false,
          pageToken: this.searchResultState.nextPageToken,
          brokenDependenciesFilter: BrokenDependenciesFilter.All,
          aggregationFilters: this.searchInputState.aggregationFilters,
          aggregators: this.searchInputState.aggregators,
          filter: this.searchInputState.baseFilter,
          channelId: this.searchInputState.channelId,
          lifeCycleFilter: LifeCycleFilter.ActiveOnly,
          limit: this.searchInputState.pageSize,
          searchString: this.searchInputState.searchString,
          searchType: ContentSearchType.MetadataAndFullText,
          searchBehaviors: searchBehaviors,
          sort: this.searchInputState.sort,
        });
    
        return this.contentService.search(request).pipe(switchMap(searchResponse => {
          // TODO BRO: Remove additional aggregation when backend is fixed
          return this.contentService.aggregate(new ContentAggregationRequest({
            aggregators: this.searchInputState.aggregators,
            brokenDependenciesFilter: BrokenDependenciesFilter.All,
            lifeCycleFilter: LifeCycleFilter.ActiveOnly,
            searchType: ContentSearchType.MetadataAndFullText,
            aggregationFilters: this.searchInputState.aggregationFilters,
            channelId: this.searchInputState.channelId,
            filter: this.searchInputState.baseFilter,
            searchBehaviors: searchBehaviors,
            searchString: this.searchInputState.searchString
          })).pipe(map(aggregate => {
            // Patch wrong serialized data
            searchResponse.aggregationResults = aggregate.aggregationResults;
            return searchResponse;
          } ));
        }));
      }
}

@Injectable({
providedIn: 'root',
})
export class ListItemSearchFacade extends SearchFacade<ListItem, ListItemSearchInputState> {
    constructor(private listItemService: ListItemService) {
        super({ schemaIds: [] });
    }
    
    getSearchRequest(): Observable<ListItemSearchResult> | undefined {
        console.log(this.searchInputState);
        const request = new ListItemSearchRequest({
          pageToken: this.searchResultState.nextPageToken,
          limit: this.searchInputState.pageSize,
          searchString: this.searchInputState.searchString,
          sort: this.searchInputState.sort,
          searchBehaviors: this.searchInputState.searchBehavior ? [
            this.searchInputState.searchBehavior,
            SearchBehavior.DropInvalidCharactersOnFailure,
            SearchBehavior.WildcardOnSingleTerm,
          ] : [
            SearchBehavior.DropInvalidCharactersOnFailure,
            SearchBehavior.WildcardOnSingleTerm,
          ],
          schemaIds: this.searchInputState.schemaIds,
          filter: this.searchInputState.baseFilter,
          aggregationFilters: this.searchInputState.aggregationFilters,
          aggregators: this.searchInputState.aggregators,
          includeAllSchemaChildren: true,
          brokenDependenciesFilter: BrokenDependenciesFilter.All,
          debugMode: false,
          lifeCycleFilter: LifeCycleFilter.ActiveOnly,
          resolveBehaviors: [ListItemResolveBehavior.Content, ListItemResolveBehavior.InnerDisplayValueName]
        });
    
        return this.listItemService.search(request);
      }

}

@Injectable({
providedIn: 'root',
})
export class SchemaSearchFacade extends SearchFacade<Schema, SchemaSearchInputState> {
    constructor(private schemaService: SchemaService) {
        super({});
    }

    getSearchRequest(): Observable<SchemaSearchResult> | undefined {
        let filter: FilterBase | null = null;
        const parentSchema = this.searchInputState.parentSchema;
        if (parentSchema) {
          filter = new OrFilter({
            filters: [
              new PrefixFilter({ field: 'schemaNamespace', prefix: parentSchema.id }),
              new TermFilter({ field: 'id', term: parentSchema.id })
            ]
          });
        }
    
        const request = new SchemaSearchRequest({
          debugMode: false,
          pageToken: this.searchResultState.nextPageToken,
          limit: this.searchInputState.pageSize,
          filter: filter ? filter : this.searchInputState.baseFilter, // TODO BRO: Check
          searchString: this.searchInputState.searchString,
          searchBehaviors: [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
          // aggregationFilters: this.searchInputState.aggregationFilters, TODO BRO: Check
          // aggregators: this.searchInputState.aggregators,
          sort: this.searchInputState.sort
        });
    
        return this.schemaService.search(request);
      }
}

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
            SearchBehavior.WildcardOnSingleTerm
          ],
          aggregationFilters: this.searchInputState.aggregationFilters,
          aggregators: this.searchInputState.aggregators,
          sort: this.searchInputState.sort /*this.activeSortingType.field === 'relevance' ? [] : [
            new SortInfo({
              field: this.activeSortingType.field,
              direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
            })
          ]*/ // TODO BRO: Check that handling is in place
        });
    
        return this.shareService.search(request);
      }

}
