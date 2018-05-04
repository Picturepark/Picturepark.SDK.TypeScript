declare module "picturepark" {
    export class AuthClient {
        private pictureparkApiUrl;
        private customerAlias;
        constructor(pictureparkApiUrl: string, customerAlias?: string);
        getBaseUrl(defaultUrl: string): string;
        transformHttpRequestOptions(options: RequestInit): Promise<RequestInit>;
    }
    export class PictureparkClientBase {
        private authClient;
        constructor(authClient: AuthClient);
        getBaseUrl(defaultUrl: string): string;
        transformOptions(options: RequestInit): Promise<RequestInit>;
    }
    export class ContentClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get detail - single
         * @contentId The content id.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         * @return ContentDetail
         */
        get(contentId: string, resolve: boolean, patterns?: DisplayPatternType[] | null | undefined): Promise<ContentDetail | null>;
        protected processGet(response: Response): Promise<ContentDetail | null>;
        /**
         * Get detail - many
         * @ids List of contentIds
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         * @return List of ContentDetail
         */
        getMany(ids: string[] | null, resolve: boolean, patterns?: DisplayPatternType[] | null | undefined): Promise<ContentDetail[]>;
        protected processGetMany(response: Response): Promise<ContentDetail[]>;
        /**
         * Create - many
         * @contentCreateManyRequest The content create many request.
         */
        createMany(contentCreateManyRequest: ContentCreateManyRequest | null): Promise<BusinessProcess>;
        protected processCreateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Search
         * @contentSearchRequest The content search request.
         * @return ContentSearchResult
         */
        search(contentSearchRequest: ContentSearchRequest | null): Promise<ContentSearchResult>;
        protected processSearch(response: Response): Promise<ContentSearchResult>;
        /**
         * Aggregate
         * @contentAggregationRequest The aggregation request.
         * @return ObjectAggregationResult
         */
        aggregate(contentAggregationRequest: ContentAggregationRequest | null): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Aggregate on channel
         * @contentAggregationOnChannelRequest The content aggregation on channel request.
         * @return ObjectAggregationResult
         */
        aggregateOnChannel(contentAggregationOnChannelRequest: ContentAggregationOnChannelRequest | null): Promise<ObjectAggregationResult>;
        protected processAggregateOnChannel(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Create download link
         * @request The content download link request
         * @return ContentBatchDonloadItem
         */
        createDownloadLink(request: ContentDownloadLinkCreateRequest | null): Promise<DownloadLink>;
        protected processCreateDownloadLink(response: Response): Promise<DownloadLink>;
        /**
         * Download output
         * @contentId The content id
         * @outputFormatId The output format id
         * @width (optional) Optional width in pixels to resize image
         * @height (optional) Optional height in pixels to resize image
         * @range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
         * @return HttpResponseMessage
         */
        download(contentId: string, outputFormatId: string, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
        protected processDownload(response: Response): Promise<FileResponse>;
        /**
         * Download thumbnail
         * @contentId The Content id
         * @size Thumbnail size. Either small, medium or large
         * @width (optional) Optional width in pixels to resize image
         * @height (optional) Optional height in pixels to resize image
         * @return HttpResponseMessage
         */
        downloadThumbnail(contentId: string, size: ThumbnailSize, width?: number | null | undefined, height?: number | null | undefined): Promise<FileResponse>;
        protected processDownloadThumbnail(response: Response): Promise<FileResponse>;
        /**
         * Create - single
         * @contentCreateRequest The content create request.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @allowMissingDependencies (optional) Allow creating list items that refer to list items or contents that don't exist in the system.
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         */
        create(contentCreateRequest: ContentCreateRequest | null, resolve: boolean, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ContentDetail>;
        protected processCreate(response: Response): Promise<ContentDetail>;
        /**
         * Deactivate - single
         * @contentId the id of the content to deactivate
         * @timeout Maximum time to wait for the business process completed state.
         */
        deactivate(contentId: string, timeout: string | null): Promise<ContentDetail>;
        protected processDeactivate(response: Response): Promise<ContentDetail>;
        /**
         * Deactivate - many
         * @deactivateRequest The deactivate request
         * @return BusinessProcess
         */
        deactivateMany(deactivateRequest: ContentDeactivateRequest | null): Promise<BusinessProcess>;
        protected processDeactivateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Reactivate - single
         * @contentId The content id.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         * @allowMissingDependencies (optional) Allow reactivating contents that refer to list items or contents that don't exist in the system.
         * @return ContentDetail
         */
        reactivate(contentId: string, resolve: boolean, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined, allowMissingDependencies?: boolean | undefined): Promise<ContentDetail>;
        protected processReactivate(response: Response): Promise<ContentDetail>;
        /**
         * Reactivate - many
         * @reactivateRequest The content reactivate request.
         * @return BusinessProcess
         */
        reactivateMany(reactivateRequest: ContentReactivateRequest | null): Promise<BusinessProcess>;
        protected processReactivateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Update file - single
         * @contentId The id of the content to replace
         * @updateRequest Update request
         */
        updateFile(contentId: string, updateRequest: ContentFileUpdateRequest | null): Promise<BusinessProcess>;
        protected processUpdateFile(response: Response): Promise<BusinessProcess>;
        /**
         * Update metadata - single
         * @contentId The content id.
         * @updateRequest The metadata update request.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @allowMissingDependencies (optional) Allow storing references to missing list items
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         * @return ContentDetail
         */
        updateMetadata(contentId: string, updateRequest: ContentMetadataUpdateRequest | null, resolve: boolean, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ContentDetail>;
        protected processUpdateMetadata(response: Response): Promise<ContentDetail>;
        /**
         * Update permissions - single
         * @contentId The content id.
         * @updateRequest The content permission update request.
         * @resolve Resolves the data of referenced list items into the contents's content.
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         * @return ContentDetail
         */
        updatePermissions(contentId: string, updateRequest: ContentPermissionsUpdateRequest | null, resolve: boolean, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ContentDetail>;
        protected processUpdatePermissions(response: Response): Promise<ContentDetail>;
        /**
         * Update metadata - many
         * @updateRequest The metadata update requests.
         * @return BusinessProcess
         */
        updateMetadataMany(updateRequest: ContentMetadataUpdateManyRequest | null): Promise<BusinessProcess>;
        protected processUpdateMetadataMany(response: Response): Promise<BusinessProcess>;
        /**
         * Update permissions - many
         * @updateRequest The permissions update request.
         * @return BusinessProcess
         */
        updatePermissionsMany(updateRequest: ContentPermissionsUpdateRequest[] | null): Promise<BusinessProcess>;
        protected processUpdatePermissionsMany(response: Response): Promise<BusinessProcess>;
        /**
         * Transfer ownership - single
         * @contentId The content id.
         * @updateRequest The content ownership transfer request update request.
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @return ContentDetail
         */
        transferOwnership(contentId: string, updateRequest: ContentOwnershipTransferRequest | null, timeout?: string | null | undefined): Promise<ContentDetail>;
        protected processTransferOwnership(response: Response): Promise<ContentDetail>;
        /**
         * Transfer ownership - many
         * @contentsOwnershipTransferRequest The content ownership transfer request.
         * @return BusinessProcess
         */
        transferOwnershipMany(contentsOwnershipTransferRequest: ContentsOwnershipTransferRequest | null): Promise<BusinessProcess>;
        protected processTransferOwnershipMany(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by ids
         * @updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByIds(updateRequest: ContentFieldsUpdateRequest | null): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByIds(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by filter
         * @updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByFilter(updateRequest: ContentFieldsFilterUpdateRequest | null): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByFilter(response: Response): Promise<BusinessProcess>;
    }
    export class BusinessProcessClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search
         * @businessProcessSearchRequest The business process request
         * @return BusinessProcessSearchResult
         */
        search(businessProcessSearchRequest: BusinessProcessSearchRequest | null): Promise<BusinessProcessSearchResult>;
        protected processSearch(response: Response): Promise<BusinessProcessSearchResult>;
        /**
         * Wait
         * @processId The process id
         * @states (optional) The states to wait for
         * @lifeCycleIds (optional) Business process lifeCycle to wait for
         * @timeout (optional) The timeout to wait for completion.
         * @return BusinessProcessWaitResult
         */
        wait(processId: string, states?: string[] | null | undefined, lifeCycleIds?: BusinessProcessLifeCycle[] | null | undefined, timeout?: string | null | undefined): Promise<BusinessProcessWaitResult>;
        protected processWait(response: Response): Promise<BusinessProcessWaitResult>;
        /**
         * Wait for completion
         * @processId The process id
         * @timeout (optional) The timeout to wait for completion.
         * @return BusinessProcessWaitResult
         */
        waitForCompletion(processId: string, timeout?: string | null | undefined): Promise<BusinessProcessWaitResult>;
        protected processWaitForCompletion(response: Response): Promise<BusinessProcessWaitResult>;
        /**
         * Get details
         * @processId The process id
         * @return BusinessProcessDetails
         */
        getDetails(processId: string): Promise<BusinessProcessDetails>;
        protected processGetDetails(response: Response): Promise<BusinessProcessDetails>;
    }
    export class DocumentHistoryClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search
         * @documentHistorySearchRequest The document history search request
         * @return DocumentHistorySearchResult
         */
        search(documentHistorySearchRequest: DocumentHistorySearchRequest | null): Promise<DocumentHistorySearchResult>;
        protected processSearch(response: Response): Promise<DocumentHistorySearchResult>;
        /**
         * Get latest
         * @id The id of the document (e.g. ContentId)
         * @return DocumentHistory
         */
        get(id: string): Promise<DocumentHistory>;
        protected processGet(response: Response): Promise<DocumentHistory>;
        /**
         * Get latest by version
         * @id The id of the document (e.g. ContentId)
         * @version The version
         * @return DocumentHistory
         */
        getVersion(id: string, version: string): Promise<DocumentHistory>;
        protected processGetVersion(response: Response): Promise<DocumentHistory>;
        /**
         * Get latest difference
         * @id The id of the document (e.g. ContentId)
         * @oldVersion The old version
         * @return DocumentHistoryDifference
         */
        getDifferenceLatest(id: string, oldVersion: number): Promise<DocumentHistoryDifference>;
        protected processGetDifferenceLatest(response: Response): Promise<DocumentHistoryDifference>;
        /**
         * Get difference
         * @id The id of the document (e.g. ContentId)
         * @oldVersion The old version
         * @newVersion The new version
         * @return DocumentHistoryDifference
         */
        getDifference(id: string, oldVersion: number, newVersion: number): Promise<DocumentHistoryDifference>;
        protected processGetDifference(response: Response): Promise<DocumentHistoryDifference>;
    }
    export class JsonSchemaClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get Json Schema
         * @schemaId Schema Id
         * @return JsonSchemaViewItem
         */
        get(schemaId: string): Promise<any>;
        protected processGet(response: Response): Promise<any>;
    }
    export class ListItemClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get - single
         * @listItemId The list item id.
         * @resolve Resolves the data of referenced list items into the list item's content.
         * @patterns (optional) Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         */
        get(listItemId: string, resolve: boolean, patterns?: DisplayPatternType[] | null | undefined): Promise<ListItemDetail>;
        protected processGet(response: Response): Promise<ListItemDetail>;
        /**
         * Update - single
         * @listItemId The list item id.
         * @updateRequest The list item update request.
         * @resolve Resolves the data of referenced list items into the list item's content.
         * @allowMissingDependencies (optional) Allow creating list items that refer to list items or contents that don't exist in the system.
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ListItemDetail
         */
        update(listItemId: string, updateRequest: ListItemUpdateRequest | null, resolve: boolean, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ListItemDetail>;
        protected processUpdate(response: Response): Promise<ListItemDetail>;
        /**
         * Search
         * @listItemSearchRequest The list item search request.
         * @return List item result set.
         */
        search(listItemSearchRequest: ListItemSearchRequest | null): Promise<ListItemSearchResult>;
        protected processSearch(response: Response): Promise<ListItemSearchResult>;
        /**
         * Aggregate
         * @listItemAggregationRequest The list item aggregation request.
         * @return ObjectAggregationResult
         */
        aggregate(listItemAggregationRequest: ListItemAggregationRequest | null): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Create - single
         * @listItemCreateRequest List item create request.
         * @resolve Resolves the data of referenced list items into the list item's content.
         * @allowMissingDependencies (optional) Allow creating list items that refer to list items or contents that don't exist in the system.
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ListItemDetail
         */
        create(listItemCreateRequest: ListItemCreateRequest | null, resolve: boolean, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ListItemDetail>;
        protected processCreate(response: Response): Promise<ListItemDetail>;
        /**
         * Create - many
         * @listItemCreateManyRequest List item create many request.
         * @return BusinessProcess
         */
        createMany(listItemCreateManyRequest: ListItemCreateManyRequest | null): Promise<BusinessProcess>;
        protected processCreateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Update - many
         * @listItemUpdateManyRequest List item update many request.
         * @return BusinessProcess
         */
        updateMany(listItemUpdateManyRequest: ListItemUpdateManyRequest | null): Promise<BusinessProcess>;
        protected processUpdateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Deactivate - single
         * @listItemId the id of the list item to deactivate
         * @timeout Maximum time to wait for the business process completed state.
         * @forceReferenceRemoval (optional) A value indicating whether references to the listitem should be removed.
         */
        deactivate(listItemId: string, timeout: string | null, forceReferenceRemoval?: boolean | null | undefined): Promise<ListItemDetail>;
        protected processDeactivate(response: Response): Promise<ListItemDetail>;
        /**
         * Deactivate - many
         * @deactivateRequest The list items deactivate request
         * @return BusinessProcess
         */
        deactivateMany(deactivateRequest: ListItemDeactivateRequest | null): Promise<BusinessProcess>;
        protected processDeactivateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Reactivate - single
         * @listItemId The list item id.
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         * @allowMissingDependencies (optional) Allow reactivating list items that refer to list items or contents that don't exist in the system.
         * @return ListItemDetail
         */
        reactivate(listItemId: string, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined, allowMissingDependencies?: boolean | undefined): Promise<ListItemDetail>;
        protected processReactivate(response: Response): Promise<ListItemDetail>;
        /**
         * Reactivate - many
         * @reactivateRequest The list items reactivate request.
         * @return BusinessProcess
         */
        reactivateMany(reactivateRequest: ListItemReactivateRequest | null): Promise<BusinessProcess>;
        protected processReactivateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by ids
         * @updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByIds(updateRequest: ListItemFieldsUpdateRequest | null): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByIds(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by filter
         * @updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByFilter(updateRequest: ListItemFieldsFilterUpdateRequest | null): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByFilter(response: Response): Promise<BusinessProcess>;
        /**
         * Gets the references to a list item.
         * @listItemId The ID of the list item.
         * @return MetadataReferences
         */
        getReferencesToListItem(listItemId: string): Promise<ListItemReferences>;
        protected processGetReferencesToListItem(response: Response): Promise<ListItemReferences>;
        /**
         * Gets the references to the specified list items.
         * @ids The IDs of the list items.
         * @return A MetadataReferences per list item id.
         */
        getReferencesToListItems(ids: string[] | null): Promise<ListItemReferences[]>;
        protected processGetReferencesToListItems(response: Response): Promise<ListItemReferences[]>;
    }
    export class LiveStreamClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search LiveStream
         * @liveStreamSearchRequest The livestream search request
         * @return ObjectSearchResult
         */
        search(liveStreamSearchRequest: LiveStreamSearchRequest | null): Promise<ObjectSearchResult>;
        protected processSearch(response: Response): Promise<ObjectSearchResult>;
    }
    export class SchemaClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get - single
         * @schemaId The schema id.
         * @return SchemaDetail
         */
        get(schemaId: string): Promise<SchemaDetail>;
        protected processGet(response: Response): Promise<SchemaDetail>;
        /**
         * Update - single
         * @schemaId The schema id.
         * @schema The schema update request.
         * @return BusinessProcess
         */
        update(schemaId: string, schema: SchemaUpdateRequest | null): Promise<BusinessProcess>;
        protected processUpdate(response: Response): Promise<BusinessProcess>;
        /**
         * Delete - single
         * @schemaId The schema id.
         * @return BusinessProcess
         */
        delete(schemaId: string): Promise<BusinessProcess>;
        protected processDelete(response: Response): Promise<BusinessProcess>;
        /**
         * Get - many
         * @ids (optional) Comma separated list of schema ids
         * @return SchemaDetail
         */
        getMany(ids?: string[] | null | undefined): Promise<SchemaDetail[]>;
        protected processGetMany(response: Response): Promise<SchemaDetail[]>;
        /**
         * Create - single
         * @schema The schema create request.
         * @return BusinessProcess
         */
        create(schema: SchemaCreateRequest | null): Promise<BusinessProcess>;
        protected processCreate(response: Response): Promise<BusinessProcess>;
        /**
         * Search
         * @schemaSearchRequest The schema search request.
         * @return Schema result set.
         */
        search(schemaSearchRequest: SchemaSearchRequest | null): Promise<SchemaSearchResult>;
        protected processSearch(response: Response): Promise<SchemaSearchResult>;
        /**
         * Get index fields
         * @request The get request.
         * @return Indexed fields
         */
        getIndexFields(request: GetIndexFieldsRequest | null): Promise<IndexField[]>;
        protected processGetIndexFields(response: Response): Promise<IndexField[]>;
        /**
         * Exists
         * @schemaId The schema id.
         * @fieldId (optional) The optional field id.
         * @return ExistsResponse
         */
        exists(schemaId: string, fieldId?: string | null | undefined): Promise<ExistsResponse>;
        protected processExists(response: Response): Promise<ExistsResponse>;
    }
    export class PermissionClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search Content Permissions
         * @request The permission search request.
         * @return PermissionSetSearchResult
         */
        searchContentPermissionSets(request: PermissionSetSearchRequest | null): Promise<PermissionSetSearchResult>;
        protected processSearchContentPermissionSets(response: Response): Promise<PermissionSetSearchResult>;
        /**
         * Get Content Permission - single
         * @permissionSetId The content permission set id.
         * @return ContentPermissionSetDetail
         */
        getContentPermissionSet(permissionSetId: string): Promise<ContentPermissionSetDetail>;
        protected processGetContentPermissionSet(response: Response): Promise<ContentPermissionSetDetail>;
        /**
         * Search Schema PermissionSets
         * @request The permission search request.
         * @return PermissionSetSearchResult
         */
        searchSchemaPermissionSets(request: PermissionSetSearchRequest | null): Promise<PermissionSetSearchResult>;
        protected processSearchSchemaPermissionSets(response: Response): Promise<PermissionSetSearchResult>;
        /**
         * Get Schema PermissionSets - single
         * @permissionSetId The schema permission set id.
         * @return SchemaPermissionSetDetail
         */
        getSchemaPermissionSet(permissionSetId: string): Promise<SchemaPermissionSetDetail>;
        protected processGetSchemaPermissionSet(response: Response): Promise<SchemaPermissionSetDetail>;
        /**
         * Get User rights
         * @return list of user permissions
         */
        getUserRights(): Promise<UserRight[]>;
        protected processGetUserRights(response: Response): Promise<UserRight[]>;
        /**
         * Has UserRight
         * @userRight The UserRight to validate
         * @return Boolean - user has permission
         */
        hasUserRight(userRight: UserRight): Promise<boolean>;
        protected processHasUserRight(response: Response): Promise<boolean>;
    }
    export class PublicAccessClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get Version
         * @return VersionInfo
         */
        getVersion(): Promise<VersionInfo>;
        protected processGetVersion(response: Response): Promise<VersionInfo>;
        /**
         * Get Share
         * @token The token
         * @return ShareBaseDetail
         */
        getShare(token: string): Promise<ShareDetail>;
        protected processGetShare(response: Response): Promise<ShareDetail>;
    }
    export class ShareClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get - single
         * @id Share Id (not token, use PublicAccess to get share by token)
         * @return Polymorph share
         */
        get(id: string): Promise<ShareDetail>;
        protected processGet(response: Response): Promise<ShareDetail>;
        /**
         * Update - single
         * @id The share id.
         * @updateRequest The share update request.
         * @return Share
         */
        update(id: string, updateRequest: ShareBaseUpdateRequest | null): Promise<ShareDetail>;
        protected processUpdate(response: Response): Promise<ShareDetail>;
        /**
         * Search
         * @request Search request
         * @return Share search result
         */
        search(request: ShareSearchRequest | null): Promise<ShareSearchResult>;
        protected processSearch(response: Response): Promise<ShareSearchResult>;
        /**
         * Aggregate
         * @request Aggregation request
         * @return AggregationResult
         */
        aggregate(request: ShareAggregationRequest | null): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Create - single
         * @request Polymorph create contract. Use either ShareBasicCreateRequest or ShareEmbedCreateRequest
         * @return Create result
         */
        create(request: ShareBaseCreateRequest | null): Promise<CreateShareResult>;
        protected processCreate(response: Response): Promise<CreateShareResult>;
        /**
         * Delete - many
         * @ids A list of shareIds to delete.
         * @return BusinessProcess
         */
        deleteMany(ids: string[] | null): Promise<BulkResponse>;
        protected processDeleteMany(response: Response): Promise<BulkResponse>;
    }
    export class ServiceProviderClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get configuration
         */
        getConfiguration(serviceProviderId: string): Promise<CustomerServiceProviderConfiguration>;
        protected processGetConfiguration(response: Response): Promise<CustomerServiceProviderConfiguration>;
        /**
         * Update configuration
         */
        updateConfiguration(serviceProviderId: string, configuration: ServiceProviderConfigurationUpdateRequest | null): Promise<CustomerServiceProviderConfiguration>;
        protected processUpdateConfiguration(response: Response): Promise<CustomerServiceProviderConfiguration>;
    }
    export class TransferClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get Transferdetail
         * @transferId The tranfer id
         * @return TransferDetail
         */
        get(transferId: string): Promise<TransferDetail>;
        protected processGet(response: Response): Promise<TransferDetail>;
        /**
         * Delete Transfer
         * @transferId The tranfer id
         * @return Transfer
         */
        delete(transferId: string): Promise<void>;
        protected processDelete(response: Response): Promise<void>;
        /**
         * Search
         * @request The transfer search request
         * @return TransferSearchResult
         */
        search(request: TransferSearchRequest | null): Promise<TransferSearchResult>;
        protected processSearch(response: Response): Promise<TransferSearchResult>;
        /**
         * Cancels a transfer.
         */
        cancelTransfer(transferId: string): Promise<void>;
        protected processCancelTransfer(response: Response): Promise<void>;
        /**
         * Create Transfer
         * @request The create transfer request
         * @return Transfer
         */
        create(request: CreateTransferRequest | null): Promise<Transfer>;
        protected processCreate(response: Response): Promise<Transfer>;
        /**
         * Get File
         * @fileTransferId The filetransfer id
         * @return FileTransferDetail
         */
        getFile(fileTransferId: string): Promise<FileTransferDetail>;
        protected processGetFile(response: Response): Promise<FileTransferDetail>;
        /**
         * Search for files
         * @request The file transfer search request
         * @return FileTransferSearchResult
         */
        searchFiles(request: FileTransferSearchRequest | null): Promise<FileTransferSearchResult>;
        protected processSearchFiles(response: Response): Promise<FileTransferSearchResult>;
        /**
         * Get Blacklist
         * @return Blacklist
         */
        getBlacklist(): Promise<Blacklist>;
        protected processGetBlacklist(response: Response): Promise<Blacklist>;
        /**
         * Delete Files
         * @request The filetransfer delete request
         */
        deleteFiles(request: FileTransferDeleteRequest | null): Promise<void>;
        protected processDeleteFiles(response: Response): Promise<void>;
        /**
         * Import transfer
         * @transferId The tranfer id
         * @request The filetransfer to content create request
         * @return Transfer
         */
        importTransfer(transferId: string, request: FileTransfer2ContentCreateRequest | null): Promise<Transfer>;
        protected processImportTransfer(response: Response): Promise<Transfer>;
        /**
         * Create a partial import
         * @transferId The transfer id
         * @request The filetransfer partial to content create request
         */
        partialImport(transferId: string, request: FileTransferPartial2ContentCreateRequest | null): Promise<Transfer>;
        protected processPartialImport(response: Response): Promise<Transfer>;
        /**
         * Upload file
         * @formFile (optional) Gets or sets the form file.
         * @relativePath (optional) Relative path of the uploading file
         * @chunkNumber (optional) Current chunk number. starts with 1
         * @currentChunkSize (optional) Size in bytes of the current chunk
         * @totalSize (optional) Total size in bytes of the uploading file
         * @totalChunks (optional) Total chunks of the uploading file
         */
        uploadFile(transferId: string, identifier: string, formFile?: FileParameter | null | undefined, relativePath?: string | null | undefined, chunkNumber?: number | undefined, currentChunkSize?: number | undefined, totalSize?: number | undefined, totalChunks?: number | undefined): Promise<void>;
        protected processUploadFile(response: Response): Promise<void>;
    }
    export class UserClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get by id
         * @userId The user id
         * @return UserDetail
         */
        get(userId: string): Promise<UserDetail>;
        protected processGet(response: Response): Promise<UserDetail>;
        /**
         * Search for users
         * @searchRequest The user search request
         * @return UserSearchResult
         */
        search(searchRequest: UserSearchRequest | null): Promise<UserSearchResult>;
        protected processSearch(response: Response): Promise<UserSearchResult>;
        /**
         * Get by owner token
         * @tokenId The token id
         * @return UserDetail
         */
        getByOwnerToken(tokenId: string): Promise<UserDetail>;
        protected processGetByOwnerToken(response: Response): Promise<UserDetail>;
        /**
         * Get list of channels
         */
        getChannels(): Promise<Channel[]>;
        protected processGetChannels(response: Response): Promise<Channel[]>;
    }
    export class OutputClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get outputs by contentIds
         * @contentsByIdsRequest Contains the list of contentIds for which the outputs are requested
         * @return The Result containing a list of OutputDetail's
         */
        getByContentIds(contentsByIdsRequest: ContentsByIdsRequest | null): Promise<OutputDetail[]>;
        protected processGetByContentIds(response: Response): Promise<OutputDetail[]>;
        /**
         * Get - single
         * @outputId The output id.
         * @return OutputDetail
         */
        get(outputId: string): Promise<OutputDetail>;
        protected processGet(response: Response): Promise<OutputDetail>;
    }
    export class ProfileClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get
         * @return UserProfile
         */
        get(): Promise<UserProfile>;
        protected processGet(response: Response): Promise<UserProfile>;
        /**
         * Update
         * @return UserProfile
         */
        update(profile: UserProfile | null): Promise<UserProfile>;
        protected processUpdate(response: Response): Promise<UserProfile>;
    }
    export class SchemaTransferClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Import schemas
         * @schemaImportRequest The schema import request.
         * @return Transfer
         */
        import(schemaImportRequest: SchemaImportRequest | null): Promise<Transfer>;
        protected processImport(response: Response): Promise<Transfer>;
    }
    export class InfoClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get info
         * @return CustomerInfo
         */
        get(): Promise<CustomerInfo>;
        protected processGet(response: Response): Promise<CustomerInfo>;
    }
    export enum DisplayPatternType {
        Thumbnail,
        List,
        Detail,
        Name,
    }
    export interface Exception {
        message?: string | undefined;
        innerException?: Exception | undefined;
        stackTrace?: string | undefined;
        source?: string | undefined;
    }
    export interface PictureparkException extends Exception {
        traceLevel: TraceLevel;
        traceId?: string | undefined;
        traceJobId?: string | undefined;
        httpStatusCode: number;
    }
    export interface PictureparkBusinessException extends PictureparkException {
        customerId?: string | undefined;
        customerAlias?: string | undefined;
        userId?: string | undefined;
    }
    export interface PictureparkNotFoundException extends PictureparkBusinessException {
        reference?: string | undefined;
    }
    export interface ContentNotFoundException extends PictureparkNotFoundException {
        contentId?: string | undefined;
    }
    export enum TraceLevel {
        Critical,
        Error,
        Warning,
        Information,
        Verbose,
    }
    export interface PictureparkValidationException extends PictureparkBusinessException {
    }
    export interface PictureparkConflictException extends PictureparkBusinessException {
        reference?: string | undefined;
    }
    export interface UserEmailAlreadyExistsException extends PictureparkValidationException {
        email?: string | undefined;
    }
    export interface UserRoleAssignedException extends PictureparkValidationException {
        userRoleId?: string | undefined;
    }
    export interface UserNotFoundException extends PictureparkBusinessException {
        missingUserId?: string | undefined;
    }
    export interface RenderingException extends PictureparkBusinessException {
    }
    export interface ServiceProviderDeleteException extends PictureparkException {
        serviceProviderId?: string | undefined;
        detailedErrorMessage?: string | undefined;
    }
    export interface ServiceProviderCreateException extends PictureparkException {
        userId?: string | undefined;
        externalId?: string | undefined;
        virtualHost?: string | undefined;
        detailErrorMessage?: string | undefined;
    }
    export interface ServiceProviderNotFoundException extends PictureparkException {
        missingServiceProviderId?: string | undefined;
    }
    export interface DocumentVersionNotFoundException extends PictureparkNotFoundException {
        documentId?: string | undefined;
        documentVersion?: string | undefined;
    }
    export interface DefaultChannelDeleteException extends PictureparkValidationException {
    }
    export interface ElasticVersionUpdateException extends PictureparkException {
        expectedVersion?: string | undefined;
        actualVersion?: string | undefined;
    }
    export interface InvalidVersionException extends PictureparkException {
        component?: string | undefined;
        version?: string | undefined;
    }
    export interface EnvironmentNotDeactivatedException extends PictureparkException {
    }
    export interface EnvironmentNotFoundException extends PictureparkException {
    }
    export interface EnvironmentDeactivationException extends PictureparkException {
        deactivationMessage?: string | undefined;
    }
    export interface ShareNotFoundException extends PictureparkNotFoundException {
        shareId?: string | undefined;
    }
    export interface ShareByTokenNotFoundException extends PictureparkNotFoundException {
        token?: string | undefined;
    }
    export interface TokenGenerationException extends PictureparkBusinessException {
        retries: number;
    }
    export interface OutputIdNotFoundException extends PictureparkNotFoundException {
        outputId?: string | undefined;
    }
    export interface OutputNotFoundException extends PictureparkBusinessException {
        contentId?: string | undefined;
        outputFormatId?: string | undefined;
    }
    export interface DriveCacheExpiredException extends PictureparkBusinessException {
    }
    export interface DriveFileNotFoundException extends PictureparkNotFoundException {
        fileId?: string | undefined;
    }
    export interface DriveRequestException extends PictureparkBusinessException {
    }
    export interface TokenValidationException extends PictureparkValidationException {
    }
    export interface LeaseNotAcquiredException extends PictureparkBusinessException {
        resourceId?: string | undefined;
    }
    export interface OperationInProgressException extends PictureparkBusinessException {
        leaseResourceType: LeaseResourceType;
    }
    export enum LeaseResourceType {
        SchemaEditing,
    }
    export interface RetryException extends PictureparkBusinessException {
        retries: number;
        innerExceptionDetail?: string | undefined;
    }
    export interface OwnerTokenNotFoundException extends PictureparkNotFoundException {
        ownerTokenUserId?: string | undefined;
    }
    export interface InvalidStateException extends PictureparkValidationException {
        resourceId?: string | undefined;
        state?: string | undefined;
    }
    export interface PictureparkArgumentNullException extends PictureparkValidationException {
        argumentName?: string | undefined;
    }
    export interface ObjectTypeMismatchException extends PictureparkBusinessException {
        type?: string | undefined;
    }
    export interface InvalidStateTransitionException extends InvalidStateException {
        transition?: string | undefined;
    }
    export interface FailedToLockException extends PictureparkBusinessException {
        resourceId?: string | undefined;
    }
    export interface PictureparkOperationCanceledException extends PictureparkBusinessException {
    }
    export interface PictureparkApplicationException extends PictureparkBusinessException {
    }
    export interface MissingCustomerDefaultLanguageException extends PictureparkValidationException {
        customerDefaultLanguage?: string | undefined;
    }
    export interface InvalidArgumentException extends PictureparkValidationException {
        argumentName?: string | undefined;
        argumentValue?: string | undefined;
    }
    export interface UnknownException extends PictureparkBusinessException {
        exceptionDetail?: string | undefined;
    }
    export interface OwnerTokenInUseException extends PictureparkValidationException {
        ownerTokenUserId?: string | undefined;
    }
    export interface CustomerViolationException extends PictureparkException {
        expectedCustomerId?: string | undefined;
        currentCustomerId?: string | undefined;
    }
    export interface CustomerAliasNotFoundException extends PictureparkException {
        customerAlias?: string | undefined;
    }
    export interface CustomerAliasInUseException extends PictureparkBusinessException {
        existingCustomerId?: string | undefined;
        alias?: string | undefined;
    }
    export interface CustomerNotDeactivatedException extends PictureparkException {
        customerId?: string | undefined;
    }
    export interface CustomerDeactivationException extends PictureparkException {
        customerId?: string | undefined;
        deactivationMessage?: string | undefined;
    }
    export interface CustomerHostNotFoundException extends PictureparkException {
        hostName?: string | undefined;
    }
    export interface CustomerNotFoundException extends PictureparkException {
        customerId?: string | undefined;
    }
    export interface CustomerNotActiveException extends PictureparkException {
        customerId?: string | undefined;
    }
    export interface ConfigurationIndexNotFoundException extends PictureparkException {
        configurationIndex?: string | undefined;
    }
    export interface DuplicateSearchIndexDocException extends PictureparkBusinessException {
        searchIndexDocId?: string | undefined;
    }
    export interface SearchIndexDocNotFoundException extends PictureparkBusinessException {
        searchIndexDocId?: string | undefined;
    }
    export interface IndexDocumentNotFoundException extends PictureparkBusinessException {
        indexId?: string | undefined;
    }
    export interface DuplicateAliasException extends PictureparkException {
        indexAlias?: string | undefined;
    }
    export interface SearchIndexNotFoundException extends PictureparkBusinessException {
        searchIndexId?: string | undefined;
    }
    export interface DefaultSearchIndexDeleteException extends PictureparkBusinessException {
    }
    export interface SearchIndexInUseException extends PictureparkBusinessException {
        searchIndex?: string | undefined;
    }
    export interface IndexException extends PictureparkBusinessException {
        indexName?: string | undefined;
        debugInformation?: string | undefined;
    }
    export interface IndexMappingException extends PictureparkBusinessException {
        indexName?: string | undefined;
        debugInformation?: string | undefined;
    }
    export interface DuplicatedSearchBehaviourException extends PictureparkValidationException {
        duplicatedSearchBehaviours?: string | undefined;
    }
    export interface SearchStringLeadingWildcardException extends PictureparkValidationException {
    }
    export interface DuplicateAggregatorException extends PictureparkValidationException {
        aggregatorName?: string | undefined;
    }
    export interface InvalidDateTimeFormatException extends PictureparkValidationException {
        value?: string | undefined;
        expectedFormat?: string | undefined;
    }
    export interface InvalidSortFieldException extends PictureparkValidationException {
        fieldName?: string | undefined;
    }
    export interface DocumentVersionConflictException extends PictureparkConflictException {
        documentId?: string | undefined;
        documentType?: string | undefined;
        documentVersion: number;
    }
    export interface RedisDatabaseExceededException extends PictureparkException {
        customerId?: string | undefined;
        customerCount: number;
        maxCount: number;
        startIndex: number;
        redisDatabaseCount: number;
    }
    export interface DuplicateDocumentException extends PictureparkValidationException {
        documentId?: string | undefined;
        documentType?: string | undefined;
    }
    export interface ObjectStoreResponseException extends PictureparkBusinessException {
        rowErrorMessages?: string | undefined;
        message?: string | undefined;
    }
    export interface ObjectStoreException extends PictureparkBusinessException {
        rowErrorMessages?: string | undefined;
        errorMessage?: string | undefined;
    }
    export interface QueryException extends PictureparkBusinessException {
        debugInformation?: string | undefined;
        serverError?: StorageServerError | undefined;
    }
    export interface StorageServerError {
        error?: StorageError | undefined;
        status: number;
    }
    export interface StorageError {
        index?: string | undefined;
        reason?: string | undefined;
        resourceId?: string | undefined;
        resourceType?: string | undefined;
        type?: string | undefined;
        rootCause?: StorageRootCause[] | undefined;
        causedBy?: StorageCausedBy | undefined;
    }
    export interface StorageRootCause {
        index?: string | undefined;
        reason?: string | undefined;
        resourceId?: string | undefined;
        resourceType?: string | undefined;
        type?: string | undefined;
    }
    export interface StorageCausedBy {
        reason?: string | undefined;
        type?: string | undefined;
        innerCausedBy?: StorageCausedBy | undefined;
    }
    export interface PermissionOwnershipTransferException extends PictureparkValidationException {
        transferUserId?: string | undefined;
        missingUserRight: UserRight;
    }
    export enum UserRight {
        ManageContent,
        ManageSharings,
        ManageDrives,
        ManageTransfer,
        ManageChannels,
        ManageSchemas,
        ManageUsers,
        ManageUserRoles,
        ManagePermissions,
        ManageSearchIndexes,
        ManageRecipients,
        ManageCollections,
        ManageListItems,
        ManageServiceProviders,
        ManageEmbeds,
        ManageTemplates,
    }
    export interface PermissionSetNotFoundException extends PictureparkNotFoundException {
        permissionSetId?: string | undefined;
    }
    export interface DuplicateRightException extends PictureparkValidationException {
        permissionSetId?: string | undefined;
    }
    export interface PermissionValidationException extends PictureparkValidationException {
        permission?: string | undefined;
        operation?: string | undefined;
    }
    export interface UnsupportedListItemChangeCommandException extends PictureparkValidationException {
        commandType?: string | undefined;
    }
    export interface ListItemLayerException extends PictureparkValidationException {
        listItemId?: string | undefined;
    }
    export interface ListItemNotFoundException extends PictureparkNotFoundException {
        listItemId?: string | undefined;
    }
    export interface ListItemCyclicDependencyException extends PictureparkBusinessException {
        listItemIds?: string[] | undefined;
    }
    export interface DeleteListItemsWithReferencesException extends PictureparkValidationException {
        referencesList?: string[] | undefined;
        references?: string | undefined;
    }
    export interface ListItemUpdateManyException extends PictureparkBusinessException {
        failedItemsCount: number;
        totalItemsCount: number;
    }
    export interface TransferInfoNotFoundException extends PictureparkNotFoundException {
        transferInfoId?: string | undefined;
    }
    export interface FileTransferNotFoundException extends PictureparkNotFoundException {
        fileTransferId?: string | undefined;
    }
    export interface InvalidTransferTypeException extends PictureparkBusinessException {
        transferType: TransferType;
    }
    export enum TransferType {
        FileUpload,
        FileUploadAutoImport,
        DriveImport,
        DriveExport,
        WebDownload,
        SchemaImport,
    }
    export interface TransferNotFoundException extends PictureparkNotFoundException {
        transferId?: string | undefined;
    }
    export interface WrongChunkSizeException extends PictureparkValidationException {
        actual: number;
        expected: number;
    }
    export interface MissingDependenciesException extends PictureparkValidationException {
        itemIds?: string | undefined;
    }
    export interface RelationSelfReferencingException extends PictureparkValidationException {
        itemId?: string | undefined;
        itemType?: string | undefined;
    }
    export interface InvalidChangeCommandFieldTypeInvalidException extends PictureparkValidationException {
        commandType?: string | undefined;
        fieldId?: string | undefined;
        schemaId?: string | undefined;
        fieldActualType?: string | undefined;
        fieldExpectedType?: string | undefined;
    }
    export interface InvalidChangeCommandFieldNotFoundException extends PictureparkValidationException {
        commandTypeName?: string | undefined;
        fieldId?: string | undefined;
        schemaId?: string | undefined;
    }
    export interface InvalidChangeCommandSchemaChangeInvalidException extends PictureparkValidationException {
        commandTypeName?: string | undefined;
        schemaId?: string | undefined;
    }
    export interface InvalidMetadataException extends PictureparkValidationException {
        metadataErrors?: MetadataError[] | undefined;
    }
    export interface MetadataError {
        errorType?: string | undefined;
        lineNumber: number;
        linePosition: number;
        path?: string | undefined;
        message?: string | undefined;
        schemaId?: string | undefined;
    }
    export interface RelationNotFoundException extends PictureparkBusinessException {
        relationId?: string | undefined;
    }
    export interface RelationTypeNotFoundException extends PictureparkBusinessException {
        relationType?: string | undefined;
    }
    export interface RelationTypeTargetDocTypeMismatchException extends PictureparkBusinessException {
        relationType?: string | undefined;
        targetDocType?: string | undefined;
        expectedTargetDocType?: string | undefined;
    }
    export interface AggregationFilterInvalidException extends PictureparkValidationException {
        aggregationFilterNames?: string | undefined;
    }
    export interface AggregationNameInvalidException extends PictureparkValidationException {
        aggregationName?: string | undefined;
        aggregationPrefix?: string | undefined;
    }
    export interface SchemaFieldOverwriteTypeMismatchException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        fieldOverwriteType?: string | undefined;
        fieldType?: string | undefined;
    }
    export interface SchemaFieldOverwriteIdException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
    }
    export interface SchemaFieldIdDuplicatedException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
    }
    export interface SchemaFieldSchemaIndexInfoSimpleSearchNestingException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        relatedFieldId?: string | undefined;
        relatedOuterFieldId?: string | undefined;
    }
    export interface SchemaFieldSchemaIndexInfoNestingException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        relatedFieldId?: string | undefined;
        relatedOuterFieldId?: string | undefined;
    }
    export interface SchemaFieldIdUppercaseException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
    }
    export interface SchemaIdLowercaseException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaInfoNotFoundException extends PictureparkNotFoundException {
        schemaId?: string | undefined;
    }
    export interface IndexedFieldThresholdExceededException extends PictureparkValidationException {
        schemaId?: string | undefined;
        indexedFieldCount: number;
        indexedFieldThreshold: number;
    }
    export interface SortableFieldThresholdExceededException extends PictureparkValidationException {
        schemaId?: string | undefined;
        sortableFieldCount: number;
        sortableFieldThreshold: number;
    }
    export interface DuplicateSchemaInfoException extends PictureparkBusinessException {
        schemaId?: string | undefined;
    }
    export interface SchemaFieldNumberRangeException extends PictureparkValidationException {
        fieldId?: string | undefined;
        propertyName?: string | undefined;
        minValue: number;
        maxValue: number;
    }
    export interface SchemaInUseContentSchemaException extends PictureparkValidationException {
        schemaId?: string | undefined;
        contentSchemaIds?: string[] | undefined;
    }
    export interface SchemaInUseListItemException extends PictureparkValidationException {
        schemaId?: string | undefined;
        listItemCount: number;
    }
    export interface SchemaInUseContentException extends PictureparkValidationException {
        schemaId?: string | undefined;
        contentCount: number;
    }
    export interface SchemaInUseFieldException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldNamespaces?: string[] | undefined;
    }
    export interface SchemaNotFoundInSearchIndexException extends PictureparkValidationException {
        searchIndexId?: string | undefined;
        schemaId?: string | undefined;
    }
    export interface DuplicateMetadataDisplayPatternException extends PictureparkValidationException {
        schemaId?: string | undefined;
        displayPatternId?: string | undefined;
    }
    export interface DuplicateSchemaException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaImportEmptyException extends PictureparkValidationException {
    }
    export interface SchemaImportVersionMismatchException extends PictureparkValidationException {
        providedVersion?: string | undefined;
        expectedVersion?: string | undefined;
    }
    export interface SchemaCyclicDependencyException extends PictureparkValidationException {
        schemaIds?: string[] | undefined;
    }
    export interface SchemaInheritanceFieldIndexDeviationException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaInheritanceTypeDeviationException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaValidationException extends PictureparkValidationException {
        schemaId?: string | undefined;
        exceptions?: PictureparkBusinessException[] | undefined;
    }
    export interface SchemaSortFieldException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
    }
    export interface SchemaFieldIdException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
    }
    export interface SchemaFieldTypeChangeException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        oldType?: string | undefined;
        newType?: string | undefined;
    }
    export interface SchemaFieldIndexException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
    }
    export interface SchemaFieldNotSortableException extends PictureparkValidationException {
        fieldId?: string | undefined;
        schemaId?: string | undefined;
    }
    export interface SchemaNoContentException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaParentChangeException extends PictureparkValidationException {
        schemaId?: string | undefined;
        oldSchemaParentId?: string | undefined;
        newSchemaParentId?: string | undefined;
    }
    export interface SchemaMissingTypeException extends PictureparkValidationException {
        schemaId?: string | undefined;
        expectedSchemaTypes?: SchemaType[] | undefined;
    }
    export enum SchemaType {
        Content,
        Layer,
        List,
        Struct,
    }
    export interface SchemaPermissionException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaNoLayerException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaIdException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface SchemaInUseException extends PictureparkValidationException {
        schemaId?: string | undefined;
        exceptions?: PictureparkBusinessException[] | undefined;
    }
    export interface SchemaNotFoundException extends PictureparkNotFoundException {
        schemaId?: string | undefined;
    }
    export interface SystemSchemaInvalidModificationException extends PictureparkValidationException {
        schemaId?: string | undefined;
    }
    export interface ContentsNotFoundException extends PictureparkNotFoundException {
        contentIds?: string[] | undefined;
    }
    export interface DeleteContentsWithRelationsException extends PictureparkValidationException {
        relationList?: string[] | undefined;
        relations?: string | undefined;
    }
    export interface ContentMetadataUpdateManyException extends PictureparkBusinessException {
        failedItemsCount: number;
        totalItemsCount: number;
    }
    export interface ContentLayerInvalidException extends PictureparkValidationException {
        contentId?: string | undefined;
        layerIds?: string | undefined;
    }
    export interface PictureparkTimeoutException extends PictureparkBusinessException {
    }
    export interface BusinessProcessWaitTimeoutException extends PictureparkTimeoutException {
        businessProcessId?: string | undefined;
    }
    export interface BusinessProcessEngineRequestException extends PictureparkBusinessException {
        businessProcessId?: string | undefined;
        engineError?: string | undefined;
    }
    export interface BusinessProcessNotFoundException extends PictureparkNotFoundException {
        businessProcessId?: string | undefined;
    }
    export interface BusinessProcessDefinitionNotFoundException extends PictureparkNotFoundException {
        processDefinitionId?: string | undefined;
    }
    export interface BusinessProcessDefinitionCreateException extends PictureparkBusinessException {
        processDefinitionIds?: string[] | undefined;
    }
    export interface SchemaFieldImportMismatchException extends PictureparkValidationException {
        schemaId?: string | undefined;
        importingFieldIds?: string | undefined;
        existingFieldIds?: string | undefined;
    }
    export interface SchemaFieldImportRelatedSchemaMismatchException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        importingRelatedSchemaId?: string | undefined;
        existingRelatedSchemaId?: string | undefined;
    }
    export interface SchemaFieldImportTypeMismatchException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        importingFieldType?: string | undefined;
        existingFieldType?: string | undefined;
    }
    export interface SnapshotTimeoutException extends PictureparkTimeoutException {
    }
    export interface SnapshotFailedException extends PictureparkBusinessException {
    }
    export interface AddMetadataLanguageTimeoutException extends PictureparkTimeoutException {
        environmentProcessId?: string | undefined;
    }
    export interface EnvironmentProcessAlreadyRunningException extends PictureparkValidationException {
        environmentProcessType?: string | undefined;
    }
    export interface EnvironmentProcessNotFoundException extends PictureparkNotFoundException {
        environmentProcessId?: string | undefined;
    }
    export interface EnvironmentProcessWaitTimeoutException extends PictureparkTimeoutException {
        environmentProcessId?: string | undefined;
        waitedLifecycles?: string | undefined;
    }
    /** A content detail. */
    export interface ContentDetail {
        /** Audit data with information regarding document creation and modification. */
        audit?: UserAudit | undefined;
        /** The content data */
        content?: any | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        contentPermissionSetIds?: string[] | undefined;
        /** The id of the content schema */
        contentSchemaId?: string | undefined;
        /** The type of content */
        contentType: ContentType;
        /** Contains language specific display values, rendered according to the content schema's
                 display pattern configuration. */
        displayValues?: DisplayValueDictionary | undefined;
        /** The content id. */
        id?: string | undefined;
        /** An optional list of layer schemas ids */
        layerSchemaIds?: string[] | undefined;
        /** The metadata dictionary */
        metadata?: DataDictionary | undefined;
        /** A list of rendering ouputs for underlying digital file. */
        outputs?: Output[] | undefined;
        /** The id of a owner token. Defines the content owner. */
        ownerTokenId?: string | undefined;
        /** The trashed flag. */
        trashed: boolean;
    }
    export interface UserAudit {
        creationDate: Date;
        modificationDate: Date;
        createdByUser?: string | undefined;
        modifiedByUser?: string | undefined;
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
        ContentItem,
    }
    export interface DisplayValueDictionary {
        [key: string]: string | any;
    }
    /** A custom implementation of Dictionary{string, object} */
    export interface DataDictionary {
        [key: string]: any;
    }
    export interface Output {
        id?: string | undefined;
        outputFormatId?: string | undefined;
        contentId?: string | undefined;
        detail?: OutputDataBase | undefined;
    }
    export interface OutputDataBase {
        fileExtension?: string | undefined;
        fileName?: string | undefined;
        filePath?: string | undefined;
        fileSizeInBytes?: number | undefined;
        sha1Hash?: string | undefined;
    }
    export interface OutputDataImage extends OutputDataBase {
        width: number;
        height: number;
    }
    export interface OutputDataAudio extends OutputDataBase {
        durationInSeconds?: number | undefined;
    }
    export interface OutputDataVideo extends OutputDataBase {
        durationInSeconds: number;
        width: number;
        height: number;
        sprites?: Sprite[] | undefined;
    }
    export interface Sprite {
        width: number;
        height: number;
        y: number;
        x: number;
        start: string;
        end: string;
    }
    export interface OutputDataDocument extends OutputDataBase {
        pageCount: number;
    }
    export interface OutputDataDefault extends OutputDataBase {
    }
    export interface OutputDetail extends Output {
    }
    export interface ContentSearchRequest {
        /** Limits the simple search fields to the fields available in the specified channel. */
        channelId?: string | undefined;
        /** Defines the return language of translation values. Defaults to customer default language. */
        displayLanguage?: string | undefined;
        /** Limits the display values included in the search response. Defaults to all display values. */
        displayPatternIds?: string[] | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
        /** The collection id. */
        collectionId?: string | undefined;
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied in the specified order. */
        searchBehaviours?: SearchBehaviour[] | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** An optional search filter. Limits the content document result set. */
        filter?: FilterBase | undefined;
        /** Limits the content document result set to that life cycle state. Defaults to ActiveOnly. */
        lifeCycleFilter: LifeCycleFilter;
        /** Filter the returned contents that have or not have broken references */
        brokenDependenciesFilter: BrokenDependenciesFilter;
        /** Limits the content document result set to specific ContentRights the user has */
        rightsFilter?: ContentRight[] | undefined;
        /** Type of search to be performed: against metadata, extracted fulltext from documents or both. Default to Metadata. */
        searchType: ContentSearchType;
        /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
        debugMode: boolean;
    }
    export enum SearchBehaviour {
        DropInvalidCharactersOnFailure,
        WildcardOnSingleTerm,
    }
    export interface SortInfo {
        /** The elastic search index field to sort on. */
        field?: string | undefined;
        /** The sort direction (Asc/Desc). */
        direction: SortDirection;
    }
    export enum SortDirection {
        Asc,
        Desc,
    }
    /** The FilterBase is the base class for all filters. */
    export interface FilterBase {
    }
    /** The AndFilter&gt; is a compound filter and returns documents that match all of the specified filters. */
    export interface AndFilter extends FilterBase {
        /** Accepts all filters. */
        filters?: FilterBase[] | undefined;
    }
    /** The OrFilter is a compound filter and returns documents that match any of the specified filters. */
    export interface OrFilter extends FilterBase {
        /** Accepts all filters. */
        filters?: FilterBase[] | undefined;
    }
    /** The NotFilter is a compound filter and returns documents that do not match the specified filter. */
    export interface NotFilter extends FilterBase {
        /** Limits the result set. */
        filter?: FilterBase | undefined;
    }
    /** The DateRangeFilter returns documents with fields that have date values within a certain range. */
    export interface DateRangeFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
        /** The date range. Supported pattern: now(+-)(int)(YMDHm). */
        range?: DateRange | undefined;
    }
    /** The date range class used in aggregators and filters. */
    export interface DateRange {
        /** Tranlsated range names. */
        names?: TranslatedStringDictionary | undefined;
        /** The from value can be a datetime string or a pattern now(+-)(int)(YMDHm). */
        from?: string | undefined;
        /** The to value can be a datetime string or a pattern now(+-)(int)(YMDHm). */
        to?: string | undefined;
    }
    /** A custom dictionary type to distinguish language specific class properties. */
    export interface TranslatedStringDictionary {
        [key: string]: string | any;
    }
    /** The ExistsFilter returns documents that have at least one non-null value in the original field. */
    export interface ExistsFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
    }
    /** The GeoBoundingBoxFilter returns documents that are found based on a point location using a bounding box. */
    export interface GeoBoundingBoxFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
        /** The top left longitude/latitude configuration. */
        topLeft?: GeoLocation | undefined;
        /** The bottom right longitude/latitude configuration. */
        bottomRight?: GeoLocation | undefined;
    }
    export interface GeoLocation {
        lat: number;
        lon: number;
    }
    /** The GeoDistanceFilter returns documents that include only hits that exists within a specific distance from a geo point. */
    export interface GeoDistanceFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
        /** The longitude/latitude configuration for the point of origin. */
        location?: GeoLocation | undefined;
        /** The range distance in meters. */
        distance: number;
    }
    /** The NestedFilter is a joining filter and returns documents whose nested objects / documents (see nested mapping) match the specified filter. */
    export interface NestedFilter extends FilterBase {
        /** The path pointing to the nested object. */
        path?: string | undefined;
        /** Limits the result set. */
        filter?: FilterBase | undefined;
    }
    /** The NumericRangeFilter returns documents with fields that have numeric values within a certain range. */
    export interface NumericRangeFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
        /** The numeric range with from and to properties. */
        range?: NumericRange | undefined;
    }
    export interface NumericRange {
        /** Tranlsated range names. */
        names?: TranslatedStringDictionary | undefined;
        /** The from value. */
        from?: number | undefined;
        /** The to value. */
        to?: number | undefined;
    }
    /** The PrefixFilter returns documents that have fields containing terms with a specified prefix (not analyzed). */
    export interface PrefixFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
        /** The prefix term to filter on. */
        prefix?: string | undefined;
    }
    /** The TermFilter returns documents that contain the exact term specified in the inverted index. */
    export interface TermFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
        /** The term to filter on. */
        term?: string | undefined;
    }
    /** The TermsFilter returns documents that have fields that match any of the provided terms (not analyzed). */
    export interface TermsFilter extends FilterBase {
        /** The elastic search index field to execute the filter on. */
        field?: string | undefined;
        /** A list of OR combined terms. */
        terms?: string[] | undefined;
    }
    /** An AggregationFilter is provided with each aggregated value. When selecting the aggregated value the aggregation filter is added to the search query and returns doucments meeting the aggregation condition. */
    export interface AggregationFilter extends FilterBase {
        /** The name of the aggregation this filter is connected to. */
        aggregationName?: string | undefined;
        /** The aggregation filter property. Available filters are TermFilter, DateRangeFilter, NumericRangeFilter, GeoDistanceFilter and NestedFilter. */
        filter?: FilterBase | undefined;
        temporaryAggregatorRequestId?: string | undefined;
    }
    /** The ChildFilter allows to apply filters on child documents and returns documents that match the specified filter on the child document. */
    export interface ChildFilter extends FilterBase {
        /** The elastic search index type to filter as a child. */
        childType?: string | undefined;
        /** The filter to apply on the child entity. It accepts all filters. */
        filter?: FilterBase | undefined;
    }
    /** The ParentFilter allows to apply filters on parent documents and returns documents that match the specified filter on the parent document. */
    export interface ParentFilter extends FilterBase {
        /** The elastic search index type to filter as a parent. */
        parentType?: string | undefined;
        /** The filter to apply on the child entity. It accepts all filters. */
        filter?: FilterBase | undefined;
    }
    export enum LifeCycleFilter {
        ActiveOnly,
        All,
        InactiveOnly,
        ActiveInactiveOnly,
    }
    export enum BrokenDependenciesFilter {
        All,
        NotBrokenOnly,
        BrokenOnly,
    }
    export enum ContentRight {
        View,
        AccessOriginal,
        Edit,
        Update,
        Manage,
        Trash,
    }
    export enum ContentSearchType {
        Metadata,
        FullText,
        MetadataAndFullText,
    }
    export interface BaseResultOfContent {
        totalResults: number;
        results?: Content[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfContent extends BaseResultOfContent {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface ContentSearchResult extends SearchBehaviourBaseResultOfContent {
        elapsedMilliseconds: number;
    }
    export interface Content {
        audit?: UserAudit | undefined;
        /** The id of the schema with schema type content. */
        contentSchemaId?: string | undefined;
        /** An optional id list of schemas with schema type layer. */
        layerSchemaIds?: string[] | undefined;
        /** Contains display values of the specified language, rendered according to the content schema's display pattern configuration. */
        displayValues?: {
            [key: string]: string;
        } | undefined;
        id?: string | undefined;
        /** All the ids of the broken references (tagboxes) */
        brokenReferenceIds?: string[] | undefined;
        /** All the ids of the broken indirect references (tagbox that has a property that reference a broken tagbox) */
        brokenIndirectReferenceIds?: string[] | undefined;
        /** All the target ids of the broken relations */
        brokenRelationTargetIds?: string[] | undefined;
    }
    export interface QueryDebugInformation {
        general?: string | undefined;
        auditTrail?: string | undefined;
        request?: any | undefined;
        response?: any | undefined;
    }
    export interface ContentAggregationOnChannelRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        /** An optional search filter. Limits the content document result set. */
        filter?: FilterBase | undefined;
        /** Special filters used to filter down on a specific aggregated value. */
        aggregationFilters?: AggregationFilter[] | undefined;
        /** Limits the simple search fields to the fields available in the specified channel and retrieve the existing aggregation for it. */
        channelId?: string | undefined;
        /** Defines the return language of translation values. Defaults to customer default language. */
        displayLanguage?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages in configured within the customer's language configuration. */
        searchLanguages?: string[] | undefined;
        /** The collection id. */
        collectionId?: string | undefined;
        /** Limits the content document result set to that life cycle state. Defaults to ActiveOnly. */
        lifeCycleFilter: LifeCycleFilter;
        /** Filter the content document result set to those that have or not have broken references */
        brokenDependenciesFilter: BrokenDependenciesFilter;
        /** Type of search to be performed: against metadata, extracted fulltext from documents or both. Default to Metadata. */
        searchType: ContentSearchType;
    }
    export interface ContentAggregationRequest extends ContentAggregationOnChannelRequest {
        /** Defines the aggregation resultset. */
        aggregators?: AggregatorBase[] | undefined;
    }
    /** The AggregatorBase is the base class for all aggregators. */
    export interface AggregatorBase {
        /** The slug name of the aggregation. Must be unique per aggregation request. */
        name?: string | undefined;
        /** The translated names of the aggregation. */
        names?: TranslatedStringDictionary | undefined;
        /** An optional aggregator list for nested aggregations. */
        aggregators?: AggregatorBase[] | undefined;
    }
    /** The DateRangeAggregator is a multi-bucket range aggregation dedicated for date values. Each bucket represents a range. */
    export interface DateRangeAggregator extends AggregatorBase {
        /** The elastic search index field to execute the aggregation on. */
        field?: string | undefined;
        /** A list of date ranges. Supported pattern: now(+-)(int)(YMDHm). */
        ranges?: DateRangeForAggregator[] | undefined;
    }
    /** The date range class used in aggregators. */
    export interface DateRangeForAggregator {
        /** Tranlsated range names. */
        names?: TranslatedStringDictionary | undefined;
        /** The from value can be a datetime string or a pattern now(+-)(int)(YMDHm). */
        from?: string | undefined;
        /** The to value can be a datetime string or a pattern now(+-)(int)(YMDHm). */
        to?: string | undefined;
    }
    /** The GeoDistanceAggregator is a multi-bucket range aggregation that works on geo_point fields. Each bucket represents a range. */
    export interface GeoDistanceAggregator extends AggregatorBase {
        /** The elastic search index field to execute the aggregation on. */
        field?: string | undefined;
        /** The latitude/logitude configuration for the point of origin. */
        location?: GeoLocation | undefined;
        /** A list of numeric ranges in meter. */
        ranges?: GeoDistance[] | undefined;
    }
    export interface GeoDistance {
        /** Tranlsated range names. */
        names?: TranslatedStringDictionary | undefined;
        /** The to value. */
        distance: number;
    }
    /** The NestedAggregator is a special single bucket aggregation that enables aggregating nested documents. */
    export interface NestedAggregator extends AggregatorBase {
        /** The path pointing to the nested object. */
        path?: string | undefined;
    }
    /** The NumericRangeAggregator is a multi-bucket range aggregation. Each bucket represents a range. */
    export interface NumericRangeAggregator extends AggregatorBase {
        /** The elastic search index field to execute the aggregation on. */
        field?: string | undefined;
        /** A list of numeric ranges. */
        ranges?: NumericRangeForAggregator[] | undefined;
    }
    export interface NumericRangeForAggregator {
        /** Tranlsated range names. */
        names?: TranslatedStringDictionary | undefined;
        /** The from value. */
        from?: number | undefined;
        /** The to value. */
        to?: number | undefined;
    }
    /** The TermsAggregator is a multi-bucket value aggregation where buckets are dynamically built - one per unique value. */
    export interface TermsAggregator extends AggregatorBase {
        /** The elastic search index field (not analyzed) to execute the aggregation on. */
        field?: string | undefined;
        /** The size parameter can be set to define how many term buckets should be returned out of the overall terms list. */
        size?: number | undefined;
        /** Includes values for which buckets will be created. Supports regular expression strings or arrays of exact values. */
        includes?: string[] | undefined;
        /** Excludes values for which buckets will be created. Supports regular expression strings or arrays of exact values. */
        excludes?: string[] | undefined;
        /** Search string to be used to search within possible aggregation values */
        searchString?: string | undefined;
        /** Search fields to be used to search the SearchString value into. If no search field is specified, the Field value is used */
        searchFields?: string[] | undefined;
    }
    /** The TermsRelationAggregator is derived from TermsAggregator and used for aggregations on relation item ids. */
    export interface TermsRelationAggregator extends TermsAggregator {
        /** When aggregating on relations ids the DocumentType is needed to resolve the target item translation. */
        documentType: TermsRelationAggregatorDocumentType;
    }
    export enum TermsRelationAggregatorDocumentType {
        Content,
        ListItem,
        Schema,
        User,
        ContentPermissionSet,
        Owner,
    }
    /** The TermsRelationAggregator is derived from the TermsAggregator and used for aggregations on indexed enum values. */
    export interface TermsEnumAggregator extends TermsAggregator {
        /** When aggregating on enum fields EnumType is needed to resolve the enum translation. */
        enumType?: string | undefined;
    }
    export interface ObjectAggregationResult {
        elapsedMilliseconds: number;
        aggregationResults?: AggregationResult[] | undefined;
        /** The search string used to query the data */
        searchString?: string | undefined;
        /** Flag to notify if the SearchString was modified compared to the original requested one */
        isSearchStringRewritten: boolean;
    }
    export interface AggregationResult {
        name?: string | undefined;
        sumOtherDocCount?: number | undefined;
        aggregationResultItems?: AggregationResultItem[] | undefined;
    }
    export interface AggregationResultItem {
        name?: string | undefined;
        count: number;
        filter?: AggregationFilter | undefined;
        active: boolean;
        aggregationResults?: AggregationResult[] | undefined;
    }
    export interface ContentDownloadLinkCreateRequest {
        contents?: ContentDownloadRequestItem[] | undefined;
    }
    export interface ContentDownloadRequestItem {
        contentId?: string | undefined;
        outputFormatId?: string | undefined;
    }
    export interface DownloadLink {
        downloadToken?: string | undefined;
        downloadUrl?: string | undefined;
    }
    /** Values that represent thumbnail sizes. */
    export enum ThumbnailSize {
        Small,
        Medium,
        Large,
    }
    /** A request structure for creating a content document. */
    export interface ContentCreateRequest {
        /** The id of a schema with schema type content. */
        contentSchemaId?: string | undefined;
        /** An optional id list of schemas with schema type layer. */
        layerSchemaIds?: string[] | undefined;
        /** The content data of the content document. */
        content?: any | undefined;
        /** The layer metadata of the content document. */
        metadata?: DataDictionary | undefined;
        /** An optional id list of content permission sets.  */
        contentPermissionSetIds?: string[] | undefined;
    }
    /** A request structure for creating multiple content documents. */
    export interface ContentCreateManyRequest {
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Create requests */
        requests?: ContentCreateRequest[] | undefined;
    }
    export interface BusinessProcess {
        id?: string | undefined;
        processDefinitionId?: string | undefined;
        referenceId?: string | undefined;
        referenceDocType?: string | undefined;
        supportsCancellation: boolean;
        businessProcessScope: BusinessProcessScope;
        lifeCycle: BusinessProcessLifeCycle;
        startDate: Date;
        endDate: Date;
        finished: boolean;
        stateHistory?: BusinessProcessState[] | undefined;
        currentState?: string | undefined;
        processDefinitionName?: string | undefined;
    }
    export enum BusinessProcessScope {
        System,
        User,
    }
    export enum BusinessProcessLifeCycle {
        Draft,
        InProgress,
        Succeeded,
        Cancelled,
        CancellationInProgress,
        Failed,
    }
    export interface BusinessProcessState {
        state?: string | undefined;
        timestamp: Date;
        error?: ErrorResponse | undefined;
    }
    export interface ErrorResponse {
        exception?: string | undefined;
        traceId?: string | undefined;
        traceJobId?: string | undefined;
    }
    export interface BusinessProcessBulkResponse extends BusinessProcess {
        response?: BulkResponse | undefined;
    }
    export interface BulkResponse {
        rows?: BulkResponseRow[] | undefined;
    }
    export interface BulkResponseRow {
        id?: string | undefined;
        version: number;
        error?: string | undefined;
        succeeded: boolean;
        status: number;
    }
    export interface ContentDeactivateRequest {
        contentIds?: string[] | undefined;
        resolve: boolean;
        displayPatternIds?: string[] | undefined;
        forceReferenceRemoval: boolean;
    }
    export interface ContentReactivateRequest {
        contentIds?: string[] | undefined;
        resolve: boolean;
        displayPatternIds?: string[] | undefined;
        allowMissingDependencies: boolean;
    }
    export interface ContentFileUpdateRequest {
        contentId?: string | undefined;
        fileTransferId?: string | undefined;
    }
    export interface ContentMetadataUpdateRequest {
        /** The content id. */
        id?: string | undefined;
        /** An id list of schemas with schema type layer. */
        layerSchemaIds?: string[] | undefined;
        /** The dynamic data structure matching the field schematics of the content schema (ContentSchemaId). */
        content?: DataDictionary | undefined;
        /** The dynamic data structure matching the field schematics of the schemas with type layer (LayerSchemaIds). */
        metadata?: DataDictionary | undefined;
        /** Options to modify the behavior for updating schemas. */
        layerSchemasUpdateOptions: UpdateOption;
        /** Options to modify the behavior for updating the values of schemas. */
        schemaFieldsUpdateOptions: UpdateOption;
    }
    export enum UpdateOption {
        Merge,
        Replace,
    }
    export interface ContentPermissionsUpdateRequest {
        /** The content id. */
        contentId?: string | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        contentPermissionSetIds?: string[] | undefined;
    }
    /** Update many contents metadata */
    export interface ContentMetadataUpdateManyRequest {
        /** Allow storing references to missing list items */
        allowMissingDependencies: boolean;
        /** Update requests */
        requests?: ContentMetadataUpdateRequest[] | undefined;
    }
    export interface ContentOwnershipTransferRequest {
        /** The content id. */
        contentId?: string | undefined;
        /** The id of the user to whom the content document has to be transfered to. */
        transferUserId?: string | undefined;
    }
    export interface ContentsOwnershipTransferRequest {
        /** The content ids. */
        contentIds?: string[] | undefined;
        /** The id of user to whom the content documents have to be transfered to. */
        transferUserId?: string | undefined;
    }
    export interface MetadataValuesChangeRequestBase {
        /** A container for all change commads. */
        changeCommands?: MetadataValuesChangeCommandBase[] | undefined;
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Create notification and notify on progress */
        notifyProgress: boolean;
    }
    export interface ContentFieldsUpdateRequest extends MetadataValuesChangeRequestBase {
        /** The ids of the content documents. */
        contentIds?: string[] | undefined;
    }
    /** The base class for metadata value change commands. */
    export interface MetadataValuesChangeCommandBase {
        /** The id of the schema to which the operation scope is addressed. */
        schemaId?: string | undefined;
    }
    /** Updates schema values. */
    export interface MetadataValuesSchemaUpdateCommand extends MetadataValuesChangeCommandBase {
        /** The metadata values containing a set of changes. Update is additive and will not remove values. To remove complete fields use the MetadataValuesFieldRemoveCommand instead. */
        value?: DataDictionary | undefined;
    }
    /** Adds or updates schema values. */
    export interface MetadataValuesSchemaUpsertCommand extends MetadataValuesChangeCommandBase {
        /** The metadata values containing a set of changes. Update is additive and will not remove values. To remove complete fields use the MetadataValuesFieldRemoveCommand instead. */
        value?: DataDictionary | undefined;
    }
    /** Removes schema values. */
    export interface MetadataValuesSchemaRemoveCommand extends MetadataValuesChangeCommandBase {
    }
    /** Replaces schema values. */
    export interface MetadataValuesSchemaReplaceCommand extends MetadataValuesChangeCommandBase {
        /** The metadata values containing the new values for the schema. All old values will be overwritten. */
        value?: DataDictionary | undefined;
    }
    /** Removes a field and its value from the schema values. */
    export interface MetadataValuesFieldRemoveCommand extends MetadataValuesChangeCommandBase {
        /** The path of the field to be removed (within tha data structure), e.g. "data.schemaId.fieldId" */
        fieldPath?: string | undefined;
    }
    /** Adds a list item id reference to a multi tagbox. */
    export interface MetadataValuesSchemaItemAddCommand extends MetadataValuesChangeCommandBase {
        /** The path of the field relative to the Content or Layer schema values defined by the schemaId property */
        fieldPath?: string | undefined;
        /** The field namespace */
        fieldNamespace?: string | undefined;
        /** The id of the list item to be added. */
        referenceId?: string | undefined;
    }
    /** Removes a list item id reference from a multi tagbox. */
    export interface MetadataValuesSchemaItemRemoveCommand extends MetadataValuesChangeCommandBase {
        /** The path of the field relative to the Content or Layer schema values defined by the schemaId property */
        fieldPath?: string | undefined;
        /** The field namespace */
        fieldNamespace?: string | undefined;
        /** The id of the list item to be removed. */
        referenceId?: string | undefined;
    }
    export interface ContentFieldsFilterUpdateRequest extends MetadataValuesChangeRequestBase {
        contentFilterRequest?: ContentFilterRequest | undefined;
    }
    export interface ContentFilterRequest {
        /** Limits the simple search fields to the fields available in the specified channel. */
        channelId?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to customer default language. */
        displayLanguage?: string | undefined;
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        searchString?: string | undefined;
        /** Type of search to be performed: against metadata, extracted fulltext from documents or both. Default to Metadata. */
        searchType: ContentSearchType;
        /** The collection id. */
        collectionId?: string | undefined;
        /** An optional search filter. Limits the content document result set. */
        filter?: FilterBase | undefined;
        /** Limits the content document result set to that life cycle state. Defaults to ActiveOnly. */
        lifeCycleFilter: LifeCycleFilter;
        /** Limits the content document result set to specific ContentRights the user has */
        rightsFilter?: ContentRight[] | undefined;
    }
    export interface BusinessProcessSearchRequest {
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        filter?: FilterBase | undefined;
        searchString?: string | undefined;
        searchBehaviours?: SearchBehaviour[] | undefined;
        sort?: SortInfo[] | undefined;
    }
    export interface BaseResultOfBusinessProcess {
        totalResults: number;
        results?: BusinessProcess[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfBusinessProcess extends BaseResultOfBusinessProcess {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface BusinessProcessSearchResult extends SearchBehaviourBaseResultOfBusinessProcess {
        elapsedMilliseconds: number;
    }
    export interface BusinessProcessWaitResult {
        hasStateHit: boolean;
        stateHit?: string | undefined;
        hasLifeCycleHit: boolean;
        lifeCycleHit: BusinessProcessLifeCycle;
        finished: boolean;
        businessProcess?: BusinessProcess | undefined;
    }
    export interface BusinessProcessDetails extends BusinessProcess {
        details?: BusinessProcessDetailsDataBase | undefined;
    }
    export interface BusinessProcessDetailsDataBase {
    }
    export interface BusinessProcessDetailsDataBulkResponse extends BusinessProcessDetailsDataBase {
        response?: BulkResponse | undefined;
    }
    /** Business process detailed information regarding Schema / ListItems import operation */
    export interface BusinessProcessDetailsDataSchemaImport extends BusinessProcessDetailsDataBase {
        /** Result information of a schema import operation */
        schemaImportResult?: SchemaImportResult | undefined;
        /** Result information of a list item import operation */
        listItemImportResult?: ListItemImportResult | undefined;
    }
    /** Result information of a schema import operation */
    export interface SchemaImportResult {
        /** Number of schemas imported */
        importedSchemaCount: number;
        /** Number of schema skipped during import phase because they were already found in the system */
        skippedSchemaCount: number;
        /** Total number of schemas requested to be imported */
        totalSchemaCount: number;
        /** Ids of the schemas that were not imported because already found in the system */
        skippedSchemaIds?: string[] | undefined;
        /** Ids of the schemas that were successfully imported */
        importedSchemaIds?: string[] | undefined;
    }
    /** Result information of a list item import operation */
    export interface ListItemImportResult {
        /** Number of list items imported */
        importedListItemCount: number;
        /** Number of list items skipped during import phase because they were already found in the system */
        skippedListItemCount: number;
        /** Total number of list items requested to be imported */
        totalListItemCount: number;
        /** Ids of the list items that were not imported because already found in the system */
        skippedListItemIds?: string[] | undefined;
        /** Ids of the list items that were successfully imported */
        importedListItemIds?: string[] | undefined;
    }
    export interface DocumentHistorySearchRequest {
        /** Limits the start date of the search request. Default to last 1 year. */
        from: Date;
        /** Limits the end date of the search request. Default to now. */
        to: Date;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** To get a large amount of data, page token returned from the response can be used to get all data. */
        pageToken?: string | undefined;
        /** Limits the search to a specific document id. E.g. ContentId */
        documentId?: string | undefined;
        /** The document version to search. Default to -1 to not limit to a specific document version. */
        documentVersion: number;
        /** Limits the search to a specifc document type. */
        documentType?: string | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        sort?: SortInfo | undefined;
    }
    export interface DocumentHistorySearchResult {
        totalResults: number;
        results?: DocumentHistory[] | undefined;
        pageToken?: string | undefined;
        elapsedMilliseconds: number;
    }
    export interface DocumentHistory {
        id?: string | undefined;
        documentId?: string | undefined;
        documentVersion: number;
        documentType?: string | undefined;
        documentTypeContract?: string | undefined;
        documentDate: Date;
        document?: string | undefined;
        timestamp: Date;
        audit?: UserAuditHistory | undefined;
        deleted: boolean;
        action: DocumentChangeAction;
    }
    export interface UserAuditHistory {
        modificationDate: Date;
        modifiedByUser?: string | undefined;
    }
    export enum DocumentChangeAction {
        Create,
        Update,
        Delete,
        Activate,
        Deactivate,
    }
    export interface DocumentHistoryDifference {
        documentId?: string | undefined;
        oldDocumentVersion: number;
        newDocumentVersion: number;
        oldValues?: any | undefined;
        newValues?: any | undefined;
    }
    /** The detail view item for the list item. */
    export interface ListItemDetail {
        /** The content data of the list item. */
        content?: any | undefined;
        /** The id of the schema with schema type list. */
        contentSchemaId?: string | undefined;
        /** Contains language specific display values, rendered according to the list schema's display pattern configuration. */
        displayValues?: DisplayValueDictionary | undefined;
        /** The list item id. */
        id?: string | undefined;
    }
    export interface ListItemSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** An optional search filter. Limits the list item result set. */
        filter?: FilterBase | undefined;
        /** Broadens the search and include all schema descendant list items. */
        includeAllSchemaChildren: boolean;
        /** Limits the search to list items of the provided schemas. */
        schemaIds?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to customer default language. */
        displayLanguage?: string | undefined;
        /** Limits the display values included in the search response. Defaults to all display values. */
        displayPatternIds?: string[] | undefined;
        /** Filter the returned list items that have or not have broken references */
        brokenDependenciesFilter: BrokenDependenciesFilter;
        /** Define the display values included in the search response for the referenced fields. Defaults to no display value. */
        referencedFieldsDisplayPatternIds?: string[] | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
        /** When set to true the content data is included in the result items. */
        includeContentData: boolean;
        /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
        debugMode: boolean;
        /** Limits the list item document result set to that life cycle state. Defaults to ActiveOnly. */
        lifeCycleFilter: LifeCycleFilter;
    }
    export interface BaseResultOfListItem {
        totalResults: number;
        results?: ListItem[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    /** Encapsulates the result of a list item search. */
    export interface ListItemSearchResult extends BaseResultOfListItem {
    }
    /** A document stored in the elastic search metadata index, with fields corresponding to the the schemantics of its underlying list schema. */
    export interface ListItem {
        /** The content data of the list item. */
        content?: any | undefined;
        /** The id of the schema with schema type list. */
        contentSchemaId?: string | undefined;
        /** Contains language specific display values, rendered according to the list schema's display pattern configuration. */
        displayValues?: DisplayValueDictionary | undefined;
        /** The list item id. */
        id?: string | undefined;
    }
    export interface ListItemAggregationRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        /** An optional search filter. Limits the list item result set. */
        filter?: FilterBase | undefined;
        /** Special filters used to filter down on a specific aggregated value. */
        aggregationFilters?: AggregationFilter[] | undefined;
        /** Defines the aggregation resultset. */
        aggregators?: AggregatorBase[] | undefined;
        /** Broadens the aggregation and include all schema descendant list items. */
        includeAllSchemaChildren: boolean;
        /** Filter the list items document result set to those that have or not have broken references */
        brokenDependenciesFilter: BrokenDependenciesFilter;
        /** Limits the aggregation to list items of the provided schemas. */
        schemaIds?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to customer default language. */
        displayLanguage?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
        /** Limits the list item document result set to that life cycle state. Defaults to ActiveOnly. */
        lifeCycleFilter: LifeCycleFilter;
    }
    /** A request structure for creating a list item document. */
    export interface ListItemCreateRequest {
        /** The content data of the list item. */
        content?: any | undefined;
        /** The id of the schema with schema type list. */
        contentSchemaId?: string | undefined;
        /** The list item id. When not provided a Guid is generated. */
        listItemId?: string | undefined;
    }
    /** A request structure for creating multiple list items. */
    export interface ListItemCreateManyRequest {
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Create requests */
        requests?: ListItemCreateRequest[] | undefined;
    }
    /** A request structure for updating a list item. */
    export interface ListItemUpdateRequest {
        /** The content data of the list item. */
        content?: any | undefined;
        /** The list item id. */
        id?: string | undefined;
    }
    /** A request structure for updating multiple list items. */
    export interface ListItemUpdateManyRequest {
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Update requests */
        requests?: ListItemUpdateRequest[] | undefined;
    }
    export interface ListItemDeactivateRequest {
        listItemIds?: string[] | undefined;
        forceReferenceRemoval: boolean;
    }
    export interface ListItemReactivateRequest {
        listItemIds?: string[] | undefined;
        allowMissingDependencies: boolean;
    }
    export interface ListItemFieldsUpdateRequest {
        /** The ids of the list items whose fields need to be updated */
        listItemIds?: string[] | undefined;
        /** The change commads to be applied to the list items */
        changeCommands?: MetadataValuesChangeCommandBase[] | undefined;
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Create notification and notify on progress */
        notifyProgress: boolean;
    }
    /** ListItemFieldsFilterUpdateRequest class */
    export interface ListItemFieldsFilterUpdateRequest {
        /** The search request used to filter the list items on which the change commands must be applied */
        listItemFilterRequest?: ListItemFilterRequest | undefined;
        /** The change commads to be applied to the list items */
        changeCommands?: MetadataValuesChangeCommandBase[] | undefined;
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Create notification and notify on progress */
        notifyProgress: boolean;
    }
    export interface ListItemFilterRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        searchString?: string | undefined;
        /** An optional search filter. Limits the list item result set. */
        filter?: FilterBase | undefined;
        /** Broadens the search and include all schema descendant list items. */
        includeAllSchemaChildren: boolean;
        /** Limits the search to list items of the provided schemas. */
        schemaIds?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to customer default language. */
        displayLanguage?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
    }
    export interface ReferencesBase {
        targetMetadataItemId?: string | undefined;
        references?: MetadataReference[] | undefined;
        isReferencedByRestrictedItem: boolean;
    }
    export interface ListItemReferences extends ReferencesBase {
    }
    export interface MetadataReference {
        targetDocType?: string | undefined;
        sourceId?: string | undefined;
        sourceDocType?: string | undefined;
    }
    export interface LiveStreamSearchRequest {
        /** Limits the start date of the search request. */
        from: Date;
        /** Limits the end date of the search request. */
        to: Date;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** To get a large amount of data, page token returned from the response can be used to get all data. */
        pageToken?: string | undefined;
    }
    export interface BaseResultOfObject {
        totalResults: number;
        results?: any[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfObject extends BaseResultOfObject {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface ObjectSearchResult extends SearchBehaviourBaseResultOfObject {
        elapsedMilliseconds: number;
    }
    export interface SchemaDetail {
        /** The schema id. */
        id?: string | undefined;
        /** The parent schema id. */
        parentSchemaId?: string | undefined;
        /** Types control schema usage. */
        types?: SchemaType[] | undefined;
        /** Language specific schema names. */
        names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        descriptions?: TranslatedStringDictionary | undefined;
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
        displayPatterns?: DisplayPattern[] | undefined;
        /** The schema fields. */
        fields?: FieldBase[] | undefined;
        /** The schema fields overwrite information. */
        fieldsOverwrite?: FieldOverwriteBase[] | undefined;
        /** Sorts content documents and/or list items. */
        sort?: SortInfo[] | undefined;
        /** An optional list of aggregations to group content documents and list items. */
        aggregations?: AggregatorBase[] | undefined;
        /** Is true when schema is system provided. */
        system: boolean;
        /** The owner token id. Defines the schema owner. */
        ownerTokenId?: string | undefined;
        /** Opens list item document accessibility. If true the SchemaPermissionSetIds must be empty. */
        public: boolean;
        /** An optional id list of schema permission sets which control list item permissions. When not empty Public must be false. */
        schemaPermissionSetIds?: string[] | undefined;
        /** An optional id list of schemas with type content for a schema with type layer. */
        referencedInContentSchemaIds?: string[] | undefined;
        /** A complete id list of all descendant schemas. */
        descendantSchemaIds?: string[] | undefined;
        audit?: UserAudit | undefined;
        /** The number of fields generated by the schema for the Search operations. */
        searchFieldCount?: SearchFieldCount | undefined;
    }
    export interface DisplayPattern {
        /** Defines the template engine for parsing the templates. */
        templateEngine: TemplateEngine;
        /** Defines the pattern type of the templates. */
        displayPatternType: DisplayPatternType;
        /** Language specific pattern templates. */
        templates?: TranslatedStringDictionary | undefined;
    }
    export enum TemplateEngine {
        DotLiquid,
    }
    /** The field base class. */
    export interface FieldBase {
        /** The field id. Can be a slug and must be unique within the schema. */
        id?: string | undefined;
        /** The index id is auto generated by the system. */
        indexId?: string | undefined;
        /** The namespace is auto generated by the system. */
        fieldNamespace?: string | undefined;
        /** Language specific field names. */
        names?: TranslatedStringDictionary | undefined;
        /** Language specific field descriptions. */
        descriptions?: TranslatedStringDictionary | undefined;
        /** Defines if a field value is mandatory or not. */
        required: boolean;
        /** Defines if the field can be edited or not. */
        fixed: boolean;
        /** Maps the field in the elastic filter index. */
        index: boolean;
        /** Includes fields in the simple search. */
        simpleSearch: boolean;
        /** Field is stored for sorting. */
        sortable: boolean;
    }
    export interface FieldBoolean extends FieldBase {
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    export interface FieldDate extends FieldBase {
        /** Defines the date format structure. */
        format?: string | undefined;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    export interface FieldDateTime extends FieldBase {
        /** Defines the date time format structure. */
        format?: string | undefined;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    /** For internal use only (system schemas) */
    export interface FieldDateTimeArray extends FieldDateTime {
        uniqueItems: boolean;
        maximumItems?: number | undefined;
        minimumItems?: number | undefined;
    }
    export interface FieldDecimal extends FieldBase {
        pattern?: string | undefined;
        /** Defines the lowest possible value. */
        minimum?: number | undefined;
        /** Defines the highest possible value. */
        maximum?: number | undefined;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    /** For internal use only (system schemas) */
    export interface FieldDictionary extends FieldBase {
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    /** For internal use only (system schemas) */
    export interface FieldDictionaryArray extends FieldDictionary {
        uniqueItems: boolean;
        maximumItems?: number | undefined;
        minimumItems?: number | undefined;
    }
    export interface FieldGeoPoint extends FieldBase {
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    export interface FieldLong extends FieldBase {
        pattern?: string | undefined;
        /** Defines the lowest possible value. */
        minimum?: number | undefined;
        /** Defines the highest possible value. */
        maximum?: number | undefined;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    /** For internal use only (system schemas) */
    export interface FieldLongArray extends FieldLong {
        uniqueItems: boolean;
        maximumItems?: number | undefined;
        minimumItems?: number | undefined;
    }
    export interface FieldSingleFieldset extends FieldBase {
        /** The id of the schema with type struct. */
        schemaId?: string | undefined;
        /** Indexing information of fields of the related schema identified by the SchemaId property */
        schemaIndexingInfo?: SchemaIndexingInfo | undefined;
    }
    export interface SchemaIndexingInfo {
        /** A collecction of indexing information for the fields of a schema */
        fields?: FieldIndexingInfo[] | undefined;
    }
    export interface FieldIndexingInfo {
        /** The field Id */
        id?: string | undefined;
        /** Maps the field in the elastic search index and its values become searchable. */
        index: boolean;
        /** Includes fields in the simple search. Index must be true. */
        simpleSearch: boolean;
        /** Include the field for the sort index. */
        sortable: boolean;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
        /** Indexing information of fields of the schema related to this field (if existing) */
        relatedSchemaIndexing?: SchemaIndexingInfo | undefined;
    }
    export interface FieldMultiFieldset extends FieldBase {
        /** The id of the schema with type struct. */
        schemaId?: string | undefined;
        /** Indexing information of fields of the related schema identified by the SchemaId property */
        schemaIndexingInfo?: SchemaIndexingInfo | undefined;
        /** Prevents duplicate values. */
        uniqueItems: boolean;
        /** Defines the highest possible fieldset count. */
        maximumItems?: number | undefined;
        /** Defines the lowest possible fieldset count. */
        minimumItems?: number | undefined;
    }
    export interface FieldSingleTagbox extends FieldBase {
        /** The id of the schema with type list. */
        schemaId?: string | undefined;
        /** Indexing information of fields of the related schema identified by the SchemaId property */
        schemaIndexingInfo?: SchemaIndexingInfo | undefined;
        /** An optional search filter. Limits the list item result set. */
        filter?: FilterBase | undefined;
        /** Json serialized template used for creating new list item */
        listItemCreateTemplate?: string | undefined;
    }
    export interface FieldMultiTagbox extends FieldBase {
        /** The id of the schema with type list. */
        schemaId?: string | undefined;
        /** Indexing information of fields of the related schema identified by the SchemaId property */
        schemaIndexingInfo?: SchemaIndexingInfo | undefined;
        /** Prevents duplicate values. */
        uniqueItems: boolean;
        /** Defines the highest possible item count. */
        maximumItems?: number | undefined;
        /** Defines the lowest possible item count. */
        minimumItems?: number | undefined;
        /** An optional search filter. Limits the list item result set. */
        filter?: FilterBase | undefined;
        /** Json serialized template used for creating new list item */
        listItemCreateTemplate?: string | undefined;
    }
    export interface FieldString extends FieldBase {
        /** It is a DotLiquid template. */
        template?: string | undefined;
        /** If true the Template will only render on item creation otherwise it will render on each update. */
        keepFieldValue: boolean;
        /** Contains a regex validation pattern. */
        pattern?: string | undefined;
        /** Defines the minimal string length. */
        minimumLength?: number | undefined;
        /** Defines the maximal string length. */
        maximumLength?: number | undefined;
        /** A string field can have multiple analyzers, but only one per analyzer type. To have any effect the Index must be true. */
        indexAnalyzers?: AnalyzerBase[] | undefined;
        /** Analyzers used for the simple search. Only one analyzer per type is allowed. Only considered if SimpleSearch is set to true. */
        simpleSearchAnalyzers?: AnalyzerBase[] | undefined;
        /** Displays the field value in a multiline component. */
        multiLine: boolean;
        /** Similar to an enumeration valid field values are limited to values of this list. */
        grantedValues?: string[] | undefined;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    /** The analyzer base class. */
    export interface AnalyzerBase {
    }
    /** An analyzer using the EdgeNGram tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenizer.html */
    export interface EdgeNGramAnalyzer extends AnalyzerBase {
        fieldSuffix?: string | undefined;
    }
    /** An analyzer using a language analyzer. Restricted to the languages supported by elastic search. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html */
    export interface LanguageAnalyzer extends AnalyzerBase {
        fieldSuffix?: string | undefined;
    }
    /** An analyzer using the NGram tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html */
    export interface NGramAnalyzer extends AnalyzerBase {
        fieldSuffix?: string | undefined;
    }
    /** An analyzer using the path hierarchy tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pathhierarchy-tokenizer.html */
    export interface PathHierarchyAnalyzer extends AnalyzerBase {
        fieldSuffix?: string | undefined;
    }
    /** An analyzer using a custom pattern tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-tokenizer.html */
    export interface SimpleAnalyzer extends AnalyzerBase {
        fieldSuffix?: string | undefined;
    }
    /** For internal use only (system schemas) */
    export interface FieldStringArray extends FieldString {
        uniqueItems: boolean;
        maximumItems?: number | undefined;
        minimumItems?: number | undefined;
    }
    export interface FieldTranslatedString extends FieldBase {
        /** Contains a regex validation pattern. */
        pattern?: string | undefined;
        /** Defines the minimal string length. */
        minimumLength?: number | undefined;
        /** Defines the maximal string length. */
        maximumLength?: number | undefined;
        /** A string field can have multiple analyzers, but only one per analyzer type. To have any effect the Index must be true. */
        indexAnalyzers?: AnalyzerBase[] | undefined;
        /** Analyzers used for the simple search. Only one analyzer per type is allowed. Only considered if SimpleSearch is set to true. */
        simpleSearchAnalyzers?: AnalyzerBase[] | undefined;
        /** Displays the field value in a multiline component. */
        multiLine: boolean;
        /** Sets the required metadata languages for the translation field. The langauge configuration limits the available metadata languages.
    If Required is true, the field and all its metadata languages are required, including x-default.
    If Required is false, the field can be left empty, but as soon as a value is entered all required metadata languages are mandatory, including x-default. */
        requiredMetadataLanguages?: string[] | undefined;
        /** It is a DotLiquid template. */
        template?: string | undefined;
        /** If true the Template will only render on item creation otherwise it will render on each update. */
        keepFieldValue: boolean;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    export interface FieldSingleRelation extends FieldBase {
        /** The id of the schema with type struct. */
        schemaId?: string | undefined;
        /** Indexing information of fields of the related schema identified by the SchemaId property */
        schemaIndexingInfo?: SchemaIndexingInfo | undefined;
        /** Defines the relation types supported by the field. */
        relationTypes?: RelationType[] | undefined;
    }
    export interface RelationType {
        /** The id property. */
        id?: string | undefined;
        /** Language specific relation names. */
        names?: TranslatedStringDictionary | undefined;
        /** Defines the valid target context. */
        targetDocType?: string | undefined;
        /** An optional search filter. Limits the content or the list item result set depending on the relation's target context. */
        filter?: FilterBase | undefined;
    }
    export interface FieldMultiRelation extends FieldBase {
        /** The id of the schema with type struct. */
        schemaId?: string | undefined;
        /** Indexing information of fields of the related schema identified by the SchemaId property */
        schemaIndexingInfo?: SchemaIndexingInfo | undefined;
        /** Defines the relation types supported by the field. */
        relationTypes?: RelationType[] | undefined;
        /** Prevents duplicate values. */
        uniqueItems: boolean;
        /** Defines the highest possible item count. */
        maximumItems?: number | undefined;
        /** Dfines the lowest possible item count. */
        minimumItems?: number | undefined;
    }
    /** Base class for overwritten information on a field. */
    export interface FieldOverwriteBase {
        /** The field id. Can be a slug and must be unique within the schema. */
        id?: string | undefined;
        /** Defines if a field value is mandatory or not. */
        required: boolean;
        /** Defines if the required property of the field is overwritten */
        overwriteRequired: boolean;
    }
    /** Overwritten information for Single Tagbox field. */
    export interface FieldOverwriteSingleTagbox extends FieldOverwriteBase {
        /** An optional search filter. Limits the list item result set. */
        filter?: FilterBase | undefined;
        /** Defines if the Filter property of the field is overwritten */
        overwriteFilter: boolean;
        /** Json serialized template used for creating new list item */
        listItemCreateTemplate?: string | undefined;
        /** Defines if the ListItemCreateTemplate property of the field is overwritten */
        overwriteListItemCreateTemplate: boolean;
    }
    /** Overwritten information for Multi Tagbox field. */
    export interface FieldOverwriteMultiTagbox extends FieldOverwriteBase {
        /** An optional search filter. Limits the list item result set. */
        filter?: FilterBase | undefined;
        /** Defines if the Filter property of the field is overwritten */
        overwriteFilter: boolean;
        /** Json serialized template used for creating new list item */
        listItemCreateTemplate?: string | undefined;
        /** Defines if the ListItemCreateTemplate property of the field is overwritten */
        overwriteListItemCreateTemplate: boolean;
        /** Defines the highest possible item count. */
        maximumItems?: number | undefined;
        /** Defines if the MaximumItems property of the field is overwritten */
        overwriteMaximumItems: boolean;
        /** Defines the lowest possible item count. */
        minimumItems?: number | undefined;
        /** Defines if the MinimumItems property of the field is overwritten */
        overwriteMinimumItems: boolean;
    }
    /** Count info of fields for search operations */
    export interface SearchFieldCount {
        /** The number of indexed fields generated by the schema in the Search index. */
        indexedField: number;
        /** The number of fields to be queried in the simple search for the schema. */
        simpleSearchField: number;
        /** The number of fields that have sorting information stored in the search index. */
        sortableField: number;
    }
    export interface SchemaSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** An optional search filter. Limits the schema result set. */
        filter?: FilterBase | undefined;
        /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
        debugMode: boolean;
    }
    export interface BaseResultOfSchema {
        totalResults: number;
        results?: Schema[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfSchema extends BaseResultOfSchema {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface SchemaSearchResult extends SearchBehaviourBaseResultOfSchema {
    }
    export interface Schema {
        /** The schema id. */
        id?: string | undefined;
        /** The parent schema id. */
        parentSchemaId?: string | undefined;
        /** Types control schema usage. */
        types?: SchemaType[] | undefined;
        /** Language specific schema names. */
        names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        descriptions?: TranslatedStringDictionary | undefined;
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        /** The count of all fields. */
        fieldCount: number;
        /** The count of all schema descendants with a immediate inheritance. */
        childCount: number;
        /** The descendancy depth of the schema. */
        level: number;
        /** Is true when schema is system provided. */
        system: boolean;
    }
    export interface GetIndexFieldsRequest {
        schemaIds?: string[] | undefined;
    }
    /** Contains compiled field information. */
    export interface IndexField {
        id?: string | undefined;
        /** The field id. */
        fieldId?: string | undefined;
        /** The field's type name. */
        type?: string | undefined;
        /** Contains all index field name variants of the field. */
        indexFields?: {
            [key: string]: string;
        } | undefined;
        /** Contains all simple search field name variants of the field.
    The amount of simple search fields can be equal or less to the amount of IndexFields, but never more. */
        simpleSearchFields?: string[] | undefined;
        /** Contains the fields boost value. */
        boost: number;
        /** Not to be returned for search query, but only used for mapping purposes */
        ignoreForSearch: boolean;
        /** The path of the Nested document this property belongs to. If set to null, it means that there is no Nested document */
        nestedPath?: string | undefined;
        /** Path to the sorting information in the DataSortValuesField sort index. */
        sortField?: string | undefined;
    }
    /** Response that tells if exists */
    export interface ExistsResponse {
        /** Gets or sets a value indicating whether it exists */
        exists: boolean;
    }
    export interface SchemaCreateRequest {
        /** The schema id. Can be a slug, but must be unique throughout the whole customer setup. */
        id?: string | undefined;
        /** The parent schema id. */
        parentSchemaId?: string | undefined;
        /** Types control schema usage. */
        types?: SchemaType[] | undefined;
        /** Language specific schema names. */
        names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        descriptions?: TranslatedStringDictionary | undefined;
        /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
        displayPatterns?: DisplayPattern[] | undefined;
        /** The schema fields. Can be empty. */
        fields?: FieldBase[] | undefined;
        /** The schema fields overwrite information. */
        fieldsOverwrite?: FieldOverwriteBase[] | undefined;
        /** An optional list of aggregations to group content documents and/or list items. */
        aggregations?: AggregatorBase[] | undefined;
        /** Sorts content documents and/or list items. */
        sort?: SortInfo[] | undefined;
        /** Opens list item document accessibility. If true SchemaPermissionSetIds must be empty. */
        public: boolean;
        /** An optional id list of schema permission sets. Control list item document permissions. When not empty Public must be false. */
        schemaPermissionSetIds?: string[] | undefined;
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        /** An optional id list of schemas with type content for a schema with type layer. */
        referencedInContentSchemaIds?: string[] | undefined;
    }
    export interface SchemaUpdateRequest {
        /** Language specific schema names. */
        names?: TranslatedStringDictionary | undefined;
        /** Language specific schema descriptions. */
        descriptions?: TranslatedStringDictionary | undefined;
        /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
        displayPatterns?: DisplayPattern[] | undefined;
        /** The schema fields. */
        fields?: FieldBase[] | undefined;
        /** The schema fields overwrite information. */
        fieldsOverwrite?: FieldOverwriteBase[] | undefined;
        /** An optional list of aggregations to group content documents and list items. */
        aggregations?: AggregatorBase[] | undefined;
        /** Sorts content documents and/or list items. */
        sort?: SortInfo[] | undefined;
        /** Opens schema accessibility. */
        public: boolean;
        /** An optional id list of schema permission sets which control list item permissions. When not empty Public must be false. */
        schemaPermissionSetIds?: string[] | undefined;
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        /** An optional id list of schemas with type content for a schema with type layer. */
        referencedInContentSchemaIds?: string[] | undefined;
        /** Types control schema usage. Schema types can only be added, but not removed. */
        types?: SchemaType[] | undefined;
    }
    export interface PermissionSetSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        filter?: FilterBase | undefined;
        rightFilter?: PermissionSetRight | undefined;
        /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
        debugMode: boolean;
    }
    export enum PermissionSetRight {
        Apply,
    }
    export interface BaseResultOfPermissionSet {
        totalResults: number;
        results?: PermissionSet[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfPermissionSet extends BaseResultOfPermissionSet {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface PermissionSetSearchResult extends SearchBehaviourBaseResultOfPermissionSet {
        elapsedMilliseconds: number;
    }
    export interface PermissionSet {
        /** The permission set id. */
        id?: string | undefined;
        trashed: boolean;
        /** Language specific permission set names. */
        names?: TranslatedStringDictionary | undefined;
    }
    export interface PermissionSetDetailOfContentRight {
        id?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
        trashed: boolean;
        userRolesRights?: PermissionUserRoleRightsOfContentRight[] | undefined;
        userRolesPermissionSetRights?: PermissionUserRoleRightsOfPermissionSetRight[] | undefined;
        exclusive: boolean;
    }
    export interface ContentPermissionSetDetail extends PermissionSetDetailOfContentRight {
    }
    export interface PermissionUserRoleRightsOfContentRight {
        userRoleId?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
        rights?: ContentRight[] | undefined;
    }
    export interface PermissionUserRoleRightsOfPermissionSetRight {
        userRoleId?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
        rights?: PermissionSetRight[] | undefined;
    }
    export interface PermissionSetDetailOfMetadataRight {
        id?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
        trashed: boolean;
        userRolesRights?: PermissionUserRoleRightsOfMetadataRight[] | undefined;
        userRolesPermissionSetRights?: PermissionUserRoleRightsOfPermissionSetRight[] | undefined;
        exclusive: boolean;
    }
    export interface SchemaPermissionSetDetail extends PermissionSetDetailOfMetadataRight {
    }
    export interface PermissionUserRoleRightsOfMetadataRight {
        userRoleId?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
        rights?: MetadataRight[] | undefined;
    }
    export enum MetadataRight {
        View,
        Edit,
        Manage,
    }
    /** The version view item for the environment. */
    export interface VersionInfo {
        /** The manual file version of Picturepark.Contract.dll. */
        fileVersion?: string | undefined;
        /** The GitVersionTask generated file product version of Picturepark.Configuration.dll. */
        fileProductVersion?: string | undefined;
        /** The current contract version stored in CustomerDoc / EnvironmentDoc. */
        contractVersion?: string | undefined;
        /** The bamboo release version. Only provided on bamboo deployments. */
        release?: string | undefined;
    }
    export interface ShareDetail {
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        creator?: ShareUser | undefined;
        audit?: UserAudit | undefined;
        contentSelections?: ShareContentDetail[] | undefined;
        layerSchemaIds?: string[] | undefined;
        data?: ShareDataBase | undefined;
        mailTemplateId?: string | undefined;
        expirationDate?: Date | undefined;
        template?: TemplateBase | undefined;
        outputAccess: OutputAccess;
        shareType: ShareType;
    }
    /** Reduced set of user information used for shares */
    export interface ShareUser {
        /** Name of user */
        displayName?: string | undefined;
        /** MD5 hash of email address. Can be used to display gravatar image */
        emailHash?: string | undefined;
    }
    export interface ShareContentDetail {
        /** The id of the schema with schema type content. */
        contentSchemaId?: string | undefined;
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        content?: DataDictionary | undefined;
        metadata?: DataDictionary | undefined;
        id?: string | undefined;
        outputs?: ShareOutputBase[] | undefined;
        contentType: ContentType;
        /** Contains language specific display values, rendered according to the content schema's display pattern configuration. */
        displayValues?: DisplayValueDictionary | undefined;
    }
    export interface ShareOutputBase {
        contentId?: string | undefined;
        outputFormatId?: string | undefined;
        /** Url to directly download output. In case of BasicShare if not fetched using a token, a placeholder {token} is included which needs to be replaced with the recipient's token */
        url?: string | undefined;
        detail?: OutputDataBase | undefined;
    }
    export interface ShareOutputBasic extends ShareOutputBase {
    }
    export interface ShareOutputEmbed extends ShareOutputBase {
        token?: string | undefined;
    }
    export interface ShareDataBase {
        url?: string | undefined;
    }
    export interface ShareDataEmbed extends ShareDataBase {
        token?: string | undefined;
    }
    export interface ShareDataBasic extends ShareDataBase {
        mailRecipients?: MailRecipient[] | undefined;
        internalRecipients?: InternalRecipient[] | undefined;
        languageCode?: string | undefined;
    }
    export interface MailRecipient {
        userEmail?: UserEmail | undefined;
        token?: string | undefined;
        url?: string | undefined;
    }
    export interface UserEmail {
        firstName?: string | undefined;
        lastName?: string | undefined;
        emailAddress?: string | undefined;
    }
    export interface InternalRecipient {
        recipient?: User | undefined;
        token?: string | undefined;
        url?: string | undefined;
    }
    export interface User {
        id?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        emailAddress?: string | undefined;
    }
    export interface TemplateBase {
        width?: number | undefined;
        height?: number | undefined;
    }
    export interface CardTemplate extends TemplateBase {
        showNavigation: boolean;
        showOverlay: boolean;
        showLogo: boolean;
        showFooter: boolean;
    }
    export interface ListTemplate extends TemplateBase {
    }
    export interface BasicTemplate extends TemplateBase {
    }
    export enum OutputAccess {
        Full,
        Preview,
        None,
    }
    export enum ShareType {
        Basic,
        Embed,
    }
    export interface ShareSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** An optional search filter. Limits the share document result set. */
        filter?: FilterBase | undefined;
        /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
        debugMode: boolean;
    }
    export interface BaseResultOfShare {
        totalResults: number;
        results?: Share[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfShare extends BaseResultOfShare {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface ShareSearchResult extends SearchBehaviourBaseResultOfShare {
        elapsedMilliseconds: number;
    }
    export interface Share {
        name?: string | undefined;
        contentIds?: string[] | undefined;
        id?: string | undefined;
        audit?: UserAudit | undefined;
        expirationDate?: Date | undefined;
        shareType: ShareType;
    }
    export interface ShareAggregationRequest {
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        sort?: SortInfo[] | undefined;
        /** An optional search filter. Limits the content document result set. */
        filter?: FilterBase | undefined;
        aggregationFilters?: AggregationFilter[] | undefined;
        aggregators?: AggregatorBase[] | undefined;
        displayLanguage?: string | undefined;
    }
    export interface ShareBaseCreateRequest {
        name?: string | undefined;
        description?: string | undefined;
        expirationDate?: Date | undefined;
        contents?: ShareContent[] | undefined;
        layerSchemaIds?: string[] | undefined;
        template?: TemplateBase | undefined;
        outputAccess: OutputAccess;
    }
    export interface ShareContent {
        contentId?: string | undefined;
        outputFormatIds?: string[] | undefined;
    }
    export interface ShareBasicCreateRequest extends ShareBaseCreateRequest {
        recipientsEmail?: UserEmail[] | undefined;
        recipientsUser?: User[] | undefined;
        recipientsGroup?: UserRole[] | undefined;
        languageCode?: string | undefined;
        mailTemplateId?: string | undefined;
    }
    export interface UserRole {
        /** The user role id. */
        id?: string | undefined;
        trashed: boolean;
        /** Language specific user role names. */
        names?: TranslatedStringDictionary | undefined;
        /** All user rights for this user role. */
        userRights?: UserRight[] | undefined;
    }
    export interface ShareEmbedCreateRequest extends ShareBaseCreateRequest {
    }
    export interface CreateShareResult {
        shareId?: string | undefined;
    }
    export interface ShareBaseUpdateRequest {
        id?: string | undefined;
        name?: string | undefined;
        expirationDate?: Date | undefined;
        description?: string | undefined;
        shareContentItems?: ShareContent[] | undefined;
        layerSchemaIds?: string[] | undefined;
        template?: TemplateBase | undefined;
        outputAccess: OutputAccess;
    }
    export interface ShareBasicUpdateRequest extends ShareBaseUpdateRequest {
    }
    export interface ShareEmbedUpdateRequest extends ShareBaseUpdateRequest {
    }
    export interface CustomerServiceProviderConfiguration {
        serviceProviderId?: string | undefined;
        customerId?: string | undefined;
        userRoleIds?: string[] | undefined;
        settings?: string | undefined;
    }
    export interface ServiceProviderConfigurationUpdateRequest {
        customerId?: string | undefined;
        serviceProviderId?: string | undefined;
        settings?: string | undefined;
        userRoleIds?: string[] | undefined;
    }
    export interface TransferDetail {
        id?: string | undefined;
        rev?: string | undefined;
        audit?: UserAudit | undefined;
        name?: string | undefined;
        state: TransferState;
        businessProcessId?: string | undefined;
        transferType: TransferType;
        itemProgress: number;
        itemCount: number;
        itemsFailed: number;
        itemsCancelled: number;
        lastProgressStamp: number;
        fileTransferCount: number;
        collectionId?: string | undefined;
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
        Deleted,
        TransferReady,
        FileDeleteInProgress,
        TransferCleanup,
    }
    export interface TransferSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
        searchString?: string | undefined;
        searchBehaviours?: SearchBehaviour[] | undefined;
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        filter?: FilterBase | undefined;
    }
    export interface BaseResultOfTransfer {
        totalResults: number;
        results?: Transfer[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfTransfer extends BaseResultOfTransfer {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface TransferSearchResult extends SearchBehaviourBaseResultOfTransfer {
        elapsedMilliseconds: number;
    }
    export interface Transfer {
        id?: string | undefined;
        name?: string | undefined;
        state: TransferState;
        transferType: TransferType;
        businessProcessId?: string | undefined;
        fileTransferCount: number;
        collectionId?: string | undefined;
    }
    export interface CreateTransferRequest {
        name?: string | undefined;
        transferType: TransferType;
        files?: TransferUploadFile[] | undefined;
        driveFiles?: TransferDriveFile[] | undefined;
        webLinks?: TransferWebLink[] | undefined;
        collectionName?: string | undefined;
        createCollection: boolean;
    }
    export interface TransferFile {
        identifier?: string | undefined;
    }
    export interface TransferUploadFile extends TransferFile {
        fileName?: string | undefined;
    }
    export interface TransferDriveFile extends TransferFile {
        driveId?: string | undefined;
        fileId?: string | undefined;
        name?: string | undefined;
        externalOutputFolderId?: string | undefined;
    }
    export interface TransferWebLink extends TransferFile {
        url?: string | undefined;
    }
    export interface FileTransferDetail {
        id?: string | undefined;
        rev?: string | undefined;
        name?: string | undefined;
        identifier?: string | undefined;
        audit?: UserAudit | undefined;
        transferId?: string | undefined;
        state: FileTransferState;
        fileMetadata?: FileMetadata | undefined;
        driveMetadata?: DriveMetadata | undefined;
        outputItems?: FileTransferOutput[] | undefined;
        contentId?: string | undefined;
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
        names?: TranslatedStringDictionary | undefined;
        descriptions?: TranslatedStringDictionary | undefined;
        fileExtension?: string | undefined;
        fileName?: string | undefined;
        filePath?: string | undefined;
        fileSizeInBytes?: number | undefined;
        sha1Hash?: string | undefined;
        xmpMetadata?: any | undefined;
        exifMetadata?: any | undefined;
        language?: string | undefined;
    }
    export interface AudioMetadata extends FileMetadata {
        audioStreams?: AudioStream[] | undefined;
    }
    export interface AudioStream {
        bitRate?: string | undefined;
        bitRateMode?: string | undefined;
        channels?: string | undefined;
        channelPositions?: string | undefined;
        codec?: string | undefined;
        durationInSeconds?: number | undefined;
        format?: string | undefined;
        language?: string | undefined;
        resolution?: number | undefined;
        samplingRate?: number | undefined;
        streamSize?: number | undefined;
    }
    export interface DocumentMetadata extends FileMetadata {
        applicationName?: string | undefined;
        applicationVersion?: string | undefined;
        author?: string | undefined;
        creator?: string | undefined;
        publisher?: string | undefined;
        company?: string | undefined;
        documentTitle?: string | undefined;
        characterCount: number;
        characterCountWithSpaces: number;
        lineCount: number;
        pageCount: number;
        slideCount: number;
        paragraphCount: number;
        revisionNumber: number;
        titles?: string[] | undefined;
        imageTitles?: string[] | undefined;
        epsInfo?: EpsMetadata | undefined;
        embeddedFiles?: FileMetadata[] | undefined;
    }
    export interface EpsMetadata {
        isRasterized: boolean;
        widthInPoints: number;
        heightInPoints: number;
    }
    export interface ImageMetadata extends FileMetadata {
        width: number;
        height: number;
        widthInInch: number;
        heightInInch: number;
        widthInCm: number;
        heightInCm: number;
        colorSpace?: string | undefined;
        colorProfile?: string | undefined;
        bitsPerPixel: number;
        bitsPerChannel: number;
        channels?: string | undefined;
        pixelFormat?: string | undefined;
        hasAlpha: boolean;
        isIndexed: boolean;
        isExtended: boolean;
        horizontalResolution: number;
        verticalResolution: number;
        totalFrames: number;
        totalUnspecifiedTiffExtraChannels: number;
        hasExifData: boolean;
        hasIptcData: boolean;
        hasAdobeResourceData: boolean;
        hasXmpData: boolean;
        uncompressedSizeInBytes: number;
    }
    export interface VideoMetadata extends FileMetadata {
        width: number;
        height: number;
        durationInSeconds: number;
        format?: string | undefined;
        codec?: string | undefined;
        overallBitrate?: number | undefined;
        videoStreams?: VideoStream[] | undefined;
        audioStreams?: AudioStream[] | undefined;
    }
    export interface VideoStream {
        bitRate?: string | undefined;
        codec?: string | undefined;
        displayAspectRatio?: string | undefined;
        durationInSeconds: number;
        format?: string | undefined;
        frameCount?: number | undefined;
        frameRate?: number | undefined;
        height?: number | undefined;
        language?: string | undefined;
        pixelAspectRatio?: number | undefined;
        resolution?: number | undefined;
        streamSize?: number | undefined;
        width?: number | undefined;
        rotation?: number | undefined;
    }
    export interface DriveMetadata {
        location?: string | undefined;
        fileType?: string | undefined;
        audit?: DriveMetadataAudit | undefined;
        description?: string | undefined;
    }
    export interface DriveMetadataAudit {
        owner?: string | undefined;
        modified?: string | undefined;
        opened?: string | undefined;
        created?: string | undefined;
    }
    export interface FileTransferOutput {
        id?: string | undefined;
        filePath?: string | undefined;
        outputSource: OutputSource;
    }
    export enum OutputSource {
        Rendered,
        Embedded,
    }
    export interface FileTransferSearchRequest {
        searchString?: string | undefined;
        searchBehaviours?: SearchBehaviour[] | undefined;
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        filter?: FilterBase | undefined;
    }
    export interface BaseResultOfFileTransfer {
        totalResults: number;
        results?: FileTransfer[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfFileTransfer extends BaseResultOfFileTransfer {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface FileTransferSearchResult extends SearchBehaviourBaseResultOfFileTransfer {
        elapsedMilliseconds: number;
    }
    export interface FileTransfer {
        id?: string | undefined;
        name?: string | undefined;
        identifier?: string | undefined;
        transferId?: string | undefined;
        state: FileTransferState;
        contentId?: string | undefined;
    }
    export interface Blacklist {
        items?: BlacklistItem[] | undefined;
    }
    export interface BlacklistItem {
        name?: string | undefined;
        match?: string | undefined;
    }
    export interface FileTransferDeleteRequest {
        transferId?: string | undefined;
        fileTransferIds?: string[] | undefined;
    }
    export interface FileTransfer2ContentCreateRequest {
        transferId?: string | undefined;
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        metadata?: DataDictionary | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        contentPermissionSetIds?: string[] | undefined;
    }
    export interface FileTransferPartial2ContentCreateRequest {
        transferId?: string | undefined;
        items?: FileTransferCreateItem[] | undefined;
    }
    export interface FileTransferCreateItem {
        fileId?: string | undefined;
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        metadata?: DataDictionary | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        contentPermissionSetIds?: string[] | undefined;
    }
    export interface UserDetail extends User {
        userRoles?: UserRole[] | undefined;
        comment?: string | undefined;
        languageCode?: string | undefined;
        address?: UserAddress | undefined;
        drives?: Drive[] | undefined;
        ownerTokens?: OwnerToken[] | undefined;
        authorizationState: AuthorizationState;
    }
    export interface UserAddress {
        company?: string | undefined;
        address?: string | undefined;
        alternativeAddress?: string | undefined;
        department?: string | undefined;
        zip?: string | undefined;
        city?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
    }
    export interface Drive {
        id?: string | undefined;
        name?: string | undefined;
        driveType: DriveType;
    }
    export enum DriveType {
        GoogleDrive,
        OneDrive,
        Dropbox,
    }
    export interface OwnerToken {
        /** The ownertoken id. */
        id?: string | undefined;
        /** The id of the user to whom this ownertoken currently belongs to. */
        userId?: string | undefined;
    }
    export enum AuthorizationState {
        Active,
        Review,
        Locked,
        Invited,
    }
    export interface UserSearchRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        sort?: SortInfo[] | undefined;
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        filter?: FilterBase | undefined;
        lifeCycleFilter: LifeCycleFilter;
        userRightsFilter?: UserRight[] | undefined;
        /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
        debugMode: boolean;
    }
    export interface BaseResultOfUserWithRoles {
        totalResults: number;
        results?: UserWithRoles[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfUserWithRoles extends BaseResultOfUserWithRoles {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface UserSearchResult extends SearchBehaviourBaseResultOfUserWithRoles {
        elapsedMilliseconds: number;
    }
    export interface UserWithRoles {
        userRoleIds?: string[] | undefined;
        id?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        emailAddress?: string | undefined;
    }
    export interface Channel {
        id?: string | undefined;
        sortOrder: number;
        /** The search index id. */
        searchIndexId?: string | undefined;
        /** An id list of schemas with schema type content whose content documents should be found by the simple search.
    The search by filters and aggregations are unaffected. */
        schemaIds?: string[] | undefined;
        /** An optional search filter. Limits the content document result set on each search and aggregation request. */
        filter?: FilterBase | undefined;
        /** Language specific names. */
        names?: TranslatedStringDictionary | undefined;
        sort?: SortInfo[] | undefined;
        /** An optional list of aggregators. These aggregations are added by default on each aggregation requests. */
        aggregations?: AggregatorBase[] | undefined;
        /** An Optional list of fields. These fields extend the list of simple search fields outside the bounds of any schema field configuration. */
        extendedSimpleSearchFields?: string[] | undefined;
        /** Display pattern to use for rendering details when 0 results are returned */
        missingResultsDisplayPatterns?: TranslatedStringDictionary | undefined;
    }
    export interface ContentsByIdsRequest {
        contentIds?: string[] | undefined;
    }
    export interface UserProfile {
        id?: string | undefined;
        emailAddress?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        languageCode?: string | undefined;
        address?: UserAddress | undefined;
        authorizationState: AuthorizationState;
    }
    /** Schema import request */
    export interface SchemaImportRequest {
        /** Id of the previously uploaded file transfer */
        fileTransferId?: string | undefined;
        /** Allow creating list items that refer to list items or contents that don't exist in the system. */
        allowMissingDependencies: boolean;
        /** Import the list items for the schema. */
        importListItems: boolean;
    }
    export interface CustomerInfo {
        customerId?: string | undefined;
        customerAlias?: string | undefined;
        identityServerUrl?: string | undefined;
        languageConfiguration?: LanguageConfiguration | undefined;
        languages?: Language[] | undefined;
    }
    export interface LanguageConfiguration {
        /** A list of languages serving as system languages. */
        systemLanguages?: string[] | undefined;
        /** A list of languages serving as metadata languages. */
        metadataLanguages?: string[] | undefined;
        /** The default language. Not the be confused with the metadata fallback language x-default. */
        defaultLanguage?: string | undefined;
    }
    export interface Language {
        name?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
        ietf?: string | undefined;
        twoLetterISOLanguageName?: string | undefined;
        threeLetterISOLanguageName?: string | undefined;
        regionCode?: string | undefined;
    }
    export interface FileParameter {
        data: any;
        fileName: string;
    }
    export interface FileResponse {
        data: Blob;
        status: number;
        fileName?: string;
        headers?: {
            [name: string]: any;
        };
    }
    export class SwaggerException extends Error {
        message: string;
        status: number;
        response: string;
        headers: {
            [key: string]: any;
        };
        result: any;
        constructor(message: string, status: number, response: string, headers: {
            [key: string]: any;
        }, result: any);
        protected isSwaggerException: boolean;
        static isSwaggerException(obj: any): obj is SwaggerException;
    }
    export class OidcClientSettings {
        static create(settings: {
            serverUrl: string;
            stsServerUrl: string;
            clientId: string;
            customerAlias: string;
            customerId: string;
            scope: string;
            redirectServerUrl?: string;
            logoutServerUrl?: string;
        }): {
            client_id: string;
            scope: string;
            authority: string;
            response_type: string;
            filterProtocolClaims: boolean;
            loadUserInfo: boolean;
            redirect_uri: string;
            post_logout_redirect_uri: string;
            acr_values: string;
        };
    }
    export class AccessTokenAuthClient extends AuthClient {
        private accessToken;
        constructor(pictureparkApiUrl: string, customerAlias: string, accessToken: string);
        transformHttpRequestOptions(options: RequestInit): Promise<RequestInit>;
    }
}
