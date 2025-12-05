/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Optional } from '@angular/core'; // ignore
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http'; // ignore
import { Observable, from as _observableFrom, throwError as _observableThrow } from 'rxjs'; // ignore
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators'; // ignore
// prettier-ignore
import { // ignore
  PICTUREPARK_API_URL, // ignore
  ContentCreateRequest, // ignore
  ContentResolveBehavior, // ignore
  ContentSearchRequest, // ignore
  ContentSearchResult, // ignore
  ContentMetadataUpdateRequest, // ignore
  ContentPermissionsUpdateRequest, // ignore
  ListItemResolveBehavior, // ignore
  ListItemDetail, // ignore
  ListItemSearchRequest, // ignore
  ListItemSearchResult, // ignore
  ShareDetail, // ignore
  ShareSearchRequest, // ignore
  ShareSearchResult, // ignore
  ShareResolveBehavior, // ignore
  ShareContentDetailResult, // ignore
  SetDisplayContentRequest, // ignore
} from './api-services'; // ignore

import { AuthService } from './auth.service';
import { PictureparkServiceBase } from './base.service';
import * as generated from './api-services';

export const NON_VIRTUAL_CONTENT_SCHEMAS_IDS = [
  'AudioMetadata',
  'DocumentMetadata',
  'FileMetadata',
  'ImageMetadata',
  'VideoMetadata',
  'VectorMetadata',
];

export const SYSTEM_LAYER_SCHEMA_IDS = ['XmpMetadata', 'ExifMetadata'];

class TranslatedStringDictionary extends generated.TranslatedStringDictionary {
  translate(locale: string) {
    const language = locale.split('-')[0];
    return this[language] ? this[language] : this[Object.keys(this)[0]];
  }
}

class Content extends generated.Content {
  isVirtual() {
    return !NON_VIRTUAL_CONTENT_SCHEMAS_IDS.includes(this.contentSchemaId);
  }
}

class ContentDetail extends generated.ContentDetail {
  isVirtual() {
    return !NON_VIRTUAL_CONTENT_SCHEMAS_IDS.includes(this.contentSchemaId);
  }
}

class ShareContentDetail extends generated.ShareContentDetail {
  isVirtual() {
    return !NON_VIRTUAL_CONTENT_SCHEMAS_IDS.includes(this.contentSchemaId);
  }
}

class FilterBase extends generated.FilterBase {
  getDisplayName(locale: string): string | null {
    return null;
  }
}

class DateRangeFilter extends generated.DateRangeFilter {
  getDisplayName(locale: string) {
    return this.range && this.range.names ? this.range.names.translate(locale) : 'n/a';
  }
}

class AggregationResultItem extends generated.AggregationResultItem {
  getDisplayName(locale: string) {
    let displayName: string | null;

    // remove guid and show only owner name. example: name: "534e5b3763f242629eca53e764d713bf/Fotoware Alto support"
    if (this.filter && this.filter.aggregationName === 'ownerTokenId') {
      displayName = this.name.split('/').pop() || null;
    } else if (
      this.filter &&
      ((this.filter.filter as any).term === 'false' || (this.filter.filter as any).term === 'true')
    ) {
      displayName = (this.filter.filter as any).term;
    } else {
      displayName = this.filter && this.filter.filter ? this.filter.filter.getDisplayName(locale) : null;
    }

    return displayName ?? this.name;
  }
}

class ContentService extends generated.ContentService {
  create(
    resolveBehaviors: ContentResolveBehavior[] | undefined,
    allowMissingDependencies: boolean | undefined,
    timeout: string | null | undefined,
    waitSearchDocCreation: boolean | undefined,
    contentCreateRequest: ContentCreateRequest
  ): Observable<ContentDetail> {
    return this.createCore(
      resolveBehaviors,
      allowMissingDependencies,
      timeout,
      waitSearchDocCreation,
      contentCreateRequest
    ).pipe(
      _observableMergeMap(async content => {
        await this.liquidRenderingService.renderNestedDisplayValues(content);
        return content;
      })
    );
  }

  get(contentId: string, resolveBehaviors: ContentResolveBehavior[] | undefined): Observable<ContentDetail> {
    return this.getCore(contentId, resolveBehaviors).pipe(
      _observableMergeMap(async content => {
        await this.liquidRenderingService.renderNestedDisplayValues(content);
        return content;
      })
    );
  }

