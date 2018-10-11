
    export class AuthClient {
        private pictureparkApiUrl;
        private customerAlias?;
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
    export class BusinessProcessClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search
         * @param businessProcessSearchRequest The business process request
         * @return BusinessProcessSearchResult
         */
        search(businessProcessSearchRequest: BusinessProcessSearchRequest): Promise<BusinessProcessSearchResult>;
        protected processSearch(response: Response): Promise<BusinessProcessSearchResult>;
        /**
         * Wait for lifeCycles
         * @param processId The process id
         * @param lifeCycleIds (optional) Business process lifeCycle to wait for
         * @param timeout (optional) The timeout to wait for completion.
         * @return BusinessProcessWaitForLifeCycleResult
         */
        waitForLifeCycles(processId: string, lifeCycleIds?: BusinessProcessLifeCycle[] | null | undefined, timeout?: string | null | undefined): Promise<BusinessProcessWaitForLifeCycleResult>;
        protected processWaitForLifeCycles(response: Response): Promise<BusinessProcessWaitForLifeCycleResult>;
        /**
         * Wait for states
         * @param processId The process id
         * @param states (optional) Business process states to wait for
         * @param timeout (optional) The timeout to wait for completion.
         * @return BusinessProcessWaitResult
         */
        waitForStates(processId: string, states?: string[] | null | undefined, timeout?: string | null | undefined): Promise<BusinessProcessWaitForStateResult>;
        protected processWaitForStates(response: Response): Promise<BusinessProcessWaitForStateResult>;
        /**
         * Wait for completion
         * @param processId The process id
         * @param timeout (optional) The timeout to wait for completion.
         * @return BusinessProcessWaitResult
         */
        waitForCompletion(processId: string, timeout?: string | null | undefined): Promise<BusinessProcessWaitForLifeCycleResult>;
        protected processWaitForCompletion(response: Response): Promise<BusinessProcessWaitForLifeCycleResult>;
        /**
         * Get details
         * @param processId The process id
         * @return BusinessProcessDetails
         */
        getDetails(processId: string): Promise<BusinessProcessDetails>;
        protected processGetDetails(response: Response): Promise<BusinessProcessDetails>;
    }
    export class ChannelClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get list of channels
         */
        getChannels(): Promise<Channel[]>;
        protected processGetChannels(response: Response): Promise<Channel[]>;
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
         * @param contentId The content id.
         * @param resolveBehaviours (optional) List of enum that control which parts of the content are resolved and returned
         * @return ContentDetail
         */
        get(contentId: string, resolveBehaviours?: ContentResolveBehaviour[] | null | undefined): Promise<ContentDetail | null>;
        protected processGet(response: Response): Promise<ContentDetail | null>;
        /**
         * Delete - single
         * @param contentId the id of the content to delete
         * @param forceReferenceRemoval (optional) A value indicating whether references to the content should be removed.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         */
        delete(contentId: string, forceReferenceRemoval?: boolean | null | undefined, timeout?: string | null | undefined): Promise<void>;
        protected processDelete(response: Response): Promise<void>;
        /**
         * Get detail - many
         * @param ids List of contentIds
         * @param resolveBehaviours (optional) List of enum that control which parts of the content are resolved and returned
         * @return List of ContentDetail
         */
        getMany(ids: string[] | null, resolveBehaviours?: ContentResolveBehaviour[] | null | undefined): Promise<ContentDetail[]>;
        protected processGetMany(response: Response): Promise<ContentDetail[]>;
        /**
         * Create - single
         * @param contentCreateRequest The content create request.
         * @param resolveBehaviours (optional) List of enum that control which parts of the content are resolved and returned
         * @param allowMissingDependencies (optional) Allow creating list items that refer to list items or contents that don't exist in the system.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         */
        create(contentCreateRequest: ContentCreateRequest, resolveBehaviours?: ContentResolveBehaviour[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined): Promise<ContentDetail>;
        protected processCreate(response: Response): Promise<ContentDetail>;
        /**
         * Search
         * @param contentSearchRequest The content search request.
         * @return ContentSearchResult
         */
        search(contentSearchRequest: ContentSearchRequest): Promise<ContentSearchResult>;
        protected processSearch(response: Response): Promise<ContentSearchResult>;
        /**
         * Aggregate
         * @param contentAggregationRequest The aggregation request.
         * @return ObjectAggregationResult
         */
        aggregate(contentAggregationRequest: ContentAggregationRequest): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Aggregate on channel
         * @param contentAggregationOnChannelRequest The content aggregation on channel request.
         * @return ObjectAggregationResult
         */
        aggregateOnChannel(contentAggregationOnChannelRequest: ContentAggregationOnChannelRequest): Promise<ObjectAggregationResult>;
        protected processAggregateOnChannel(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Get references
         * @return ContentReferencesResult
         */
        getReferences(contentId: string, contentReferencesRequest: ContentReferencesRequest): Promise<ContentReferencesResult>;
        protected processGetReferences(response: Response): Promise<ContentReferencesResult>;
        /**
         * Get references - many
         * @return ContentReferencesResult
         */
        getReferencesMany(contentManyReferencesRequest: ContentManyReferencesRequest): Promise<ContentReferencesResult>;
        protected processGetReferencesMany(response: Response): Promise<ContentReferencesResult>;
        /**
         * Create download link
         * @param request The content download link request
         * @return ContentBatchDonloadItem
         */
        createDownloadLink(request: ContentDownloadLinkCreateRequest): Promise<DownloadLink>;
        protected processCreateDownloadLink(response: Response): Promise<DownloadLink>;
        /**
         * Download output
         * @param contentId The content id
         * @param outputFormatId The output format id
         * @param width (optional) Optional width in pixels to resize image
         * @param height (optional) Optional height in pixels to resize image
         * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
         * @return HttpResponseMessage
         */
        download(contentId: string, outputFormatId: string, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
        protected processDownload(response: Response): Promise<FileResponse>;
        /**
         * Download thumbnail
         * @param contentId The Content id
         * @param size Thumbnail size. Either small, medium or large
         * @param width (optional) Optional width in pixels to resize image
         * @param height (optional) Optional height in pixels to resize image
         * @return HttpResponseMessage
         */
        downloadThumbnail(contentId: string, size: ThumbnailSize, width?: number | null | undefined, height?: number | null | undefined): Promise<FileResponse>;
        protected processDownloadThumbnail(response: Response): Promise<FileResponse>;
        /**
         * Create - many
         * @param contentCreateManyRequest The content create many request.
         */
        createMany(contentCreateManyRequest: ContentCreateManyRequest): Promise<BusinessProcess>;
        protected processCreateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Delete - many
         * @param deleteManyRequest The delete many request
         * @return BusinessProcess
         */
        deleteMany(deleteManyRequest: ContentDeleteManyRequest): Promise<BusinessProcess>;
        protected processDeleteMany(response: Response): Promise<BusinessProcess>;
        /**
         * Restore - single
         * @param contentId The content id.
         * @param allowMissingDependencies (optional) Allow restoring contents that refer to list items or contents that don't exist in the system.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return Void
         */
        restore(contentId: string, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined): Promise<void>;
        protected processRestore(response: Response): Promise<void>;
        /**
         * Restore - many
         * @param restoreManyRequest The content restore many request.
         * @return BusinessProcess
         */
        restoreMany(restoreManyRequest: ContentRestoreManyRequest): Promise<BusinessProcess>;
        protected processRestoreMany(response: Response): Promise<BusinessProcess>;
        /**
         * Update file - single
         * @param contentId The id of the content to replace
         * @param updateRequest Update request
         */
        updateFile(contentId: string, updateRequest: ContentFileUpdateRequest): Promise<BusinessProcess>;
        protected processUpdateFile(response: Response): Promise<BusinessProcess>;
        /**
         * Update metadata - single
         * @param contentId The content id.
         * @param updateRequest The metadata update request.
         * @param resolveBehaviours (optional) List of enum that control which parts of the content are resolved and returned
         * @param allowMissingDependencies (optional) Allow storing references to missing list items
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return ContentDetail
         */
        updateMetadata(contentId: string, updateRequest: ContentMetadataUpdateRequest, resolveBehaviours?: ContentResolveBehaviour[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined): Promise<ContentDetail>;
        protected processUpdateMetadata(response: Response): Promise<ContentDetail>;
        /**
         * Update permissions - single
         * @param contentId The content id.
         * @param updateRequest The content permission update request.
         * @param resolveBehaviours (optional) List of enum that control which parts of the content are resolved and returned
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return ContentDetail
         */
        updatePermissions(contentId: string, updateRequest: ContentPermissionsUpdateRequest, resolveBehaviours?: ContentResolveBehaviour[] | null | undefined, timeout?: string | null | undefined): Promise<ContentDetail>;
        protected processUpdatePermissions(response: Response): Promise<ContentDetail>;
        /**
         * Update metadata - many
         * @param updateRequest The metadata update requests.
         * @return BusinessProcess
         */
        updateMetadataMany(updateRequest: ContentMetadataUpdateManyRequest): Promise<BusinessProcess>;
        protected processUpdateMetadataMany(response: Response): Promise<BusinessProcess>;
        /**
         * Update permissions - many
         * @param updateManyRequest The permissions update many request.
         * @return BusinessProcess
         */
        updatePermissionsMany(updateManyRequest: ContentPermissionsUpdateManyRequest): Promise<BusinessProcess>;
        protected processUpdatePermissionsMany(response: Response): Promise<BusinessProcess>;
        /**
         * Transfer ownership - single
         * @param contentId The content id.
         * @param updateRequest The content ownership transfer request update request.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return ContentDetail
         */
        transferOwnership(contentId: string, updateRequest: ContentOwnershipTransferRequest, timeout?: string | null | undefined): Promise<ContentDetail>;
        protected processTransferOwnership(response: Response): Promise<ContentDetail>;
        /**
         * Transfer ownership - many
         * @param contentOwnershipTransferManyRequest The content ownership transfer many request.
         * @return BusinessProcess
         */
        transferOwnershipMany(contentOwnershipTransferManyRequest: ContentOwnershipTransferManyRequest): Promise<BusinessProcess>;
        protected processTransferOwnershipMany(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by ids
         * @param updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByIds(updateRequest: ContentFieldsBatchUpdateRequest): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByIds(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by filter
         * @param updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByFilter(updateRequest: ContentFieldsBatchUpdateFilterRequest): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByFilter(response: Response): Promise<BusinessProcess>;
    }
    export class ContentPermissionSetClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search
         * @param request The permission search request.
         * @return PermissionSetSearchResult
         */
        search(request: PermissionSetSearchRequest): Promise<PermissionSetSearchResult>;
        protected processSearch(response: Response): Promise<PermissionSetSearchResult>;
        /**
         * Get detail - single
         * @param permissionSetId The content permission set id.
         * @return ContentPermissionSetDetail
         */
        get(permissionSetId: string): Promise<ContentPermissionSetDetail>;
        protected processGet(response: Response): Promise<ContentPermissionSetDetail>;
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
         * @param documentHistorySearchRequest The document history search request
         * @return DocumentHistorySearchResult
         */
        search(documentHistorySearchRequest: DocumentHistorySearchRequest): Promise<DocumentHistorySearchResult>;
        protected processSearch(response: Response): Promise<DocumentHistorySearchResult>;
        /**
         * Get latest
         * @param id The id of the document (e.g. ContentId)
         * @return DocumentHistory
         */
        get(id: string): Promise<DocumentHistory>;
        protected processGet(response: Response): Promise<DocumentHistory>;
        /**
         * Get latest by version
         * @param id The id of the document (e.g. ContentId)
         * @param version The version
         * @return DocumentHistory
         */
        getVersion(id: string, version: string): Promise<DocumentHistory>;
        protected processGetVersion(response: Response): Promise<DocumentHistory>;
        /**
         * Get latest difference
         * @param id The id of the document (e.g. ContentId)
         * @param oldVersion The old version
         * @return DocumentHistoryDifference
         */
        getDifferenceLatest(id: string, oldVersion: number): Promise<DocumentHistoryDifference>;
        protected processGetDifferenceLatest(response: Response): Promise<DocumentHistoryDifference>;
        /**
         * Get difference
         * @param id The id of the document (e.g. ContentId)
         * @param oldVersion The old version
         * @param newVersion The new version
         * @return DocumentHistoryDifference
         */
        getDifference(id: string, oldVersion: number, newVersion: number): Promise<DocumentHistoryDifference>;
        protected processGetDifference(response: Response): Promise<DocumentHistoryDifference>;
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
    export class JsonSchemaClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get Json Schema
         * @param schemaId Schema Id
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
         * Get detail - single
         * @param listItemId The list item id.
         * @param resolveBehaviours (optional) List of enum that control which parts of the list item are resolved and returned
         * @return List item detail
         */
        get(listItemId: string, resolveBehaviours?: ListItemResolveBehaviour[] | null | undefined): Promise<ListItemDetail>;
        protected processGet(response: Response): Promise<ListItemDetail>;
        /**
         * Update - single
         * @param listItemId The list item id.
         * @param updateRequest The list item update request.
         * @param resolveBehaviours (optional) List of enum that control which parts of the list item are resolved and returned
         * @param allowMissingDependencies (optional) Allow creating list items that refer to list items or contents that don't exist in the system.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return ListItemDetail
         */
        update(listItemId: string, updateRequest: ListItemUpdateRequest, resolveBehaviours?: ListItemResolveBehaviour[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined): Promise<ListItemDetail>;
        protected processUpdate(response: Response): Promise<ListItemDetail>;
        /**
         * Delete - single
         * @param listItemId The id of the list item to delete
         * @param forceReferenceRemoval (optional) A value indicating whether references to the listitem should be removed.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return Void
         */
        delete(listItemId: string, forceReferenceRemoval?: boolean | null | undefined, timeout?: string | null | undefined): Promise<void>;
        protected processDelete(response: Response): Promise<void>;
        /**
         * Get detail - many
         * @param ids List of list item ids
         * @param resolveBehaviours (optional) List of enum that control which parts of the list items are resolved and returned
         * @return List of list item details
         */
        getMany(ids: string[] | null, resolveBehaviours?: ListItemResolveBehaviour[] | null | undefined): Promise<ListItemDetail[]>;
        protected processGetMany(response: Response): Promise<ListItemDetail[]>;
        /**
         * Create - single
         * @param listItemCreateRequest List item create request.
         * @param resolveBehaviours (optional) List of enum that control which parts of the list item are resolved and returned
         * @param allowMissingDependencies (optional) Allow creating list items that refer to list items or contents that don't exist in the system.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return ListItemDetail
         */
        create(listItemCreateRequest: ListItemCreateRequest, resolveBehaviours?: ListItemResolveBehaviour[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined): Promise<ListItemDetail>;
        protected processCreate(response: Response): Promise<ListItemDetail>;
        /**
         * Search
         * @param listItemSearchRequest The list item search request.
         * @return List item result set.
         */
        search(listItemSearchRequest: ListItemSearchRequest): Promise<ListItemSearchResult>;
        protected processSearch(response: Response): Promise<ListItemSearchResult>;
        /**
         * Aggregate
         * @param listItemAggregationRequest The list item aggregation request.
         * @return ObjectAggregationResult
         */
        aggregate(listItemAggregationRequest: ListItemAggregationRequest): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Create - many
         * @param listItemCreateManyRequest List item create many request.
         * @return BusinessProcess
         */
        createMany(listItemCreateManyRequest: ListItemCreateManyRequest): Promise<BusinessProcess>;
        protected processCreateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Update - many
         * @param listItemUpdateManyRequest List item update many request.
         * @return BusinessProcess
         */
        updateMany(listItemUpdateManyRequest: ListItemUpdateManyRequest): Promise<BusinessProcess>;
        protected processUpdateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Delete - many
         * @param deleteManyRequest The list items delete many request
         * @return BusinessProcess
         */
        deleteMany(deleteManyRequest: ListItemDeleteManyRequest): Promise<BusinessProcess>;
        protected processDeleteMany(response: Response): Promise<BusinessProcess>;
        /**
         * Restore - single
         * @param listItemId The list item id.
         * @param allowMissingDependencies (optional) Allow restoring list items that refer to list items or contents that don't exist in the system.
         * @param timeout (optional) Maximum time to wait for the business process completed state.
         * @return Void
         */
        restore(listItemId: string, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined): Promise<void>;
        protected processRestore(response: Response): Promise<void>;
        /**
         * Restore - many
         * @param restoreManyRequest The list items restore many request.
         * @return BusinessProcess
         */
        restoreMany(restoreManyRequest: ListItemRestoreManyRequest): Promise<BusinessProcess>;
        protected processRestoreMany(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by ids
         * @param updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByIds(updateRequest: ListItemFieldsBatchUpdateRequest): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByIds(response: Response): Promise<BusinessProcess>;
        /**
         * Batch update fields - by filter
         * @param updateRequest The metadata update request.
         * @return BusinessProcess
         */
        batchUpdateFieldsByFilter(updateRequest: ListItemFieldsBatchUpdateFilterRequest): Promise<BusinessProcess>;
        protected processBatchUpdateFieldsByFilter(response: Response): Promise<BusinessProcess>;
        /**
         * Gets the references to a list item.
         * @param listItemId The ID of the list item.
         * @return MetadataReferences
         */
        getReferencesToListItem(listItemId: string): Promise<ListItemReferences>;
        protected processGetReferencesToListItem(response: Response): Promise<ListItemReferences>;
        /**
         * Gets the references to the specified list items.
         * @param ids The IDs of the list items.
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
         * @param liveStreamSearchRequest The livestream search request
         * @return ObjectSearchResult
         */
        search(liveStreamSearchRequest: LiveStreamSearchRequest): Promise<ObjectSearchResult>;
        protected processSearch(response: Response): Promise<ObjectSearchResult>;
    }
    export class OutputClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search output documents
         * @param outputSearchRequest The output search request.
         * @return Output result set.
         */
        search(outputSearchRequest: OutputSearchRequest): Promise<OutputSearchResult>;
        protected processSearch(response: Response): Promise<OutputSearchResult>;
        /**
         * Get - single
         * @param outputId The output id.
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
        update(updateRequest: UserProfileUpdateRequest): Promise<UserProfile>;
        protected processUpdate(response: Response): Promise<UserProfile>;
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
         * @param token The token
         * @return ShareBaseDetail
         */
        getShare(token: string): Promise<ShareDetail>;
        protected processGetShare(response: Response): Promise<ShareDetail>;
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
         * @param schemaId The schema id.
         * @return SchemaDetail
         */
        get(schemaId: string): Promise<SchemaDetail>;
        protected processGet(response: Response): Promise<SchemaDetail>;
        /**
         * Update - single
         * @param schemaId The schema id.
         * @param schema The schema update request.
         * @param timeout (optional) Maximum time to wait for the operation to complete.
         * @return SchemaUpdateResult containing the updated schema
         */
        update(schemaId: string, schema: SchemaUpdateRequest, timeout?: string | null | undefined): Promise<SchemaUpdateResult>;
        protected processUpdate(response: Response): Promise<SchemaUpdateResult>;
        /**
         * Delete - single
         * @param schemaId The schema id.
         * @param timeout (optional) Maximum time to wait for the operation to complete.
         * @return SchemaDeleteResult
         */
        delete(schemaId: string, timeout?: string | null | undefined): Promise<SchemaDeleteResult>;
        protected processDelete(response: Response): Promise<SchemaDeleteResult>;
        /**
         * Get - many
         * @param ids (optional) Comma separated list of schema ids
         * @return SchemaDetail
         */
        getMany(ids?: string[] | null | undefined): Promise<SchemaDetail[]>;
        protected processGetMany(response: Response): Promise<SchemaDetail[]>;
        /**
         * Create - single
         * @param schema The schema create request.
         * @param timeout (optional) Maximum time to wait for the operation to complete.
         * @return SchemaCreateResult containing the created schema.
         */
        create(schema: SchemaCreateRequest, timeout?: string | null | undefined): Promise<SchemaCreateResult>;
        protected processCreate(response: Response): Promise<SchemaCreateResult>;
        /**
         * Search
         * @param schemaSearchRequest The schema search request.
         * @return Schema result set.
         */
        search(schemaSearchRequest: SchemaSearchRequest): Promise<SchemaSearchResult>;
        protected processSearch(response: Response): Promise<SchemaSearchResult>;
        /**
         * Get index fields
         * @param request The get request.
         * @return Indexed fields
         */
        getIndexFields(request: IndexFieldsSearchBySchemaIdsRequest): Promise<IndexField[]>;
        protected processGetIndexFields(response: Response): Promise<IndexField[]>;
        /**
         * Exists
         * @param schemaId The schema id.
         * @param fieldId (optional) The optional field id.
         * @return ExistsResponse
         */
        exists(schemaId: string, fieldId?: string | null | undefined): Promise<ExistsResponse>;
        protected processExists(response: Response): Promise<ExistsResponse>;
    }
    export class SchemaPermissionSetClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Search
         * @param request The permission search request.
         * @return PermissionSetSearchResult
         */
        search(request: PermissionSetSearchRequest): Promise<PermissionSetSearchResult>;
        protected processSearch(response: Response): Promise<PermissionSetSearchResult>;
        /**
         * Get detail - single
         * @param permissionSetId The schema permission set id.
         * @return SchemaPermissionSetDetail
         */
        get(permissionSetId: string): Promise<SchemaPermissionSetDetail>;
        protected processGet(response: Response): Promise<SchemaPermissionSetDetail>;
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
         * @param schemaImportRequest The schema import request.
         * @return Transfer
         */
        import(schemaImportRequest: SchemaImportRequest): Promise<Transfer>;
        protected processImport(response: Response): Promise<Transfer>;
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
        updateConfiguration(serviceProviderId: string, configuration: ServiceProviderConfigurationUpdateRequest): Promise<CustomerServiceProviderConfiguration>;
        protected processUpdateConfiguration(response: Response): Promise<CustomerServiceProviderConfiguration>;
    }
    export class ShareAccessClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get Share json
         * @param token The token
         * @return ShareDetail
         */
        getShareJson(token: string): Promise<any>;
        protected processGetShareJson(response: Response): Promise<any>;
        /**
         * Download Shared outputs
         * @param token The token
         * @param width (optional) Optional width in pixels to resize image
         * @param height (optional) Optional height in pixels to resize image
         * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
         * @return HttpResponseMessage
         */
        download(token: string, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
        protected processDownload(response: Response): Promise<FileResponse>;
        /**
         * Download Shared outputs
         * @param token The token
         * @param contentId The content id
         * @param width (optional) Optional width in pixels to resize image
         * @param height (optional) Optional height in pixels to resize image
         * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
         * @return HttpResponseMessage
         */
        downloadWithContentId(token: string, contentId: string, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
        protected processDownloadWithContentId(response: Response): Promise<FileResponse>;
        /**
         * Download Shared outputs
         * @param token The token
         * @param contentId The content id
         * @param outputFormatId The output format id+
         * @param width (optional) Optional width in pixels to resize image
         * @param height (optional) Optional height in pixels to resize image
         * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
         * @return HttpResponseMessage
         */
        downloadWithOutputFormatId(token: string, contentId: string, outputFormatId: string, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
        protected processDownloadWithOutputFormatId(response: Response): Promise<FileResponse>;
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
         * @param id Share Id (not token, use PublicAccess to get share by token)
         * @return Polymorph share
         */
        get(id: string): Promise<ShareDetail>;
        protected processGet(response: Response): Promise<ShareDetail>;
        /**
         * Update - single
         * @param id The share id.
         * @param updateRequest The share update request.
         * @return Share
         */
        update(id: string, updateRequest: ShareBaseUpdateRequest): Promise<ShareDetail>;
        protected processUpdate(response: Response): Promise<ShareDetail>;
        /**
         * Search
         * @param request Search request
         * @return Share search result
         */
        search(request: ShareSearchRequest): Promise<ShareSearchResult>;
        protected processSearch(response: Response): Promise<ShareSearchResult>;
        /**
         * Aggregate
         * @param request Aggregation request
         * @return AggregationResult
         */
        aggregate(request: ShareAggregationRequest): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Create - single
         * @param request Polymorph create contract. Use either ShareBasicCreateRequest or ShareEmbedCreateRequest
         * @return Create result
         */
        create(request: ShareBaseCreateRequest): Promise<CreateShareResult>;
        protected processCreate(response: Response): Promise<CreateShareResult>;
        /**
         * Delete - many
         * @param deleteManyRequest A delete many request containing the ids of the shares to delete.
         * @return BusinessProcess
         */
        deleteMany(deleteManyRequest: ShareDeleteManyRequest): Promise<BulkResponse>;
        protected processDeleteMany(response: Response): Promise<BulkResponse>;
    }
    export class TransferClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get transfer details
         * @param transferId ID of transfer.
         * @return TransferDetail
         */
        get(transferId: string): Promise<TransferDetail>;
        protected processGet(response: Response): Promise<TransferDetail>;
        /**
         * Delete transfer
         * @param transferId ID of transfer.
         * @return OK
         */
        delete(transferId: string): Promise<void>;
        protected processDelete(response: Response): Promise<void>;
        /**
         * Search
         * @param request The transfer search request
         * @return TransferSearchResult
         */
        search(request: TransferSearchRequest): Promise<TransferSearchResult>;
        protected processSearch(response: Response): Promise<TransferSearchResult>;
        /**
         * Cancel transfer
         * @param transferId ID of transfer.
         * @return OK
         */
        cancelTransfer(transferId: string): Promise<void>;
        protected processCancelTransfer(response: Response): Promise<void>;
        /**
         * Create transfer
         * @param request The create transfer request
         * @return Transfer
         */
        create(request: CreateTransferRequest): Promise<Transfer>;
        protected processCreate(response: Response): Promise<Transfer>;
        /**
         * Get file
         * @param fileTransferId ID of filetransfer.
         * @return FileTransferDetail
         */
        getFile(fileTransferId: string): Promise<FileTransferDetail>;
        protected processGetFile(response: Response): Promise<FileTransferDetail>;
        /**
         * Search for files
         * @param request The filetransfer search request
         * @return FileTransferSearchResult
         */
        searchFiles(request: FileTransferSearchRequest): Promise<FileTransferSearchResult>;
        protected processSearchFiles(response: Response): Promise<FileTransferSearchResult>;
        /**
         * Get blacklist
         * @return Blacklist
         */
        getBlacklist(): Promise<Blacklist>;
        protected processGetBlacklist(response: Response): Promise<Blacklist>;
        /**
         * Delete files
         * @param request The filetransfer delete request
         */
        deleteFiles(request: FileTransferDeleteRequest): Promise<void>;
        protected processDeleteFiles(response: Response): Promise<void>;
        /**
         * Import transfer
         * @param transferId ID of transfer.
         * @param request The ImportTransfer request.
         * @return Transfer
         */
        importTransfer(transferId: string, request: ImportTransferRequest): Promise<Transfer>;
        protected processImportTransfer(response: Response): Promise<Transfer>;
        /**
         * Import transfer partially
         * @param transferId ID of transfer.
         * @param request The ImportTransferPartial request.
         * @return Transfer
         */
        partialImport(transferId: string, request: ImportTransferPartialRequest): Promise<Transfer>;
        protected processPartialImport(response: Response): Promise<Transfer>;
        /**
         * Upload file
         * @param relativePath Relative path of the uploading file.
         * @param chunkNumber Current chunk number. Starts at 1.
         * @param currentChunkSize Size in bytes of the current chunk.
         * @param totalSize Total size in bytes of the uploading file.
         * @param totalChunks Total chunks of the uploading file.
         * @param transferId ID of transfer.
         * @param identifier Identifier of file.
         * @param formFile (optional) Gets or sets the form file.
         * @return OK
         */
        uploadFile(relativePath: string | null, chunkNumber: number, currentChunkSize: number, totalSize: number, totalChunks: number, transferId: string, identifier: string, formFile?: FileParameter | null | undefined): Promise<void>;
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
         * Create a new user (without inviting him)
         */
        create(request: UserCreateRequest): Promise<UserDetail>;
        protected processCreate(response: Response): Promise<UserDetail>;
        /**
         * Get by id
         * @param userId The user id
         * @return UserDetail
         */
        get(userId: string): Promise<UserDetail>;
        protected processGet(response: Response): Promise<UserDetail>;
        /**
         * Updates one or more users
         */
        update(userId: string, userUpdatableDetail: UserUpdateRequest): Promise<UserDetail>;
        protected processUpdate(response: Response): Promise<UserDetail>;
        /**
         * Search for users
         * @param searchRequest The user search request
         * @return UserSearchResult
         */
        search(searchRequest: UserSearchRequest): Promise<UserSearchResult>;
        protected processSearch(response: Response): Promise<UserSearchResult>;
        /**
         * Get by owner token
         * @param tokenId The token id
         * @return UserDetail
         */
        getByOwnerToken(tokenId: string): Promise<UserDetail>;
        protected processGetByOwnerToken(response: Response): Promise<UserDetail>;
        /**
         * Get multiple user details by supplying their ID's
         * @param ids The user ID's
         * @return IEnumerable&lt;UserDetail&gt;
         */
        getMany(ids: string[] | null): Promise<UserDetail[]>;
        protected processGetMany(response: Response): Promise<UserDetail[]>;
        /**
         * Searches and aggregates users by different attributes
         */
        aggregate(userAggregationRequest: UserAggregationRequest): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Locks or unlocks one or more users
         */
        lock(userId: string, userLockRequest: UserLockRequest): Promise<void>;
        protected processLock(response: Response): Promise<void>;
        /**
         * Sets one or more users as reviewed or under review
         */
        review(userId: string, userReviewRequest: UserReviewRequest): Promise<void>;
        protected processReview(response: Response): Promise<void>;
        /**
         * Invites (or creates) new users
         */
        invite(userId: string): Promise<void>;
        protected processInvite(response: Response): Promise<void>;
        /**
         * Deletes a user
         */
        delete(userId: string, userDeactivateRequest: UserDeleteRequest): Promise<void>;
        protected processDelete(response: Response): Promise<void>;
        /**
         * Restores a previously deleted user
         */
        restore(userId: string): Promise<void>;
        protected processRestore(response: Response): Promise<void>;
    }
    export class UserRoleClient extends PictureparkClientBase {
        private http;
        private baseUrl;
        protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
        constructor(configuration: AuthClient, baseUrl?: string, http?: {
            fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
        });
        /**
         * Get all roles
         * @return UserDetail
         */
        getAll(): Promise<UserRole[]>;
        protected processGetAll(response: Response): Promise<UserRole[]>;
        /**
         * Create a new user role
         * @param request Create request
         */
        create(request: UserRoleCreateRequest): Promise<UserRole>;
        protected processCreate(response: Response): Promise<UserRole>;
        /**
         * Get by id
         * @param userRoleId The user role id
         * @return UserDetail
         */
        get(userRoleId: string): Promise<UserRole>;
        protected processGet(response: Response): Promise<UserRole>;
        /**
         * Search for user roles
         * @param searchRequest The user role search request
         * @return UserRoleSearchResult
         */
        search(searchRequest: UserRoleSearchRequest): Promise<UserRoleSearchResult>;
        protected processSearch(response: Response): Promise<UserRoleSearchResult>;
        /**
         * Create multiple new user roles
         * @param request Create request
         */
        createMany(request: UserRoleCreateManyRequest): Promise<BulkResponse>;
        protected processCreateMany(response: Response): Promise<BulkResponse>;
        /**
         * Update multiple user roles
         * @param request Update request
         */
        updateMany(request: UserRoleUpdateManyRequest): Promise<BulkResponse>;
        protected processUpdateMany(response: Response): Promise<BulkResponse>;
        /**
         * Deletes multiple user roles
         * @param request Delete request
         */
        deleteMany(request: UserRoleDeleteManyRequest): Promise<BulkResponse>;
        protected processDeleteMany(response: Response): Promise<BulkResponse>;
    }
    export interface BusinessProcessSearchRequest {
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        filter?: FilterBase | undefined;
        searchString?: string | undefined;
        searchBehaviours?: SearchBehaviour[] | undefined;
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
    export enum SearchBehaviour {
        DropInvalidCharactersOnFailure,
        WildcardOnSingleTerm
    }
    export interface BaseResultOfBusinessProcess {
        totalResults: number;
        results: BusinessProcess[];
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
        User
    }
    export enum BusinessProcessLifeCycle {
        Draft,
        InProgress,
        Succeeded,
        Cancelled,
        CancellationInProgress,
        Failed,
        SucceededWithErrors
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
    export interface QueryDebugInformation {
        general?: string | undefined;
        auditTrail?: string | undefined;
        request?: any | undefined;
        response?: any | undefined;
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
    export enum TraceLevel {
        Critical,
        Error,
        Warning,
        Information,
        Verbose
    }
    export interface PictureparkBusinessException extends PictureparkException {
        customerId?: string | undefined;
        customerAlias?: string | undefined;
        userId?: string | undefined;
    }
    export interface PictureparkValidationException extends PictureparkBusinessException {
    }
    export interface PictureparkConflictException extends PictureparkBusinessException {
        reference?: string | undefined;
    }
    export interface PictureparkTimeoutException extends PictureparkValidationException {
    }
    export interface PictureparkForbiddenException extends PictureparkBusinessException {
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
    export interface UserInactiveOrDeletedException extends PictureparkForbiddenException {
    }
    export interface TermsOfServiceNotNewestException extends PictureparkBusinessException {
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
    export interface PictureparkNotFoundException extends PictureparkBusinessException {
        reference?: string | undefined;
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
    export interface ShareExpiredException extends PictureparkBusinessException {
        token?: string | undefined;
    }
    export interface OutputIdNotFoundException extends PictureparkNotFoundException {
        outputId?: string | undefined;
    }
    export interface OutputNotFoundException extends PictureparkBusinessException {
        contentId?: string | undefined;
        outputFormatId?: string | undefined;
    }
    export interface LeaseNotAcquiredException extends PictureparkBusinessException {
        resourceId?: string | undefined;
    }
    export interface OperationInProgressException extends PictureparkBusinessException {
        leaseResourceType: LeaseResourceType;
    }
    export enum LeaseResourceType {
        SchemaEditing
    }
    export interface RetryException extends PictureparkBusinessException {
        retries: number;
        innerExceptionDetail?: string | undefined;
    }
    export interface OwnerTokenNotFoundException extends PictureparkNotFoundException {
        ownerTokenUserIds?: string[] | undefined;
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
        ManageTransfer,
        ManageChannels,
        ManageSchemas,
        ManageUsers,
        ManageUserRoles,
        ManagePermissions,
        ManageSearchIndexes,
        ManageCollections,
        ManageListItems,
        ManageServiceProviders,
        ManageEmbeds,
        ManageTemplates,
        ManageTermsOfService
    }
    export interface PermissionSetNotFoundException extends PictureparkNotFoundException {
        permissionSetIds?: string[] | undefined;
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
        listItemIds?: string[] | undefined;
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
        WebDownload,
        SchemaImport
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
        oldTypeName?: string | undefined;
        newTypeName?: string | undefined;
    }
    export interface SchemaFieldIndexException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
    }
    export interface SchemaFieldNotSortableException extends PictureparkValidationException {
        fieldId?: string | undefined;
        schemaId?: string | undefined;
    }
    export interface SchemaFieldNotSearchableException extends PictureparkValidationException {
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
        Struct
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
    export interface SchemaFieldRelationSchemaSystemSchemaException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        relationSchemaId?: string | undefined;
    }
    export interface SchemaFieldRelationSchemaTypeUnsupportedException extends PictureparkValidationException {
        schemaId?: string | undefined;
        fieldId?: string | undefined;
        relationSchemaId?: string | undefined;
    }
    export interface SchemaMultipleTypesException extends PictureparkValidationException {
        schemaId?: string | undefined;
        schemaTypes?: string[] | undefined;
    }
    export interface MissingDisplayPatternForCustomerDefaultLanguageException extends PictureparkValidationException {
        schemaId?: string | undefined;
        missingTypes?: DisplayPatternType[] | undefined;
    }
    export enum DisplayPatternType {
        Thumbnail,
        List,
        Detail,
        Name
    }
    export interface DeleteContentsWithRelationsException extends PictureparkValidationException {
        relationList?: string[] | undefined;
        relations?: string | undefined;
    }
    export interface ContentMetadataUpdateManyException extends PictureparkBusinessException {
        failedItemsCount: number;
        totalItemsCount: number;
    }
    export interface ContentNotFoundException extends PictureparkNotFoundException {
        contentIds?: string[] | undefined;
    }
    export interface ContentLayerInvalidException extends PictureparkValidationException {
        contentId?: string | undefined;
        layerIds?: string | undefined;
    }
    export interface ContentFileReplaceTypeMismatchException extends PictureparkValidationException {
        contentId?: string | undefined;
        originalContentType: ContentType;
        newContentType: ContentType;
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
        ContentItem
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
        environmentProcessType: EnvironmentProcessType;
    }
    export enum EnvironmentProcessType {
        AddMetadataLanguage,
        CustomerUpdate,
        EnvironmentUpdate
    }
    export interface EnvironmentProcessNotFoundException extends PictureparkNotFoundException {
        environmentProcessId?: string | undefined;
    }
    export interface EnvironmentProcessWaitTimeoutException extends PictureparkTimeoutException {
        environmentProcessId?: string | undefined;
        waitedLifecycles?: string | undefined;
    }
    export interface NoTermsOfServiceDefinedException extends PictureparkBusinessException {
    }
    export interface AtLeastOneActiveTermsOfServiceMustExistException extends PictureparkValidationException {
    }
    export interface ForbiddenHtmlElementsUsedException extends PictureparkValidationException {
    }
    export interface BusinessProcessStateNotHitException extends PictureparkTimeoutException {
        businessProcessId?: string | undefined;
        expected?: string[] | undefined;
        actual?: string | undefined;
    }
    export interface BusinessProcessLifeCycleNotHitException extends PictureparkTimeoutException {
        businessProcessId?: string | undefined;
        expected?: BusinessProcessLifeCycle[] | undefined;
        actual: BusinessProcessLifeCycle;
    }
    export interface BusinessProcessWaitForLifeCycleResult {
        lifeCycleHit?: BusinessProcessLifeCycle | undefined;
        businessProcess?: BusinessProcess | undefined;
    }
    export interface BusinessProcessWaitForStateResult {
        stateHit?: string | undefined;
        businessProcess?: BusinessProcess | undefined;
    }
    export interface BusinessProcessDetails extends BusinessProcess {
        details?: BusinessProcessDetailsDataBase | undefined;
    }
    export interface BusinessProcessDetailsDataBase {
    }
    export interface BusinessProcessDetailsDataBatchResponse extends BusinessProcessDetailsDataBase {
        docType?: string | undefined;
        response?: BatchResponse | undefined;
    }
    export interface BatchResponse {
        rows?: BatchResponseRow[] | undefined;
    }
    export interface BatchResponseRow {
        id?: string | undefined;
        succeeded: boolean;
        status: number;
        version: number;
        error?: ErrorResponse | undefined;
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
    export interface BusinessProcessDetailsDataCdnPurge extends BusinessProcessDetailsDataBase {
        serializedCdnConfiguration?: string | undefined;
        jobs?: CdnPurgeJobBase[] | undefined;
    }
    export interface CdnPurgeJobBase {
        success: boolean;
        retriesLeft: number;
    }
    export interface CdnPurgeJobByTag extends CdnPurgeJobBase {
        tag?: string | undefined;
    }
    export interface CdnPurgeJobByUri extends CdnPurgeJobBase {
        uri?: string | undefined;
    }
    export interface BusinessProcessDetailsDataContentImport extends BusinessProcessDetailsDataBase {
        items?: ContentImportResult[] | undefined;
    }
    export interface ContentImportResult {
        fileTransferId?: string | undefined;
        contentId?: string | undefined;
        state?: string | undefined;
        succeeded: boolean;
        error?: ErrorResponse | undefined;
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
        /** User roles granted access to the channel. */
        grantedUserRoleIds?: string[] | undefined;
        /** Display pattern to use for rendering details when 0 results are returned */
        missingResultsDisplayPatterns?: TranslatedStringDictionary | undefined;
        audit?: UserAudit | undefined;
    }
    export interface SortInfo {
        /** The elastic search index field to sort on. */
        field?: string | undefined;
        /** The sort direction (Asc/Desc). */
        direction: SortDirection;
    }
    export enum SortDirection {
        Asc,
        Desc
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
        Owner
    }
    /** The TermsRelationAggregator is derived from the TermsAggregator and used for aggregations on indexed enum values. */
    export interface TermsEnumAggregator extends TermsAggregator {
        /** When aggregating on enum fields EnumType is needed to resolve the enum translation. */
        enumType?: string | undefined;
    }
    export interface UserAudit {
        creationDate: Date;
        modificationDate: Date;
        createdByUser?: string | undefined;
        modifiedByUser?: string | undefined;
    }
    export enum ContentResolveBehaviour {
        Content,
        LinkedListItems,
        Metadata,
        Outputs,
        InnerDisplayValueThumbnail,
        InnerDisplayValueList,
        InnerDisplayValueDetail,
        InnerDisplayValueName
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
    export interface DisplayValueDictionary {
        [key: string]: string | any;
    }
    export interface DataDictionary {
        [key: string]: any;
    }
    export interface Output {
        id?: string | undefined;
        outputFormatId?: string | undefined;
        contentId?: string | undefined;
        renderingState: OutputRenderingState;
        detail?: OutputDataBase | undefined;
        backupTimestamp?: Date | undefined;
    }
    export enum OutputRenderingState {
        InProgress,
        Completed,
        Failed,
        Skipped
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
    export enum LifeCycleFilter {
        ActiveOnly,
        All,
        InactiveOnly,
        ActiveInactiveOnly
    }
    export enum BrokenDependenciesFilter {
        All,
        NotBrokenOnly,
        BrokenOnly
    }
    export enum ContentRight {
        View,
        AccessOriginal,
        Edit,
        Update,
        Manage,
        Trash
    }
    export enum ContentSearchType {
        Metadata,
        FullText,
        MetadataAndFullText
    }
    export interface BaseResultOfContent {
        totalResults: number;
        results: Content[];
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
    export interface ContentReferencesRequest {
        shares?: PagingRequest | undefined;
    }
    export interface PagingRequest {
        start: number;
        limit: number;
    }
    export interface ContentReferencesResult {
        metadataReferences?: ContentReferences[] | undefined;
        shareReferences?: ContentShareReferenceResult | undefined;
    }
    export interface ReferencesBase {
        targetMetadataItemId?: string | undefined;
        references?: MetadataReference[] | undefined;
        isReferencedByRestrictedItem: boolean;
    }
    export interface ContentReferences extends ReferencesBase {
        relations?: MetadataReference[] | undefined;
    }
    export interface MetadataReference {
        targetDocType?: string | undefined;
        sourceId?: string | undefined;
        sourceDocType?: string | undefined;
    }
    export interface BaseResultOfContentShareReference {
        totalResults: number;
        results: ContentShareReference[];
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface ContentShareReferenceResult extends BaseResultOfContentShareReference {
    }
    export interface ContentShareReference {
        id?: string | undefined;
        name?: string | undefined;
        audit?: UserAudit | undefined;
        shareType: ShareType;
        emailAddress?: string | undefined;
    }
    export enum ShareType {
        Basic,
        Embed
    }
    export interface ContentManyReferencesRequest {
        contentIds?: string[] | undefined;
        shares?: PagingRequest | undefined;
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
        Large
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
        /** Create items */
        items?: ContentCreateRequest[] | undefined;
    }
    export interface ContentDeleteManyRequest {
        contentIds?: string[] | undefined;
        forceReferenceRemoval: boolean;
    }
    export interface ContentRestoreManyRequest {
        contentIds?: string[] | undefined;
        allowMissingDependencies: boolean;
    }
    export interface ContentFileUpdateRequest {
        fileTransferId?: string | undefined;
    }
    export interface ContentMetadataUpdateRequest {
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
        Replace
    }
    export interface ContentPermissionsUpdateRequest {
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        contentPermissionSetIds?: string[] | undefined;
    }
    /** Update many contents metadata */
    export interface ContentMetadataUpdateManyRequest {
        /** Allow storing references to missing list items */
        allowMissingDependencies: boolean;
        /** Update items */
        items?: ContentMetadataUpdateItem[] | undefined;
    }
    export interface ContentMetadataUpdateItem extends ContentMetadataUpdateRequest {
        /** The content id. */
        id?: string | undefined;
    }
    export interface ContentPermissionsUpdateManyRequest {
        /** List of Content Permissions update items */
        items?: ContentPermissionsUpdateItem[] | undefined;
    }
    export interface ContentPermissionsUpdateItem extends ContentPermissionsUpdateRequest {
        /** The content id. */
        contentId?: string | undefined;
    }
    export interface ContentOwnershipTransferRequest {
        /** The id of the user to whom the content document has to be transfered to. */
        transferUserId?: string | undefined;
    }
    export interface ContentOwnershipTransferManyRequest {
        /** List of Content Permissions ownership transfer requests */
        items?: ContentOwnershipTransferItem[] | undefined;
    }
    export interface ContentOwnershipTransferItem extends ContentOwnershipTransferRequest {
        /** The content id. */
        contentId?: string | undefined;
    }
    export interface MetadataValuesChangeRequestBase {
        /** A container for all change commads. */
        changeCommands?: MetadataValuesChangeCommandBase[] | undefined;
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Create notification and notify on progress */
        notifyProgress: boolean;
    }
    export interface ContentFieldsBatchUpdateRequest extends MetadataValuesChangeRequestBase {
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
    export interface ContentFieldsBatchUpdateFilterRequest extends MetadataValuesChangeRequestBase {
        filterRequest?: ContentFilterRequest | undefined;
    }
    export interface ContentFilterRequest {
        /** Limits the simple search fields to the fields available in the specified channel. */
        channelId?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
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
        /** Filter the content document result set to those that have or not have broken references */
        brokenDependenciesFilter: BrokenDependenciesFilter;
        /** Limits the content document result set to specific ContentRights the user has */
        rightsFilter?: ContentRight[] | undefined;
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
        searchLanguages?: string[] | undefined;
    }
    export enum PermissionSetRight {
        Apply,
        Manage
    }
    export interface BaseResultOfPermissionSet {
        totalResults: number;
        results: PermissionSet[];
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
        /** When true this permission set will derogate all other configured permission sets. */
        exclusive: boolean;
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
        ownerTokenId?: string | undefined;
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
    export interface DocumentHistorySearchRequest {
        /** Limits the start date of the search request. Default to last 1 year. */
        from: Date;
        /** Limits the end date of the search request. Default to now. */
        to: Date;
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
        Deactivate
    }
    export interface DocumentHistoryDifference {
        documentId?: string | undefined;
        oldDocumentVersion: number;
        newDocumentVersion: number;
        oldValues?: any | undefined;
        newValues?: any | undefined;
    }
    export interface CustomerInfo {
        customerId?: string | undefined;
        name?: string | undefined;
        customerAlias?: string | undefined;
        identityServerUrl?: string | undefined;
        enableQueryDetails: boolean;
        languageConfiguration?: LanguageConfiguration | undefined;
        languages?: Language[] | undefined;
        outputFormats?: OutputFormatInfo[] | undefined;
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
        name?: TranslatedStringDictionary | undefined;
        ietf?: string | undefined;
        twoLetterISOLanguageName?: string | undefined;
        threeLetterISOLanguageName?: string | undefined;
        regionCode?: string | undefined;
    }
    export interface OutputFormatInfo {
        id?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
    }
    export enum ListItemResolveBehaviour {
        Content,
        LinkedListItems,
        InnerDisplayValueThumbnail,
        InnerDisplayValueList,
        InnerDisplayValueDetail,
        InnerDisplayValueName
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
        results: ListItem[];
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
        /** Create items */
        items?: ListItemCreateRequest[] | undefined;
    }
    /** A request structure for updating a list item. */
    export interface ListItemUpdateRequest {
        /** The content data of the list item. */
        content?: any | undefined;
    }
    /** A request structure for updating multiple list items. */
    export interface ListItemUpdateManyRequest {
        /** Allow storing references to missing list items / contents */
        allowMissingDependencies: boolean;
        /** Update items */
        items?: ListItemUpdateItem[] | undefined;
    }
    export interface ListItemUpdateItem extends ListItemUpdateRequest {
        /** The list item id. */
        id?: string | undefined;
    }
    export interface ListItemDeleteManyRequest {
        listItemIds?: string[] | undefined;
        forceReferenceRemoval: boolean;
    }
    export interface ListItemRestoreManyRequest {
        listItemIds?: string[] | undefined;
        allowMissingDependencies: boolean;
    }
    export interface ListItemFieldsBatchUpdateRequest {
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
    export interface ListItemFieldsBatchUpdateFilterRequest {
        /** The search request used to filter the list items on which the change commands must be applied */
        filterRequest?: ListItemFilterRequest | undefined;
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
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
        /** Filter the returned list items that have or not have broken references */
        brokenDependenciesFilter: BrokenDependenciesFilter;
    }
    export interface ListItemReferences extends ReferencesBase {
    }
    export interface LiveStreamSearchRequest {
        /** Limits the start date of the search request. */
        from: Date;
        /** Limits the end date of the search request. */
        to: Date;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** To get a large amount of data, page token returned from the response can be used to get all data. */
        pageToken?: string | undefined;
    }
    export interface BaseResultOfObject {
        totalResults: number;
        results: any[];
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
    export interface OutputSearchRequest {
        /** Defines the offset from the first result you want to fetch. Defaults to 0. */
        start: number;
        /** Limits the document count of the result set. Defaults to 30. */
        limit: number;
        /** List of Content ids you want to use to fetch the outputs. */
        contentIds?: string[] | undefined;
        /** The allowed rendering states of the outputs you want to fetch. */
        renderingStates?: OutputRenderingState[] | undefined;
        /** The file extension of the outputs you want to fetch. */
        fileExtensions?: string[] | undefined;
        /** The output format id of the outputs you want to fetch. */
        outputFormatIds?: string[] | undefined;
    }
    export interface BaseResultOfOutput {
        totalResults: number;
        results: Output[];
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface OutputSearchResult extends BaseResultOfOutput {
    }
    export interface UserProfile {
        id?: string | undefined;
        emailAddress?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        languageCode?: string | undefined;
        address?: UserAddress | undefined;
        authorizationState: AuthorizationState;
        userRights?: UserRight[] | undefined;
        userRoleIds?: string[] | undefined;
        termsConsentExpired: boolean;
        systemUserRoles?: SystemUserRole[] | undefined;
        isDeveloper: boolean;
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
    export enum AuthorizationState {
        Reviewed,
        ToBeReviewed,
        Locked,
        Invited
    }
    export enum SystemUserRole {
        Administrator
    }
    export interface UserProfileUpdateRequest {
        id?: string | undefined;
        emailAddress?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        languageCode?: string | undefined;
        address?: UserAddress | undefined;
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
        expired: boolean;
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
        None
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
        DotLiquid
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
        type: Analyzer;
        fieldSuffix?: string | undefined;
    }
    export enum Analyzer {
        None,
        Simple,
        Language,
        PathHierarchy,
        EdgeNGram,
        NGram
    }
    /** An analyzer using a language analyzer. Restricted to the languages supported by elastic search. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html */
    export interface LanguageAnalyzer extends AnalyzerBase {
        type: Analyzer;
        fieldSuffix?: string | undefined;
    }
    /** An analyzer using the NGram tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html */
    export interface NGramAnalyzer extends AnalyzerBase {
        type: Analyzer;
        fieldSuffix?: string | undefined;
    }
    /** An analyzer using the path hierarchy tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pathhierarchy-tokenizer.html */
    export interface PathHierarchyAnalyzer extends AnalyzerBase {
        type: Analyzer;
        fieldSuffix?: string | undefined;
    }
    /** An analyzer using a custom pattern tokenizer. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-tokenizer.html */
    export interface SimpleAnalyzer extends AnalyzerBase {
        type: Analyzer;
        fieldSuffix?: string | undefined;
    }
    /** For internal use only (system schemas) */
    export interface FieldStringArray extends FieldString {
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
        searchLanguages?: string[] | undefined;
    }
    export interface BaseResultOfSchema {
        totalResults: number;
        results: Schema[];
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
    export interface IndexFieldsSearchBySchemaIdsRequest {
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
        simpleSearchFields?: {
            [key: string]: string;
        } | undefined;
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
    export interface SchemaCreateResult {
        schema?: SchemaDetail | undefined;
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
    export interface SchemaUpdateResult {
        schema?: SchemaDetail | undefined;
    }
    export interface SchemaDeleteResult {
    }
    export interface PermissionSetDetailOfMetadataRight {
        id?: string | undefined;
        names?: TranslatedStringDictionary | undefined;
        trashed: boolean;
        userRolesRights?: PermissionUserRoleRightsOfMetadataRight[] | undefined;
        userRolesPermissionSetRights?: PermissionUserRoleRightsOfPermissionSetRight[] | undefined;
        exclusive: boolean;
        ownerTokenId?: string | undefined;
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
        Manage
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
    /** Represents a transfer. */
    export interface Transfer {
        /** ID of transfer. */
        id: string;
        /** Name of transfer. */
        name: string;
        /** State of transfer. */
        state: TransferState;
        /** Type of transfer. */
        transferType: TransferType;
        /** Associated business process ID. */
        businessProcessId?: string | undefined;
        /** Number of files in transfer. */
        fileTransferCount: number;
        /** ID of collection created from transfer. */
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
        ImportCompletedWithErrors
    }
    export interface CustomerServiceProviderConfiguration {
        serviceProviderId?: string | undefined;
        customerId?: string | undefined;
        userRoleIds?: string[] | undefined;
        settings?: string | undefined;
    }
    export interface ServiceProviderConfigurationUpdateRequest {
        customerId?: string | undefined;
        settings?: string | undefined;
        userRoleIds?: string[] | undefined;
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
        results: Share[];
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
    export interface ShareDeleteManyRequest {
        ids?: string[] | undefined;
    }
    /** Represents a transfer and includes detailed information. */
    export interface TransferDetail extends Transfer {
        /** Audit information. */
        audit: UserAudit;
        /** Number of items processed. */
        itemProgress: number;
        /** Total number of items. */
        itemCount: number;
        /** Number of items currently being uploaded. */
        fileUploadInProgressCount: number;
        /** Number of items currently being processed in data extraction. */
        dataExtractionInProgressCount: number;
        /** Number of items failed. */
        itemsFailed: number;
        /** Number of items cancelled. */
        itemsCancelled: number;
        /** Time stamp of last progress update from data extraction. */
        lastDataExtractionProgressStamp: number;
        /** LastTime stamp of last progress update from upload. */
        lastFileUploadProgressStamp: number;
    }
    /** Request to search for transfers. */
    export interface TransferSearchRequest {
        searchString?: string | undefined;
        searchBehaviours?: SearchBehaviour[] | undefined;
        start: number;
        limit: number;
        filter?: FilterBase | undefined;
    }
    export interface BaseResultOfTransfer {
        totalResults: number;
        results: Transfer[];
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfTransfer extends BaseResultOfTransfer {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    /** Result from a search for transfers. */
    export interface TransferSearchResult extends SearchBehaviourBaseResultOfTransfer {
        /** Time in milliseconds query took to execute. */
        elapsedMilliseconds: number;
    }
    /** Creates a transfer. */
    export interface CreateTransferRequest {
        /** Name of transfer. */
        name: string;
        /** Type of transfer. */
        transferType: TransferType;
        /** Files uploaded in transfer. */
        files?: TransferUploadFile[] | undefined;
        /** Weblinks downloaded in transfer. */
        webLinks?: TransferWebLink[] | undefined;
        /** Name of collection created after transfer. */
        collectionName?: string | undefined;
        /** A value indicating whether to create a Collection after importing the transfer. */
        createCollection: boolean;
    }
    /** Represents the base class for transfer items. */
    export interface TransferFile {
        /** Client generated identifier of the item. */
        identifier: string;
    }
    /** Represents a file being uploaded in a transfer. */
    export interface TransferUploadFile extends TransferFile {
        /** Target filename of file. */
        fileName: string;
    }
    /** Represents an item being downloaded by URL in a transfer. */
    export interface TransferWebLink extends TransferFile {
        /** URL of the item. */
        url: string;
    }
    /** Representation of a file transfer. */
    export interface FileTransfer {
        /** ID of file transfer. */
        id: string;
        /** Name of file transfer. */
        name: string;
        /** Client provided identifier. */
        identifier: string;
        /** ID of transfer. */
        transferId: string;
        /** State of file transfer. */
        state: FileTransferState;
        /** ID of Content created for file. */
        contentId?: string | undefined;
    }
    /** Detailed representation of file transfer. */
    export interface FileTransferDetail extends FileTransfer {
        /** Audit information. */
        audit: UserAudit;
        /** Metadata extracted for file. */
        fileMetadata?: FileMetadata | undefined;
        /** Outputs being rendered for file. */
        outputItems?: FileTransferOutput[] | undefined;
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
    export interface FileTransferOutput {
        id?: string | undefined;
        filePath?: string | undefined;
        outputSource: OutputSource;
    }
    export enum OutputSource {
        Rendered,
        Embedded
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
        CleanupCompleted
    }
    /** Request to search for file transfers. */
    export interface FileTransferSearchRequest {
        searchString?: string | undefined;
        searchBehaviours?: SearchBehaviour[] | undefined;
        start: number;
        limit: number;
        filter?: FilterBase | undefined;
    }
    export interface BaseResultOfFileTransfer {
        totalResults: number;
        results: FileTransfer[];
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfFileTransfer extends BaseResultOfFileTransfer {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    /** Result from a search for file transfers. */
    export interface FileTransferSearchResult extends SearchBehaviourBaseResultOfFileTransfer {
        /** Time in milliseconds query took to execute. */
        elapsedMilliseconds: number;
    }
    /** Blacklist containing file name patterns skipped when uploading. */
    export interface Blacklist {
        /** Blacklist entries. */
        items: BlacklistItem[];
    }
    /** Entry in the Blacklist. */
    export interface BlacklistItem {
        /** Friendly name of item. */
        name: string;
        /** Pattern a file name must match to be excluded from the transfer. */
        match: string;
    }
    /** Deletes files from transfer. */
    export interface FileTransferDeleteRequest {
        /** ID of transfer. */
        transferId: string;
        /** List of IDs of file transfers to delete. */
        fileTransferIds: string[];
    }
    export interface ImportTransferRequest {
        /** An optional id list of schemas with type layer. */
        layerSchemaIds?: string[] | undefined;
        metadata?: DataDictionary | undefined;
        /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
        contentPermissionSetIds?: string[] | undefined;
    }
    export interface ImportTransferPartialRequest {
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
    export interface UserCreateRequest {
        firstName?: string | undefined;
        lastName?: string | undefined;
        emailAddress?: string | undefined;
        languageCode?: string | undefined;
        userRoleIds?: string[] | undefined;
        address?: UserAddress | undefined;
    }
    export interface UserUpdateRequest extends User {
        userRoles?: UserRole[] | undefined;
        comment?: string | undefined;
        languageCode?: string | undefined;
        address?: UserAddress | undefined;
    }
    export interface UserDetail extends UserUpdateRequest {
        ownerTokens?: OwnerToken[] | undefined;
        authorizationState: AuthorizationState;
        lifeCycle: LifeCycle;
        isSupportUser: boolean;
        isReadOnly: boolean;
    }
    export interface OwnerToken {
        /** The ownertoken id. */
        id?: string | undefined;
        /** The id of the user to whom this ownertoken currently belongs to. */
        userId?: string | undefined;
    }
    export enum LifeCycle {
        Draft,
        Active,
        Inactive,
        Deleted
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
        results: UserWithRoles[];
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
        authorizationState: AuthorizationState;
        lifeCycle: LifeCycle;
        isSupportUser: boolean;
        isReadOnly: boolean;
    }
    export interface UserAggregationRequest {
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        sort?: SortInfo[] | undefined;
        /** An optional search filter. Limits the content document result set. */
        filter?: FilterBase | undefined;
        aggregationFilters?: AggregationFilter[] | undefined;
        aggregators?: AggregatorBase[] | undefined;
    }
    export interface UserLockRequest {
        lock: boolean;
    }
    export interface UserReviewRequest {
        reviewed: boolean;
    }
    export interface UserDeleteRequest {
        ownerTokenTransferUserId?: string | undefined;
    }
    export interface UserRoleSearchRequest {
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
        /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
        debugMode: boolean;
        searchLanguages?: string[] | undefined;
    }
    export interface BaseResultOfUserRole {
        totalResults: number;
        results: UserRole[];
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfUserRole extends BaseResultOfUserRole {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface UserRoleSearchResult extends SearchBehaviourBaseResultOfUserRole {
        elapsedMilliseconds: number;
    }
    export interface UserRoleCreateRequest {
        names?: TranslatedStringDictionary | undefined;
        userRights?: UserRight[] | undefined;
    }
    export interface UserRoleCreateManyRequest {
        items?: UserRoleCreateRequest[] | undefined;
    }
    export interface UserRoleUpdateManyRequest {
        items?: UserRoleDetail[] | undefined;
    }
    export interface UserRoleDetail {
        /** The user role id. */
        id?: string | undefined;
        trashed: boolean;
        /** Language specific user role names. */
        names?: TranslatedStringDictionary | undefined;
        /** All user rights for this user role. */
        userRights?: UserRight[] | undefined;
    }
    export interface UserRoleDeleteManyRequest {
        ids?: string[] | undefined;
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

