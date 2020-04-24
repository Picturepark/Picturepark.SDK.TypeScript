import { Observable, EMPTY } from 'rxjs';
import { expand, reduce, map } from 'rxjs/operators';
import {
  Content,
  ContentSearchRequest,
  LifeCycleFilter,
  BrokenDependenciesFilter,
  ContentSearchType,
  TermsFilter,
  ContentService,
} from '../services/api-services';

export interface ISearchRequest {
  pageToken?: string | undefined;
}

export interface ISearchResult<T> {
  pageToken?: string | undefined;
  results: T[];
}

/** Fetches all items until there is no page token anymore */
export function fetchAll<T, U extends ISearchRequest>(
  searchDelegate: (request: U) => Observable<ISearchResult<T>>,
  request: U
): Observable<ISearchResult<T>> {
  return searchDelegate(request).pipe(
    expand((firstResult) => {
      if (!firstResult.pageToken) {
        return EMPTY;
      }
      request.pageToken = firstResult.pageToken;

      return searchDelegate(request).pipe(
        map((searchResult) => {
          firstResult.pageToken = searchResult.pageToken;
          firstResult.results.push(...searchResult.results);
          return firstResult;
        })
      );
    }),

    reduce((data) => data)
  );
}

export function fetchContents(contentService: ContentService, ids: string[]): Observable<ISearchResult<Content>> {
  return fetchAll(
    (req) => contentService.search(req),
    new ContentSearchRequest({
      limit: 1000,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      searchType: ContentSearchType.MetadataAndFullText,
      debugMode: false,
      filter: new TermsFilter({
        field: 'id',
        terms: ids,
      }),
    })
  );
}

export function fetchContentById(contentService: ContentService, id: string): Observable<Content | undefined> {
  return fetchContents(contentService, [id]).pipe(
    map((result) => {
      return result.results[0];
    })
  );
}
