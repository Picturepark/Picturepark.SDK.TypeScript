import { Inject, Optional } from '@angular/core'; // ignore
import { HttpClient } from '@angular/common/http'; // ignore
import { Observable } from 'rxjs'; // ignore
import {
  // ignore
  PICTUREPARK_API_URL, // ignore
  ContentCreateRequest,
  ContentResolveBehavior,
  ContentDetail, // ignore
  ContentSearchRequest,
  ContentSearchResult, // ignore
  ContentMetadataUpdateRequest,
  ContentPermissionsUpdateRequest, // ignore
  ListItemResolveBehavior,
  ListItemDetail, // ignore
  ListItemSearchRequest,
  ListItemSearchResult, // ignore
  ShareDetail,
  ShareSearchRequest,
  ShareSearchResult // ignore
} from './api-services'; // ignore

import { Injector } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { LazyGetter } from 'lazy-get-decorator';
import { AuthService } from './auth.service';
import { PictureparkServiceBase } from './base.service';
import { LiquidRenderingService } from './liquid-rendering.service';

import * as generated from './api-services';

class TranslatedStringDictionary extends generated.TranslatedStringDictionary {
  translate(locale: string) {
    const language = locale.split('-')[0];
    return this[language] ? this[language] : this[Object.keys(this)[0]];
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

    // remove guid and show only owner name. example: name: "534e5b3763f242629eca53e764d713bf/cp support"
    if (this.filter && this.filter.aggregationName === 'ownerTokenId') {
      displayName = this.name.split('/').pop() || null;
    } else {
      displayName = this.filter && this.filter.filter ? this.filter.filter.getDisplayName(locale) : null;
    }

    return displayName ?? this.name;
  }
}

class ContentService extends generated.ContentService {
    @LazyGetter()
    protected get liquidRenderingService(): LiquidRenderingService {
        return this.injector.get(LiquidRenderingService);
    }

    constructor(protected injector: Injector,
        @Inject(AuthService) configuration: AuthService,
        @Inject(HttpClient) http: HttpClient,
        @Optional() @Inject(PICTUREPARK_API_URL) baseUrl?: string) {
        // @ts-ignore// @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        super(configuration);
        // @ts-ignore// @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        this.http = http;
        // @ts-ignore// @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl('');
    }

    public create(resolveBehaviors: ContentResolveBehavior[] | null | undefined, allowMissingDependencies: boolean | undefined,
        timeout: string | null | undefined, waitSearchDocCreation: boolean | undefined, contentCreateRequest: ContentCreateRequest): Observable<ContentDetail> {
        return this.createCore(resolveBehaviors, allowMissingDependencies, timeout, waitSearchDocCreation, contentCreateRequest).pipe(
            mergeMap(async content => {
                await this.liquidRenderingService.renderNestedDisplayValues(content);
                return content;
            })
        );
    }

    public get(contentId: string, resolveBehaviors: ContentResolveBehavior[] | null | undefined): Observable<ContentDetail> {
        return this.getCore(contentId, resolveBehaviors).pipe(
            mergeMap(async content => {
                await this.liquidRenderingService.renderNestedDisplayValues(content);
                return content;
            })
        );
    }

    public getMany(ids: string[] | null, resolveBehaviors: ContentResolveBehavior[] | null | undefined): Observable<ContentDetail[]> {
        return this.getManyCore(ids, resolveBehaviors).pipe(
            mergeMap(async contents => {
                contents.forEach(async content => await this.liquidRenderingService.renderNestedDisplayValues(content));
                return contents;
            })
        );
    }

    public search(contentSearchRequest: ContentSearchRequest): Observable<ContentSearchResult> {
        return this.searchCore(contentSearchRequest).pipe(
            mergeMap(async  searchResult => {
                await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
                return searchResult;
            })
        );
    }

    public updateMetadata(contentId: string, resolveBehaviors: ContentResolveBehavior[] | null | undefined,
        allowMissingDependencies: boolean | undefined, timeout: string | null | undefined,
        waitSearchDocCreation: boolean | undefined, updateRequest: ContentMetadataUpdateRequest): Observable<ContentDetail> {
        return this.updateMetadataCore(contentId, resolveBehaviors, allowMissingDependencies, timeout, waitSearchDocCreation, updateRequest).pipe(
            mergeMap(async content => {
                await this.liquidRenderingService.renderNestedDisplayValues(content);
                return content;
            })
        );
    }

    public updatePermissions(contentId: string, resolveBehaviors: ContentResolveBehavior[] | null | undefined,
        timeout: string | null | undefined, waitSearchDocCreation: boolean | undefined,
        updateRequest: ContentPermissionsUpdateRequest): Observable<ContentDetail> {
        return this.updatePermissionsCore(contentId, resolveBehaviors, timeout, waitSearchDocCreation, updateRequest).pipe(
            mergeMap(async content => {
                await this.liquidRenderingService.renderNestedDisplayValues(content);
                return content;
            })
        );
    }
}

class ListItemService extends generated.ListItemService {
    @LazyGetter()
    protected get liquidRenderingService(): LiquidRenderingService {
        return this.injector.get(LiquidRenderingService);
    }

    constructor(protected injector: Injector,
        @Inject(AuthService) configuration: AuthService,
        @Inject(HttpClient) http: HttpClient,
        @Optional() @Inject(PICTUREPARK_API_URL) baseUrl?: string) {
        // @ts-ignore// @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        super(configuration);
        // @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        this.http = http;
        // @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl('');
    }

    public get(listItemId: string, resolveBehaviors: ListItemResolveBehavior[] | null | undefined): Observable<ListItemDetail> {
        return this.getCore(listItemId, resolveBehaviors).pipe(
            mergeMap(async  listItem => {
                await this.liquidRenderingService.renderNestedDisplayValues(listItem);
                return listItem;
            })
        );
    }

    public search(listItemSearchRequest: ListItemSearchRequest): Observable<ListItemSearchResult> {
        return this.searchCore(listItemSearchRequest).pipe(
            mergeMap(async  searchResult => {
                await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
                return searchResult;
            })
        );
    }
}

class ShareService extends generated.ShareService {
    @LazyGetter()
    protected get liquidRenderingService(): LiquidRenderingService {
        return this.injector.get(LiquidRenderingService);
    }

    constructor(protected injector: Injector,
        @Inject(AuthService) configuration: AuthService,
        @Inject(HttpClient) http: HttpClient,
        @Optional() @Inject(PICTUREPARK_API_URL) baseUrl?: string) {
        // @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        super(configuration);
        // @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        this.http = http;
        // @ts-ignore: the purpose of this constructor is to be copied to the api-services via NSwag // ignore
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl('');
    }

    public get(id: string): Observable<ShareDetail> {
        return this.getCore(id).pipe(
            mergeMap(async  shareDetail => {
                await this.liquidRenderingService.renderNestedDisplayValues(shareDetail);
                return shareDetail;
            })
        );
    }

    public getShareJson(token: string, lang: string | null | undefined): Observable<any> {
        return this.getShareJsonCore(token, lang).pipe(
            mergeMap(async shareJson => {
                await this.liquidRenderingService.renderNestedDisplayValues(shareJson);
                return shareJson;
            })
        );
    }

    public search(shareSearchRequest: ShareSearchRequest): Observable<ShareSearchResult> {
        return this.searchCore(shareSearchRequest).pipe(
            mergeMap(async  searchResult => {
                await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
                return searchResult;
            })
        );
    }
}
