// Picturepark Fetch SDK declarations

declare module "picturepark" {
    export class ContentClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Aggregate
         * @contentAggregationRequest The aggregation request.
         * @return ObjectAggregationResult
         */
        aggregate(contentAggregationRequest: ContentAggregationRequest): Promise<ObjectAggregationResult | null>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult | null>;
        /**
         * Aggregate By Channel
         * @channelId The channel id
         * @contentAggregationRequest The content aggregation request.
         * @return ObjectAggregationResult
         */
        aggregateByChannel(channelId: string, contentAggregationRequest: ContentAggregationRequest): Promise<ObjectAggregationResult | null>;
        protected processAggregateByChannel(response: Response): Promise<ObjectAggregationResult | null>;
        createDownloadLink(request: ContentBatchDownloadRequest): Promise<ContentBatchDownloadItem | null>;
        protected processCreateDownloadLink(response: Response): Promise<ContentBatchDownloadItem | null>;
        /**
         * Create Single
         * @createRequest The content create request.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @timeout Maximum time in milliseconds to wait for the business process completed state.
         * @patterns Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         */
        createContent(createRequest: CreateContentRequest, resolve: boolean, timeout: number, patterns: string[]): Promise<ContentDetail | null>;
        protected processCreateContent(response: Response): Promise<ContentDetail | null>;
        download(contentId: string, outputFormatId: string, range: string): Promise<Blob | null>;
        protected processDownload(response: Response): Promise<Blob | null>;
        /**
         * Get Thumbnail
         * @contentId The Content id
         * @size Thumbnail size. Either small, medium or large
         * @return HttpResponseMessage
         */
        downloadThumbnail(contentId: string, size: ThumbnailSize): Promise<Blob | null>;
        protected processDownloadThumbnail(response: Response): Promise<Blob | null>;
        downloadResized(contentId: string, outputFormatId: string, width: number, height: number): Promise<Blob | null>;
        protected processDownloadResized(response: Response): Promise<Blob | null>;
        /**
         * Get Single
         * @contentId The content id.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @patterns Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ContentDetail
         */
        get(contentId: string, resolve: boolean, patterns: string[]): Promise<ContentDetail | null>;
        protected processGet(response: Response): Promise<ContentDetail | null>;
        /**
         * Update Single - Metadata
         * @contentId The content id.
         * @updateRequest The metadata update request.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @timeout Maximum time in milliseconds to wait for the business process completed state.
         * @patterns Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ContentDetail
         */
        updateMetadata(contentId: string, updateRequest: UpdateContentMetadataRequest, resolve: boolean, timeout: number, patterns: string[]): Promise<ContentDetail | null>;
        protected processUpdateMetadata(response: Response): Promise<ContentDetail | null>;
        /**
         * Update Single - Permissions
         * @contentId The content id.
         * @updateRequest The content permission update request.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @timeout Maximum time in milliseconds to wait for the business process completed state.
         * @patterns Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ContentDetail
         */
        updatePermissions(contentId: string, updateRequest: UpdateContentPermissionsRequest, resolve: boolean, timeout: number, patterns: string[]): Promise<ContentDetail | null>;
        protected processUpdatePermissions(response: Response): Promise<ContentDetail | null>;
        /**
         * Search
         * @contentSearchRequest The content search request.
         * @return ContentSearchResult
         */
        search(contentSearchRequest: ContentSearchRequest): Promise<ContentSearchResult | null>;
        protected processSearch(response: Response): Promise<ContentSearchResult | null>;
        /**
         * Search By Channel
         * @channelId The channel id.
         * @contentSearchRequest The content search request.
         * @return ContentSearchResult
         */
        searchByChannel(channelId: string, contentSearchRequest: ContentSearchRequest): Promise<ContentSearchResult | null>;
        protected processSearchByChannel(response: Response): Promise<ContentSearchResult | null>;
        deactivate(contentId: string, timeout: number): Promise<void>;
        protected processDeactivate(response: Response): Promise<void>;
        /**
         * Update file
         * @contentId The id of the content to replace
         * @updateRequest Update request
         */
        updateFile(contentId: string, updateRequest: ContentFileUpdateRequest): Promise<BusinessProcessViewItem | null>;
        protected processUpdateFile(response: Response): Promise<BusinessProcessViewItem | null>;
        reactivate(contentId: string, resolve: boolean, timeout: number, patterns: string[]): Promise<ContentDetail | null>;
        protected processReactivate(response: Response): Promise<ContentDetail | null>;
        deactivateMany(deactivationRequest: ContentDeactivationRequest): Promise<BusinessProcessViewItem | null>;
        protected processDeactivateMany(response: Response): Promise<BusinessProcessViewItem | null>;
        reactivateMany(reactivationRequest: ContentReactivationRequest): Promise<BusinessProcessViewItem | null>;
        protected processReactivateMany(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Update Many - Metadata
         * @updateRequest The metadata update request.
         * @return BusinessProcessViewItem
         */
        updateMetadataMany(updateRequest: ContentsMetadataUpdateRequest): Promise<BusinessProcessViewItem | null>;
        protected processUpdateMetadataMany(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Update Many - Permissions
         * @updateRequest The permissions update request.
         * @return BusinessProcessViewItem
         */
        updatePermissionsMany(updateRequest: UpdateContentPermissionsRequest[]): Promise<BusinessProcessViewItem | null>;
        protected processUpdatePermissionsMany(response: Response): Promise<BusinessProcessViewItem | null>;
    }
    export class BusinessProcessClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        start(processDefinitionId: string, request: StartProcessRequest): Promise<BusinessProcessViewItem | null>;
        protected processStart(response: Response): Promise<BusinessProcessViewItem | null>;
        markAsEnded(processId: string): Promise<void>;
        protected processMarkAsEnded(response: Response): Promise<void>;
        markAsStarted(processId: string): Promise<void>;
        protected processMarkAsStarted(response: Response): Promise<void>;
        sendMessage(processId: string, request: SendMessageRequest): Promise<void>;
        protected processSendMessage(response: Response): Promise<void>;
        waitForStates(processId: string, states: string, timeout: number): Promise<BusinessProcessWaitResult | null>;
        protected processWaitForStates(response: Response): Promise<BusinessProcessWaitResult | null>;
    }
    export class DocumentHistoryClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        get(id: string): Promise<DocumentHistoryViewItem | null>;
        protected processGet(response: Response): Promise<DocumentHistoryViewItem | null>;
        getVersion(id: string, version: string): Promise<DocumentHistoryViewItem | null>;
        protected processGetVersion(response: Response): Promise<DocumentHistoryViewItem | null>;
        getDifferenceLatest(id: string, oldVersion: number): Promise<DocumentHistoryDifferenceViewItem | null>;
        protected processGetDifferenceLatest(response: Response): Promise<DocumentHistoryDifferenceViewItem | null>;
        getDifference(id: string, oldVersion: number, newVersion: number): Promise<DocumentHistoryDifferenceViewItem | null>;
        protected processGetDifference(response: Response): Promise<DocumentHistoryDifferenceViewItem | null>;
    }
    export class JsonSchemaClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get Json Schema
         * @schemaId Schema Id
         * @return JsonSchemaViewItem
         */
        get(schemaId: string): Promise<any | null>;
        protected processGet(response: Response): Promise<any | null>;
    }
    export class ListItemClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Create Single
         * @listItem List item create request.
         * @resolve Resolves the data of referenced list items into the list item's content.
         * @timeout Maximum time in milliseconds to wait for the business process completed state.
         * @patterns Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ListItemDetail
         */
        create(listItem: ListItemCreateRequest, resolve: boolean, timeout: number, patterns: string[]): Promise<ListItemDetail | null>;
        protected processCreate(response: Response): Promise<ListItemDetail | null>;
        /**
         * Create Many
         * @objects A list of ListItemCreateRequests.
         * @return BusinessProcessViewItem
         */
        createMany(objects: ListItemCreateRequest[]): Promise<BusinessProcessViewItem | null>;
        protected processCreateMany(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Delete Many
         * @ids The list item id list.
         * @return BusinessProcessViewItem
         */
        deleteMany(ids: string[]): Promise<BusinessProcessViewItem | null>;
        protected processDeleteMany(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Update Many
         * @objects A list of ListItemUpdateRequests.
         * @return BusinessProcessViewItem
         */
        updateMany(objects: ListItemUpdateRequest[]): Promise<BusinessProcessViewItem | null>;
        protected processUpdateMany(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Aggregate
         * @listItemAggregationRequest The list item aggregation request.
         * @return ObjectAggregationResult
         */
        aggregate(listItemAggregationRequest: ListItemAggregationRequest): Promise<ObjectAggregationResult | null>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult | null>;
        /**
         * Search
         * @listItemSearchRequest The list item search request.
         * @return List item result set.
         */
        search(listItemSearchRequest: ListItemSearchRequest): Promise<BaseResultOfListItem | null>;
        protected processSearch(response: Response): Promise<BaseResultOfListItem | null>;
        /**
         * Delete Single
         * @objectId The list item id.
         * @timeout Maximum time in milliseconds to wait for the business process completed state.
         */
        delete(objectId: string, timeout: number): Promise<void>;
        protected processDelete(response: Response): Promise<void>;
        /**
         * Get Single
         * @listItemId The list item id.
         * @resolve Resolves the data of referenced list items into the list item's content.
         * @patterns Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         */
        get(listItemId: string, resolve: boolean, patterns: string[]): Promise<ListItemDetail | null>;
        protected processGet(response: Response): Promise<ListItemDetail | null>;
        /**
         * Update Single
         * @listItemId The list item id.
         * @updateRequest The list item update request.
         * @resolve Resolves the data of referenced list items into the list item's content.
         * @timeout Maximum time in milliseconds to wait for the business process completed state.
         * @patterns Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ListItemDetail
         */
        update(listItemId: string, updateRequest: ListItemUpdateRequest, resolve: boolean, timeout: number, patterns: string[]): Promise<ListItemDetail | null>;
        protected processUpdate(response: Response): Promise<ListItemDetail | null>;
        /**
         * Wait For States
         * @processId The business process id.
         * @states Comma-separated list of business process states to wait for.
         * @timeout Maximum time in milliseconds to wait for the business process completed state.
         * @return BusinessProcessWaitResult
         */
        waitForStates(processId: string, states: string[], timeout: number): Promise<BusinessProcessWaitResult | null>;
        protected processWaitForStates(response: Response): Promise<BusinessProcessWaitResult | null>;
        /**
         * Import
         * @contentId The content id.
         * @fileTransferId The file transfer id.
         * @includeObjects Imports list items defined in the json import file.
         */
        import(contentId: string, fileTransferId: string, includeObjects: boolean): Promise<void>;
        protected processImport(response: Response): Promise<void>;
    }
    export class SchemaClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get Single
         * @schemaId The schema id.
         * @return SchemaDetailViewItem
         */
        get(schemaId: string): Promise<SchemaDetailViewItem | null>;
        protected processGet(response: Response): Promise<SchemaDetailViewItem | null>;
        /**
         * Update Single
         * @schemaId The schema id.
         * @schema The schema update request.
         * @return BusinessProcessViewItem
         */
        update(schemaId: string, schema: SchemaUpdateRequest): Promise<BusinessProcessViewItem | null>;
        protected processUpdate(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Delete Single
         * @schemaId The schema id.
         * @return BusinessProcessViewItem
         */
        delete(schemaId: string): Promise<BusinessProcessViewItem | null>;
        protected processDelete(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Exists
         * @schemaId The schema id.
         * @fieldId The optional field id.
         * @return ExistsResponse
         */
        exists(schemaId: string, fieldId: string): Promise<ExistsResponse | null>;
        protected processExists(response: Response): Promise<ExistsResponse | null>;
        /**
         * Create Single
         * @schema The schema create request.
         * @return BusinessProcessViewItem
         */
        create(schema: SchemaCreateRequest): Promise<BusinessProcessViewItem | null>;
        protected processCreate(response: Response): Promise<BusinessProcessViewItem | null>;
        /**
         * Search
         * @schemaSearchRequest The schema search request.
         * @return Schema result set.
         */
        search(schemaSearchRequest: SchemaSearchRequest): Promise<BaseResultOfSchemaViewItem | null>;
        protected processSearch(response: Response): Promise<BaseResultOfSchemaViewItem | null>;
    }
    export class PermissionClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search Content Permissions
         * @request The permission search request.
         * @return PermissionSetSearchResult
         */
        searchContentPermissions(request: PermissionSetSearchRequest): Promise<PermissionSetSearchResult | null>;
        protected processSearchContentPermissions(response: Response): Promise<PermissionSetSearchResult | null>;
        /**
         * Get Content Permission Single
         * @permissionSetId The content permission set id.
         * @return ContentPermissionSetDetailViewItem
         */
        getContentPermissions(permissionSetId: string): Promise<ContentPermissionSetDetailViewItem | null>;
        protected processGetContentPermissions(response: Response): Promise<ContentPermissionSetDetailViewItem | null>;
        /**
         * Search Schema Permissions
         * @request The permission search request.
         * @return PermissionSetSearchResult
         */
        searchSchemaPermissions(request: PermissionSetSearchRequest): Promise<PermissionSetSearchResult | null>;
        protected processSearchSchemaPermissions(response: Response): Promise<PermissionSetSearchResult | null>;
        /**
         * Get Schema Permission Single
         * @permissionSetId The schema permission set id.
         * @return SchemaPermissionSetDetailViewItem
         */
        getSchemaPermissions(permissionSetId: string): Promise<SchemaPermissionSetDetailViewItem | null>;
        protected processGetSchemaPermissions(response: Response): Promise<SchemaPermissionSetDetailViewItem | null>;
    }
    export class PublicAccessClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        getShare(token: string): Promise<ShareBaseDetailViewItem | null>;
        protected processGetShare(response: Response): Promise<ShareBaseDetailViewItem | null>;
    }
    export class ShareClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Aggregates own shares
         * @request Aggregation request
         * @return AggregationResult
         */
        aggregate(request: ShareAggregationRequest): Promise<ObjectAggregationResult | null>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult | null>;
        /**
         * Get share by id (basic or embed)
         * @id Share Id (not token, use PublicAccess to get share by token)
         * @return Polymorph share
         */
        get(id: string): Promise<ShareBaseDetailViewItem | null>;
        protected processGet(response: Response): Promise<ShareBaseDetailViewItem | null>;
        /**
         * Create a new share (basic or embed).
         * @request Polymorph create contract. Use either ShareBasicCreateRequest or ShareEmbedCreateRequest
         * @return Create result
         */
        create(request: ShareBaseCreateRequest): Promise<CreateShareResult | null>;
        protected processCreate(response: Response): Promise<CreateShareResult | null>;
        /**
         * Search shares
         * @request Search request
         * @return Share search result
         */
        search(request: ContentSearchRequest): Promise<BaseResultOfShareBaseViewItem | null>;
        protected processSearch(response: Response): Promise<BaseResultOfShareBaseViewItem | null>;
    }
    export class TransferClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Cancels an active batch. Valid states: TODO
         */
        cancelBatch(transferId: string): Promise<void>;
        protected processCancelBatch(response: Response): Promise<void>;
        create(request: CreateTransferRequest): Promise<TransferViewItem | null>;
        protected processCreate(response: Response): Promise<TransferViewItem | null>;
        delete(transferId: string): Promise<void>;
        protected processDelete(response: Response): Promise<void>;
        get(transferId: string): Promise<TransferDetailViewItem | null>;
        protected processGet(response: Response): Promise<TransferDetailViewItem | null>;
        getFile(fileTransferId: string): Promise<FileTransferDetailViewItem | null>;
        protected processGetFile(response: Response): Promise<FileTransferDetailViewItem | null>;
        importBatch(transferId: string, request: FileTransfer2ContentCreateRequest): Promise<TransferViewItem | null>;
        protected processImportBatch(response: Response): Promise<TransferViewItem | null>;
        partialImport(transferId: string, request: FileTransferPartial2ContentCreateRequest): Promise<TransferViewItem | null>;
        protected processPartialImport(response: Response): Promise<TransferViewItem | null>;
        search(request: TransferSearchRequest): Promise<TransferSearchResult | null>;
        protected processSearch(response: Response): Promise<TransferSearchResult | null>;
        searchFiles(request: FileTransferSearchRequest): Promise<FileTransferSearchResult | null>;
        protected processSearchFiles(response: Response): Promise<FileTransferSearchResult | null>;
        uploadFile(formFile: FileParameter, flowRelativePath: string, flowChunkNumber: number, flowCurrentChunkSize: number, flowTotalSize: number, flowTotalChunks: number, transferId: string, identifier: string): Promise<void>;
        protected processUploadFile(response: Response): Promise<void>;
    }
    export class UserClient {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        getChannels(): Promise<ChannelViewItem[] | null>;
        protected processGetChannels(response: Response): Promise<ChannelViewItem[] | null>;
    }
    export interface ContentAggregationRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        SearchString?: string | undefined;
        /** An optional search filter. Limits the content document result set. */
        Filter?: FilterBase | undefined;
        /** Special filters used to filter down on a specific aggregated value. */
        AggregationFilters?: AggregationFilter[] | undefined;
        /** Defines the aggregation resultset. */
        Aggregators?: AggregatorBase[] | undefined;
        /** Limits the simple search fields to the fields available in the specified channel. */
        ChannelId?: string | undefined;
        /** Defines the return language of translation values. Defaults to x-default. */
        DisplayLanguage?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages in configured within the customer's language configuration. */
        SearchLanguages?: string[] | undefined;
        /** The collection id. */
        CollectionId?: string | undefined;
        /** Limits the content document result set to that life cycle state. Defaults to ActiveOnly. */
        LifeCycleFilter: LifeCycleFilter;
    }
    /** The FilterBase is the base class for all filters. */
    export interface FilterBase {
    }
    /** The AndFilter> is a compound filter and returns documents that match all of the specified filters. */
    export interface AndFilter extends FilterBase {
        /** Accepts all filters. */
        Filters?: FilterBase[] | undefined;
    }
    /** The OrFilter is a compound filter and returns documents that match any of the specified filters. */
    export interface OrFilter extends FilterBase {
        /** Accepts all filters. */
        Filters?: FilterBase[] | undefined;
    }
    /** The NotFilter is a compound filter and returns documents that do not match the specified filter. */
    export interface NotFilter extends FilterBase {
        /** Limits the result set. */
        Filter?: FilterBase | undefined;
    }
    /** The DateRangeFilter returns documents with fields that have date values within a certain range. */
    export interface DateRangeFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** The date range. Supported pattern: now(+-)(int)(YMDHm). */
        Range?: DateRange | undefined;
    }
    /** The date range class used in aggregators and filters. */
    export interface DateRange {
        /** Tranlsated range names. */
        Names?: TranslatedStringDictionary | undefined;
        /** The from value can be a datetime string or a pattern now(+-)(int)(YMDHm). */
        From?: string | undefined;
        /** The to value can be a datetime string or a pattern now(+-)(int)(YMDHm). */
        To?: string | undefined;
    }
    /** A custom dictionary type to distinguish language specific class properties. */
    export interface TranslatedStringDictionary {
        [key: string]: string | any;
    }
    /** The ExistsFilter returns documents that have at least one non-null value in the original field. */
    export interface ExistsFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
    }
    /** The GeoBoundingBoxFilter returns documents that are found based on a point location using a bounding box. */
    export interface GeoBoundingBoxFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** The top left longitude/latitude configuration. */
        TopLeft?: GeoLocation | undefined;
        /** The bottom right longitude/latitude configuration. */
        BottomRight?: GeoLocation | undefined;
    }
    export interface GeoLocation {
        Lat: number;
        Lon: number;
    }
    /** The GeoDistanceRangeFilter returns documents that include only hits that exists within a specific distance from a geo point. */
    export interface GeoDistanceFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** The longitude/latitude configuration for the point of origin. */
        Location?: GeoLocation | undefined;
        /** The range distance in meters. */
        Distance: number;
    }
    /** The GeoDistanceRangeFilter returns documents that exists within a range from a specific point. */
    export interface GeoDistanceRangeFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** The longitude/latitude configuration for the point of origin. */
        Location?: GeoLocation | undefined;
        /** The numeric range. */
        Range?: NumericRange | undefined;
    }
    export interface NumericRange {
        /** Tranlsated range names. */
        Names?: TranslatedStringDictionary | undefined;
        /** The from value. */
        From?: number | undefined;
        /** The to value. */
        To?: number | undefined;
    }
    /** The NestedFilter is a joining filter and returns documents whose nested objects / documents (see nested mapping) match the specified filter. */
    export interface NestedFilter extends FilterBase {
        /** The path pointing to the nested object. */
        Path?: string | undefined;
        /** Limits the result set. */
        Filter?: FilterBase | undefined;
    }
    /** The NumericRangeFilter returns documents with fields that have numeric values within a certain range. */
    export interface NumericRangeFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** The numeric range with from and to properties. */
        Range?: NumericRange | undefined;
    }
    /** The PrefixFilter returns documents that have fields containing terms with a specified prefix (not analyzed). */
    export interface PrefixFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** The prefix term to filter on. */
        Prefix?: string | undefined;
    }
    /** The TermFilter returns documents that contain the exact term specified in the inverted index. */
    export interface TermFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** The term to filter on. */
        Term?: string | undefined;
    }
    /** The TermsFilter returns documents that have fields that match any of the provided terms (not analyzed). */
    export interface TermsFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        Field?: string | undefined;
        /** A list of OR combined terms. */
        Terms?: string[] | undefined;
    }
    /** An AggregationFilter is provided with each aggregated value. When selecting the aggregated value the aggregation filter is added to the search query and returns doucments meeting the aggregation condition. */
    export interface AggregationFilter extends FilterBase {
        /** The name of the aggregation this filter is connected to. */
        AggregationName?: string | undefined;
        /** The aggregation filter property. Available filters are TermFilter, DateRangeFilter, NumericRangeFilter and GeoDistanceRangeFilter. */
        Filter?: FilterBase | undefined;
        TemporaryAggregatorRequestId?: string | undefined;
    }
    /** The ChildFilter allows to apply filters on child documents and returns documents that match the specified filter on the child document. */
    export interface ChildFilter extends FilterBase {
        /** The elastic search index type to filter as a child. */
        ChildType?: string | undefined;
        /** The filter to apply on the child entity. It accepts all filters. */
        Filter?: FilterBase | undefined;
    }
    /** The ParentFilter allows to apply filters on parent documents and returns documents that match the specified filter on the parent document. */
    export interface ParentFilter extends FilterBase {
        /** The elastic search index type to filter as a parent. */
        ParentType?: string | undefined;
        /** The filter to apply on the child entity. It accepts all filters. */
        Filter?: FilterBase | undefined;
    }
    /** The AggregatorBase is the base class for all aggregators. */
    export interface AggregatorBase {
        /** The slug name of the aggregation. Must be unique per aggregation request. */
        Name?: string | undefined;
        /** The translated names of the aggregation. */
        Names?: TranslatedStringDictionary | undefined;
        /** An optional aggregator list for nested aggregations. */
        Aggregators?: AggregatorBase[] | undefined;
    }
    /** The DateRangeAggregator is a multi-bucket range aggregation dedicated for date values. Each bucket represents a range. */
    export interface DateRangeAggregator extends AggregatorBase {
        /** The elastic search index field to execute the aggregation on. */
        Field?: string | undefined;
        /** A list of date ranges. Supported pattern: now(+-)(int)(YMDHm). */
        Ranges?: DateRange[] | undefined;
    }
    /** The FilterAggregator is a single bucket aggregation of documents that match a specified filter. */
    export interface FilterAggregator extends AggregatorBase {
        /** Limits the result set. */
        Filter?: FilterBase | undefined;
    }
    /** The GeoDistanceAggregator is a multi-bucket range aggregation that works on geo_point fields. Each bucket represents a range. */
    export interface GeoDistanceAggregator extends AggregatorBase {
        /** The elastic search index field to execute the aggregation on. */
        Field?: string | undefined;
        /** The latitude/logitude configuration for the point of origin. */
        Location?: GeoLocation | undefined;
        /** A list of numeric ranges in meter. */
        Ranges?: NumericRange[] | undefined;
    }
    /** The NestedAggregator is a special single bucket aggregation that enables aggregating nested documents. */
    export interface NestedAggregator extends AggregatorBase {
        /** The path pointing to the nested object. */
        Path?: string | undefined;
    }
    /** The NumericRangeAggregator is a multi-bucket range aggregation. Each bucket represents a range. */
    export interface NumericRangeAggregator extends AggregatorBase {
        /** The elastic search index field to execute the aggregation on. */
        Field?: string | undefined;
        /** A list of numeric ranges. */
        Ranges?: NumericRange[] | undefined;
    }
    /** The TermsAggregator is a multi-bucket value aggregation where buckets are dynamically built - one per unique value. */
    export interface TermsAggregator extends AggregatorBase {
        /** The elastic search index field (not analyzed) to execute the aggregation on. */
        Field?: string | undefined;
        /** The size parameter can be set to define how many term buckets should be returned out of the overall terms list. */
        Size?: number | undefined;
        /** Includes values for which buckets will be created. Supports regular expression strings or arrays of exact values. */
        Includes?: string[] | undefined;
        /** Excludes values for which buckets will be created. Supports regular expression strings or arrays of exact values. */
        Excludes?: string[] | undefined;
    }
    /** The TermsRelationAggregator is derived from TermsAggregator and used for aggregations on relation item ids. */
    export interface TermsRelationAggregator extends TermsAggregator {
        /** When aggregating on relations ids the DocumentType is needed to resolve the target item translation. */
        DocumentType: TermsRelationAggregatorDocumentType;
    }
    export enum TermsRelationAggregatorDocumentType {
        Content,
        ListItem,
        Schema,
        User,
    }
    /** The TermsRelationAggregator is derived from the TermsAggregator and used for aggregations on indexed enum values. */
    export interface TermsEnumAggregator extends TermsAggregator {
        /** When aggregating on enum fields EnumType is needed to resolve the enum translation. */
        EnumType?: string | undefined;
    }
    export enum LifeCycleFilter {
        ActiveOnly,
        All,
        InactiveOnly,
    }
    export interface ObjectAggregationResult {
        ElapsedMilliseconds: number;
        AggregationResults?: AggregationResult[] | undefined;
    }
    export interface AggregationResult {
        Name?: string | undefined;
        SumOtherDocCount?: number | undefined;
        TemporaryRequestId?: string | undefined;
        AggregationResultItems?: AggregationResultItem[] | undefined;
    }
    export interface AggregationResultItem {
        Name?: string | undefined;
        Count: number;
        Filter?: AggregationFilter | undefined;
        Active: boolean;
        AggregationResults?: AggregationResult[] | undefined;
    }
    export interface Exception {
        Message?: string | undefined;
        InnerException?: Exception | undefined;
        StackTrace?: string | undefined;
        Source?: string | undefined;
    }
    export interface PictureparkException extends Exception {
        TraceLevel: TraceLevel;
        TraceId?: string | undefined;
        TraceJobId?: string | undefined;
        HttpStatusCode: number;
    }
    export enum TraceLevel {
        Critical,
        Error,
        Warning,
        Information,
        Verbose,
    }
    export interface PictureparkBusinessException extends PictureparkException {
        CustomerId?: string | undefined;
        CustomerAlias?: string | undefined;
        UserId?: string | undefined;
    }
    export interface PictureparkApplicationException extends PictureparkBusinessException {
    }
    export interface PictureparkArgumentNullException extends PictureparkBusinessException {
        ArgumentName?: string | undefined;
    }
    export interface ContentNotFoundException extends PictureparkBusinessException {
        ContentId?: string | undefined;
    }
    export interface BusinessProcessDefinitionCreateException extends PictureparkBusinessException {
        ProcessDefinitionIds?: string[] | undefined;
    }
    export interface BusinessProcessDefinitionNotFoundException extends PictureparkBusinessException {
        ProcessDefinitionId?: string | undefined;
    }
    export interface BusinessProcessNotFoundException extends PictureparkBusinessException {
        BusinessProcessId?: string | undefined;
    }
    export interface CustomerHostNotFoundException extends PictureparkException {
        HostName?: string | undefined;
    }
    export interface CustomerNotFoundException extends PictureparkException {
        CustomerId?: string | undefined;
    }
    export interface DocumentNotFoundException extends PictureparkBusinessException {
        DocumentId?: string | undefined;
    }
    export interface DocumentVersionNotFoundException extends PictureparkBusinessException {
        DocumentId?: string | undefined;
        DocumentVersion?: string | undefined;
    }
    export interface DriveRequestException extends PictureparkBusinessException {
    }
    export interface DuplicateRightException extends PictureparkBusinessException {
        PermissionSetId?: string | undefined;
    }
    export interface DuplicateDocumentException extends PictureparkBusinessException {
        DocumentId?: string | undefined;
        DocumentType?: string | undefined;
    }
    export interface DuplicateAggregatorException extends PictureparkBusinessException {
        AggregatorName?: string | undefined;
    }
    export interface FailedToLockException extends PictureparkBusinessException {
        ResourceId?: string | undefined;
    }
    export interface IndexException extends PictureparkBusinessException {
        IndexName?: string | undefined;
        DebugInformation?: string | undefined;
    }
    export interface InvalidArgumentException extends PictureparkBusinessException {
        ArgumentName?: string | undefined;
        ArgumentValue?: string | undefined;
    }
    export interface InvalidCustomerException extends PictureparkException {
        CustomerId?: string | undefined;
    }
    export interface PictureparkInvalidMetadataException extends PictureparkBusinessException {
        MetadataErrors?: MetadataError[] | undefined;
    }
    export interface MetadataError {
        ErrorType?: string | undefined;
        LineNumber: number;
        LinePosition: number;
        Path?: string | undefined;
        Message?: string | undefined;
        SchemaId?: string | undefined;
    }
    export interface InvalidStateException extends PictureparkBusinessException {
        ResourceId?: string | undefined;
        State?: string | undefined;
    }
    export interface InvalidStateTransitionException extends InvalidStateException {
        Transition?: string | undefined;
    }
    export interface InvalidUserOrPasswordException extends PictureparkException {
        CustomerId?: string | undefined;
    }
    export interface PictureparkMappingException extends PictureparkBusinessException {
        IndexName?: string | undefined;
        DebugInformation?: string | undefined;
    }
    export interface MessagePerformerTaskCanceledException extends PictureparkException {
        MessageId?: string | undefined;
        CustomerId?: string | undefined;
    }
    export interface NotFoundException extends PictureparkBusinessException {
        Reference?: string | undefined;
    }
    export interface ObjectStoreException extends PictureparkBusinessException {
        RowErrorMessages?: string | undefined;
        ErrorMessage?: string | undefined;
        Message?: string | undefined;
    }
    export interface ObjectStoreResponseException extends PictureparkBusinessException {
        RowErrorMessages?: string | undefined;
        Message?: string | undefined;
    }
    export interface PictureparkOperationCanceledException extends PictureparkBusinessException {
        CancellationToken?: string | undefined;
    }
    export interface OperationTimeoutException extends PictureparkBusinessException {
        MessageId?: string | undefined;
    }
    export interface OutputNotFoundException extends PictureparkBusinessException {
        ContentId?: string | undefined;
        OutputFormatId?: string | undefined;
    }
    export interface PermissionException extends PictureparkBusinessException {
        Permission?: string | undefined;
        Operation?: string | undefined;
    }
    export interface QueryException extends PictureparkBusinessException {
        DebugInformation?: string | undefined;
    }
    export interface RenderingException extends PictureparkBusinessException {
    }
    export interface RenderingJobItemNotSetException extends PictureparkBusinessException {
    }
    export interface ServiceProviderCreateException extends PictureparkException {
        UserId?: string | undefined;
        ExternalId?: string | undefined;
        VirtualHost?: string | undefined;
        DetailErrorMessage?: string | undefined;
    }
    export interface ServiceProviderDeleteException extends PictureparkException {
        ServiceProviderId?: string | undefined;
        DetailedErrorMessage?: string | undefined;
    }
    export interface ServiceProviderNotFoundException extends PictureparkException {
        MissingServiceProviderId?: string | undefined;
    }
    export interface TokenValidationException extends PictureparkBusinessException {
    }
    export interface UnknownException extends PictureparkBusinessException {
        ExceptionDetail?: string | undefined;
    }
    export interface UserNotFoundException extends PictureparkBusinessException {
        MissingUserId?: string | undefined;
    }
    export interface UserPermanentlyRemovedException extends PictureparkBusinessException {
        RemovedUserId?: string | undefined;
    }
    export interface UserRoleAssignedException extends PictureparkBusinessException {
        UserRoleId?: string | undefined;
    }
    export interface UserRolesRightsAssignedException extends PictureparkBusinessException {
        ContentPermissionSetId?: string | undefined;
    }
    export interface ContentBatchDownloadRequest {
        Contents?: Content[] | undefined;
    }
    export interface Content {
        ContentId?: string | undefined;
        OutputFormatId?: string | undefined;
    }
    export interface DownloadItem {
    }
    export interface ContentBatchDownloadItem extends DownloadItem {
        DownloadToken?: string | undefined;
        DownloadUrl?: string | undefined;
    }
    /** A request structure for creating a content document. */
    export interface CreateContentRequest {
        /** The id of a schema with schema type content. */
        ContentSchemaId?: string | undefined;
        /** An optional id list of schemas with schema type layer. */
        LayerSchemaIds?: string[] | undefined;
        /** The content data of the content document. */
        Content?: any | undefined;
        /** The layer metadata of the content document. */
        Metadata?: DataDictionary | undefined;
        /** An optional id list of content permission sets.  */
        ContentPermissionSetIds?: string[] | undefined;
    }
    /** A custom implementation of Dictionary{string, object} */
    export interface DataDictionary {
        [key: string]: any;
    }
    export interface ContentDetail {
        /** Document audit information with information regarding document creation and modification. */
        Audit?: StoreAudit | undefined;
        /** The content data of the content document. */
        Content?: any | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        ContentPermissionSetIds?: string[] | undefined;
        /** The id of the schema with schema type content. */
        ContentSchemaId?: string | undefined;
        /** The content type of a content document. */
        ContentType: ContentType;
        /** The content type of a content document. */
        ContentTypeId: number;
        /** Contains language specific display values, rendered according to the content schema's display pattern configuration. */
        DisplayValues?: DisplayValueViewItem | undefined;
        /** The entity type of a content document is content. */
        EntityType: EntityType;
        /** The content id. */
        Id?: string | undefined;
        /** An optional id list of schemas with schema type layer. */
        LayerSchemaIds?: string[] | undefined;
        /** The layer metadata of the content document. */
        Metadata?: DataDictionary | undefined;
        /** A list of rendering ouputs for contents with an underlying digital file. */
        Outputs?: OutputViewItem[] | undefined;
        /** The id of a owner token. Defines the content owner. */
        OwnerTokenId?: string | undefined;
        /** The trashed flag. */
        Trashed: boolean;
    }
    export interface StoreAudit {
        CreationDate: Date;
        CreatedByUser?: UserItem | undefined;
        ModificationDate: Date;
        ModifiedByUser?: UserItem | undefined;
    }
    export interface UserItem {
        Id?: string | undefined;
        FirstName?: string | undefined;
        LastName?: string | undefined;
        EmailAddress?: string | undefined;
    }
    export enum ContentType {
        Unknown,
        Bitmap,
        VectorGraphic,
        RawImage,
        InterchangeDocument,
        WordProcessingDocument,
        TextDocument,
        DesktopPublishingDocument,
        Presentation,
        Spreadsheet,
        Archive,
        Audio,
        Video,
        Font,
        Multimedia,
        Application,
        SourceCode,
        Database,
        Cad,
        Model3d,
    }
    export interface DisplayValueViewItem {
        [key: string]: string | any;
    }
    export enum EntityType {
        Content,
        BasicShare,
        EmbedShare,
        Metadata,
        FileTransfer,
    }
    export interface OutputViewItem {
        Id?: string | undefined;
        OutputFormatId?: string | undefined;
        ContentId?: string | undefined;
        Detail?: OutputDetailBase | undefined;
    }
    export interface OutputDetailBase {
        FileExtension?: string | undefined;
        FileName?: string | undefined;
        FilePath?: string | undefined;
        FileSizeInBytes?: number | undefined;
        Sha1Hash?: string | undefined;
    }
    export interface OutputDetailImage extends OutputDetailBase {
        Width: number;
        Height: number;
    }
    export interface OutputDetailAudio extends OutputDetailBase {
        DurationInSeconds?: number | undefined;
    }
    export interface OutputDetailVideo extends OutputDetailBase {
        DurationInSeconds: number;
        Width: number;
        Height: number;
        Sprites?: Sprite[] | undefined;
    }
    export interface Sprite {
        Width: number;
        Height: number;
        Y: number;
        X: number;
        Start: string;
        End: string;
    }
    export interface OutputDetailDocument extends OutputDetailBase {
        PageCount: number;
    }
    export interface OutputDetailDefault extends OutputDetailBase {
    }
    export enum ThumbnailSize {
        Small,
        Medium,
        Large,
    }
    export interface UpdateContentPermissionsRequest {
        /** The content id. */
        ContentId?: string | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        ContentPermissionSetIds?: string[] | undefined;
    }
    export interface ContentSearchRequest {
        /** Limits the simple search fields to the fields available in the specified channel. */
        ChannelIds?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to x-default. */
        DisplayLanguage?: string | undefined;
        /** Limits the display values included in the search response. Defaults to all display values. */
        DisplayPatternIds?: string[] | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        SearchLanguages?: string[] | undefined;
        /** The collection id. */
        CollectionId?: string | undefined;
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        SearchString?: string | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        Sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        Start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        Limit: number;
        /** An optional search filter. Limits the content document result set. */
        Filter?: FilterBase | undefined;
        /** Limits the content document result set to that life cycle state. Defaults to ActiveOnly. */
        LifeCycleFilter: LifeCycleFilter;
    }
    export interface SortInfo {
        /** The elastic search index field to sort on. */
        Field?: string | undefined;
        /** The sort direction (Asc/Desc). */
        Direction: SortDirection;
    }
    export enum SortDirection {
        Asc,
        Desc,
    }
    export interface BaseResultOfContentViewItem {
        TotalResults: number;
        Results?: ContentViewItem[] | undefined;
        PageToken?: string | undefined;
    }
    export interface ContentSearchResult extends BaseResultOfContentViewItem {
        AggregationResults?: AggregationResult[] | undefined;
        ElapsedMilliseconds: number;
    }
    export interface ContentViewItem {
        Audit?: StoreAudit | undefined;
        /** The entity type of a content document is content. */
        EntityType: EntityType;
        /** The id of the schema with schema type content. */
        ContentSchemaId?: string | undefined;
        /** An optional id list of schemas with schema type layer. */
        LayerSchemaIds?: string[] | undefined;
        /** Contains display values of the specified language, rendered according to the content schema's display pattern configuration. */
        DisplayValues?: {
            [key: string]: string;
        } | undefined;
        Id?: string | undefined;
    }
    export interface ContentFileUpdateRequest {
        ContentId?: string | undefined;
        FileTransferId?: string | undefined;
    }
    export interface BusinessProcessViewItem {
        Id?: string | undefined;
        ProcessDefinitionId?: string | undefined;
        ReferenceId?: string | undefined;
        ReferenceDocType?: string | undefined;
        StartDate: Date;
        EndDate: Date;
        StateHistory?: BusinessProcessStateItem[] | undefined;
        ProcessDefinitionName?: string | undefined;
    }
    export interface BusinessProcessStateItem {
        State?: string | undefined;
        Timestamp: Date;
        Error?: ErrorResponse | undefined;
    }
    export interface ErrorResponse {
        Exception?: string | undefined;
        TraceId?: string | undefined;
        TraceJobId?: string | undefined;
    }
    export interface BusinessProcessBulkResponseViewItem extends BusinessProcessViewItem {
        Response?: BulkResponseViewItem | undefined;
    }
    export interface BulkResponseViewItem {
        Rows?: BulkResponseRowViewItem[] | undefined;
    }
    export interface BulkResponseRowViewItem {
        Id?: string | undefined;
        Version: number;
        Error?: string | undefined;
        Reason?: string | undefined;
        Succeeded: boolean;
    }
    export interface UpdateContentMetadataRequest {
        /** The content id. */
        Id?: string | undefined;
        /** An id list of schemas with schema type content or layer. */
        SchemaIds?: string[] | undefined;
        /** The dynamic data structure matching the field schematics of the schemas with schema type content or layer. */
        Metadata?: DataDictionary | undefined;
    }
    export interface ContentDeactivationRequest {
        ContentIds?: string[] | undefined;
    }
    export interface ContentReactivationRequest {
        ContentIds?: string[] | undefined;
    }
    export interface MetadataValuesChangeRequestBase {
        /** A container for all change commads. */
        ChangeCommands?: MetadataValuesChangeCommandBase[] | undefined;
    }
    export interface ContentsMetadataUpdateRequest extends MetadataValuesChangeRequestBase {
        /** The ids of the content documents. */
        ContentIds?: string[] | undefined;
    }
    /** The base class for metadata value change commands. */
    export interface MetadataValuesChangeCommandBase {
    }
    /** Updates schema values. */
    export interface MetadataValuesSchemaUpdateCommand extends MetadataValuesChangeCommandBase {
        /** The id of the schema with type content or layer to be updated. */
        SchemaId?: string | undefined;
        /** The metadata values containing a set of changes. Update is additive and will not remove values. To remove complete fields use the MetadataValuesFieldRemoveCommand instead. */
        Value?: DataDictionary | undefined;
    }
    /** Adds or updates schema values. */
    export interface MetadataValuesSchemaUpsertCommand extends MetadataValuesChangeCommandBase {
        /** The id of the schema with type content or layer to be updated. */
        SchemaId?: string | undefined;
        /** The metadata values containing a set of changes. Update is additive and will not remove values. To remove complete fields use the MetadataValuesFieldRemoveCommand instead. */
        Value?: DataDictionary | undefined;
    }
    /** Removes schema values. */
    export interface MetadataValuesSchemaRemoveCommand extends MetadataValuesChangeCommandBase {
        /** The id of the schema with type layer to be removed. */
        SchemaId?: string | undefined;
    }
    /** Removes a field and its value from the schema values. */
    export interface MetadataValuesFieldRemoveCommand extends MetadataValuesChangeCommandBase {
        /** The fully qualified field name of the field to be removed, e.g. "Data.SchemaId.FieldId". */
        FieldNamespace?: string | undefined;
    }
    /** Adds a list item id reference to a multi tagbox. */
    export interface MetadataValuesSchemaItemAddCommand extends MetadataValuesChangeCommandBase {
        /** The fully qualified field name of the multi tagbox field. */
        FieldNamespace?: string | undefined;
        /** The id of the list item to be added. */
        ReferenceId?: string | undefined;
    }
    /** Removes a list item id reference from a multi tagbox. */
    export interface MetadataValuesSchemaItemRemoveCommand extends MetadataValuesChangeCommandBase {
        /** The fully qualified field name of the multi tagbox field. */
        FieldNamespace?: string | undefined;
        /** The id of the list item to be removed. */
        ReferenceId?: string | undefined;
    }
    export interface FilterContentsMetadataUpdateRequest extends MetadataValuesChangeRequestBase {
        ContentSearchRequest?: ContentSearchRequest | undefined;
        TotalItemsCount: number;
    }
    export interface StartProcessRequest {
        Variables?: any | undefined;
    }
    export interface SendMessageRequest {
        MessageName?: string | undefined;
        Variables?: any | undefined;
    }
    export interface BusinessProcessWaitResult {
        HasStateHit: boolean;
        ProcessEnded: boolean;
        StateHit?: string | undefined;
        BusinessProcess?: BusinessProcessViewItem | undefined;
    }
    export interface DocumentHistoryViewItem {
        Id?: string | undefined;
        DocumentId?: string | undefined;
        DocumentVersion: number;
        DocumentType?: string | undefined;
        DocumentDate: Date;
        Document?: string | undefined;
        Timestamp: Date;
        Audit?: HistoryAudit | undefined;
        Deleted: boolean;
    }
    export interface HistoryAudit {
        ModificationDate: Date;
        ModifiedByUser?: UserItem | undefined;
    }
    export interface DocumentHistoryDifferenceViewItem {
        DocumentId?: string | undefined;
        OldDocumentVersion: number;
        NewDocumentVersion: number;
        OldValues?: any | undefined;
        NewValues?: any | undefined;
    }
    /** A request structure for creating a list item document. */
    export interface ListItemCreateRequest {
        /** The content data of the list item. */
        Content?: any | undefined;
        /** The id of the schema with schema type list. */
        ContentSchemaId?: string | undefined;
        /** The list item id. When not provided a Guid is generated. */
        ListItemId?: string | undefined;
    }
    /** The detail view item for the list item. */
    export interface ListItemDetail {
        /** The content data of the list item. */
        Content?: any | undefined;
        /** The id of the schema with schema type list. */
        ContentSchemaId?: string | undefined;
        /** Contains language specific display values, rendered according to the list schema's display pattern configuration. */
        DisplayValues?: DisplayValueViewItem | undefined;
        /** The entity type of the list item is metadata. */
        EntityType: EntityType;
        /** The list item id. */
        Id?: string | undefined;
    }
    export interface ListItemAggregationRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        SearchString?: string | undefined;
        /** An optional search filter. Limits the list item result set. */
        Filter?: FilterBase | undefined;
        /** Special filters used to filter down on a specific aggregated value. */
        AggregationFilters?: AggregationFilter[] | undefined;
        /** Defines the aggregation resultset. */
        Aggregators?: AggregatorBase[] | undefined;
        /** Broadens the aggregation and include all schema descendant list items. */
        IncludeAllSchemaChildren: boolean;
        /** Limits the aggregation to list items of the provided schemas. */
        SchemaIds?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to x-default. */
        DisplayLanguage?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        SearchLanguages?: string[] | undefined;
    }
    export interface ListItemSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        SearchString?: string | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        Sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        Start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        Limit: number;
        /** An optional search filter. Limits the list item result set. */
        Filter?: FilterBase | undefined;
        /** Broadens the search and include all schema descendant list items. */
        IncludeAllSchemaChildren: boolean;
        /** Limits the search to list items of the provided schemas. */
        SchemaIds?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to x-default. */
        DisplayLanguage?: string | undefined;
        /** Limits the display values included in the search response. Defaults to all display values. */
        DisplayPatternIds?: string[] | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        SearchLanguages?: string[] | undefined;
        /** When set to true the content data is included in the result items. */
        IncludeMetadata: boolean;
    }
    export interface BaseResultOfListItem {
        TotalResults: number;
        Results?: ListItem[] | undefined;
        PageToken?: string | undefined;
    }
    /** A document stored in the elastic search metadata index, with fields corresponding to the the schemantics of its underlying list schema. */
    export interface ListItem {
        /** The content data of the list item. */
        Content?: any | undefined;
        /** The id of the schema with schema type list. */
        ContentSchemaId?: string | undefined;
        /** Contains language specific display values, rendered according to the list schema's display pattern configuration. */
        DisplayValues?: DisplayValueViewItem | undefined;
        /** The entity type of the list item is metadata. */
        EntityType: EntityType;
        /** The list item id. */
        Id?: string | undefined;
    }
    /** A request structure for updating a list item. */
    export interface ListItemUpdateRequest {
        /** The content data of the list item. */
        Content?: any | undefined;
        /** The list item id. */
        Id?: string | undefined;
    }
    export interface SchemaDetailViewItem {
        /** The schema id. */
        Id?: string | undefined;
        /** The parent schema id. */
        ParentSchemaId?: string | undefined;
        /** Types control schema usage. */
        Types?: SchemaType[] | undefined;
        /** Language specific schema names. */
        Names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        Descriptions?: TranslatedStringDictionary | undefined;
        /** An optional id list of schemas with type layer. */
        LayerSchemaIds?: string[] | undefined;
        /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
        DisplayPatterns?: DisplayPattern[] | undefined;
        /** The schema fields. */
        Fields?: FieldBase[] | undefined;
        /** Sorts content documents and/or list items. */
        Sort?: SortInfo[] | undefined;
        /** An optional list of aggregations to group content documents and list items. */
        Aggregations?: AggregatorBase[] | undefined;
        /** A simple ordering property for schemas. */
        SortOrder: number;
        /** Is true when schema is system provided. */
        System: boolean;
        /** The owner token id. Defines the schema owner. */
        OwnerTokenId?: string | undefined;
        /** Opens list item document accessibility. If true the SchemaPermissionSetIds must be empty. */
        Public: boolean;
        /** An optional id list of schema permission sets which control list item permissions. When not empty Public must be false. */
        SchemaPermissionSetIds?: string[] | undefined;
        /** An optional id list of schemas with type content for a schema with type layer. */
        ReferencedInContentSchemaIds?: string[] | undefined;
        /** A complete id list of all descendant schemas. */
        DescendantSchemaIds?: string[] | undefined;
        Audit?: StoreAudit | undefined;
    }
    export enum SchemaType {
        Content,
        Layer,
        List,
        Struct,
    }
    export interface DisplayPattern {
        /** The display pattern id. */
        Id?: string | undefined;
        /** Defines the template engine for parsing the templates. */
        TemplateEngine: TemplateEngine;
        /** Defines the pattern type of the templates. */
        DisplayPatternType: DisplayPatternType;
        /** Language specific pattern templates. */
        Templates?: TranslatedStringDictionary | undefined;
    }
    export enum TemplateEngine {
        DotLiquid,
    }
    export enum DisplayPatternType {
        Thumbnail,
        List,
        Detail,
        Custom,
        Name,
    }
    /** The field base class. */
    export interface FieldBase {
        /** The field id. Can be a slug and must be unique within the schema. */
        Id?: string | undefined;
        /** The index id is auto generated by the system. */
        IndexId?: string | undefined;
        /** The namespace is auto generated by the system. */
        FieldNamespace?: string | undefined;
        /** Language specific field names. */
        Names?: TranslatedStringDictionary | undefined;
        /** Defines if a field value is mandatory or not. */
        Required: boolean;
        /** Defines if the field can be edited or not. */
        Fixed: boolean;
        /** Maps the field in the elastic search index and its values become searchable. */
        Index: boolean;
        /** Includes fields in the simple search. Index must be true. */
        SimpleSearch: boolean;
        /** Priorizes search results. SimpleSearch must be true. */
        Boost: number;
    }
    export interface FieldBoolean extends FieldBase {
    }
    export interface FieldDate extends FieldBase {
        /** Defines the date format structure. */
        Format?: string | undefined;
    }
    export interface FieldDateTime extends FieldBase {
        /** Defines the date time format structure. */
        Format?: string | undefined;
    }
    /** For internal use only (system schemas) */
    export interface FieldDateTimeArray extends FieldDateTime {
        UniqueItems: boolean;
        MaximumItems?: number | undefined;
        MinimumItems?: number | undefined;
    }
    export interface FieldDecimal extends FieldBase {
        Pattern?: string | undefined;
        /** Defines the lowest possible value. */
        Minimum?: number | undefined;
        /** Defines the highest possible value. */
        Maximum?: number | undefined;
    }
    /** For internal use only (system schemas) */
    export interface FieldDictionary extends FieldBase {
    }
    /** For internal use only (system schemas) */
    export interface FieldDictionaryArray extends FieldDictionary {
        UniqueItems: boolean;
        MaximumItems?: number | undefined;
        MinimumItems?: number | undefined;
    }
    export interface FieldGeoPoint extends FieldBase {
    }
    export interface FieldLong extends FieldBase {
        Pattern?: string | undefined;
        /** Defines the lowest possible value. */
        Minimum?: number | undefined;
        /** Defines the highest possible value. */
        Maximum?: number | undefined;
    }
    /** For internal use only (system schemas) */
    export interface FieldLongArray extends FieldLong {
        UniqueItems: boolean;
        MaximumItems?: number | undefined;
        MinimumItems?: number | undefined;
    }
    export interface FieldSingleFieldset extends FieldBase {
        /** The id of the schema with type struct. */
        SchemaId?: string | undefined;
        /** Avoids cyclic dependencies and limits the elastic search index and json schema depth. */
        MaxRecursion: number;
    }
    export interface FieldMultiFieldset extends FieldBase {
        /** The id of the schema with type struct. */
        SchemaId?: string | undefined;
        /** Avoids cyclic dependencies and limits the elastic search index and json schema depth. */
        MaxRecursion: number;
        /** Prevents duplicate values. */
        UniqueItems: boolean;
        /** Defines the highest possible fieldset count. */
        MaximumItems?: number | undefined;
        /** Defines the lowest possible fieldset count. */
        MinimumItems?: number | undefined;
    }
    export interface FieldSingleTagbox extends FieldBase {
        /** The id of the schema with type list. */
        SchemaId?: string | undefined;
        /** Avoids cyclic dependencies and limits the elastic search index and json schema depth. */
        MaxRecursion: number;
        /** An optional search filter. Limits the list item result set. */
        Filter?: FilterBase | undefined;
    }
    export interface FieldMultiTagbox extends FieldBase {
        /** The id of the schema with type list. */
        SchemaId?: string | undefined;
        /** Avoids cyclic dependencies and limits the elastic search index and json schema depth. */
        MaxRecursion: number;
        /** Prevents duplicate values. */
        UniqueItems: boolean;
        /** Defines the highest possible item count. */
        MaximumItems?: number | undefined;
        /** Defines the lowest possible item count. */
        MinimumItems?: number | undefined;
        /** An optional search filter. Limits the list item result set. */
        Filter?: FilterBase | undefined;
    }
    export interface FieldString extends FieldBase {
        /** It is a DotLiquid template. */
        Template?: string | undefined;
        /** If true the Template will only render on item creation otherwise it will render on each update. */
        KeepFieldValue: boolean;
        /** Contains a regex validation pattern. */
        Pattern?: string | undefined;
        /** Defines the minimal string length. */
        MinimumLength?: number | undefined;
        /** Defines the maximal string length. */
        MaximumLength?: number | undefined;
        /** A string field can have multiple analyzers, but only one per analyzer type. To have any effect the Index must be true. */
        Analyzers?: AnalyzerBase[] | undefined;
        /** Displays the field value in a multiline component. */
        MultiLine: boolean;
        /** Similar to an enumeration valid field values are limited to values of this list. */
        GrantedValues?: string[] | undefined;
    }
    /** The analyzer base class. */
    export interface AnalyzerBase {
        /** The suffix for the analyzed field, e.g. .simple. */
        FieldSuffix?: string | undefined;
        /** Includes the analyzed field in the simple search. */
        SimpleSearch: boolean;
    }
    /** An analyzer using the EdgeNGram tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenizer.html */
    export interface EdgeNGramAnalyzer extends AnalyzerBase {
        FieldSuffix?: string | undefined;
    }
    /** An analyzer using a language analyzer. Restricted to the languages supported by elastic search. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html */
    export interface LanguageAnalyzer extends AnalyzerBase {
        FieldSuffix?: string | undefined;
    }
    /** An analyzer using the NGram tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html */
    export interface NGramAnalyzer extends AnalyzerBase {
        FieldSuffix?: string | undefined;
    }
    /** An analyzer using the path hierarchy tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pathhierarchy-tokenizer.html */
    export interface PathHierarchyAnalyzer extends AnalyzerBase {
        FieldSuffix?: string | undefined;
    }
    /** An analyzer using a custom pattern tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-tokenizer.html */
    export interface SimpleAnalyzer extends AnalyzerBase {
        FieldSuffix?: string | undefined;
    }
    /** For internal use only (system schemas) */
    export interface FieldStringArray extends FieldString {
        UniqueItems: boolean;
        MaximumItems?: number | undefined;
        MinimumItems?: number | undefined;
    }
    export interface FieldTranslatedString extends FieldBase {
        /** Contains a regex validation pattern. */
        Pattern?: string | undefined;
        /** Defines the minimal string length. */
        MinimumLength?: number | undefined;
        /** Defines the maximal string length. */
        MaximumLength?: number | undefined;
        /** A string field can have multiple analyzers, but only one per analyzer type. To have any effect the Index must be true. */
        Analyzers?: AnalyzerBase[] | undefined;
        /** Displays the field value in a multiline component. */
        MultiLine: boolean;
        /** Sets the required metadata languages for the translation field. The langauge configuration limits the available metadata languages.
    If Required is true, the field and all its metadata languages are required, including x-default.
    If Required is false, the field can be left empty, but as soon as a value is entered all required metadata languages are mandatory, including x-default. */
        RequiredMetadataLanguages?: string[] | undefined;
        /** It is a DotLiquid template. */
        Template?: string | undefined;
        /** If true the Template will only render on item creation otherwise it will render on each update. */
        KeepFieldValue: boolean;
    }
    export interface FieldSingleRelation extends FieldBase {
        /** The id of the schema with type struct. */
        SchemaId?: string | undefined;
        /** Defines the relation types supported by the field. */
        RelationTypes?: RelationType[] | undefined;
        /** Avoids cyclic dependencies and limits the elastic search index and json schema depth. */
        MaxRecursion: number;
    }
    export interface RelationType {
        /** The id property. */
        Id?: string | undefined;
        /** Language specific relation names. */
        Names?: TranslatedStringDictionary | undefined;
        /** Defines the valid target context. */
        TargetContext: TargetContext;
        /** The id of the schema. Limits the content or the list item result set depending on the relation's target context. */
        SchemaId?: string | undefined;
        /** An optional search filter. Limits the content or the list item result set depending on the relation's target context. */
        Filter?: FilterBase | undefined;
    }
    export enum TargetContext {
        Content,
        ListItem,
        User,
        Custom,
    }
    export interface FieldMultiRelation extends FieldBase {
        /** The id of the schema with type struct. */
        SchemaId?: string | undefined;
        /** Defines the relation types supported by the field. */
        RelationTypes?: RelationType[] | undefined;
        /** Avoids cyclic dependencies and limits the elastic search index and json schema depth. */
        MaxRecursion: number;
        /** Prevents duplicate values. */
        UniqueItems: boolean;
        /** Defines the highest possible item count. */
        MaximumItems?: number | undefined;
        /** Dfines the lowest possible item count. */
        MinimumItems?: number | undefined;
    }
    export interface ExistsResponse {
        Exists: boolean;
    }
    export interface SchemaCreateRequest {
        /** The schema id. Can be a slug, but must be unique throughout the whole customer setup. */
        Id?: string | undefined;
        /** The parent schema id. */
        ParentSchemaId?: string | undefined;
        /** Types control schema usage. */
        Types?: SchemaType[] | undefined;
        /** Language specific schema names. */
        Names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        Descriptions?: TranslatedStringDictionary | undefined;
        /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
        DisplayPatterns?: DisplayPattern[] | undefined;
        /** The schema fields. Can be empty. */
        Fields?: FieldBase[] | undefined;
        /** An optional list of aggregations to group content documents and/or list items. */
        Aggregations?: AggregatorBase[] | undefined;
        /** A simple ordering property for schemas. */
        SortOrder: number;
        /** Sorts content documents and/or list items. */
        Sort?: SortInfo[] | undefined;
        /** Opens list item document accessibility. If true SchemaPermissionSetIds must be empty. */
        Public: boolean;
        /** An optional id list of schema permission sets. Control list item document permissions. When not empty Public must be false. */
        SchemaPermissionSetIds?: string[] | undefined;
        /** An optional id list of schemas with type layer. */
        LayerSchemaIds?: string[] | undefined;
        /** An optional id list of schemas with type content for a schema with type layer. */
        ReferencedInContentSchemaIds?: string[] | undefined;
    }
    export interface SchemaUpdateRequest {
        /** Language specific schema names. */
        Names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        Descriptions?: TranslatedStringDictionary | undefined;
        /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
        DisplayPatterns?: DisplayPattern[] | undefined;
        /** The schema fields. */
        Fields?: FieldBase[] | undefined;
        /** An optional list of aggregations to group content documents and list items. */
        Aggregations?: AggregatorBase[] | undefined;
        /** A simple ordering property for schemas. */
        SortOrder: number;
        /** Sorts content documents and/or list items. */
        Sort?: SortInfo[] | undefined;
        /** Opens schema accessibility. */
        Public: boolean;
        /** An optional id list of schema permission sets which control list item permissions. When not empty Public must be false. */
        SchemaPermissionSetIds?: string[] | undefined;
        /** An optional id list of schemas with type layer. */
        LayerSchemaIds?: string[] | undefined;
        /** An optional id list of schemas with type content for a schema with type layer. */
        ReferencedInContentSchemaIds?: string[] | undefined;
        /** Types control schema usage. Schema types can only be added, but not removed. */
        Types?: SchemaType[] | undefined;
    }
    export interface SchemaSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        SearchString?: string | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        Sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        Start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        Limit: number;
        /** An optional search filter. Limits the schema result set. */
        Filter?: FilterBase | undefined;
    }
    export interface BaseResultOfSchemaViewItem {
        TotalResults: number;
        Results?: SchemaViewItem[] | undefined;
        PageToken?: string | undefined;
    }
    export interface SchemaViewItem {
        /** The schema id. */
        Id?: string | undefined;
        /** The parent schema id. */
        ParentSchemaId?: string | undefined;
        /** Types control schema usage. */
        Types?: SchemaType[] | undefined;
        /** Language specific schema names. */
        Names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        Descriptions?: TranslatedStringDictionary | undefined;
        /** An optional id list of schemas with type layer. */
        LayerSchemaIds?: string[] | undefined;
        /** The count of all fields. */
        FieldCount: number;
        /** The count of all schema descendants with a immediate inheritance. */
        ChildCount: number;
        /** The descendancy depth of the schema. */
        Level: number;
        /** Is true when schema is system provided. */
        System: boolean;
    }
    export interface PermissionSetSearchRequest {
        SearchString?: string | undefined;
        Sort?: SortInfo[] | undefined;
        Start: number;
        Limit: number;
        Filter?: FilterBase | undefined;
    }
    export interface BaseResultOfPermissionSetViewItem {
        TotalResults: number;
        Results?: PermissionSetViewItem[] | undefined;
        PageToken?: string | undefined;
    }
    export interface PermissionSetSearchResult extends BaseResultOfPermissionSetViewItem {
        AggregationResults?: AggregationResult[] | undefined;
        ElapsedMilliseconds: number;
    }
    export interface PermissionSetViewItem {
        /** The permission set id. */
        Id?: string | undefined;
        Trashed: boolean;
        /** Language specific permission set names. */
        Names?: TranslatedStringDictionary | undefined;
    }
    export interface PermissionSetDetailViewItemOfContentRight {
        Id?: string | undefined;
        Names?: TranslatedStringDictionary | undefined;
        Trashed: boolean;
        UserRolesRights?: UserRoleRightsViewItemOfContentRight[] | undefined;
        UserRolesPermissionSetRights?: UserRoleRightsViewItemOfPermissionSetRight[] | undefined;
        Exclusive: boolean;
    }
    export interface ContentPermissionSetDetailViewItem extends PermissionSetDetailViewItemOfContentRight {
    }
    export interface UserRoleRightsViewItemOfContentRight {
        UserRoleId?: string | undefined;
        Names?: TranslatedStringDictionary | undefined;
        Rights?: ContentRight[] | undefined;
    }
    export enum ContentRight {
        View,
        Edit,
        Update,
        Manage,
        Trash,
    }
    export interface UserRoleRightsViewItemOfPermissionSetRight {
        UserRoleId?: string | undefined;
        Names?: TranslatedStringDictionary | undefined;
        Rights?: PermissionSetRight[] | undefined;
    }
    export enum PermissionSetRight {
        Apply,
    }
    export interface PermissionSetDetailViewItemOfMetadataRight {
        Id?: string | undefined;
        Names?: TranslatedStringDictionary | undefined;
        Trashed: boolean;
        UserRolesRights?: UserRoleRightsViewItemOfMetadataRight[] | undefined;
        UserRolesPermissionSetRights?: UserRoleRightsViewItemOfPermissionSetRight[] | undefined;
        Exclusive: boolean;
    }
    export interface SchemaPermissionSetDetailViewItem extends PermissionSetDetailViewItemOfMetadataRight {
    }
    export interface UserRoleRightsViewItemOfMetadataRight {
        UserRoleId?: string | undefined;
        Names?: TranslatedStringDictionary | undefined;
        Rights?: MetadataRight[] | undefined;
    }
    export enum MetadataRight {
        View,
        Edit,
        Manage,
    }
    export interface ShareBaseDetailViewItem {
        Id?: string | undefined;
        Name?: string | undefined;
        Description?: string | undefined;
        Audit?: StoreAudit | undefined;
        EntityType: EntityType;
        ContentSelections?: ContentDetailViewItem[] | undefined;
        TemplateId?: string | undefined;
        ExpirationDate?: Date | undefined;
    }
    export interface ContentDetailViewItem {
        ContentTypeId: number;
        Trashed: boolean;
        /** The entity type of a content document is content. */
        EntityType: EntityType;
        /** The id of the schema with schema type content. */
        ContentSchemaId?: string | undefined;
        /** An optional id list of schemas with type layer. */
        LayerSchemaIds?: string[] | undefined;
        Content?: DataDictionary | undefined;
        Metadata?: DataDictionary | undefined;
        Id?: string | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        ContentPermissionSetIds?: string[] | undefined;
        Outputs?: OutputViewItem[] | undefined;
        Audit?: StoreAudit | undefined;
        OwnerTokenId?: string | undefined;
        ContentType: ContentType;
        /** Contains language specific display values, rendered according to the content schema's display pattern configuration. */
        DisplayValues?: DisplayValueViewItem | undefined;
    }
    export interface ShareBasicDetailViewItem extends ShareBaseDetailViewItem {
        MailRecipients?: MailRecipientViewItem[] | undefined;
        InternalRecipients?: InternalRecipientViewItem[] | undefined;
        LanguageCode?: string | undefined;
    }
    export interface MailRecipientViewItem {
        UserEmail?: UserEmail | undefined;
        Token?: string | undefined;
        Url?: string | undefined;
    }
    export interface UserEmail {
        FirstName?: string | undefined;
        LastName?: string | undefined;
        EmailAddress?: string | undefined;
    }
    export interface InternalRecipientViewItem {
        Recipient?: UserItem | undefined;
        Token?: string | undefined;
        Url?: string | undefined;
    }
    export interface ShareEmbedDetailViewItem extends ShareBaseDetailViewItem {
        EmbedContentItems?: EmbedContentViewItem[] | undefined;
        Token?: string | undefined;
        Url?: string | undefined;
    }
    export interface EmbedContentViewItem {
        ContentId?: string | undefined;
        OutputFormatId?: string | undefined;
        Token?: string | undefined;
        Url?: string | undefined;
    }
    export interface ShareAggregationRequest {
        SearchString?: string | undefined;
        Sort?: SortInfo[] | undefined;
        /** An optional search filter. Limits the content document result set. */
        Filter?: FilterBase | undefined;
        AggregationFilters?: AggregationFilter[] | undefined;
        Aggregators?: AggregatorBase[] | undefined;
        DisplayLanguage?: string | undefined;
    }
    export interface ShareBaseCreateRequest {
        Name?: string | undefined;
        Description?: string | undefined;
        ExpirationDate?: Date | undefined;
        Contents?: ShareContent[] | undefined;
    }
    export interface ShareContent {
        ContentId?: string | undefined;
        OutputFormatIds?: string[] | undefined;
    }
    export interface ShareBasicCreateRequest extends ShareBaseCreateRequest {
        RecipientsEmail?: UserEmail[] | undefined;
        RecipientsUser?: UserItem[] | undefined;
        RecipientsGroup?: UserRoleViewItem[] | undefined;
        TemplateId?: string | undefined;
    }
    export interface UserRoleViewItem {
        /** The user role id. */
        Id?: string | undefined;
        Trashed: boolean;
        /** Language specific user role names. */
        Names?: TranslatedStringDictionary | undefined;
        /** All user rights for this user role. */
        UserRights?: UserRight[] | undefined;
    }
    export enum UserRight {
        ManageContent,
        ManageSharings,
        ManageDrives,
        ManageTransfer,
        ManageAnalytics,
        ManageChannels,
        ManageSchemas,
        ManageUsers,
        ManageUserRoles,
        ManagePermissions,
        ManageSearchIndexes,
        ManageRecipients,
        ManageCollections,
        ManageComments,
        ManageListItems,
        ManageServiceProviders,
    }
    export interface ShareEmbedCreateRequest extends ShareBaseCreateRequest {
    }
    export interface CreateShareResult {
        ShareId?: string | undefined;
    }
    export interface BaseResultOfShareBaseViewItem {
        TotalResults: number;
        Results?: ShareBaseViewItem[] | undefined;
        PageToken?: string | undefined;
    }
    export interface ShareBaseViewItem {
        Name?: string | undefined;
        ContentIds?: string[] | undefined;
        Id?: string | undefined;
        Audit?: StoreAudit | undefined;
        EntityType: EntityType;
    }
    export interface ShareBasicViewItem extends ShareBaseViewItem {
        MailRecipients?: MailRecipientViewItem[] | undefined;
        InternalRecipients?: InternalRecipientViewItem[] | undefined;
        Description?: string | undefined;
    }
    export interface ShareEmbedViewItem extends ShareBaseViewItem {
    }
    export interface CreateTransferRequest {
        Name?: string | undefined;
        TransferType: TransferType;
        Files?: TransferUploadFile[] | undefined;
        DriveFiles?: TransferDriveFile[] | undefined;
        WebLinks?: TransferWebLink[] | undefined;
        CollectionName?: string | undefined;
        CreateCollection: boolean;
    }
    export enum TransferType {
        FileUpload,
        DriveImport,
        DriveExport,
        WebDownload,
        SchemaImport,
    }
    export interface TransferFile {
        Identifier?: string | undefined;
    }
    export interface TransferUploadFile extends TransferFile {
        FileName?: string | undefined;
    }
    export interface TransferDriveFile extends TransferFile {
        DriveId?: string | undefined;
        FileId?: string | undefined;
        Name?: string | undefined;
        ExternalOutputFolderId?: string | undefined;
    }
    export interface TransferWebLink extends TransferFile {
        Url?: string | undefined;
    }
    export interface TransferViewItem {
        Id?: string | undefined;
        Name?: string | undefined;
        State: TransferState;
        TransferType: TransferType;
        BusinessProcessId?: string | undefined;
    }
    export enum TransferState {
        Draft,
        UploadInProgress,
        UploadCompleted,
        ImportInProgress,
        ImportCompleted,
        UploadCancelled,
        ImportCancelled,
        ImportFailed,
        Created,
        UploadFailed,
        Deleted,
        TransferReady,
        FileDeleteInProgress,
        TransferCleanup,
    }
    export interface TransferDetailViewItem {
        Id?: string | undefined;
        Rev?: string | undefined;
        Audit?: StoreAudit | undefined;
        Name?: string | undefined;
        State: TransferState;
        BusinessProcessId?: string | undefined;
        TransferType: TransferType;
        ItemProgress: number;
        ItemCount: number;
        ItemsFailed: number;
        ItemsCancelled: number;
        LastProgressStamp: number;
    }
    export interface FileTransferDetailViewItem {
        Id?: string | undefined;
        Rev?: string | undefined;
        Name?: string | undefined;
        Identifier?: string | undefined;
        Audit?: StoreAudit | undefined;
        TransferId?: string | undefined;
        State: FileTransferState;
        EntityType: EntityType;
        FileMetadata?: FileMetadata | undefined;
        DriveMetadata?: DriveMetadata | undefined;
        OutputItems?: OutputItem[] | undefined;
        ContentId?: string | undefined;
    }
    export enum FileTransferState {
        Draft,
        UploadInProgress,
        UploadCompleted,
        DataExtractionInProgress,
        DataExtractionDone,
        ImportInProgress,
        ImportCompleted,
        UploadCancelled,
        ImportCancelled,
        UploadFailed,
        ImportFailed,
        DeleteInProgress,
        Deleted,
        CleanupInProgress,
        CleanupCompleted,
    }
    export interface FileMetadata {
        Names?: TranslatedStringDictionary | undefined;
        Descriptions?: TranslatedStringDictionary | undefined;
        FileExtension?: string | undefined;
        FileName?: string | undefined;
        FilePath?: string | undefined;
        FileSizeInBytes?: number | undefined;
        Sha1Hash?: string | undefined;
        XmpMetadata?: XmpMetadata | undefined;
        ExifMetadata?: ExifMetadata | undefined;
        Language?: string | undefined;
    }
    export interface XmpMetadata {
        Dc?: Dc | undefined;
        Crs?: Crs | undefined;
        IptcCore?: IptcCore | undefined;
        IptcExt?: IptcExt | undefined;
        IptcIIM?: IptcIIM | undefined;
        Lr?: Lr | undefined;
        Pdf?: Pdf | undefined;
        Photoshop?: Photoshop | undefined;
        Plus?: Plus | undefined;
        Tiff?: Tiff | undefined;
        Xmp?: Xmp | undefined;
        XmpBJ?: XmpBJ | undefined;
        XmpDM?: XmpDM | undefined;
        XmpG?: XmpG | undefined;
        XmpGImg?: XmpGImg | undefined;
        Xmpidq?: Xmpidq | undefined;
        XmpMM?: XmpMM | undefined;
        XmpNote?: XmpNote | undefined;
        XmpRights?: XmpRights | undefined;
        XmpTPg?: XmpTPg | undefined;
    }
    export interface Dc {
        Contributor?: string[] | undefined;
        Coverage?: string | undefined;
        Creator?: string[] | undefined;
        Date?: Date[] | undefined;
        Description?: {
            [key: string]: string;
        } | undefined;
        Format?: string | undefined;
        Identifier?: string | undefined;
        Language?: string[] | undefined;
        Publisher?: string[] | undefined;
        Relation?: string[] | undefined;
        Rights?: {
            [key: string]: string;
        } | undefined;
        Source?: string | undefined;
        Subject?: string[] | undefined;
        Title?: {
            [key: string]: string;
        } | undefined;
        Type?: string | undefined;
    }
    export interface Crs {
        AutoBrightness?: boolean | undefined;
        AutoContrast?: boolean | undefined;
        AutoExposure?: boolean | undefined;
        AutoShadows?: boolean | undefined;
        BlueHue?: number | undefined;
        BlueSaturation?: number | undefined;
        Brightness?: number | undefined;
        CameraProfile?: string | undefined;
        ChromaticAberrationB?: number | undefined;
        ChromaticAberrationR?: number | undefined;
        ColorNoiseReduction?: number | undefined;
        Contrast?: number | undefined;
        CropTop?: number | undefined;
        CropLeft?: number | undefined;
        CropBottom?: number | undefined;
        CropRight?: number | undefined;
        CropAngle?: number | undefined;
        CropWidth?: number | undefined;
        CropHeight?: number | undefined;
        CropUnits?: CropUnit | undefined;
        Exposure?: number | undefined;
        GreenHue?: number | undefined;
        GreenSaturation?: number | undefined;
        HasCrop?: boolean | undefined;
        HasSettings?: boolean | undefined;
        LuminanceSmoothing?: number | undefined;
        RawFileName?: string | undefined;
        RedHue?: number | undefined;
        RedSaturation?: number | undefined;
        Saturation?: number | undefined;
        Shadows?: number | undefined;
        ShadowTint?: number | undefined;
        Sharpness?: number | undefined;
        Temperature?: number | undefined;
        Tint?: number | undefined;
        ToneCurve?: string[] | undefined;
        ToneCurveName?: ToneCurve | undefined;
        Version?: string | undefined;
        VignetteAmount?: number | undefined;
        VignetteMidpoint?: number | undefined;
        WhiteBalance?: WhiteBalance | undefined;
    }
    /** Corresponds to crs.CropUnitsChoice */
    export enum CropUnit {
        Pixels,
        Inches,
        Centimeters,
    }
    /** Corresponds to crs.ToneCurveNameChoice */
    export enum ToneCurve {
        Linear,
        MediumContrast,
        StrongContrast,
        Custom,
    }
    /** Corresponds to crs.WhiteBalanceChoice */
    export enum WhiteBalance {
        AsShot,
        Auto,
        Daylight,
        Cloudy,
        Shade,
        Tungsten,
        Fluorescent,
        Flash,
        Custom,
    }
    export interface IptcCore {
        CountryCode?: string | undefined;
        IntellectualGenre?: string | undefined;
        Scene?: string[] | undefined;
        SubjectCode?: string[] | undefined;
        Location?: string | undefined;
        CreatorContactInfo?: CreatorContactInfo | undefined;
    }
    export interface CreatorContactInfo {
        Address?: string | undefined;
        City?: string | undefined;
        Country?: string | undefined;
        EmailAddress?: string | undefined;
        PhoneNumber?: string | undefined;
        PostalCode?: string | undefined;
        Region?: string | undefined;
        URL?: string | undefined;
    }
    export interface IptcExt {
        AdditionalModelInformation?: string | undefined;
        ArtworkOrObject?: ArtworkOrObjectInfo[] | undefined;
        OrganisationInImageCode?: string[] | undefined;
        ControlledVocabularyTerm?: string[] | undefined;
        LocationShown?: LocationInfo[] | undefined;
        ModelAge?: number[] | undefined;
        OrganisationInImageName?: string[] | undefined;
        PersonInImage?: string[] | undefined;
        DigitalImageGUID?: string | undefined;
        DigitalSourceType?: string | undefined;
        Event?: {
            [key: string]: string;
        } | undefined;
        ImageRegistryEntry?: RegistryEntryInfo[] | undefined;
        MetadataLastEdited?: Date | undefined;
        LocationCreated?: LocationInfo[] | undefined;
        MaxAvailHeight?: number | undefined;
        MaxAvailWidth?: number | undefined;
    }
    /** Corresponds to Xmp.Structure.ArtworkOrObjectDetails */
    export interface ArtworkOrObjectInfo {
        CopyrightNotice?: string | undefined;
        Creator?: string[] | undefined;
        DateCreated?: Date | undefined;
        Source?: string | undefined;
        SourceInventoryNumber?: string | undefined;
        Title?: {
            [key: string]: string;
        } | undefined;
    }
    export interface LocationInfo {
        City?: string | undefined;
        CountryCode?: string | undefined;
        CountryName?: string | undefined;
        ProvinceState?: string | undefined;
        Sublocation?: string | undefined;
        WorldRegion?: string | undefined;
    }
    export interface RegistryEntryInfo {
        RegistryItemIdentifier?: string | undefined;
        RegistryOrganisationIdentifier?: string | undefined;
    }
    export interface IptcIIM {
        ModelVersion?: number | undefined;
        Destination?: string[] | undefined;
        FileFormat?: number | undefined;
        FileFormatVersion?: number | undefined;
        ServiceIdentifier?: string | undefined;
        EnvelopeNumber?: string | undefined;
        ProductID?: string[] | undefined;
        EnvelopePriority?: number | undefined;
        DateSent?: Date | undefined;
        TimeSent?: Date | undefined;
        UNO?: string | undefined;
        RecordVersion?: number | undefined;
        ObjectTypeReference?: string | undefined;
        ObjectAttributeReference?: string | undefined;
        ObjectName?: {
            [key: string]: string;
        } | undefined;
        EditStatus?: string | undefined;
        Urgency?: number | undefined;
        SubjectReference?: string[] | undefined;
        Category?: string | undefined;
        SupplementalCategory?: string[] | undefined;
        FixtureIdentifier?: string | undefined;
        Keywords?: string[] | undefined;
        ContentLocationCode?: string[] | undefined;
        ContentLocationName?: string[] | undefined;
        ReleaseDate?: Date | undefined;
        ReleaseTime?: Date | undefined;
        ExpirationDate?: Date | undefined;
        ExpirationTime?: Date | undefined;
        SpecialInstruction?: string | undefined;
        ActionAdvised?: string | undefined;
        ReferenceService?: string | undefined;
        ReferenceDate?: Date | undefined;
        ReferenceNumber?: string | undefined;
        DateCreated?: Date | undefined;
        TimeCreated?: Date | undefined;
        DigitalCreationDate?: Date | undefined;
        DigitalCreationTime?: Date | undefined;
        OriginatingProgram?: string | undefined;
        ProgramVersion?: string | undefined;
        Byline?: string[] | undefined;
        BylineTitle?: string | undefined;
        City?: string | undefined;
        Sublocation?: string | undefined;
        ProvinceState?: string | undefined;
        CountryPrimaryLocationCode?: string | undefined;
        CountryPrimaryLocationName?: string | undefined;
        OriginalTransmissionReference?: string | undefined;
        Headline?: string | undefined;
        Credit?: string | undefined;
        Source?: string | undefined;
        CopyrightNotice?: {
            [key: string]: string;
        } | undefined;
        CaptionAbstract?: {
            [key: string]: string;
        } | undefined;
        WriterEditor?: string | undefined;
        ImageType?: string | undefined;
        ImageOrientation?: string | undefined;
        LanguageIdentifier?: string | undefined;
    }
    export interface Lr {
        HierarchicalSubject?: string[] | undefined;
    }
    export interface Pdf {
        Keywords?: string | undefined;
        PDFVersion?: string | undefined;
        Producer?: string | undefined;
        Trapped?: boolean | undefined;
    }
    export interface Photoshop {
        AuthorsPosition?: string | undefined;
        CaptionWriter?: string | undefined;
        Category?: string | undefined;
        City?: string | undefined;
        ColorMode?: ColorMode | undefined;
        Country?: string | undefined;
        Credit?: string | undefined;
        DateCreated?: Date | undefined;
        DocumentAncestors?: string[] | undefined;
        Headline?: string | undefined;
        History?: string | undefined;
        ICCProfile?: string | undefined;
        Instructions?: string | undefined;
        Source?: string | undefined;
        State?: string | undefined;
        SupplementalCategories?: string[] | undefined;
        TextLayers?: PhotoshopLayer[] | undefined;
        TransmissionReference?: string | undefined;
        Urgency?: number | undefined;
        LegacyIPTCDigest?: string | undefined;
    }
    /** Corresponds to photoshop.ColorModeChoice */
    export enum ColorMode {
        Bitmap,
        Grayscale,
        Indexed,
        RGB,
        CMYK,
        Multichannel,
        Duotone,
        LAB,
    }
    export interface PhotoshopLayer {
        LayerName?: string | undefined;
        LayerText?: string | undefined;
    }
    export interface Plus {
        Version?: string | undefined;
        Licensee?: LicenseeInfo[] | undefined;
        LicenseeID?: string | undefined;
        LicenseeName?: string | undefined;
        EndUser?: EndUserInfo[] | undefined;
        EndUserID?: string | undefined;
        EndUserName?: string | undefined;
        Licensor?: LicensorInfo[] | undefined;
        LicensorNotes?: {
            [key: string]: string;
        } | undefined;
        MediaSummaryCode?: string | undefined;
        LicenseStartDate?: Date | undefined;
        LicenseEndDate?: Date | undefined;
        MediaConstraints?: {
            [key: string]: string;
        } | undefined;
        RegionConstraints?: {
            [key: string]: string;
        } | undefined;
        ProductOrServiceConstraints?: {
            [key: string]: string;
        } | undefined;
        ImageFileConstraints?: string[] | undefined;
        ImageAlterationConstraints?: string[] | undefined;
        ImageDuplicationConstraints?: string | undefined;
        ModelReleaseStatus?: string | undefined;
        ModelReleaseID?: string[] | undefined;
        MinorModelAgeDisclosure?: string | undefined;
        PropertyReleaseStatus?: string | undefined;
        PropertyReleaseID?: string[] | undefined;
        OtherConstraints?: {
            [key: string]: string;
        } | undefined;
        CreditLineRequired?: string | undefined;
        AdultContentWarning?: string | undefined;
        OtherLicenseRequirements?: {
            [key: string]: string;
        } | undefined;
        TermsAndConditionsText?: {
            [key: string]: string;
        } | undefined;
        TermsAndConditionsURL?: string | undefined;
        OtherConditions?: {
            [key: string]: string;
        } | undefined;
        ImageType?: string | undefined;
        LicensorImageID?: string | undefined;
        FileNameAsDelivered?: string | undefined;
        ImageFileFormatAsDelivered?: string | undefined;
        ImageFileSizeAsDelivered?: string | undefined;
        CopyrightStatus?: string | undefined;
        CopyrightRegistrationNumber?: string | undefined;
        FirstPublicationDate?: Date | undefined;
        CopyrightOwner?: CopyrightOwnerInfo[] | undefined;
        CopyrightOwnerImageID?: string | undefined;
        ImageCreator?: ImageCreatorInfo[] | undefined;
        ImageCreatorImageID?: string | undefined;
        ImageSupplier?: ImageSupplierInfo[] | undefined;
        ImageSupplierImageID?: string | undefined;
        LicenseeImageID?: string | undefined;
        LicenseeImageNotes?: {
            [key: string]: string;
        } | undefined;
        OtherImageInfo?: {
            [key: string]: string;
        } | undefined;
        LicenseID?: string | undefined;
        LicensorTransactionID?: string[] | undefined;
        LicenseeTransactionID?: string[] | undefined;
        LicenseeProjectReference?: string[] | undefined;
        LicenseTransactionDate?: Date | undefined;
        Reuse?: string | undefined;
        OtherLicenseDocuments?: string[] | undefined;
        OtherLicenseInfo?: {
            [key: string]: string;
        } | undefined;
        Custom1?: {
            [key: string]: string;
        }[] | undefined;
        Custom2?: {
            [key: string]: string;
        }[] | undefined;
        Custom3?: {
            [key: string]: string;
        }[] | undefined;
        Custom4?: {
            [key: string]: string;
        }[] | undefined;
        Custom5?: {
            [key: string]: string;
        }[] | undefined;
        Custom6?: {
            [key: string]: string;
        }[] | undefined;
        Custom7?: {
            [key: string]: string;
        }[] | undefined;
        Custom8?: {
            [key: string]: string;
        }[] | undefined;
        Custom9?: {
            [key: string]: string;
        }[] | undefined;
        Custom10?: {
            [key: string]: string;
        }[] | undefined;
    }
    export interface LicenseeInfo {
        LicenseeName?: string | undefined;
        LicenseeID?: string | undefined;
    }
    export interface EndUserInfo {
        EndUserName?: string | undefined;
        EndUserID?: string | undefined;
    }
    export interface LicensorInfo {
        LicensorName?: string | undefined;
        LicensorID?: string | undefined;
        LicensorStreetAddress?: string | undefined;
        LicensorExtendedAddress?: string | undefined;
        LicensorCity?: string | undefined;
        LicensorRegion?: string | undefined;
        LicensorPostalCode?: string | undefined;
        LicensorCountry?: string | undefined;
        LicensorTelephoneType1?: string | undefined;
        LicensorTelephone1?: string | undefined;
        LicensorTelephoneType2?: string | undefined;
        LicensorTelephone2?: string | undefined;
        LicensorEmail?: string | undefined;
        LicensorURL?: string | undefined;
    }
    export interface CopyrightOwnerInfo {
        CopyrightOwnerName?: string | undefined;
        CopyrightOwnerID?: string | undefined;
    }
    export interface ImageCreatorInfo {
        ImageCreatorName?: string | undefined;
        ImageCreatorID?: string | undefined;
    }
    export interface ImageSupplierInfo {
        ImageSupplierName?: string | undefined;
        ImageSupplierID?: string | undefined;
    }
    export interface Tiff {
        Artist?: string | undefined;
        BitsPerSample?: number[] | undefined;
        Compression?: Compression | undefined;
        Copyright?: {
            [key: string]: string;
        } | undefined;
        DateTime?: Date | undefined;
        ImageDescription?: {
            [key: string]: string;
        } | undefined;
        ImageLength?: number | undefined;
        ImageWidth?: number | undefined;
        Make?: string | undefined;
        Model?: string | undefined;
        Orientation?: Orientation | undefined;
        PhotometricInterpretation?: PhotometricInterpretation | undefined;
        PlanarConfiguration?: PlanarConfiguration | undefined;
        PrimaryChromaticities?: string[] | undefined;
        ReferenceBlackWhite?: string[] | undefined;
        ResolutionUnit?: ResolutionUnit | undefined;
        SamplesPerPixel?: number | undefined;
        Software?: string | undefined;
        TransferFunction?: number[] | undefined;
        WhitePoint?: string[] | undefined;
        XResolution?: string | undefined;
        YResolution?: string | undefined;
        YCbCrCoefficients?: string[] | undefined;
        YCbCrPositioning?: YCbCrPositioning | undefined;
        YCbCrSubSampling?: YCbCrSubSampling | undefined;
        NativeDigest?: string | undefined;
    }
    /** Corresponds to tiff.CompressionChoice */
    export enum Compression {
        Uncompressed,
        CCITT,
        T4,
        T6,
        LZW,
        OJPEG,
        JPEG,
        Deflate,
        T82,
        T43,
        NeXT,
        ARW,
        RAW,
        SRW,
        Group3_1D,
        PackBits,
        ThunderScan,
        KDC,
        RasterPadding,
        LineWork,
        HighContinuous,
        BinaryLineWork,
        PixarFilm,
        PixarLog,
        DCS,
        JBIG,
        JPEG2000,
        NEF,
        JBIG2,
        DCR,
        PEF,
    }
    /** Corresponds to tiff.OrientationChoice */
    export enum Orientation {
        None,
        TopRowLeftColumn,
        TopRowRightColumn,
        BottomRowLeftColumn,
        BottomRowRightColumn,
        LeftRowTopColumn,
        RightRowTopColumn,
        RightRowBottomColumn,
        LeftRowBottomColumn,
        Unknown,
    }
    /** Corresponds to tiff.PhotometricInterpretationChoice */
    export enum PhotometricInterpretation {
        WhiteIsZero,
        BlackIsZero,
        RGB,
        Palette,
        TransparencyMask,
        CMYK,
        YCbCr,
        CIELab,
        ICCLab,
        ITULab,
        ColorFilterArray,
        LogL,
        LogLUV,
        LinearRaw,
    }
    /** Corresponds to tiff.PlanarConfigurationChoice */
    export enum PlanarConfiguration {
        Chunky,
        Planar,
        Line,
    }
    /** Corresponds to exif.FocalPlaneResolutionUnitChoice */
    export enum ResolutionUnit {
        None,
        Inch,
        Centimeter,
    }
    /** Corresponds to tiff.YCbCrPositioningChoice */
    export enum YCbCrPositioning {
        Centered,
        Cosited,
    }
    /** Corresponds to tiff.YCbCrSubSamplingChoice */
    export enum YCbCrSubSampling {
        YCbCr111,
        YCbCr422,
        YCbCr420,
    }
    export interface Xmp {
        BaseURL?: string | undefined;
        CreateDate?: Date | undefined;
        CreatorTool?: string | undefined;
        Identifier?: string[] | undefined;
        Label?: string | undefined;
        MetadataDate?: Date | undefined;
        ModifyDate?: Date | undefined;
        Nickname?: string | undefined;
        Rating?: Rating | undefined;
        Thumbnails?: XmpGImg[] | undefined;
        PageInfo?: XmpGImg[] | undefined;
    }
    /** Corresponds to xmp.RatingChoice */
    export enum Rating {
        Rejected,
        Unrated,
        One,
        Two,
        Three,
        Four,
        Five,
    }
    export interface XmpGImg {
        Format?: ImgFormat | undefined;
        Width?: number | undefined;
        Height?: number | undefined;
        Image?: string | undefined;
    }
    /** Corresponds to xmpGImg.FormatChoice */
    export enum ImgFormat {
        JPEG,
    }
    export interface XmpBJ {
        JobRef?: Job[] | undefined;
    }
    export interface Job {
        Id?: string | undefined;
        Name?: string | undefined;
        Url?: string | undefined;
    }
    export interface XmpDM {
        AbsPeakAudioFilePath?: string | undefined;
        Artist?: string | undefined;
        Album?: string | undefined;
        AltTapeName?: string | undefined;
        AltTimecode?: TimeCode | undefined;
        AudioChannelType?: AudioChannelType | undefined;
        AudioCompressor?: string | undefined;
        AudioSampleRate?: number | undefined;
        AudioSampleType?: AudioSampleType | undefined;
        BeatSpliceParams?: BeatSpliceStretch | undefined;
        CameraAngle?: CameraAngle | undefined;
        CameraLabel?: string | undefined;
        CameraModel?: string | undefined;
        CameraMove?: CameraMove | undefined;
        Client?: string | undefined;
        Comment?: string | undefined;
        Composer?: string | undefined;
        ContributedMedia?: Media[] | undefined;
        Director?: string | undefined;
        DirectorPhotography?: string | undefined;
        Duration?: Time | undefined;
        Engineer?: string | undefined;
        FileDataRate?: string | undefined;
        Genre?: string | undefined;
        Good?: boolean | undefined;
        Instrument?: string | undefined;
        IntroTime?: Time | undefined;
        Key?: AudioMusicalKey | undefined;
        LogComment?: string | undefined;
        Loop?: boolean | undefined;
        NumberOfBeats?: number | undefined;
        Markers?: Marker[] | undefined;
        OutCue?: Time | undefined;
        ProjectName?: string | undefined;
        ProjectRef?: ProjectLink | undefined;
        PullDown?: VideoPullDown | undefined;
        RelativePeakAudioFilePath?: string | undefined;
        RelativeTimestamp?: Time | undefined;
        ReleaseDate?: Date | undefined;
        ResampleParams?: ResampleStretch | undefined;
        ScaleType?: AudioMusicalScaleType | undefined;
        Scene?: string | undefined;
        ShotDate?: Date | undefined;
        ShotDay?: string | undefined;
        ShotLocation?: string | undefined;
        ShotName?: string | undefined;
        ShotNumber?: string | undefined;
        ShotSize?: ShotSize | undefined;
        SpeakerPlacement?: string | undefined;
        StartTimecode?: TimeCode | undefined;
        StretchMode?: AudioStretchMode | undefined;
        TakeNumber?: number | undefined;
        TapeName?: string | undefined;
        Tempo?: number | undefined;
        TimeScaleParams?: TimeScaleStretch | undefined;
        TimeSignature?: TimeSignature | undefined;
        TrackNumber?: number | undefined;
        Tracks?: Track[] | undefined;
        VideoAlphaMode?: VideoAlphaMode | undefined;
        VideoAlphaPremultipleColor?: XmpG | undefined;
        VideoAlphaUnityIsTransparent?: boolean | undefined;
        VideoColorSpace?: VideoColorSpace | undefined;
        VideoCompressor?: string | undefined;
        VideoFieldOrder?: VideoFieldOrder | undefined;
        VideoFrameRate?: VideoFrameRate | undefined;
        VideoFrameSize?: Dimension | undefined;
        VideoPixelDepth?: VideoPixelDepth | undefined;
        VideoPixelAspectRatio?: string | undefined;
    }
    export interface TimeCode {
        TimeFormat?: TimeFormat | undefined;
        TimeValue?: string | undefined;
    }
    /** Corresponds to Timecode.TimeFormatChoice */
    export enum TimeFormat {
        Timecode24,
        Timecode25,
        Timecode2997Drop,
        Timecode2997NonDrop,
        Timecode30,
        Timecode50,
        Timecode5994Drop,
        Timecode5994NonDrop,
        Timecode60,
        Timecode23976,
    }
    /** Corresponds to xmpDM.AudioChannelTypeChoice */
    export enum AudioChannelType {
        CHANNEL_MONO,
        CHANNEL_STEREO,
        CHANNEL_5_1,
        CHANNEL_7_1,
        CHANNEL_16,
        CHANNEL_OTHER,
    }
    /** Corresponds to xmpDM.AudioSampleTypeChoice */
    export enum AudioSampleType {
        SAMPLE_8_INT,
        SAMPLE_16_INT,
        SAMPLE_24_INT,
        SAMPLE_32_INT,
        SAMPLE_32_FLOAT,
        SAMPLE_COMPRESSED,
        SAMPLE_PACKED,
        SAMPLE_OTHER,
    }
    export interface BeatSpliceStretch {
        RiseInDecibel?: number | undefined;
        RiseInTimeDuration?: Time | undefined;
        UseFileBeatsMarker?: boolean | undefined;
    }
    export interface Time {
        Scale?: string | undefined;
        Value?: number | undefined;
    }
    /** Corresponds to xmpDM.CameraAngleChoice */
    export enum CameraAngle {
        ANGLE_LOW,
        ANGLE_EYE_LEVEL,
        ANGLE_HIGH,
        ANGLE_OVERHEAD_SHOT,
        ANGLE_BIRDS_EYE_SHOT,
        ANGLE_DUTCH,
        ANGLE_POV,
        ANGLE_OVER_THE_SHOULDER,
        ANGLE_REACTION_SHOT,
    }
    /** Corresponds to xmpDM.CameraMoveChoice */
    export enum CameraMove {
        MOVE_AERIAL,
        MOVE_BOOM_UP,
        MOVE_BOOM_DOWN,
        MOVE_CRANE_UP,
        MOVE_CRANE_DOWN,
        MOVE_DOLLY_IN,
        MOVE_DOLLY_OUT,
        MOVE_PAN_LEFT,
        MOVE_PAN_RIGHT,
        MOVE_PEDESTAL_UP,
        MOVE_PEDESTAL_DOWN,
        MOVE_TILT_UP,
        MOVE_TILT_DOWN,
        MOVE_TRACKING,
        MOVE_TRUCK_LEFT,
        MOVE_TRUCK_RIGHT,
        MOVE_ZOOM_IN,
        MOVE_ZOOM_OUT,
    }
    export interface Media {
        Duration?: Time | undefined;
        Managed?: boolean | undefined;
        Path?: string | undefined;
        StartTime?: Time | undefined;
        Track?: string | undefined;
        WebStatement?: string | undefined;
    }
    /** Corresponds to xmpDM.AudioMusicalKeyChoice */
    export enum AudioMusicalKey {
        KEY_C,
        KEY_C_SHARP,
        KEY_D,
        KEY_D_SHARP,
        KEY_E,
        KEY_F,
        KEY_F_SHARP,
        KEY_G,
        KEY_G_SHARP,
        KEY_A,
        KEY_A_SHARP,
        KEY_B,
    }
    export interface Marker {
        Comment?: string | undefined;
        CuePointParams?: {
            [key: string]: string;
        } | undefined;
        CuePointType?: string | undefined;
        Duration?: string | undefined;
        Location?: string | undefined;
        Name?: string | undefined;
        Probability?: number | undefined;
        Speaker?: string | undefined;
        StartTime?: string | undefined;
        Target?: string | undefined;
        Type?: MarkerType | undefined;
    }
    /** Corresponds to Xmp.Media.Marker.TypeChoice */
    export enum MarkerType {
        Chapter,
        Cue,
        Index,
        Speech,
        Track,
    }
    export interface ProjectLink {
        Path?: string | undefined;
        Type?: ProjectLinkType | undefined;
    }
    /** Corresponds to Xmp.Media.ProjectLink.TypeChoice */
    export enum ProjectLinkType {
        Movie,
        Still,
        Audio,
        Custom,
    }
    /** Corresponds to xmpDM.VideoPullDownChoice */
    export enum VideoPullDown {
        PULLDOWN_WSSWW,
        PULLDOWN_SSWWW,
        PULLDOWN_SWWWS,
        PULLDOWN_WWWSS,
        PULLDOWN_WWSSW,
        PULLDOWN_WWWSW,
        PULLDOWN_WWSWW,
        PULLDOWN_WSWWW,
        PULLDOWN_SWWWW,
        PULLDOWN_WWWWS,
    }
    export interface ResampleStretch {
        Quality?: Quality | undefined;
    }
    /** Corresponds to Xmp.Media.resampleStretch.QualityChoice and Xmp.Media.timeScaleStretch.QualityChoice */
    export enum Quality {
        High,
        Medium,
        Low,
    }
    /** Corresponds to xmpDM.AudioMusicalScaleTypeChoice */
    export enum AudioMusicalScaleType {
        SCALE_MAJOR,
        SCALE_MINOR,
        SCALE_BOTH,
        SCALE_NEITHER,
    }
    /** Corresponds to xmpDM.ShotSizeChoice */
    export enum ShotSize {
        SHOT_ECU,
        SHOT_MCU,
        SHOT_CU,
        SHOT_MS,
        SHOT_WS,
        SHOT_MWS,
        SHOT_EWS,
    }
    /** Corresponds to xmpDM.AudioStretchModeChoice */
    export enum AudioStretchMode {
        STRETCH_FIXED_LENGTH,
        STRETCH_TIME_SCALE,
        STRETCH_RESAMPLE,
        STRETCH_BEAT_SPLICE,
        STRETCH_HYBRID,
    }
    export interface TimeScaleStretch {
        FrameOverlappingPercentage?: number | undefined;
        FrameSize?: number | undefined;
        Quality?: Quality | undefined;
    }
    /** Corresponds to xmpDM.TimeSignatureChoice */
    export enum TimeSignature {
        TIME_2_4,
        TIME_3_4,
        TIME_4_4,
        TIME_5_4,
        TIME_7_4,
        TIME_6_8,
        TIME_9_8,
        TIME_12_8,
        TIME_OTHER,
    }
    export interface Track {
        FrameRate?: string | undefined;
        Markers?: Marker[] | undefined;
        TrackName?: string | undefined;
        TrackType?: MarkerType | undefined;
    }
    /** Corresponds to xmpDM.VideoAlphaModeChoice */
    export enum VideoAlphaMode {
        ALPHA_MODE_STRAIGHT,
        ALPHA_MODE_PREMULTIPLIED,
        ALPHA_MODE_NONE,
    }
    export interface XmpG {
        A?: number | undefined;
        B?: number | undefined;
        L?: number | undefined;
        Black?: number | undefined;
        Cyan?: number | undefined;
        Magenta?: number | undefined;
        Yellow?: number | undefined;
        Blue?: number | undefined;
        Green?: number | undefined;
        Red?: number | undefined;
        Mode?: ColorantMode | undefined;
        SwatchName?: string | undefined;
        Type?: ColorantType | undefined;
    }
    /** Corresponds to xmpG.ModeChoice */
    export enum ColorantMode {
        CMYK,
        RGB,
        LAB,
    }
    /** Corresponds to xmpG.TypeChoice */
    export enum ColorantType {
        Process,
        Spot,
    }
    /** Corresponds to xmpDM.VideoColorSpaceChoice */
    export enum VideoColorSpace {
        COLOR_SPACE_SRGB,
        COLOR_SPACE_CCIR_601,
        COLOR_SPACE_CCIR_709,
    }
    /** Corresponds to xmpDM.VideoFieldOrderChoice */
    export enum VideoFieldOrder {
        FIELD_ORDER_UPPER,
        FIELD_ORDER_LOWER,
        FIELD_ORDER_PROGRESSIVE,
    }
    /** Corresponds to xmpDM.VideoFrameRateChoice */
    export enum VideoFrameRate {
        FRAME_RATE_24,
        FRAME_RATE_NTSC,
        FRAME_RATE_PAL,
    }
    export interface Dimension {
        Height?: number | undefined;
        Width?: number | undefined;
        Unit?: Unit | undefined;
    }
    /** Corresponds to stDim.UnitChoice */
    export enum Unit {
        Inch,
        Millimeter,
        Centimeter,
        Pixel,
        Pica,
        Point,
    }
    /** Corresponds to xmpDM.VideoPixelDepthChoice */
    export enum VideoPixelDepth {
        PIXEL_DEPTH_8_INT,
        PIXEL_DEPTH_16_INT,
        PIXEL_DEPTH_24_INT,
        PIXEL_DEPTH_32_INT,
        PIXEL_DEPTH_32_FLOAT,
        PIXEL_DEPTH_OTHER,
    }
    export interface Xmpidq {
        Scheme?: string | undefined;
    }
    export interface XmpMM {
        DerivedFrom?: Reference | undefined;
        DocumentID?: string | undefined;
        History?: Event[] | undefined;
        Ingredients?: Reference[] | undefined;
        InstanceID?: string | undefined;
        ManagedFrom?: Reference | undefined;
        Manager?: string | undefined;
        ManageTo?: string | undefined;
        ManageUI?: string | undefined;
        ManagerVariant?: string | undefined;
        OriginalDocumentID?: string | undefined;
        RenditionClass?: string | undefined;
        RenditionParams?: string | undefined;
        VersionID?: string | undefined;
        Versions?: VersionInfo[] | undefined;
    }
    export interface Reference {
        AlternatePaths?: string[] | undefined;
        DocumentID?: string | undefined;
        FilePath?: string | undefined;
        FromPart?: string | undefined;
        InstanceID?: string | undefined;
        LastModifyDate?: Date | undefined;
        Manager?: string | undefined;
        ManagerVariant?: string | undefined;
        ManageTo?: string | undefined;
        ManageUI?: string | undefined;
        MaskMarkers?: MaskMarkers | undefined;
        OriginalDocumentID?: string | undefined;
        PartMapping?: string | undefined;
        RenditionClass?: string | undefined;
        RenditionParams?: string | undefined;
        ToPart?: string | undefined;
        VersionID?: string | undefined;
    }
    /** Corresponds to stRef.MaskMarkersChoice */
    export enum MaskMarkers {
        All,
        None,
    }
    export interface Event {
        Action?: EventAction | undefined;
        Changed?: string | undefined;
        InstanceID?: string | undefined;
        Parameters?: string | undefined;
        SoftwareAgent?: string | undefined;
        When?: Date | undefined;
    }
    /** Corresponds to stEvt.ActionChoice */
    export enum EventAction {
        Converted,
        Copied,
        Created,
        Cropped,
        Edited,
        Filtered,
        Formatted,
        VersionUpdated,
        Printed,
        Published,
        Managed,
        Produced,
        Resized,
        Saved,
        Derived,
    }
    export interface VersionInfo {
        Comments?: string | undefined;
        Event?: Event | undefined;
        Modifier?: string | undefined;
        ModifyDate?: Date | undefined;
        Version?: string | undefined;
    }
    export interface XmpNote {
        HasExtendedXMP?: string | undefined;
    }
    export interface XmpRights {
        Certificate?: string | undefined;
        Marked?: boolean | undefined;
        Owner?: string[] | undefined;
        UsageTerms?: {
            [key: string]: string;
        } | undefined;
        WebStatement?: string | undefined;
    }
    export interface XmpTPg {
        Colorants?: XmpG[] | undefined;
        Fonts?: Font[] | undefined;
        MaxPageSize?: Dimension | undefined;
        NPages?: number | undefined;
        PlateNames?: string[] | undefined;
    }
    export interface Font {
        ChildFontFiles?: string[] | undefined;
        Composite?: boolean | undefined;
        FontFace?: string | undefined;
        FontFamily?: string | undefined;
        FontFileName?: string | undefined;
        FontName?: string | undefined;
        FontType?: FontType | undefined;
        VersionString?: string | undefined;
    }
    /** Corresponds to stFnt.FontTypeChoice */
    export enum FontType {
        TrueType,
        Type1,
        OpenType,
        OpenTypeCFF,
    }
    export interface ExifMetadata {
        Exif?: Exif | undefined;
        ExifAux?: ExifAux | undefined;
    }
    export interface Exif {
        ApertureValue?: string | undefined;
        BrightnessValue?: string | undefined;
        CFAPattern?: CFAPattern | undefined;
        ColorSpace?: ColorSpace | undefined;
        ComponentsConfiguration?: number[] | undefined;
        CompressedBitsPerPixel?: string | undefined;
        Contrast?: Contrast | undefined;
        CustomRendered?: CustomRendered | undefined;
        DateTimeOriginal?: Date | undefined;
        DateTimeDigitized?: Date | undefined;
        DeviceSettingDescription?: DeviceSettings | undefined;
        DigitalZoomRatio?: string | undefined;
        ExifVersion?: ExifVersion | undefined;
        ExposureBiasValue?: string | undefined;
        ExposureIndex?: string | undefined;
        ExposureMode?: ExposureMode | undefined;
        ExposureProgram?: ExposureProgram | undefined;
        ExposureTime?: string | undefined;
        FileSource?: FileSource | undefined;
        Flash?: Flash | undefined;
        FlashEnergy?: string | undefined;
        FlashpixVersion?: FlashpixVersion | undefined;
        FNumber?: string | undefined;
        FocalLength?: string | undefined;
        FocalLengthIn35mmFilm?: number | undefined;
        FocalPlaneResolutionUnit?: FocalPlaneResolutionUnit | undefined;
        FocalPlaneXResolution?: string | undefined;
        FocalPlaneYResolution?: string | undefined;
        GainControl?: GainControl | undefined;
        GPSAltitude?: string | undefined;
        GPSAltitudeRef?: GPSAltitudeRef | undefined;
        GPSAreaInformation?: string | undefined;
        GPSDestBearing?: string | undefined;
        GPSDestBearingRef?: GPSDestBearingRef | undefined;
        GPSDestDistance?: string | undefined;
        GPSDestDistanceRef?: GPSDestDistanceRef | undefined;
        GPSDestLatitude?: string | undefined;
        GPSDestLongitude?: string | undefined;
        GPSDifferential?: GPSDifferential | undefined;
        GPSDOP?: string | undefined;
        GPSImgDirection?: string | undefined;
        GPSImgDirectionRef?: GPSImgDirectionRef | undefined;
        GPSCoordinate?: GPSCoordinate | undefined;
        GPSLatitude?: string | undefined;
        GPSLongitude?: string | undefined;
        GPSMapDatum?: string | undefined;
        GPSMeasureMode?: string | undefined;
        GPSProcessingMethod?: string | undefined;
        GPSSatellites?: string | undefined;
        GPSSpeed?: string | undefined;
        GPSSpeedRef?: GPSSpeedRef | undefined;
        GPSStatus?: GPSStatus | undefined;
        GPSTimeStamp?: Date | undefined;
        GPSTrack?: string | undefined;
        GPSTrackRef?: string | undefined;
        GPSVersionID?: string | undefined;
        ImageUniqueID?: string | undefined;
        ISOSpeedRatings?: number[] | undefined;
        LightSource?: LightSource | undefined;
        MaxApertureValue?: string | undefined;
        MeteringMode?: MeteringMode | undefined;
        OECF?: OECF | undefined;
        PixelXDimension?: number | undefined;
        PixelYDimension?: number | undefined;
        RelatedSoundFile?: string | undefined;
        Saturation?: Saturation | undefined;
        SceneCaptureType?: SceneCaptureType | undefined;
        SceneType?: SceneType | undefined;
        SensingMethod?: SensingMethod | undefined;
        Sharpness?: Sharpness | undefined;
        ShutterSpeedValue?: string | undefined;
        SpatialFrequencyResponse?: SFR | undefined;
        SpectralSensitivity?: string | undefined;
        SubjectArea?: number[] | undefined;
        SubjectDistance?: string | undefined;
        SubjectDistanceRange?: SubjectDistanceRange | undefined;
        SubjectLocation?: number[] | undefined;
        UserComment?: {
            [key: string]: string;
        } | undefined;
        WhiteBalance?: WhiteBalanceExif | undefined;
        NativeDigest?: string | undefined;
    }
    export interface CFAPattern {
        Columns?: number | undefined;
        Rows?: number | undefined;
        Values?: number[] | undefined;
    }
    /** Corresponds to exif.ColorSpaceChoice */
    export enum ColorSpace {
        None,
        SRGB,
        AdobeRGB,
        Uncalibrated,
    }
    /** Corresponds to exif.ContrastChoice */
    export enum Contrast {
        Normal,
        Soft,
        Hard,
        Unknown,
    }
    /** Corresponds to exif.CustomRenderedChoice */
    export enum CustomRendered {
        NormalProcess,
        CustomProcess,
    }
    export interface DeviceSettings {
        Columns?: number | undefined;
        Rows?: number | undefined;
        Settings?: string[] | undefined;
    }
    /** Corresponds to exif.ExifVersionChoice */
    export enum ExifVersion {
        V210,
        V220,
        V221,
        V222,
        V230,
    }
    /** Corresponds to exif.ExposureModeChoice */
    export enum ExposureMode {
        Auto,
        Manual,
        AutoBracket,
    }
    /** Corresponds to exif.ExposureProgramChoice */
    export enum ExposureProgram {
        Undefined,
        Manual,
        NormalProgram,
        AperturePriority,
        ShutterPriority,
        CreativeProgram,
        ActionProgram,
        PortraitMode,
        LandscapeMode,
        Unknown,
    }
    /** Corresponds to exif.FileSourceChoice */
    export enum FileSource {
        Other,
        TransparentScanner,
        ReflexScanner,
        DSC,
    }
    export interface Flash {
        Fired?: boolean | undefined;
        Return?: FlashReturn | undefined;
        Mode?: FlashMode | undefined;
        Function?: boolean | undefined;
        RedEyeMode?: boolean | undefined;
    }
    /** Corresponds to Xmp.Structure.Flash.ReturnChoice */
    export enum FlashReturn {
        NoStrobeReturnDetection,
        StrobeReturnLightNotDetected,
        StrobeReturnLightDetected,
    }
    /** Corresponds to Xmp.Structure.Flash.ModeChoice */
    export enum FlashMode {
        Unknown,
        CompulsoryFlashFiring,
        CompulsoryFlashSuppression,
        AutoMode,
    }
    /** Corresponds to exif.FlashpixVersionChoice */
    export enum FlashpixVersion {
        V100,
        V101,
        V110,
    }
    /** Corresponds to exif.FocalPlaneResolutionUnitChoice */
    export enum FocalPlaneResolutionUnit {
        None,
        Inch,
        Meter,
        Centimeter,
        Millimeter,
        Micrometer,
    }
    /** Corresponds to exif.GainControlChoice */
    export enum GainControl {
        None,
        LowGainUp,
        HighGainUp,
        LowGainDown,
        HighGainDown,
    }
    /** Corresponds to exif.GPSAltitudeRefChoice */
    export enum GPSAltitudeRef {
        AboveSeaLevel,
        BelowSeaLevel,
    }
    /** Corresponds to exif.GPSDestBearingRefChoice */
    export enum GPSDestBearingRef {
        TrueDirection,
        MagneticDirection,
    }
    /** Corresponds to exif.GPSDestDistanceRefChoice */
    export enum GPSDestDistanceRef {
        Kilometers,
        Miles,
        Knots,
    }
    /** Corresponds to exif.GPSDifferentialChoice */
    export enum GPSDifferential {
        WithoutCorrection,
        WithCorrection,
    }
    /** Corresponds to exif.GPSImgDirectionRefChoice */
    export enum GPSImgDirectionRef {
        TrueDirection,
        MagneticDirection,
    }
    export interface GPSCoordinate {
        lon?: number | undefined;
        lat?: number | undefined;
    }
    /** Corresponds to exif.GPSSpeedRefChoice */
    export enum GPSSpeedRef {
        KilometersPerHour,
        MilesPerHour,
        Knots,
    }
    /** Corresponds to exif.GPSStatusChoice */
    export enum GPSStatus {
        MeasurementInProgress,
        MeasurementIsInteroperability,
    }
    /** Corresponds to exif.LightSourceChoice */
    export enum LightSource {
        Unidentified,
        Daylight,
        Fluorescent,
        Tungsten,
        Flash,
        FineWeather,
        CloudyWeather,
        Shade,
        DaylightFluorescent,
        DayWhiteFluorescent,
        CoolWhiteFluorescent,
        WhiteFluorescent,
        StandardIlluminantA,
        StandardIlluminantB,
        StandardIlluminantC,
        D55Illuminant,
        D65Illuminant,
        D75Illuminant,
        D50Illuminant,
        ISOStudioTungsten,
        Other,
    }
    /** Corresponds to exif.MeteringModeChoice */
    export enum MeteringMode {
        Unidentified,
        Average,
        CenterWeightedAverage,
        Spot,
        MultiSpot,
        Pattern,
        Partial,
        Reserved,
        Other,
    }
    export interface OECF {
        Columns?: number | undefined;
        Rows?: number | undefined;
        Values?: string[] | undefined;
        Names?: string[] | undefined;
    }
    /** Corresponds to exif.SaturationChoice */
    export enum Saturation {
        Normal,
        Low,
        High,
        Unknown,
    }
    /** Corresponds to exif.SceneCaptureTypeChoice */
    export enum SceneCaptureType {
        Standard,
        Landscape,
        Portrait,
        NightScene,
    }
    /** Corresponds to exif.SceneTypeChoice */
    export enum SceneType {
        DirectlyPhotographedImage,
    }
    /** Corresponds to exif.SensingMethodChoice */
    export enum SensingMethod {
        Undefined,
        MonochromeArea,
        OneChipColourAreaSensor,
        TwoChipColourAreaSensor,
        ThreeChipColourAreaSensor,
        ColourSequentialAreaSensor,
        MonochromeLinearArea,
        TrilinearSensor,
        ColourSequentialLinearSensor,
    }
    /** Corresponds to exif.SharpnessChoice */
    export enum Sharpness {
        Normal,
        Soft,
        Hard,
        Unknown,
    }
    export interface SFR {
        Columns?: number | undefined;
        Rows?: number | undefined;
        Values?: string[] | undefined;
        Names?: string[] | undefined;
    }
    /** Corresponds to exif.SubjectDistanceRangeChoice */
    export enum SubjectDistanceRange {
        Unknown,
        Macro,
        CloseView,
        DistantView,
    }
    /** Corresponds to exif.WhiteBalanceChoice */
    export enum WhiteBalanceExif {
        Auto,
        Manual,
        Unknown,
    }
    export interface ExifAux {
        Lens?: string | undefined;
        SerialNumber?: string | undefined;
    }
    export interface AudioMetadata extends FileMetadata {
        AudioStreams?: AudioStream[] | undefined;
    }
    export interface AudioStream {
        BitRate?: string | undefined;
        BitRateMode?: string | undefined;
        Channels?: string | undefined;
        ChannelPositions?: string | undefined;
        Codec?: string | undefined;
        DurationInSeconds?: number | undefined;
        Format?: string | undefined;
        Language?: string | undefined;
        Resolution?: number | undefined;
        SamplingRate?: number | undefined;
        StreamSize?: number | undefined;
    }
    export interface DocumentMetadata extends FileMetadata {
        ApplicationName?: string | undefined;
        ApplicationVersion?: string | undefined;
        Author?: string | undefined;
        Creator?: string | undefined;
        Publisher?: string | undefined;
        Company?: string | undefined;
        DocumentTitle?: string | undefined;
        CharacterCount: number;
        CharacterCountWithSpaces: number;
        LineCount: number;
        PageCount: number;
        SlideCount: number;
        ParagraphCount: number;
        RevisionNumber: number;
        Titles?: string[] | undefined;
        ImageTitles?: string[] | undefined;
        EpsInfo?: EpsMetadata | undefined;
        EmbeddedFiles?: FileMetadata[] | undefined;
    }
    export interface EpsMetadata {
        IsRasterized: boolean;
        WidthInPoints: number;
        HeightInPoints: number;
    }
    export interface ImageMetadata extends FileMetadata {
        Width: number;
        Height: number;
        WidthInInch: number;
        HeightInInch: number;
        WidthInCm: number;
        HeightInCm: number;
        ColorSpace?: string | undefined;
        ColorProfile?: string | undefined;
        BitsPerPixel: number;
        BitsPerChannel: number;
        Channels?: string | undefined;
        PixelFormat?: string | undefined;
        HasAlpha: boolean;
        IsIndexed: boolean;
        IsExtended: boolean;
        HorizontalResolution: number;
        VerticalResolution: number;
        TotalFrames: number;
        TotalUnspecifiedTiffExtraChannels: number;
        HasExifData: boolean;
        HasIptcData: boolean;
        HasAdobeResourceData: boolean;
        HasXmpData: boolean;
        UncompressedSizeInBytes: number;
    }
    export interface VideoMetadata extends FileMetadata {
        Width: number;
        Height: number;
        DurationInSeconds: number;
        Format?: string | undefined;
        Codec?: string | undefined;
        OverallBitrate?: number | undefined;
        VideoStreams?: VideoStream[] | undefined;
        AudioStreams?: AudioStream[] | undefined;
    }
    export interface VideoStream {
        BitRate?: string | undefined;
        Codec?: string | undefined;
        DisplayAspectRatio?: string | undefined;
        DurationInSeconds: number;
        Format?: string | undefined;
        FrameCount?: number | undefined;
        FrameRate?: number | undefined;
        Height?: number | undefined;
        Language?: string | undefined;
        PixelAspectRatio?: number | undefined;
        Resolution?: number | undefined;
        StreamSize?: number | undefined;
        Width?: number | undefined;
        Rotation?: number | undefined;
    }
    export interface DriveMetadata {
        Location?: string | undefined;
        FileType?: string | undefined;
        Audit?: DriveMetadataAudit | undefined;
        Description?: string | undefined;
    }
    export interface DriveMetadataAudit {
        Owner?: string | undefined;
        Modified?: string | undefined;
        Opened?: string | undefined;
        Created?: string | undefined;
    }
    export interface OutputItem {
        Id?: string | undefined;
        FilePath?: string | undefined;
        OutputSource: OutputSource;
    }
    export enum OutputSource {
        Rendered,
        Embedded,
    }
    export interface FileTransfer2ContentCreateRequest {
        TransferId?: string | undefined;
        /** An optional id list of schemas with type layer. */
        LayerSchemaIds?: string[] | undefined;
        Metadata?: DataDictionary | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        ContentPermissionSetIds?: string[] | undefined;
    }
    export interface FileTransferPartial2ContentCreateRequest {
        TransferId?: string | undefined;
        Items?: FileTransferCreateItem[] | undefined;
    }
    export interface FileTransferCreateItem {
        FileId?: string | undefined;
        /** An optional id list of schemas with type layer. */
        LayerSchemaIds?: string[] | undefined;
        Metadata?: DataDictionary | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        ContentPermissionSetIds?: string[] | undefined;
    }
    export interface TransferSearchRequest {
        Channel?: string | undefined;
        SearchString?: string | undefined;
        Sort?: SortInfo[] | undefined;
        Start: number;
        Limit: number;
        Filter?: FilterBase | undefined;
    }
    export interface BaseResultOfTransferViewItem {
        TotalResults: number;
        Results?: TransferViewItem[] | undefined;
        PageToken?: string | undefined;
    }
    export interface TransferSearchResult extends BaseResultOfTransferViewItem {
        ElapsedMilliseconds: number;
    }
    export interface FileTransferSearchRequest {
        SearchString?: string | undefined;
        Sort?: SortInfo[] | undefined;
        Start: number;
        Limit: number;
        Filter?: FilterBase | undefined;
    }
    export interface BaseResultOfFileTransferViewItem {
        TotalResults: number;
        Results?: FileTransferViewItem[] | undefined;
        PageToken?: string | undefined;
    }
    export interface FileTransferSearchResult extends BaseResultOfFileTransferViewItem {
        ElapsedMilliseconds: number;
    }
    export interface FileTransferViewItem {
        Id?: string | undefined;
        Name?: string | undefined;
        Identifier?: string | undefined;
        TransferId?: string | undefined;
        State: FileTransferState;
        EntityType: EntityType;
        ContentId?: string | undefined;
    }
    export interface ChannelViewItem {
        Id?: string | undefined;
        SortOrder: number;
        /** The search index id. */
        SearchIndexId?: string | undefined;
        EntityType: EntityType;
        /** An id list of schemas with schema type content whose content documents should be found by the simple search.
    The search by filters and aggregations are unaffected. */
        SchemaIds?: string[] | undefined;
        /** An optional search filter. Limits the content document result set on each search and aggregation request. */
        Filter?: FilterBase | undefined;
        /** Language specific names. */
        Names?: TranslatedStringDictionary | undefined;
        Sort?: SortInfo[] | undefined;
        /** An optional list of aggregators. These aggregations are added by default on each aggregation requests. */
        Aggregations?: AggregatorBase[] | undefined;
        /** An Optional list of fields. These fields extend the list of simple search fields outside the bounds of any schema field configuration. */
        ExtendedSimpleSearchFields?: string[] | undefined;
    }
    export interface FileParameter {
        data: any;
        fileName: string;
    }
    export class SwaggerException extends Error {
        message: string;
        status: number;
        response: string;
        result: any;
        constructor(message: string, status: number, response: string, result: any);
    }
}

