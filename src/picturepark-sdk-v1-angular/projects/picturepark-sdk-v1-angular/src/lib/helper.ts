import { Observable, EMPTY } from 'rxjs';
import { expand, reduce, map } from 'rxjs/operators';

export interface ISearchRequest {
    pageToken?: string | undefined;
}

export interface ISearchResult<T> {
    pageToken?: string | undefined;
    results: T[];
}

/** Fetches all items until there is no page token anymore */
export function fetchAll<T, U extends ISearchRequest>(
    searchDelegate: (request: U) => Observable<ISearchResult<T>>, request: U): Observable<ISearchResult<T>> {
    return searchDelegate(request).pipe(
        expand(firstResult => {
          if (!firstResult.pageToken) {
            return EMPTY;
          }
          request.pageToken = firstResult.pageToken;

          return searchDelegate(request).pipe(
            map(searchResult => {
              firstResult.pageToken = searchResult.pageToken;
              firstResult.results.push(...searchResult.results);
              return firstResult;
            }));
        }),

        reduce(data => data)
    );
}
