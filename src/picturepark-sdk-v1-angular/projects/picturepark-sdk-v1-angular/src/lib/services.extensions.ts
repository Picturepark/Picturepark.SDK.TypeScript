import { Inject, Optional } from '@angular/core'; // ignore
import { HttpClient } from '@angular/common/http'; // ignore
import { Observable } from 'rxjs'; // ignore
import { // ignore
    PICTUREPARK_API_URL, // ignore
    ContentResolveBehavior, ContentDetail, ContentSearchRequest, ContentSearchResult, // ignore
    ListItemSearchRequest, ListItemSearchResult, // ignore
    SchemaSearchRequest, SchemaSearchResult, // ignore
    ShareSearchRequest, ShareSearchResult // ignore
} from './api-services'; // ignore

import { Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
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

    public get(contentId: string, resolveBehaviors: ContentResolveBehavior[] | null | undefined): Observable<ContentDetail> {
        return this.getCore(contentId, resolveBehaviors).pipe(
            tap(async content => await this.liquidRenderingService.renderNestedDisplayValues(content))
        );
    }

    public search(contentSearchRequest: ContentSearchRequest): Observable<ContentSearchResult> {
        return this.searchCore(contentSearchRequest).pipe(
            tap(async searchResult => await this.liquidRenderingService.renderNestedDisplayValues(searchResult))
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

    public search(listItemSearchRequest: ListItemSearchRequest): Observable<ListItemSearchResult> {
        return this.searchCore(listItemSearchRequest).pipe(
            tap(async searchResult => await this.liquidRenderingService.renderNestedDisplayValues(searchResult))
        );
    }
}

class SchemaService extends generated.SchemaService {
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

    public search(schemaSearchRequest: SchemaSearchRequest): Observable<SchemaSearchResult> {
        return this.searchCore(schemaSearchRequest).pipe(
            tap(async searchResult => await this.liquidRenderingService.renderNestedDisplayValues(searchResult))
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

    public getShareJson(token: string, lang: string | null | undefined): Observable<any> {
        return this.getShareJsonCore(token, lang).pipe(
            tap(async content => await this.liquidRenderingService.renderNestedDisplayValues(content))
        );
    }

    public search(shareSearchRequest: ShareSearchRequest): Observable<ShareSearchResult> {
        return this.searchCore(shareSearchRequest).pipe(
            tap(async searchResult => await this.liquidRenderingService.renderNestedDisplayValues(searchResult))
        );
    }
}