  getMany(ids: string[], resolveBehaviors: ContentResolveBehavior[] | undefined): Observable<ContentDetail[]> {
    return this.getManyCore(ids, resolveBehaviors).pipe(
      _observableMergeMap(async contents => {
        contents.forEach(async content => await this.liquidRenderingService.renderNestedDisplayValues(content));
        return contents;
      })
    );
  }

  search(contentSearchRequest: ContentSearchRequest): Observable<ContentSearchResult> {
    return this.searchCore(contentSearchRequest).pipe(
      _observableMergeMap(async searchResult => {
        await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
        return searchResult;
      })
    );
  }

  updateMetadata(
    contentId: string,
    resolveBehaviors: ContentResolveBehavior[] | undefined,
    allowMissingDependencies: boolean | undefined,
    timeout: string | null | undefined,
    waitSearchDocCreation: boolean | undefined,
    updateRequest: ContentMetadataUpdateRequest
  ): Observable<ContentDetail> {
    return this.updateMetadataCore(
      contentId,
      resolveBehaviors,
      allowMissingDependencies,
      timeout,
      waitSearchDocCreation,
      updateRequest
    ).pipe(
      _observableMergeMap(async content => {
        await this.liquidRenderingService.renderNestedDisplayValues(content);
        return content;
      })
    );
  }

  updatePermissions(
    contentId: string,
    resolveBehaviors: ContentResolveBehavior[] | undefined,
    timeout: string | null | undefined,
    waitSearchDocCreation: boolean | undefined,
    updateRequest: ContentPermissionsUpdateRequest
  ): Observable<ContentDetail> {
    return this.updatePermissionsCore(contentId, resolveBehaviors, timeout, waitSearchDocCreation, updateRequest).pipe(
      _observableMergeMap(async content => {
        await this.liquidRenderingService.renderNestedDisplayValues(content);
        return content;
      })
    );
  }

  setDisplayContent(
    id: string,
    resolveBehaviors: ContentResolveBehavior[] | undefined,
    timeout: string | null | undefined,
    waitForContinuation: boolean | undefined,
    setDisplayContentRequest: SetDisplayContentRequest
  ): Observable<ContentDetail> {
    return this.setDisplayContentCore(
      id,
      resolveBehaviors,
      timeout,
      waitForContinuation,
      setDisplayContentRequest
    ).pipe(
      _observableMergeMap(async content => {
        await this.liquidRenderingService.renderNestedDisplayValues(content);
        return content;
      })
    );
  }
}

class ListItemService extends generated.ListItemService {
  get(listItemId: string, resolveBehaviors: ListItemResolveBehavior[] | null | undefined): Observable<ListItemDetail> {
    return this.getCore(listItemId, resolveBehaviors).pipe(
      _observableMergeMap(async listItem => {
        await this.liquidRenderingService.renderNestedDisplayValues(listItem);
        return listItem;
      })
    );
  }

  search(listItemSearchRequest: ListItemSearchRequest): Observable<ListItemSearchResult> {
    return this.searchCore(listItemSearchRequest).pipe(
      _observableMergeMap(async searchResult => {
        await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
        return searchResult;
      })
    );
  }
}

class ShareService extends generated.ShareService {
  get(
    id: string,
    resolveBehaviors: ShareResolveBehavior[] | null | undefined,
    contentResolveLimit: number | null | undefined
  ): Observable<ShareDetail> {
    return this.getCore(id, resolveBehaviors, contentResolveLimit).pipe(
      _observableMergeMap(async shareDetail => {
        await this.liquidRenderingService.renderNestedDisplayValues(shareDetail);
        return shareDetail;
      })
    );
  }

  getShareByToken(
    token: string,
    lang: string | null | undefined,
    resolveBehaviors: ShareResolveBehavior[] | null | undefined,
    contentResolveLimit: number | null | undefined,
    cdnUrl?: string
  ): Observable<ShareDetail> {
    if (cdnUrl) {
      return this.getShareByTokenFromUrl(
        token,
        lang,
        resolveBehaviors,
        contentResolveLimit,
        cdnUrl + '/json/{token}?'
      ).pipe(
        _observableMergeMap(async shareJson => {
          await this.liquidRenderingService.renderNestedDisplayValues(shareJson);
          return shareJson;
        })
      );
    } else {
      return this.getShareJsonCore(token, lang, resolveBehaviors, contentResolveLimit).pipe(
        _observableMergeMap(async shareJson => {
          await this.liquidRenderingService.renderNestedDisplayValues(shareJson);
          return shareJson;
        })
      );
    }
  }

