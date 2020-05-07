import { SearchInputState, SearchFacade } from './search.facade';
import {
  Schema,
  SchemaService,
  SchemaSearchResult,
  FilterBase,
  OrFilter,
  PrefixFilter,
  TermFilter,
  SchemaSearchRequest,
  SearchBehavior,
  AggregatorBase,
  AggregationResult,
  AndFilter,
} from '../services/api-services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface SchemaSearchInputState extends SearchInputState {
  parentSchema: Schema;
}

@Injectable({
  providedIn: 'root',
})
export class SchemaSearchFacade extends SearchFacade<Schema, SchemaSearchInputState> {
  constructor(private schemaService: SchemaService) {
    super({});
  }

  search(): Observable<SchemaSearchResult> | undefined {
    let filter: FilterBase | undefined;
    const parentSchema = this.searchRequestState.parentSchema;
    if (parentSchema) {
      filter = new OrFilter({
        filters: [
          new PrefixFilter({ field: 'schemaNamespace', prefix: parentSchema.id }),
          new TermFilter({ field: 'id', term: parentSchema.id }),
        ],
      });

      if (this.searchRequestState.baseFilter) {
        filter = new AndFilter({ filters: [this.searchRequestState.baseFilter, filter] });
      }
    } else {
      filter = this.searchRequestState.baseFilter;
    }

    const request = new SchemaSearchRequest({
      debugMode: false,
      pageToken: this.searchResultState.nextPageToken,
      limit: this.searchRequestState.pageSize,
      filter: filter,
      searchString: this.searchRequestState.searchString,
      searchBehaviors: [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
      sort: this.searchRequestState.sort,
    });

    this.setLoading(true, request.pageToken);
    return this.schemaService.search(request).pipe(tap(() => this.setLoading(false)));
  }

  searchAggregations(aggregators: AggregatorBase[]): Observable<AggregationResult[]> | undefined {
    throw new Error('Method not implemented.');
  }
}
