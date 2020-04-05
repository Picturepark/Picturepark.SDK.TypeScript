import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AggregationFilter, FilterBase, SearchBehavior, Content, ListItem, Schema, Share, AggregatorBase, AggregationResult } from '../lib/api-services';

export interface SearchInputState {
    searchString: string;
    searchBehavior: SearchBehavior;
    aggregationFilters: AggregationFilter[];
    baseFilter?: FilterBase | undefined;
    aggregators: AggregatorBase[];
}

export interface SearchResultState<T> {
    totalResults: number,
    results: T[];
    nextPageToken: string | undefined;
    aggregationResults?: AggregationResult[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchFacade<T> {
    
    searchInputState: SearchInputState = {
        searchString: '',
        searchBehavior: SearchBehavior.SimplifiedSearch,
        aggregationFilters: [],
        aggregators: []
    };

    searchResultState: SearchResultState<T> = {
        totalResults: 0,
        nextPageToken: '',
        results: []
    };

    searchInput$ = new BehaviorSubject(this.searchInputState);
    searchResults$ = new BehaviorSubject(this.searchResultState);

    set searchString(searchString: string) {
        this.patchInputState({ searchString });
    }

    set searchBehavior(searchBehavior: SearchBehavior) {
        this.patchInputState({ searchBehavior });
    }

    set aggregationFilters(aggregationFilters: AggregationFilter[]) {
        this.patchInputState({ aggregationFilters });
    }

    set baseFilter(baseFilter: FilterBase) {
        this.patchInputState({ baseFilter });
    }

    patchInputState(partial: Partial<SearchInputState>) {
        this.setInputState({...this.searchInputState, ...partial});
    }

    setInputState(inputState: SearchInputState) {
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
export class ContentSearchFacade extends SearchFacade<Content> {

}

@Injectable({
providedIn: 'root',
})
export class ListItemSearchFacade extends SearchFacade<ListItem> {

}

@Injectable({
providedIn: 'root',
})
export class SchemaSearchFacade extends SearchFacade<Schema> {

}

@Injectable({
  providedIn: 'root',
})
export class ShareSearchFacade extends SearchFacade<Share> {

}