  getShareContents(
    token: string,
    lang: string | null | undefined,
    limit: number | undefined,
    pageToken: string | null | undefined,
    cdnUrl?: string
  ): Observable<ShareContentDetailResult> {
    if (cdnUrl) {
      return this.getShareContentsCoreFromUrl(token, lang, limit, pageToken, cdnUrl + 'json/{token}/contents?').pipe(
        _observableMergeMap(async shareJson => {
          await this.liquidRenderingService.renderNestedDisplayValues(shareJson);
          return shareJson;
        })
      );
    } else {
      return this.getShareContentsCore(token, lang, limit, pageToken).pipe(
        _observableMergeMap(async shareJson => {
          await this.liquidRenderingService.renderNestedDisplayValues(shareJson);
          return shareJson;
        })
      );
    }
  }

  /**
   * Get share contents
   * @param token Share token
   * @param lang (optional) Language code
   * @param limit (optional) Number of contents to return
   * @param pageToken (optional) PageToken to page over contents
   * @return ShareContentDetailResult
   */
  protected getShareContentsCoreFromUrl(
    token: string | null,
    lang: string | null | undefined,
    limit: number | undefined,
    pageToken: string | null | undefined,
    url: string
  ): Observable<ShareContentDetailResult> {
    let url_ = url;
    if (token === undefined || token === null) {
      throw new Error("The parameter 'token' must be defined.");
    }
    url_ = url_.replace('{token}', encodeURIComponent('' + token));
    if (lang !== undefined && lang !== null) {
      url_ += 'lang=' + encodeURIComponent('' + lang) + '&';
    }
    if (limit === null) {
      throw new Error("The parameter 'limit' cannot be null.");
    } else if (limit !== undefined) {
      url_ += 'limit=' + encodeURIComponent('' + limit) + '&';
    }
    if (pageToken !== undefined && pageToken !== null) {
      url_ += 'pageToken=' + encodeURIComponent('' + pageToken) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    const options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap(transformedOptions_ => {
          // @ts-ignore: the purpose of this reference is to be copied to the api-services via NSwag // ignore
          return this.http.request('get', url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetShareContents(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetShareContents(<any>response_);
            } catch (e) {
              return <Observable<ShareContentDetailResult>>(<any>_observableThrow(e));
            }
          } else {
            return <Observable<ShareContentDetailResult>>(<any>_observableThrow(response_));
          }
        })
      );
  }

  /**
   * Get share json
   * @param token Share token
   * @param lang (optional) Language code
   * @return ShareDetail
   */
  protected getShareByTokenFromUrl(
    token: string,
    lang: string | null | undefined,
    resolveBehaviors: ShareResolveBehavior[] | null | undefined,
    contentResolveLimit: number | null | undefined,
    url: string
  ): Observable<any> {
    let url_ = url;
    if (token === undefined || token === null) {
      throw new Error("The parameter 'token' must be defined.");
    }
    url_ = url_.replace('{token}', encodeURIComponent('' + token));
    if (lang !== undefined) {
      url_ += 'lang=' + encodeURIComponent('' + lang) + '&';
    }
    if (resolveBehaviors !== undefined && resolveBehaviors !== null) {
      resolveBehaviors.forEach(item => {
        url_ += 'resolveBehaviors=' + encodeURIComponent('' + item) + '&';
      });
    }
    if (contentResolveLimit !== undefined && contentResolveLimit !== null) {
      url_ += 'contentResolveLimit=' + encodeURIComponent('' + contentResolveLimit) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    const options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap(transformedOptions_ => {
          // @ts-ignore: the purpose of this reference is to be copied to the api-services via NSwag // ignore
          return this.http.request('get', url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetShareJson(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetShareJson(<any>response_);
            } catch (e) {
              return <Observable<any>>(<any>_observableThrow(e));
            }
          } else {
            return <Observable<any>>(<any>_observableThrow(response_));
          }
        })
      );
  }

  search(shareSearchRequest: ShareSearchRequest): Observable<ShareSearchResult> {
    return this.searchCore(shareSearchRequest).pipe(
      _observableMergeMap(async searchResult => {
        await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
        return searchResult;
      })
    );
  }
}
