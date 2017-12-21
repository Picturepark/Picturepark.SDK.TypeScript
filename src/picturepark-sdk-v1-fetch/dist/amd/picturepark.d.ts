
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
         * @contentCreateRequests The content create requests.
         */
        createMany(contentCreateRequests: ContentCreateRequest[] | null): Promise<BusinessProcess>;
        protected processCreateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Search
         * @contentSearchRequest The content search request.
         * @return ContentSearchResult
         */
        search(contentSearchRequest: ContentSearchRequest | null): Promise<ContentSearchResult>;
        protected processSearch(response: Response): Promise<ContentSearchResult>;
        /**
         * Search by channel
         * @channelId The channel id.
         * @contentSearchRequest The content search request.
         * @return ContentSearchResult
         */
        searchByChannel(channelId: string, contentSearchRequest: ContentSearchRequest | null): Promise<ContentSearchResult>;
        protected processSearchByChannel(response: Response): Promise<ContentSearchResult>;
        /**
         * Aggregate
         * @contentAggregationRequest The aggregation request.
         * @return ObjectAggregationResult
         */
        aggregate(contentAggregationRequest: ContentAggregationRequest | null): Promise<ObjectAggregationResult>;
        protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
        /**
         * Aggregate by channel
         * @channelId The channel id
         * @contentAggregationRequest The content aggregation request.
         * @return ObjectAggregationResult
         */
        aggregateByChannel(channelId: string, contentAggregationRequest: ContentAggregationRequest | null): Promise<ObjectAggregationResult>;
        protected processAggregateByChannel(response: Response): Promise<ObjectAggregationResult>;
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
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) List of display pattern types. Resolves display values of referenced list items where the display pattern matches.
         */
        create(contentCreateRequest: ContentCreateRequest | null, resolve: boolean, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ContentDetail>;
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
         * @return ContentDetail
         */
        reactivate(contentId: string, resolve: boolean, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ContentDetail>;
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
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ListItemDetail
         */
        update(listItemId: string, updateRequest: ListItemUpdateRequest | null, resolve: boolean, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ListItemDetail>;
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
         * @timeout (optional) Maximum time to wait for the business process completed state.
         * @patterns (optional) Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
         * @return ListItemDetail
         */
        create(listItemCreateRequest: ListItemCreateRequest | null, resolve: boolean, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ListItemDetail>;
        protected processCreate(response: Response): Promise<ListItemDetail>;
        /**
         * Create - many
         * @listItemCreateRequests A list of ListItemCreateRequests.
         * @return BusinessProcess
         */
        createMany(listItemCreateRequests: ListItemCreateRequest[] | null): Promise<BusinessProcess>;
        protected processCreateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Update - many
         * @objects A list of ListItemUpdateRequests.
         * @return BusinessProcess
         */
        updateMany(objects: ListItemUpdateRequest[] | null): Promise<BusinessProcess>;
        protected processUpdateMany(response: Response): Promise<BusinessProcess>;
        /**
         * Deactivate - single
         * @listItemId the id of the list item to deactivate
         * @timeout Maximum time to wait for the business process completed state.
         */
        deactivate(listItemId: string, timeout: string | null): Promise<ListItemDetail>;
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
         * @return ListItemDetail
         */
        reactivate(listItemId: string, timeout?: string | null | undefined, patterns?: DisplayPatternType[] | null | undefined): Promise<ListItemDetail>;
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
    export interface ContentNotFoundException extends PictureparkBusinessException {
        contentId?: string | undefined;
    }
    export enum TraceLevel {
        Critical,
        Error,
        Warning,
        Information,
        Verbose,
    }
    export interface PictureparkApplicationException extends PictureparkBusinessException {
    }
    export interface PictureparkArgumentNullException extends PictureparkBusinessException {
        argumentName?: string | undefined;
    }
    export interface ContentsNotFoundException extends PictureparkBusinessException {
        contentIds?: string[] | undefined;
    }
    export interface BusinessProcessDefinitionCreateException extends PictureparkBusinessException {
        processDefinitionIds?: string[] | undefined;
    }
    export interface BusinessProcessDefinitionNotFoundException extends PictureparkBusinessException {
        processDefinitionId?: string | undefined;
    }
    export interface BusinessProcessNotFoundException extends PictureparkBusinessException {
        businessProcessId?: string | undefined;
    }
    export interface BusinessProcessWaitTimeoutException extends PictureparkBusinessException {
        businessProcessId?: string | undefined;
    }
    export interface CustomerHostNotFoundException extends PictureparkException {
        hostName?: string | undefined;
    }
    export interface CustomerNotFoundException extends PictureparkException {
        customerId?: string | undefined;
    }
    export interface DocumentNotFoundException extends PictureparkBusinessException {
        documentId?: string | undefined;
    }
    export interface DocumentVersionNotFoundException extends PictureparkBusinessException {
        documentId?: string | undefined;
        documentVersion?: string | undefined;
    }
    export interface DriveRequestException extends PictureparkBusinessException {
    }
    export interface DuplicateRightException extends PictureparkBusinessException {
        permissionSetId?: string | undefined;
    }
    export interface DuplicateDocumentException extends PictureparkBusinessException {
        documentId?: string | undefined;
        documentType?: string | undefined;
    }
    export interface DuplicateAggregatorException extends PictureparkBusinessException {
        aggregatorName?: string | undefined;
    }
    export interface FailedToLockException extends PictureparkBusinessException {
        resourceId?: string | undefined;
    }
    export interface IndexException extends PictureparkBusinessException {
        indexName?: string | undefined;
        debugInformation?: string | undefined;
    }
    export interface InvalidArgumentException extends PictureparkBusinessException {
        argumentName?: string | undefined;
        argumentValue?: string | undefined;
    }
    export interface InvalidCustomerException extends PictureparkException {
        customerId?: string | undefined;
    }
    export interface PictureparkInvalidMetadataException extends PictureparkBusinessException {
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
    export interface InvalidStateException extends PictureparkBusinessException {
        resourceId?: string | undefined;
        state?: string | undefined;
    }
    export interface InvalidStateTransitionException extends InvalidStateException {
        transition?: string | undefined;
    }
    export interface InvalidUserOrPasswordException extends PictureparkException {
        customerId?: string | undefined;
    }
    export interface PictureparkMappingException extends PictureparkBusinessException {
        indexName?: string | undefined;
        debugInformation?: string | undefined;
    }
    export interface MessagePerformerTaskCanceledException extends PictureparkException {
        messageId?: string | undefined;
        customerId?: string | undefined;
    }
    export interface NotFoundException extends PictureparkBusinessException {
        reference?: string | undefined;
    }
    export interface ObjectStoreException extends PictureparkBusinessException {
        rowErrorMessages?: string | undefined;
        errorMessage?: string | undefined;
    }
    export interface ObjectStoreResponseException extends PictureparkBusinessException {
        rowErrorMessages?: string | undefined;
        message?: string | undefined;
    }
    export interface PictureparkOperationCanceledException extends PictureparkBusinessException {
    }
    export interface OperationTimeoutException extends PictureparkBusinessException {
    }
    export interface OutputNotFoundException extends PictureparkBusinessException {
        contentId?: string | undefined;
        outputFormatId?: string | undefined;
    }
    export interface PermissionException extends PictureparkBusinessException {
        permission?: string | undefined;
        operation?: string | undefined;
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
    export interface RenderingException extends PictureparkBusinessException {
    }
    export interface RenderingJobItemNotSetException extends PictureparkBusinessException {
    }
    export interface ServiceProviderCreateException extends PictureparkException {
        userId?: string | undefined;
        externalId?: string | undefined;
        virtualHost?: string | undefined;
        detailErrorMessage?: string | undefined;
    }
    export interface ServiceProviderDeleteException extends PictureparkException {
        serviceProviderId?: string | undefined;
        detailedErrorMessage?: string | undefined;
    }
    export interface ServiceProviderNotFoundException extends PictureparkException {
        missingServiceProviderId?: string | undefined;
    }
    export interface TokenValidationException extends PictureparkBusinessException {
    }
    export interface UnknownException extends PictureparkBusinessException {
        exceptionDetail?: string | undefined;
    }
    export interface UserNotFoundException extends PictureparkBusinessException {
        missingUserId?: string | undefined;
    }
    export interface UserPermanentlyRemovedException extends PictureparkBusinessException {
        removedUserId?: string | undefined;
    }
    export interface UserRoleAssignedException extends PictureparkBusinessException {
        userRoleId?: string | undefined;
    }
    export interface UserRolesRightsAssignedException extends PictureparkBusinessException {
        contentPermissionSetId?: string | undefined;
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
        detail?: OutputDetailBase | undefined;
    }
    export interface OutputDetailBase {
        fileExtension?: string | undefined;
        fileName?: string | undefined;
        filePath?: string | undefined;
        fileSizeInBytes?: number | undefined;
        sha1Hash?: string | undefined;
    }
    export interface OutputDetailImage extends OutputDetailBase {
        width: number;
        height: number;
    }
    export interface OutputDetailAudio extends OutputDetailBase {
        durationInSeconds?: number | undefined;
    }
    export interface OutputDetailVideo extends OutputDetailBase {
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
    export interface OutputDetailDocument extends OutputDetailBase {
        pageCount: number;
    }
    export interface OutputDetailDefault extends OutputDetailBase {
    }
    export interface OutputDetail extends Output {
    }
    export interface ContentSearchRequest {
        /** Limits the simple search fields to the fields available in the specified channel. */
        channelIds?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to x-default. */
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
        /** The aggregation filter property. Available filters are TermFilter, DateRangeFilter, NumericRangeFilter and GeoDistanceFilter. */
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
        /** All the ids of the broken relations */
        brokenRelationIds?: string[] | undefined;
    }
    export interface QueryDebugInformation {
        general?: string | undefined;
        auditTrail?: string | undefined;
        request?: any | undefined;
        response?: any | undefined;
    }
    export interface ContentAggregationRequest {
        /** Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. */
        searchString?: string | undefined;
        /** An optional list of search behaviours. All the passed behaviours will be applied */
        searchBehaviours?: SearchBehaviour[] | undefined;
        /** An optional search filter. Limits the content document result set. */
        filter?: FilterBase | undefined;
        /** Special filters used to filter down on a specific aggregated value. */
        aggregationFilters?: AggregationFilter[] | undefined;
        /** Defines the aggregation resultset. */
        aggregators?: AggregatorBase[] | undefined;
        /** Limits the simple search fields to the fields available in the specified channel. */
        channelId?: string | undefined;
        /** Defines the return language of translation values. Defaults to x-default. */
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
        ranges?: DateRange[] | undefined;
    }
    /** The FilterAggregator is a single bucket aggregation of documents that match a specified filter. */
    export interface FilterAggregator extends AggregatorBase {
        /** Limits the result set. */
        filter?: FilterBase | undefined;
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
        ranges?: NumericRange[] | undefined;
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
        temporaryRequestId?: string | undefined;
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
        stateHistory?: BusinessProcessStateItem[] | undefined;
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
    export interface BusinessProcessStateItem {
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
        reason?: string | undefined;
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
    }
    export interface ContentFileUpdateRequest {
        contentId?: string | undefined;
        fileTransferId?: string | undefined;
    }
    export interface ContentMetadataUpdateRequest {
        /** The content id. */
        id?: string | undefined;
        /** An id list of schemas with schema type content or layer. */
        schemaIds?: string[] | undefined;
        /** The dynamic data structure matching the field schematics of the schemas with schema type content or layer. */
        metadata?: DataDictionary | undefined;
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
        totalItemsCount: number;
    }
    export interface ContentFilterRequest {
        /** Limits the simple search fields to the fields available in the specified in the channel. */
        channelIds?: string[] | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
        /** Defines the return language of translation values. Defaults to x-default. */
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
    export interface ListItemNotFoundException extends PictureparkBusinessException {
        listItemId?: string | undefined;
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
        /** Defines the return language of translation values. Defaults to x-default. */
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
        includeMetadata: boolean;
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
        /** Defines the return language of translation values. Defaults to x-default. */
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
    /** A request structure for updating a list item. */
    export interface ListItemUpdateRequest {
        /** The content data of the list item. */
        content?: any | undefined;
        /** The list item id. */
        id?: string | undefined;
    }
    export interface ListItemDeactivateRequest {
        listItemIds?: string[] | undefined;
        forceReferenceRemoval: boolean;
    }
    export interface ListItemReactivateRequest {
        listItemIds?: string[] | undefined;
    }
    export interface ListItemFieldsUpdateRequest {
        /** The ids of the list items whose fields need to be updated */
        listItemIds?: string[] | undefined;
        /** The change commads to be applied to the list items */
        changeCommands?: MetadataValuesChangeCommandBase[] | undefined;
    }
    /** ListItemFieldsFilterUpdateRequest class */
    export interface ListItemFieldsFilterUpdateRequest {
        /** The search request used to filter the list items on which the change commands must be applied */
        listItemFilterRequest?: ListItemFilterRequest | undefined;
        /** The change commads to be applied to the list items */
        changeCommands?: MetadataValuesChangeCommandBase[] | undefined;
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
        /** Defines the return language of translation values. Defaults to x-default. */
        displayLanguage?: string | undefined;
        /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
        searchLanguages?: string[] | undefined;
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
        /** Sorts content documents and/or list items. */
        sort?: SortInfo[] | undefined;
        /** An optional list of aggregations to group content documents and list items. */
        aggregations?: AggregatorBase[] | undefined;
        /** A simple ordering property for schemas. */
        sortOrder: number;
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
    export enum SchemaType {
        Content,
        Layer,
        List,
        Struct,
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
        /** Maps the field in the elastic search index and its values become searchable. */
        index: boolean;
        /** Includes fields in the simple search. Index must be true. */
        simpleSearch: boolean;
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
        analyzers?: AnalyzerBase[] | undefined;
        /** Displays the field value in a multiline component. */
        multiLine: boolean;
        /** Similar to an enumeration valid field values are limited to values of this list. */
        grantedValues?: string[] | undefined;
        /** Priorizes search results. SimpleSearch must be true. */
        boost: number;
    }
    /** The analyzer base class. */
    export interface AnalyzerBase {
        /** Includes the analyzed field in the simple search. */
        simpleSearch: boolean;
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
        analyzers?: AnalyzerBase[] | undefined;
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
        targetContext: TargetContext;
        /** An optional search filter. Limits the content or the list item result set depending on the relation's target context. */
        filter?: FilterBase | undefined;
    }
    export enum TargetContext {
        Content,
        ListItem,
        User,
        Custom,
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
    /** Count info of fields for search operations */
    export interface SearchFieldCount {
        /** The number of fields generated by the schema in the Search index. */
        dataField: number;
        /** The number of indexed fields generated by the schema in the Search index. */
        indexedField: number;
        /** The number of fields to be queried in the simple search for the schema. */
        simpleSearchField: number;
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
        /** An optional list of aggregations to group content documents and/or list items. */
        aggregations?: AggregatorBase[] | undefined;
        /** A simple ordering property for schemas. */
        sortOrder: number;
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
    export interface DuplicateSchemaException extends PictureparkBusinessException {
        schemaId?: string | undefined;
    }
    export interface SchemaValidationException extends PictureparkBusinessException {
        schemaId?: string | undefined;
        exceptions?: PictureparkBusinessException[] | undefined;
    }
    export interface SchemaCyclicDependencyException extends PictureparkBusinessException {
        schemaIds?: string[] | undefined;
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
        /** An optional list of aggregations to group content documents and list items. */
        aggregations?: AggregatorBase[] | undefined;
        /** A simple ordering property for schemas. */
        sortOrder: number;
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
    export interface SchemaNotFoundException extends PictureparkBusinessException {
        schemaId?: string | undefined;
    }
    export interface SchemaInUseException extends PictureparkBusinessException {
        schemaId?: string | undefined;
        exceptions?: PictureparkBusinessException[] | undefined;
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
    export interface OutputDataDocument extends OutputDataBase {
        pageCount: number;
    }
    export interface OutputDataDefault extends OutputDataBase {
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
        recipient?: UserItem | undefined;
        token?: string | undefined;
        url?: string | undefined;
    }
    export interface UserItem {
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
    export interface ShareNotFoundException extends PictureparkBusinessException {
        shareId?: string | undefined;
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
        recipientsUser?: UserItem[] | undefined;
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
    export enum TransferType {
        FileUpload,
        FileUploadAutoImport,
        DriveImport,
        DriveExport,
        WebDownload,
        SchemaImport,
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
        outputItems?: OutputItem[] | undefined;
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
        xmpMetadata?: XmpMetadata | undefined;
        exifMetadata?: ExifMetadata | undefined;
        language?: string | undefined;
    }
    export interface XmpMetadata {
        dc?: Dc | undefined;
        crs?: Crs | undefined;
        iptcCore?: IptcCore | undefined;
        iptcExt?: IptcExt | undefined;
        iptcIIM?: IptcIIM | undefined;
        lr?: Lr | undefined;
        pdf?: Pdf | undefined;
        photoshop?: Photoshop | undefined;
        plus?: Plus | undefined;
        tiff?: Tiff | undefined;
        xmp?: Xmp | undefined;
        xmpBJ?: XmpBJ | undefined;
        xmpDM?: XmpDM | undefined;
        xmpG?: XmpG | undefined;
        xmpGImg?: XmpGImg | undefined;
        xmpidq?: Xmpidq | undefined;
        xmpMM?: XmpMM | undefined;
        xmpNote?: XmpNote | undefined;
        xmpRights?: XmpRights | undefined;
        xmpTPg?: XmpTPg | undefined;
    }
    export interface Dc {
        contributor?: string[] | undefined;
        coverage?: string | undefined;
        creator?: string[] | undefined;
        date?: Date[] | undefined;
        description?: {
            [key: string]: string;
        } | undefined;
        format?: string | undefined;
        identifier?: string | undefined;
        language?: string[] | undefined;
        publisher?: string[] | undefined;
        relation?: string[] | undefined;
        rights?: {
            [key: string]: string;
        } | undefined;
        source?: string | undefined;
        subject?: string[] | undefined;
        title?: {
            [key: string]: string;
        } | undefined;
        type?: string | undefined;
    }
    export interface Crs {
        autoBrightness?: boolean | undefined;
        autoContrast?: boolean | undefined;
        autoExposure?: boolean | undefined;
        autoShadows?: boolean | undefined;
        blueHue?: number | undefined;
        blueSaturation?: number | undefined;
        brightness?: number | undefined;
        cameraProfile?: string | undefined;
        chromaticAberrationB?: number | undefined;
        chromaticAberrationR?: number | undefined;
        colorNoiseReduction?: number | undefined;
        contrast?: number | undefined;
        cropTop?: number | undefined;
        cropLeft?: number | undefined;
        cropBottom?: number | undefined;
        cropRight?: number | undefined;
        cropAngle?: number | undefined;
        cropWidth?: number | undefined;
        cropHeight?: number | undefined;
        cropUnits?: CropUnit | undefined;
        exposure?: number | undefined;
        greenHue?: number | undefined;
        greenSaturation?: number | undefined;
        hasCrop?: boolean | undefined;
        hasSettings?: boolean | undefined;
        luminanceSmoothing?: number | undefined;
        rawFileName?: string | undefined;
        redHue?: number | undefined;
        redSaturation?: number | undefined;
        saturation?: number | undefined;
        shadows?: number | undefined;
        shadowTint?: number | undefined;
        sharpness?: number | undefined;
        temperature?: number | undefined;
        tint?: number | undefined;
        toneCurve?: string[] | undefined;
        toneCurveName?: ToneCurve | undefined;
        version?: string | undefined;
        vignetteAmount?: number | undefined;
        vignetteMidpoint?: number | undefined;
        whiteBalance?: WhiteBalance | undefined;
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
        countryCode?: string | undefined;
        intellectualGenre?: string | undefined;
        scene?: string[] | undefined;
        subjectCode?: string[] | undefined;
        location?: string | undefined;
        creatorContactInfo?: CreatorContactInfo | undefined;
    }
    export interface CreatorContactInfo {
        address?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
        emailAddress?: string | undefined;
        phoneNumber?: string | undefined;
        postalCode?: string | undefined;
        region?: string | undefined;
        url?: string | undefined;
    }
    export interface IptcExt {
        additionalModelInformation?: string | undefined;
        artworkOrObject?: ArtworkOrObjectInfo[] | undefined;
        organisationInImageCode?: string[] | undefined;
        controlledVocabularyTerm?: string[] | undefined;
        locationShown?: LocationInfo[] | undefined;
        modelAge?: number[] | undefined;
        organisationInImageName?: string[] | undefined;
        personInImage?: string[] | undefined;
        digitalImageGUID?: string | undefined;
        digitalSourceType?: string | undefined;
        event?: {
            [key: string]: string;
        } | undefined;
        imageRegistryEntry?: RegistryEntryInfo[] | undefined;
        metadataLastEdited?: Date | undefined;
        locationCreated?: LocationInfo[] | undefined;
        maxAvailHeight?: number | undefined;
        maxAvailWidth?: number | undefined;
    }
    /** Corresponds to Xmp.Structure.ArtworkOrObjectDetails */
    export interface ArtworkOrObjectInfo {
        copyrightNotice?: string | undefined;
        creator?: string[] | undefined;
        dateCreated?: Date | undefined;
        source?: string | undefined;
        sourceInventoryNumber?: string | undefined;
        title?: {
            [key: string]: string;
        } | undefined;
    }
    export interface LocationInfo {
        city?: string | undefined;
        countryCode?: string | undefined;
        countryName?: string | undefined;
        provinceState?: string | undefined;
        sublocation?: string | undefined;
        worldRegion?: string | undefined;
    }
    export interface RegistryEntryInfo {
        registryItemIdentifier?: string | undefined;
        registryOrganisationIdentifier?: string | undefined;
    }
    export interface IptcIIM {
        modelVersion?: number | undefined;
        destination?: string[] | undefined;
        fileFormat?: number | undefined;
        fileFormatVersion?: number | undefined;
        serviceIdentifier?: string | undefined;
        envelopeNumber?: string | undefined;
        productID?: string[] | undefined;
        envelopePriority?: number | undefined;
        dateSent?: Date | undefined;
        timeSent?: Date | undefined;
        uno?: string | undefined;
        recordVersion?: number | undefined;
        objectTypeReference?: string | undefined;
        objectAttributeReference?: string | undefined;
        objectName?: {
            [key: string]: string;
        } | undefined;
        editStatus?: string | undefined;
        urgency?: number | undefined;
        subjectReference?: string[] | undefined;
        category?: string | undefined;
        supplementalCategory?: string[] | undefined;
        fixtureIdentifier?: string | undefined;
        keywords?: string[] | undefined;
        contentLocationCode?: string[] | undefined;
        contentLocationName?: string[] | undefined;
        releaseDate?: Date | undefined;
        releaseTime?: Date | undefined;
        expirationDate?: Date | undefined;
        expirationTime?: Date | undefined;
        specialInstruction?: string | undefined;
        actionAdvised?: string | undefined;
        referenceService?: string | undefined;
        referenceDate?: Date | undefined;
        referenceNumber?: string | undefined;
        dateCreated?: Date | undefined;
        timeCreated?: Date | undefined;
        digitalCreationDate?: Date | undefined;
        digitalCreationTime?: Date | undefined;
        originatingProgram?: string | undefined;
        programVersion?: string | undefined;
        byline?: string[] | undefined;
        bylineTitle?: string | undefined;
        city?: string | undefined;
        sublocation?: string | undefined;
        provinceState?: string | undefined;
        countryPrimaryLocationCode?: string | undefined;
        countryPrimaryLocationName?: string | undefined;
        originalTransmissionReference?: string | undefined;
        headline?: string | undefined;
        credit?: string | undefined;
        source?: string | undefined;
        copyrightNotice?: {
            [key: string]: string;
        } | undefined;
        captionAbstract?: {
            [key: string]: string;
        } | undefined;
        writerEditor?: string | undefined;
        imageType?: string | undefined;
        imageOrientation?: string | undefined;
        languageIdentifier?: string | undefined;
    }
    export interface Lr {
        hierarchicalSubject?: string[] | undefined;
    }
    export interface Pdf {
        keywords?: string | undefined;
        pdfVersion?: string | undefined;
        producer?: string | undefined;
        trapped?: boolean | undefined;
    }
    export interface Photoshop {
        authorsPosition?: string | undefined;
        captionWriter?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        colorMode?: ColorMode | undefined;
        country?: string | undefined;
        credit?: string | undefined;
        dateCreated?: Date | undefined;
        documentAncestors?: string[] | undefined;
        headline?: string | undefined;
        history?: string | undefined;
        iccProfile?: string | undefined;
        instructions?: string | undefined;
        source?: string | undefined;
        state?: string | undefined;
        supplementalCategories?: string[] | undefined;
        textLayers?: PhotoshopLayer[] | undefined;
        transmissionReference?: string | undefined;
        urgency?: number | undefined;
        legacyIPTCDigest?: string | undefined;
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
        layerName?: string | undefined;
        layerText?: string | undefined;
    }
    export interface Plus {
        version?: string | undefined;
        licensee?: LicenseeInfo[] | undefined;
        licenseeID?: string | undefined;
        licenseeName?: string | undefined;
        endUser?: EndUserInfo[] | undefined;
        endUserID?: string | undefined;
        endUserName?: string | undefined;
        licensor?: LicensorInfo[] | undefined;
        licensorNotes?: {
            [key: string]: string;
        } | undefined;
        mediaSummaryCode?: string | undefined;
        licenseStartDate?: Date | undefined;
        licenseEndDate?: Date | undefined;
        mediaConstraints?: {
            [key: string]: string;
        } | undefined;
        regionConstraints?: {
            [key: string]: string;
        } | undefined;
        productOrServiceConstraints?: {
            [key: string]: string;
        } | undefined;
        imageFileConstraints?: string[] | undefined;
        imageAlterationConstraints?: string[] | undefined;
        imageDuplicationConstraints?: string | undefined;
        modelReleaseStatus?: string | undefined;
        modelReleaseID?: string[] | undefined;
        minorModelAgeDisclosure?: string | undefined;
        propertyReleaseStatus?: string | undefined;
        propertyReleaseID?: string[] | undefined;
        otherConstraints?: {
            [key: string]: string;
        } | undefined;
        creditLineRequired?: string | undefined;
        adultContentWarning?: string | undefined;
        otherLicenseRequirements?: {
            [key: string]: string;
        } | undefined;
        termsAndConditionsText?: {
            [key: string]: string;
        } | undefined;
        termsAndConditionsURL?: string | undefined;
        otherConditions?: {
            [key: string]: string;
        } | undefined;
        imageType?: string | undefined;
        licensorImageID?: string | undefined;
        fileNameAsDelivered?: string | undefined;
        imageFileFormatAsDelivered?: string | undefined;
        imageFileSizeAsDelivered?: string | undefined;
        copyrightStatus?: string | undefined;
        copyrightRegistrationNumber?: string | undefined;
        firstPublicationDate?: Date | undefined;
        copyrightOwner?: CopyrightOwnerInfo[] | undefined;
        copyrightOwnerImageID?: string | undefined;
        imageCreator?: ImageCreatorInfo[] | undefined;
        imageCreatorImageID?: string | undefined;
        imageSupplier?: ImageSupplierInfo[] | undefined;
        imageSupplierImageID?: string | undefined;
        licenseeImageID?: string | undefined;
        licenseeImageNotes?: {
            [key: string]: string;
        } | undefined;
        otherImageInfo?: {
            [key: string]: string;
        } | undefined;
        licenseID?: string | undefined;
        licensorTransactionID?: string[] | undefined;
        licenseeTransactionID?: string[] | undefined;
        licenseeProjectReference?: string[] | undefined;
        licenseTransactionDate?: Date | undefined;
        reuse?: string | undefined;
        otherLicenseDocuments?: string[] | undefined;
        otherLicenseInfo?: {
            [key: string]: string;
        } | undefined;
        custom1?: {
            [key: string]: string;
        }[] | undefined;
        custom2?: {
            [key: string]: string;
        }[] | undefined;
        custom3?: {
            [key: string]: string;
        }[] | undefined;
        custom4?: {
            [key: string]: string;
        }[] | undefined;
        custom5?: {
            [key: string]: string;
        }[] | undefined;
        custom6?: {
            [key: string]: string;
        }[] | undefined;
        custom7?: {
            [key: string]: string;
        }[] | undefined;
        custom8?: {
            [key: string]: string;
        }[] | undefined;
        custom9?: {
            [key: string]: string;
        }[] | undefined;
        custom10?: {
            [key: string]: string;
        }[] | undefined;
    }
    export interface LicenseeInfo {
        licenseeName?: string | undefined;
        licenseeID?: string | undefined;
    }
    export interface EndUserInfo {
        endUserName?: string | undefined;
        endUserID?: string | undefined;
    }
    export interface LicensorInfo {
        licensorName?: string | undefined;
        licensorID?: string | undefined;
        licensorStreetAddress?: string | undefined;
        licensorExtendedAddress?: string | undefined;
        licensorCity?: string | undefined;
        licensorRegion?: string | undefined;
        licensorPostalCode?: string | undefined;
        licensorCountry?: string | undefined;
        licensorTelephoneType1?: string | undefined;
        licensorTelephone1?: string | undefined;
        licensorTelephoneType2?: string | undefined;
        licensorTelephone2?: string | undefined;
        licensorEmail?: string | undefined;
        licensorURL?: string | undefined;
    }
    export interface CopyrightOwnerInfo {
        copyrightOwnerName?: string | undefined;
        copyrightOwnerID?: string | undefined;
    }
    export interface ImageCreatorInfo {
        imageCreatorName?: string | undefined;
        imageCreatorID?: string | undefined;
    }
    export interface ImageSupplierInfo {
        imageSupplierName?: string | undefined;
        imageSupplierID?: string | undefined;
    }
    export interface Tiff {
        artist?: string | undefined;
        bitsPerSample?: number[] | undefined;
        compression?: Compression | undefined;
        copyright?: {
            [key: string]: string;
        } | undefined;
        dateTime?: Date | undefined;
        imageDescription?: {
            [key: string]: string;
        } | undefined;
        imageLength?: number | undefined;
        imageWidth?: number | undefined;
        make?: string | undefined;
        model?: string | undefined;
        orientation?: Orientation | undefined;
        photometricInterpretation?: PhotometricInterpretation | undefined;
        planarConfiguration?: PlanarConfiguration | undefined;
        primaryChromaticities?: string[] | undefined;
        referenceBlackWhite?: string[] | undefined;
        resolutionUnit?: ResolutionUnit | undefined;
        samplesPerPixel?: number | undefined;
        software?: string | undefined;
        transferFunction?: number[] | undefined;
        whitePoint?: string[] | undefined;
        xResolution?: string | undefined;
        yResolution?: string | undefined;
        yCbCrCoefficients?: string[] | undefined;
        yCbCrPositioning?: YCbCrPositioning | undefined;
        yCbCrSubSampling?: YCbCrSubSampling | undefined;
        nativeDigest?: string | undefined;
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
        baseURL?: string | undefined;
        createDate?: Date | undefined;
        creatorTool?: string | undefined;
        identifier?: string[] | undefined;
        label?: string | undefined;
        metadataDate?: Date | undefined;
        modifyDate?: Date | undefined;
        nickname?: string | undefined;
        rating?: Rating | undefined;
        thumbnails?: XmpGImg[] | undefined;
        pageInfo?: XmpGImg[] | undefined;
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
        format?: ImgFormat | undefined;
        width?: number | undefined;
        height?: number | undefined;
        image?: string | undefined;
    }
    /** Corresponds to xmpGImg.FormatChoice */
    export enum ImgFormat {
        JPEG,
    }
    export interface XmpBJ {
        jobRef?: Job[] | undefined;
    }
    export interface Job {
        id?: string | undefined;
        name?: string | undefined;
        url?: string | undefined;
    }
    export interface XmpDM {
        absPeakAudioFilePath?: string | undefined;
        artist?: string | undefined;
        album?: string | undefined;
        altTapeName?: string | undefined;
        altTimecode?: TimeCode | undefined;
        audioChannelType?: AudioChannelType | undefined;
        audioCompressor?: string | undefined;
        audioSampleRate?: number | undefined;
        audioSampleType?: AudioSampleType | undefined;
        beatSpliceParams?: BeatSpliceStretch | undefined;
        cameraAngle?: CameraAngle | undefined;
        cameraLabel?: string | undefined;
        cameraModel?: string | undefined;
        cameraMove?: CameraMove | undefined;
        client?: string | undefined;
        comment?: string | undefined;
        composer?: string | undefined;
        contributedMedia?: Media[] | undefined;
        director?: string | undefined;
        directorPhotography?: string | undefined;
        duration?: Time | undefined;
        engineer?: string | undefined;
        fileDataRate?: string | undefined;
        genre?: string | undefined;
        good?: boolean | undefined;
        instrument?: string | undefined;
        introTime?: Time | undefined;
        key?: AudioMusicalKey | undefined;
        logComment?: string | undefined;
        loop?: boolean | undefined;
        numberOfBeats?: number | undefined;
        markers?: Marker[] | undefined;
        outCue?: Time | undefined;
        projectName?: string | undefined;
        projectRef?: ProjectLink | undefined;
        pullDown?: VideoPullDown | undefined;
        relativePeakAudioFilePath?: string | undefined;
        relativeTimestamp?: Time | undefined;
        releaseDate?: Date | undefined;
        resampleParams?: ResampleStretch | undefined;
        scaleType?: AudioMusicalScaleType | undefined;
        scene?: string | undefined;
        shotDate?: Date | undefined;
        shotDay?: string | undefined;
        shotLocation?: string | undefined;
        shotName?: string | undefined;
        shotNumber?: string | undefined;
        shotSize?: ShotSize | undefined;
        speakerPlacement?: string | undefined;
        startTimecode?: TimeCode | undefined;
        stretchMode?: AudioStretchMode | undefined;
        takeNumber?: number | undefined;
        tapeName?: string | undefined;
        tempo?: number | undefined;
        timeScaleParams?: TimeScaleStretch | undefined;
        timeSignature?: TimeSignature | undefined;
        trackNumber?: number | undefined;
        tracks?: Track[] | undefined;
        videoAlphaMode?: VideoAlphaMode | undefined;
        videoAlphaPremultipleColor?: XmpG | undefined;
        videoAlphaUnityIsTransparent?: boolean | undefined;
        videoColorSpace?: VideoColorSpace | undefined;
        videoCompressor?: string | undefined;
        videoFieldOrder?: VideoFieldOrder | undefined;
        videoFrameRate?: VideoFrameRate | undefined;
        videoFrameSize?: Dimension | undefined;
        videoPixelDepth?: VideoPixelDepth | undefined;
        videoPixelAspectRatio?: string | undefined;
    }
    export interface TimeCode {
        timeFormat?: TimeFormat | undefined;
        timeValue?: string | undefined;
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
        riseInDecibel?: number | undefined;
        riseInTimeDuration?: Time | undefined;
        useFileBeatsMarker?: boolean | undefined;
    }
    export interface Time {
        scale?: string | undefined;
        value?: number | undefined;
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
        duration?: Time | undefined;
        managed?: boolean | undefined;
        path?: string | undefined;
        startTime?: Time | undefined;
        track?: string | undefined;
        webStatement?: string | undefined;
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
        comment?: string | undefined;
        cuePointParams?: {
            [key: string]: string;
        } | undefined;
        cuePointType?: string | undefined;
        duration?: string | undefined;
        location?: string | undefined;
        name?: string | undefined;
        probability?: number | undefined;
        speaker?: string | undefined;
        startTime?: string | undefined;
        target?: string | undefined;
        type?: MarkerType | undefined;
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
        path?: string | undefined;
        type?: ProjectLinkType | undefined;
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
        quality?: Quality | undefined;
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
        frameOverlappingPercentage?: number | undefined;
        frameSize?: number | undefined;
        quality?: Quality | undefined;
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
        frameRate?: string | undefined;
        markers?: Marker[] | undefined;
        trackName?: string | undefined;
        trackType?: MarkerType | undefined;
    }
    /** Corresponds to xmpDM.VideoAlphaModeChoice */
    export enum VideoAlphaMode {
        ALPHA_MODE_STRAIGHT,
        ALPHA_MODE_PREMULTIPLIED,
        ALPHA_MODE_NONE,
    }
    export interface XmpG {
        a?: number | undefined;
        b?: number | undefined;
        l?: number | undefined;
        black?: number | undefined;
        cyan?: number | undefined;
        magenta?: number | undefined;
        yellow?: number | undefined;
        blue?: number | undefined;
        green?: number | undefined;
        red?: number | undefined;
        mode?: ColorantMode | undefined;
        swatchName?: string | undefined;
        type?: ColorantType | undefined;
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
        height?: number | undefined;
        width?: number | undefined;
        unit?: Unit | undefined;
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
        scheme?: string | undefined;
    }
    export interface XmpMM {
        derivedFrom?: Reference | undefined;
        documentID?: string | undefined;
        history?: Event[] | undefined;
        ingredients?: Reference[] | undefined;
        instanceID?: string | undefined;
        managedFrom?: Reference | undefined;
        manager?: string | undefined;
        manageTo?: string | undefined;
        manageUI?: string | undefined;
        managerVariant?: string | undefined;
        originalDocumentID?: string | undefined;
        renditionClass?: string | undefined;
        renditionParams?: string | undefined;
        versionID?: string | undefined;
        versions?: VersionInfo2[] | undefined;
    }
    export interface Reference {
        alternatePaths?: string[] | undefined;
        documentID?: string | undefined;
        filePath?: string | undefined;
        fromPart?: string | undefined;
        instanceID?: string | undefined;
        lastModifyDate?: Date | undefined;
        manager?: string | undefined;
        managerVariant?: string | undefined;
        manageTo?: string | undefined;
        manageUI?: string | undefined;
        maskMarkers?: MaskMarkers | undefined;
        originalDocumentID?: string | undefined;
        partMapping?: string | undefined;
        renditionClass?: string | undefined;
        renditionParams?: string | undefined;
        toPart?: string | undefined;
        versionID?: string | undefined;
    }
    /** Corresponds to stRef.MaskMarkersChoice */
    export enum MaskMarkers {
        All,
        None,
    }
    export interface Event {
        action?: EventAction | undefined;
        changed?: string | undefined;
        instanceID?: string | undefined;
        parameters?: string | undefined;
        softwareAgent?: string | undefined;
        when?: Date | undefined;
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
    export interface VersionInfo2 {
        comments?: string | undefined;
        event?: Event | undefined;
        modifier?: string | undefined;
        modifyDate?: Date | undefined;
        version?: string | undefined;
    }
    export interface XmpNote {
        hasExtendedXMP?: string | undefined;
    }
    export interface XmpRights {
        certificate?: string | undefined;
        marked?: boolean | undefined;
        owner?: string[] | undefined;
        usageTerms?: {
            [key: string]: string;
        } | undefined;
        webStatement?: string | undefined;
    }
    export interface XmpTPg {
        colorants?: XmpG[] | undefined;
        fonts?: Font[] | undefined;
        maxPageSize?: Dimension | undefined;
        nPages?: number | undefined;
        plateNames?: string[] | undefined;
    }
    export interface Font {
        childFontFiles?: string[] | undefined;
        composite?: boolean | undefined;
        fontFace?: string | undefined;
        fontFamily?: string | undefined;
        fontFileName?: string | undefined;
        fontName?: string | undefined;
        fontType?: FontType | undefined;
        versionString?: string | undefined;
    }
    /** Corresponds to stFnt.FontTypeChoice */
    export enum FontType {
        TrueType,
        Type1,
        OpenType,
        OpenTypeCFF,
    }
    export interface ExifMetadata {
        exif?: Exif | undefined;
        exifAux?: ExifAux | undefined;
    }
    export interface Exif {
        apertureValue?: string | undefined;
        brightnessValue?: string | undefined;
        cfaPattern?: CFAPattern | undefined;
        colorSpace?: ColorSpace | undefined;
        componentsConfiguration?: number[] | undefined;
        compressedBitsPerPixel?: string | undefined;
        contrast?: Contrast | undefined;
        customRendered?: CustomRendered | undefined;
        dateTimeOriginal?: Date | undefined;
        dateTimeDigitized?: Date | undefined;
        deviceSettingDescription?: DeviceSettings | undefined;
        digitalZoomRatio?: string | undefined;
        exifVersion?: ExifVersion | undefined;
        exposureBiasValue?: string | undefined;
        exposureIndex?: string | undefined;
        exposureMode?: ExposureMode | undefined;
        exposureProgram?: ExposureProgram | undefined;
        exposureTime?: string | undefined;
        fileSource?: FileSource | undefined;
        flash?: Flash | undefined;
        flashEnergy?: string | undefined;
        flashpixVersion?: FlashpixVersion | undefined;
        fNumber?: string | undefined;
        focalLength?: string | undefined;
        focalLengthIn35mmFilm?: number | undefined;
        focalPlaneResolutionUnit?: FocalPlaneResolutionUnit | undefined;
        focalPlaneXResolution?: string | undefined;
        focalPlaneYResolution?: string | undefined;
        gainControl?: GainControl | undefined;
        gpsAltitude?: string | undefined;
        gpsAltitudeRef?: GPSAltitudeRef | undefined;
        gpsAreaInformation?: string | undefined;
        gpsDestBearing?: string | undefined;
        gpsDestBearingRef?: GPSDestBearingRef | undefined;
        gpsDestDistance?: string | undefined;
        gpsDestDistanceRef?: GPSDestDistanceRef | undefined;
        gpsDestLatitude?: string | undefined;
        gpsDestLongitude?: string | undefined;
        gpsDifferential?: GPSDifferential | undefined;
        gpsdop?: string | undefined;
        gpsImgDirection?: string | undefined;
        gpsImgDirectionRef?: GPSImgDirectionRef | undefined;
        gpsCoordinate?: GPSCoordinate | undefined;
        gpsLatitude?: string | undefined;
        gpsLongitude?: string | undefined;
        gpsMapDatum?: string | undefined;
        gpsMeasureMode?: string | undefined;
        gpsProcessingMethod?: string | undefined;
        gpsSatellites?: string | undefined;
        gpsSpeed?: string | undefined;
        gpsSpeedRef?: GPSSpeedRef | undefined;
        gpsStatus?: GPSStatus | undefined;
        gpsTimeStamp?: Date | undefined;
        gpsTrack?: string | undefined;
        gpsTrackRef?: string | undefined;
        gpsVersionID?: string | undefined;
        imageUniqueID?: string | undefined;
        isoSpeedRatings?: number[] | undefined;
        lightSource?: LightSource | undefined;
        maxApertureValue?: string | undefined;
        meteringMode?: MeteringMode | undefined;
        oecf?: OECF | undefined;
        pixelXDimension?: number | undefined;
        pixelYDimension?: number | undefined;
        relatedSoundFile?: string | undefined;
        saturation?: Saturation | undefined;
        sceneCaptureType?: SceneCaptureType | undefined;
        sceneType?: SceneType | undefined;
        sensingMethod?: SensingMethod | undefined;
        sharpness?: Sharpness | undefined;
        shutterSpeedValue?: string | undefined;
        spatialFrequencyResponse?: SFR | undefined;
        spectralSensitivity?: string | undefined;
        subjectArea?: number[] | undefined;
        subjectDistance?: string | undefined;
        subjectDistanceRange?: SubjectDistanceRange | undefined;
        subjectLocation?: number[] | undefined;
        userComment?: {
            [key: string]: string;
        } | undefined;
        whiteBalance?: WhiteBalanceExif | undefined;
        nativeDigest?: string | undefined;
    }
    export interface CFAPattern {
        columns?: number | undefined;
        rows?: number | undefined;
        values?: number[] | undefined;
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
        columns?: number | undefined;
        rows?: number | undefined;
        settings?: string[] | undefined;
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
        fired?: boolean | undefined;
        return?: FlashReturn | undefined;
        mode?: FlashMode | undefined;
        function?: boolean | undefined;
        redEyeMode?: boolean | undefined;
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
        columns?: number | undefined;
        rows?: number | undefined;
        values?: string[] | undefined;
        names?: string[] | undefined;
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
        columns?: number | undefined;
        rows?: number | undefined;
        values?: string[] | undefined;
        names?: string[] | undefined;
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
        lens?: string | undefined;
        serialNumber?: string | undefined;
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
    export interface OutputItem {
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
    export interface UserDetail extends UserItem {
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
    export interface BaseResultOfUser {
        totalResults: number;
        results?: User[] | undefined;
        pageToken?: string | undefined;
        queryDebugInformation?: QueryDebugInformation | undefined;
    }
    export interface SearchBehaviourBaseResultOfUser extends BaseResultOfUser {
        searchString?: string | undefined;
        isSearchStringRewritten: boolean;
    }
    export interface UserSearchResult extends SearchBehaviourBaseResultOfUser {
        elapsedMilliseconds: number;
    }
    export interface User {
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

