export declare class AuthClient {
    private pictureparkApiUrl;
    private customerAlias?;
    constructor(pictureparkApiUrl: string, customerAlias?: string);
    getBaseUrl(defaultUrl: string, requestedUrl?: string): string;
    transformHttpRequestOptions(options: RequestInit): Promise<RequestInit>;
}
export declare class PictureparkClientBase {
    private authClient;
    constructor(authClient: AuthClient);
    getBaseUrl(defaultUrl: string, baseUrl: string): string;
    transformOptions(options: RequestInit): Promise<RequestInit>;
}
export declare class BusinessProcessClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get business process
     * @param id The business process id.
     * @return BusinessProcess
     */
    get(id: string | null): Promise<BusinessProcess>;
    protected processGet(response: Response): Promise<BusinessProcess>;
    /**
     * Create business process
     * @param request The business process create request.
     * @return BusinessProcess
     */
    create(request: BusinessProcessCreateRequest): Promise<BusinessProcess>;
    protected processCreate(response: Response): Promise<BusinessProcess>;
    /**
     * Change business process state
     * @param id The business process id.
     * @param request The business process state change request.
     * @return BusinessProcess
     */
    changeState(id: string | null, request: BusinessProcessStateChangeRequest): Promise<BusinessProcess>;
    protected processChangeState(response: Response): Promise<BusinessProcess>;
    /**
     * Update business process notification
     * @param id The business process id.
     * @param request The business process notification update request.
     */
    updateNotification(id: string | null, request: BusinessProcessNotificationUpdateRequest): Promise<void>;
    protected processUpdateNotification(response: Response): Promise<void>;
    /**
     * Cancel business process
     * @param id The business process id.
     */
    cancel(id: string | null): Promise<void>;
    protected processCancel(response: Response): Promise<void>;
    /**
     * Wait for states
     * @param id The business process id.
     * @param states (optional) Business process states to wait for.
     * @param timeout (optional) The timeout to wait for completion.
     * @return BusinessProcessWaitResult
     */
    waitForStates(id: string | null, states?: string[] | null | undefined, timeout?: string | null | undefined): Promise<BusinessProcessWaitForStateResult>;
    protected processWaitForStates(response: Response): Promise<BusinessProcessWaitForStateResult>;
    /**
     * Wait for life cycles
     * @param id The business process id.
     * @param lifeCycles (optional) Business process life cycles to wait for.
     * @param timeout (optional) The timeout to wait for completion.
     * @return BusinessProcessWaitForLifeCycleResult
     */
    waitForLifeCycles(id: string | null, lifeCycles?: BusinessProcessLifeCycle[] | null | undefined, timeout?: string | null | undefined): Promise<BusinessProcessWaitForLifeCycleResult>;
    protected processWaitForLifeCycles(response: Response): Promise<BusinessProcessWaitForLifeCycleResult>;
    /**
     * Wait for completion
     * @param id The business process id.
     * @param timeout (optional) The timeout to wait for completion.
     * @param waitForContinuationCompletion (optional) Waits for the completion of the continuation business process (if existing, recursively). Default to true.
     * @return BusinessProcessWaitResult
     */
    waitForCompletion(id: string | null, timeout?: string | null | undefined, waitForContinuationCompletion?: boolean | undefined): Promise<BusinessProcessWaitForLifeCycleResult>;
    protected processWaitForCompletion(response: Response): Promise<BusinessProcessWaitForLifeCycleResult>;
    /**
     * Get details
     * @param id The business process id.
     * @return BusinessProcessDetails
     * @deprecated
     */
    getDetails(id: string | null): Promise<BusinessProcessDetails>;
    protected processGetDetails(response: Response): Promise<BusinessProcessDetails>;
    /**
     * Returns a summary of the business process.
    Depending on the type of the business process, this can be not available at all or contain just a minimal set of information.
    If business process produces a batch based response, page over successful and failed items using respective endpoints.
     * @param id Business process id.
     * @return BusinessProcessSummaryBase
     */
    getSummary(id: string | null): Promise<BusinessProcessSummaryBase>;
    protected processGetSummary(response: Response): Promise<BusinessProcessSummaryBase>;
    /**
     * Gets a page of successful items of a batch based business process.
    Use the page token to fetch next page.
     * @param id Business process id.
     * @param limit Number of items to fetch.
     * @param pageToken (optional) PageToken for paging.
     * @return BusinessProcessBatch
     */
    getSuccessfulItems(id: string | null, limit: number, pageToken?: string | null | undefined): Promise<BusinessProcessBatch>;
    protected processGetSuccessfulItems(response: Response): Promise<BusinessProcessBatch>;
    /**
     * Gets a page of failed items of a batch based business process.
    Use the page token to fetch next page.
     * @param id Business process id.
     * @param limit Number of items to fetch.
     * @param pageToken (optional) PageToken for paging.
     * @return BusinessProcessBatch
     */
    getFailedItems(id: string | null, limit: number, pageToken?: string | null | undefined): Promise<BusinessProcessBatch>;
    protected processGetFailedItems(response: Response): Promise<BusinessProcessBatch>;
    /**
     * Search
     * @param request The business process request.
     * @return BusinessProcessSearchResult
     */
    search(request: BusinessProcessSearchRequest): Promise<BusinessProcessSearchResult>;
    protected processSearch(response: Response): Promise<BusinessProcessSearchResult>;
}
export declare class BusinessRuleClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get the current business rule configuration
     * @return BusinessRuleConfiguration
     */
    getConfiguration(): Promise<BusinessRuleConfiguration>;
    protected processGetConfiguration(response: Response): Promise<BusinessRuleConfiguration>;
    /**
     * Updates the business rule configuration.
     * @param request Request containing the new configuration.
     * @return Business process
     */
    updateConfiguration(request: BusinessRuleConfigurationUpdateRequest): Promise<BusinessProcess>;
    protected processUpdateConfiguration(response: Response): Promise<BusinessProcess>;
    /**
     * Searches for trace logs produces by business rule execution.
     * @param request Request
     * @return Holds results of trace log search.
     */
    searchTraces(request: BusinessRuleTraceLogSearchRequest): Promise<BusinessRuleTraceLogSearchResult>;
    protected processSearchTraces(response: Response): Promise<BusinessRuleTraceLogSearchResult>;
    /**
     * Runs the supplied business rule schedule immediately.
    Allows for testing of schedules.
     * @param schedule BusinessRuleSchedule
     * @return BusinessProcess of the metadata operation triggered by the schedule.
     */
    runSchedule(schedule: BusinessRuleSchedule): Promise<BusinessProcess>;
    protected processRunSchedule(response: Response): Promise<BusinessProcess>;
}
export declare class ChannelClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get all channels
     * @return List of channel
     */
    getAll(): Promise<Channel[]>;
    protected processGetAll(response: Response): Promise<Channel[]>;
    /**
     * Create channel
     * @param request The request containing information needed to create new channel.
     * @return Created channel
     */
    create(request: ChannelCreateRequest): Promise<Channel>;
    protected processCreate(response: Response): Promise<Channel>;
    /**
     * Get channel
     * @param id The channel ID.
     * @return Requested channel
     */
    get(id: string | null): Promise<Channel>;
    protected processGet(response: Response): Promise<Channel>;
    /**
     * Update channel
     * @param id ID of channel to update
     * @param request The request containing information needed to update the channel.
     * @return Updated channel
     */
    update(id: string | null, request: ChannelUpdateRequest): Promise<Channel>;
    protected processUpdate(response: Response): Promise<Channel>;
    /**
     * Delete channel
     * @param id ID of the channel that should be deleted.
     * @return OK
     */
    delete(id: string | null): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Retrieve the fields that can be used in an aggregator on any channel.
     * @return The list of fields
     */
    getAggregationFields(): Promise<FieldInfo[]>;
    protected processGetAggregationFields(response: Response): Promise<FieldInfo[]>;
    /**
     * Retrieve the fields that can be used as sort fields on any channel.
     * @return The list of fields
     */
    getSortFields(): Promise<SortFieldInfo[]>;
    protected processGetSortFields(response: Response): Promise<SortFieldInfo[]>;
    /**
     * Retrieve the fields that can be used as filter fields on any channel.
     * @return The list of fields
     */
    getFilterFields(): Promise<FieldInfo[]>;
    protected processGetFilterFields(response: Response): Promise<FieldInfo[]>;
}
export declare class ContentPermissionSetClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get content permission set
     * @param id Content permission set ID.
     * @return Detail of a content permission set
     */
    get(id: string | null): Promise<ContentPermissionSetDetail>;
    protected processGet(response: Response): Promise<ContentPermissionSetDetail>;
    /**
     * Update content permission set
     * @param id Content permission set ID.
     * @param permissionSet Permission set
     * @return Detail of a content permission set
     */
    update(id: string | null, permissionSet: ContentPermissionSetUpdateRequest): Promise<ContentPermissionSetDetail>;
    protected processUpdate(response: Response): Promise<ContentPermissionSetDetail>;
    /**
     * Delete content permission set
     * @param id Content permission set ID.
     */
    delete(id: string | null): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Create content permission set
     * @param permissionSet Permission set
     * @return Detail of a content permission set
     */
    create(permissionSet: ContentPermissionSetCreateRequest): Promise<ContentPermissionSetDetail>;
    protected processCreate(response: Response): Promise<ContentPermissionSetDetail>;
    /**
     * Get multiple content permission sets
     * @param ids (optional) Ids
     * @return Array of Detail of a content permission set
     */
    getMany(ids?: string[] | null | undefined): Promise<ContentPermissionSetDetail[]>;
    protected processGetMany(response: Response): Promise<ContentPermissionSetDetail[]>;
    /**
     * Transfer ownership of content permission set
     * @param id Content permission set ID.
     * @param request Request to transfer the ownership of a permission set.
     */
    transferOwnership(id: string | null, request: PermissionSetOwnershipTransferRequest): Promise<void>;
    protected processTransferOwnership(response: Response): Promise<void>;
    /**
     * Get permissions for content permission set
     * @param id Content permission set ID.
     * @return Array of Permission set rights
     */
    getPermissions(id: string | null): Promise<PermissionSetRight[]>;
    protected processGetPermissions(response: Response): Promise<PermissionSetRight[]>;
    /**
     * Create multiple content permission sets
     * @param request Request to create multiple content permission sets.
     * @return Response to a bulk operation
     */
    createMany(request: ContentPermissionSetCreateManyRequest): Promise<BulkResponse>;
    protected processCreateMany(response: Response): Promise<BulkResponse>;
    /**
     * Update multiple content permission sets
     * @param request Request to update multiple content permission sets.
     * @return Response to a bulk operation
     */
    updateMany(request: ContentPermissionSetUpdateManyRequest): Promise<BulkResponse>;
    protected processUpdateMany(response: Response): Promise<BulkResponse>;
    /**
     * Delete multiple content permission sets
     * @param request Request to delete multiple permission sets.
     * @return Response to a bulk operation
     */
    deleteMany(request: PermissionSetDeleteManyRequest): Promise<BulkResponse>;
    protected processDeleteMany(response: Response): Promise<BulkResponse>;
    /**
     * Transfer ownership of multiple content permission sets
     * @param request Request to transfer the ownership of multiple permission sets.
     */
    transferOwnershipMany(request: PermissionSetOwnershipTransferManyRequest): Promise<void>;
    protected processTransferOwnershipMany(response: Response): Promise<void>;
    /**
     * Get permissions for multiple content permission sets
     * @param ids (optional) Ids
     * @return Array of Rights that the current user has on a permission set
     */
    getPermissionsMany(ids?: string[] | null | undefined): Promise<PermissionSetUserPermissionRights[]>;
    protected processGetPermissionsMany(response: Response): Promise<PermissionSetUserPermissionRights[]>;
    /**
     * Search content permission set
     * @param request Request to search permission sets.
     * @return Result of a permission set search operation
     */
    search(request: PermissionSetSearchRequest): Promise<PermissionSetSearchResult>;
    protected processSearch(response: Response): Promise<PermissionSetSearchResult>;
}
export declare class ContentClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get content
     * @param id The content ID.
     * @param resolveBehaviors (optional) List of enums that control which parts of the content are resolved and returned.
     * @return Content detail
     */
    get(id: string | null, resolveBehaviors?: ContentResolveBehavior[] | null | undefined): Promise<ContentDetail>;
    protected processGet(response: Response): Promise<ContentDetail>;
    /**
     * Delete content
     * @param id The ID of the content to delete.
     * @param forceReferenceRemoval (optional) A value indicating whether references to the content should be removed.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return Ok
     */
    delete(id: string | null, forceReferenceRemoval?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Download content
     * @param contentId The content ID.
     * @param outputFormatId The output format ID.
     * @param width (optional) Optional width in pixels to resize image.
     * @param height (optional) Optional height in pixels to resize image.
     * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000).
     */
    download(contentId: string, outputFormatId: string, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
    protected processDownload(response: Response): Promise<FileResponse>;
    /**
     * Edit output
     * @param contentId The content ID.
     * @param outputFormatId The output format ID.
     * @param conversionPreset The conversion preset.
     */
    editOutput(contentId: string | null, outputFormatId: string | null, conversionPreset: string | null): Promise<FileResponse>;
    protected processEditOutput(response: Response): Promise<FileResponse>;
    /**
     * Download thumbnail
     * @param id The content ID.
     * @param size Thumbnail size. Either small, medium or large.
     * @param width (optional) Optional width in pixels to resize image.
     * @param height (optional) Optional height in pixels to resize image.
     */
    downloadThumbnail(id: string | null, size: ThumbnailSize, width?: number | null | undefined, height?: number | null | undefined): Promise<FileResponse>;
    protected processDownloadThumbnail(response: Response): Promise<FileResponse>;
    /**
     * Create content
     * @param request Content create request.
     * @param resolveBehaviors (optional) List of enums that control which parts of the content are resolved and returned.
     * @param allowMissingDependencies (optional) Allows creating contents that refer to list items or contents that don't exist in the system.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return The content details
     */
    create(request: ContentCreateRequest, resolveBehaviors?: ContentResolveBehavior[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<ContentDetail>;
    protected processCreate(response: Response): Promise<ContentDetail>;
    /**
     * Get multiple contents
     * @param ids List of content IDs
     * @param resolveBehaviors (optional) List of enums that control which parts of the content are resolved and returned.
     * @return List of Content detail
     */
    getMany(ids: string[] | null, resolveBehaviors?: ContentResolveBehavior[] | null | undefined): Promise<ContentDetail[]>;
    protected processGetMany(response: Response): Promise<ContentDetail[]>;
    /**
     * Update content metadata
     * @param id The content ID.
     * @param request Content metadata update request.
     * @param resolveBehaviors (optional) List of enums that control which parts of the content are resolved and returned.
     * @param allowMissingDependencies (optional) Allows storing references to list items or contents that don't exist in the system.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return Content detail
     */
    updateMetadata(id: string | null, request: ContentMetadataUpdateRequest, resolveBehaviors?: ContentResolveBehavior[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<ContentDetail>;
    protected processUpdateMetadata(response: Response): Promise<ContentDetail>;
    /**
     * Update content permissions
     * @param id The content ID.
     * @param request Content permissions update request.
     * @param resolveBehaviors (optional) List of enums that control which parts of the content are resolved and returned.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return Content detail
     */
    updatePermissions(id: string | null, request: ContentPermissionsUpdateRequest, resolveBehaviors?: ContentResolveBehavior[] | null | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<ContentDetail>;
    protected processUpdatePermissions(response: Response): Promise<ContentDetail>;
    /**
     * Restore content
     * @param id The content ID.
     * @param allowMissingDependencies (optional) Allows restoring contents that refer to list items or contents that don't exist in the system.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return Ok
     */
    restore(id: string | null, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<void>;
    protected processRestore(response: Response): Promise<void>;
    /**
     * Transfer content ownership
     * @param id The content ID.
     * @param request Content ownership transfer request.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return Ok
     */
    transferOwnership(id: string | null, request: ContentOwnershipTransferRequest, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<void>;
    protected processTransferOwnership(response: Response): Promise<void>;
    /**
     * Check if given changes of ContentSchemaId are possible without incurring data loss (due to assigned Layers and LayerSchemaIds)
     * @param request Changes to check
     * @return Result indicating if data loss would occur for given requests
     */
    checkContentSchemaChange(request: CheckContentSchemaIdChangeRequest): Promise<CheckContentSchemaIdChangeResult>;
    protected processCheckContentSchemaChange(response: Response): Promise<CheckContentSchemaIdChangeResult>;
    /**
     * Check if a file update is possible without incurring data loss
     * @param id The ID of the content to replace.
     * @param request Content file update request
     * @return Information about data loss, if any
     */
    checkUpdateFile(id: string | null, request: ContentFileUpdateCheckRequest): Promise<CheckContentSchemaIdChangeResult>;
    protected processCheckUpdateFile(response: Response): Promise<CheckContentSchemaIdChangeResult>;
    /**
     * Update content file
     * @param id The ID of the content to replace.
     * @param request Content file update request
     * @return Business process
     */
    updateFile(id: string | null, request: ContentFileUpdateRequest): Promise<BusinessProcess>;
    protected processUpdateFile(response: Response): Promise<BusinessProcess>;
    /**
     * Get content references
     * @param id The content ID whose references to retrieve.
     * @param request Content references request.
     * @return ContentReferencesResult
     */
    getReferences(id: string | null, request: ContentReferencesRequest): Promise<ContentReferencesResult>;
    protected processGetReferences(response: Response): Promise<ContentReferencesResult>;
    /**
     * Get outputs
     * @param id ID of content.
     * @return Array of Result of output resolution.
     */
    getOutputs(id: string | null): Promise<OutputResolveResult[]>;
    protected processGetOutputs(response: Response): Promise<OutputResolveResult[]>;
    /**
     * Create download link
     * @param request Content download link request
     * @return Download link
     */
    createDownloadLink(request: ContentDownloadLinkCreateRequest): Promise<BusinessProcess>;
    protected processCreateDownloadLink(response: Response): Promise<BusinessProcess>;
    /**
     * Resolve download token to Url
     * @param token Token
     * @return Download link information
     */
    getDownloadLink(token: string | null): Promise<DownloadLink>;
    protected processGetDownloadLink(response: Response): Promise<DownloadLink>;
    /**
     * Create multiple contents
     * @param request Content create many request.
     * @return Business process
     */
    createMany(request: ContentCreateManyRequest): Promise<BusinessProcess>;
    protected processCreateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Update multiple content metadata
     * @param request Content metadata update many request.
     * @return Business process
     */
    updateMetadataMany(request: ContentMetadataUpdateManyRequest): Promise<BusinessProcess>;
    protected processUpdateMetadataMany(response: Response): Promise<BusinessProcess>;
    /**
     * Update multiple contents permissions
     * @param request Content permissions update many request.
     * @return Business process
     */
    updatePermissionsMany(request: ContentPermissionsUpdateManyRequest): Promise<BusinessProcess>;
    protected processUpdatePermissionsMany(response: Response): Promise<BusinessProcess>;
    /**
     * Transfer multiple contents ownerships
     * @param request Content ownership transfer many request.
     * @return Business process
     */
    transferOwnershipMany(request: ContentOwnershipTransferManyRequest): Promise<BusinessProcess>;
    protected processTransferOwnershipMany(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple contents
     * @param request Delete many request.
     * @return Business process
     */
    deleteMany(request: ContentDeleteManyRequest): Promise<BusinessProcess>;
    protected processDeleteMany(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple contents - by filter
     * @param request Delete many by filter request.
     * @return Business process
     */
    deleteManyByFilter(request: ContentDeleteManyFilterRequest): Promise<BusinessProcess>;
    protected processDeleteManyByFilter(response: Response): Promise<BusinessProcess>;
    /**
     * Restore multiple contents
     * @param request Content restore many request.
     * @return Business process
     */
    restoreMany(request: ContentRestoreManyRequest): Promise<BusinessProcess>;
    protected processRestoreMany(response: Response): Promise<BusinessProcess>;
    /**
     * Get many content references
     * @param request Content many references request.
     * @return Content references result
     */
    getReferencesMany(request: ContentManyReferencesRequest): Promise<ContentReferencesResult>;
    protected processGetReferencesMany(response: Response): Promise<ContentReferencesResult>;
    /**
     * Get outputs
     * @param request Output resolve many request.
     * @return Array of Result of output resolution.
     */
    getOutputsMany(request: OutputResolveManyRequest): Promise<OutputResolveResult[]>;
    protected processGetOutputsMany(response: Response): Promise<OutputResolveResult[]>;
    /**
     * Repair contents by filter
     * @param request Content repair request.
     * @return Business process
     */
    repairContentsByFilter(request: ContentRepairByFilterRequest): Promise<BusinessProcess>;
    protected processRepairContentsByFilter(response: Response): Promise<BusinessProcess>;
    /**
     * Repair contents
     * @param request Content repair request.
     * @return Business process
     */
    repairContentsBatch(request: ContentRepairBatchRequest): Promise<BusinessProcess>;
    protected processRepairContentsBatch(response: Response): Promise<BusinessProcess>;
    /**
     * Batch update content fields - by IDs
     * @param request Content fields batch update request.
     * @return Business process
     */
    batchUpdateFieldsByIds(request: ContentFieldsBatchUpdateRequest): Promise<BusinessProcess>;
    protected processBatchUpdateFieldsByIds(response: Response): Promise<BusinessProcess>;
    /**
     * Batch update fields - by filter
     * @param request Content fields batch update filter request. It contains the changes that need to be applied to the contents and the filter request to identify the contents.
     * @return Business process
     */
    batchUpdateFieldsByFilter(request: ContentFieldsBatchUpdateFilterRequest): Promise<BusinessProcess>;
    protected processBatchUpdateFieldsByFilter(response: Response): Promise<BusinessProcess>;
    /**
     * Search contents
     * @param request Content search request.
     * @return Result for content search operation
     */
    search(request: ContentSearchRequest): Promise<ContentSearchResult>;
    protected processSearch(response: Response): Promise<ContentSearchResult>;
    /**
     * Aggregate contents on channel
     * @param request Content aggregation on channel request.
     * @return Object aggregation result
     */
    aggregateOnChannel(request: ContentAggregationOnChannelRequest): Promise<ObjectAggregationResult>;
    protected processAggregateOnChannel(response: Response): Promise<ObjectAggregationResult>;
    /**
     * Aggregate contents
     * @param request Content aggregation request.
     * @return Object aggregation result
     */
    aggregate(request: ContentAggregationRequest): Promise<ObjectAggregationResult>;
    protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
    /**
     * Get historic versions
     * @param id Content ID.
     * @param request Request allowing for paging
     * @return Historic versions
     */
    getVersions(id: string | null, request: HistoricVersionSearchRequest): Promise<HistoricVersionSearchResult>;
    protected processGetVersions(response: Response): Promise<HistoricVersionSearchResult>;
    /**
     * Get historic version download link
     * @param id Content ID.
     * @param versionId Version ID.
     * @return Download token to be used with download/{token} endpoint
     */
    createVersionDownloadLink(id: string | null, versionId: number): Promise<string>;
    protected processCreateVersionDownloadLink(response: Response): Promise<string>;
    /**
     * Delete historic version
     * @param id Content ID.
     * @param versionId Version ID.
     * @return OK
     */
    deleteVersion(id: string | null, versionId: number): Promise<void>;
    protected processDeleteVersion(response: Response): Promise<void>;
    /**
     * Get comment
     * @param id Content ID.
     * @param commentId Comment ID.
     * @return Comment if found
     */
    getComment(id: string | null, commentId: string | null): Promise<Comment>;
    protected processGetComment(response: Response): Promise<Comment>;
    /**
     * Update comment
     * @param id Content ID.
     * @param commentId Comment ID.
     * @param request Comment update.
     * @param timeout (optional) Operation timeout.
     * @return Updated comment
     */
    updateComment(id: string | null, commentId: string | null, request: CommentEditable, timeout?: string | null | undefined): Promise<Comment>;
    protected processUpdateComment(response: Response): Promise<Comment>;
    /**
     * Delete comment
     * @param id Content ID.
     * @param commentId Comment ID.
     * @param timeout (optional) Operation timeout.
     * @return OK
     */
    deleteComment(id: string | null, commentId: string | null, timeout?: string | null | undefined): Promise<void>;
    protected processDeleteComment(response: Response): Promise<void>;
    /**
     * Create comment
     * @param id Content ID.
     * @param request Comment creation request.
     * @param timeout (optional) Operation timeout.
     * @return Created comment
     */
    createComment(id: string | null, request: CommentCreateRequest, timeout?: string | null | undefined): Promise<Comment>;
    protected processCreateComment(response: Response): Promise<Comment>;
    /**
     * Search comments
     * @param id Content ID.
     * @param request Search request.
     * @return List of found comments
     */
    searchComments(id: string | null, request: CommentSearchRequest): Promise<CommentSearchResult>;
    protected processSearchComments(response: Response): Promise<CommentSearchResult>;
}
export declare class ConversionPresetTemplateClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Search conversion preset templates
     * @param request Conversion preset templates search request.
     * @return Result of the conversion preset templates search
     */
    search(request: ConversionPresetTemplateSearchRequest): Promise<ConversionPresetTemplateSearchResult>;
    protected processSearch(response: Response): Promise<ConversionPresetTemplateSearchResult>;
    /**
     * Create conversion preset template
     * @param request Request containing information needed to create new conversion preset template.
     * @param timeout (optional) Timeout
     * @return Represents the detail of a conversion preset template
     */
    create(request: ConversionPresetTemplateCreateRequest, timeout?: string | null | undefined): Promise<ConversionPresetTemplateDetail>;
    protected processCreate(response: Response): Promise<ConversionPresetTemplateDetail>;
    /**
     * Get multiple conversion preset templates
     * @param ids (optional) Conversion preset template IDs to get information about.
     * @return Array of Represents the detail of a conversion preset template
     */
    getMany(ids?: string[] | null | undefined): Promise<ConversionPresetTemplateDetail[]>;
    protected processGetMany(response: Response): Promise<ConversionPresetTemplateDetail[]>;
    /**
     * Update conversion preset template
     * @param id Conversion preset template ID.
     * @param request Request containing information needed to update the conversion preset template.
     * @param timeout (optional) Timeout
     * @return Represents the detail of a conversion preset template
     */
    update(id: string | null, request: ConversionPresetTemplateUpdateRequest, timeout?: string | null | undefined): Promise<ConversionPresetTemplateDetail>;
    protected processUpdate(response: Response): Promise<ConversionPresetTemplateDetail>;
    /**
     * Delete conversion preset template
     * @param id Conversion preset template ID.
     * @param timeout (optional) Timeout
     */
    delete(id: string | null, timeout?: string | null | undefined): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Get conversion preset template
     * @param id Conversion preset template ID.
     * @return Represents the detail of a conversion preset template
     */
    get(id: string | null): Promise<ConversionPresetTemplateDetail>;
    protected processGet(response: Response): Promise<ConversionPresetTemplateDetail>;
    /**
     * Create multiple conversion preset templates
     * @param request Request containing information needed to create new conversion preset template.
     * @return Business process
     */
    createMany(request: ConversionPresetTemplateCreateManyRequest): Promise<BusinessProcess>;
    protected processCreateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Update multiple conversion preset templates
     * @param request Request containing information needed to update the conversion preset template.
     * @return Business process
     */
    updateMany(request: ConversionPresetTemplateUpdateManyRequest): Promise<BusinessProcess>;
    protected processUpdateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple conversion preset templates
     * @param request The request with conversion preset template IDs to delete.
     * @return Business process
     */
    deleteMany(request: ConversionPresetTemplateDeleteManyRequest): Promise<BusinessProcess>;
    protected processDeleteMany(response: Response): Promise<BusinessProcess>;
}
export declare class DisplayValueClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get status
     * @return VersionInfo
     */
    getStatus(): Promise<DisplayValueStatus>;
    protected processGetStatus(response: Response): Promise<DisplayValueStatus>;
    /**
     * Re-render the display values
     * @return VersionInfo
     */
    rerender(): Promise<BusinessProcess>;
    protected processRerender(response: Response): Promise<BusinessProcess>;
}
export declare class DocumentHistoryClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get current
     * @param documentType The type of the document (e.g. Content).
     * @param documentId The ID of the document (e.g. contentId).
     * @return Document history item
     */
    getCurrent(documentType: string | null, documentId: string | null): Promise<DocumentHistory>;
    protected processGetCurrent(response: Response): Promise<DocumentHistory>;
    /**
     * Get version
     * @param documentType The type of the document (e.g. Content).
     * @param documentId The ID of the document (e.g. contentId).
     * @param documentVersion The version of the document.
     * @return Document history item
     */
    getVersion(documentType: string | null, documentId: string | null, documentVersion: number): Promise<DocumentHistory>;
    protected processGetVersion(response: Response): Promise<DocumentHistory>;
    /**
     * Compare with current
     * @param documentType The type of the document (e.g. Content).
     * @param documentId The ID of the document (e.g. contentId).
     * @param version (optional) The version of the document to compare with.
     * @return Document history difference.
     */
    compareWithCurrent(documentType: string | null, documentId: string | null, version?: number | undefined): Promise<DocumentHistoryDifference>;
    protected processCompareWithCurrent(response: Response): Promise<DocumentHistoryDifference>;
    /**
     * Compare with version
     * @param documentType The type of the document (e.g. Content).
     * @param documentId The ID of the document (e.g. contentId).
     * @param documentVersion The version of the document to use for the comparison.
     * @param version (optional) The version of the document to compare with.
     * @return Document history difference
     */
    compareWithVersion(documentType: string | null, documentId: string | null, documentVersion: number, version?: number | undefined): Promise<DocumentHistoryDifference>;
    protected processCompareWithVersion(response: Response): Promise<DocumentHistoryDifference>;
    /**
     * Search
     * @param request The document history search request.
     * @return Document history search result.
     */
    search(request: DocumentHistorySearchRequest): Promise<DocumentHistorySearchResult>;
    protected processSearch(response: Response): Promise<DocumentHistorySearchResult>;
}
export declare class IdentityProviderClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get all identity providers
     * @return Array of identity providers
     */
    getAll(): Promise<IdentityProvider[]>;
    protected processGetAll(response: Response): Promise<IdentityProvider[]>;
    /**
     * Get basic info for all providers
     * @return Array of identity provider basic information
     */
    getAllBasicInfos(): Promise<IdentityProviderBasicInfo[]>;
    protected processGetAllBasicInfos(response: Response): Promise<IdentityProviderBasicInfo[]>;
    /**
     * Get identity provider
     * @param id Identity provider ID.
     * @return Represents an identity provider defined in IdentityServer and its Picturepark configuration
     */
    get(id: string | null): Promise<IdentityProvider>;
    protected processGet(response: Response): Promise<IdentityProvider>;
    /**
     * Update identity provider
     * @param id Identity provider ID.
     * @param provider Update request
     * @return Represents an identity provider defined in IdentityServer and its Picturepark configuration
     */
    update(id: string | null, provider: IdentityProviderEditable): Promise<IdentityProvider>;
    protected processUpdate(response: Response): Promise<IdentityProvider>;
    /**
     * Get synchronizable attributes
     * @return Names of user attributes
     */
    getSynchronizableAttributes(): Promise<string[]>;
    protected processGetSynchronizableAttributes(response: Response): Promise<string[]>;
}
export declare class InfoClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get version
     * @return VersionInfo
     */
    getVersion(): Promise<VersionInfo>;
    protected processGetVersion(response: Response): Promise<VersionInfo>;
    /**
     * Get info
     * @return CustomerInfo
     */
    getInfo(): Promise<CustomerInfo>;
    protected processGetInfo(response: Response): Promise<CustomerInfo>;
    /**
     * Get status
     * @return SystemStatus
     */
    getStatus(): Promise<SystemStatus>;
    protected processGetStatus(response: Response): Promise<SystemStatus>;
}
export declare class JsonSchemaClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get json schema
     * @param id The ID of the schema whose json schema to retrieve.
     */
    get(id: string | null): Promise<any>;
    protected processGet(response: Response): Promise<any>;
}
export declare class ListItemClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get list item
     * @param id The list item ID.
     * @param resolveBehaviors (optional) List of enums that control which parts of the list item are resolved and returned.
     * @return List item detail
     */
    get(id: string | null, resolveBehaviors?: ListItemResolveBehavior[] | null | undefined): Promise<ListItemDetail>;
    protected processGet(response: Response): Promise<ListItemDetail>;
    /**
     * Update list item
     * @param id The list item ID.
     * @param request The list item update request.
     * @param resolveBehaviors (optional) List of enums that control which parts of the list item are resolved and returned.
     * @param allowMissingDependencies (optional) Allows creating list items that refer to list items or contents that don't exist in the system.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return List item detail
     */
    update(id: string | null, request: ListItemUpdateRequest, resolveBehaviors?: ListItemResolveBehavior[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<ListItemDetail>;
    protected processUpdate(response: Response): Promise<ListItemDetail>;
    /**
     * Delete list item
     * @param id The ID of the list item to delete.
     * @param forceReferenceRemoval (optional) A value indicating whether references to the list item should be removed.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return Ok
     */
    delete(id: string | null, forceReferenceRemoval?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Restore list item
     * @param id The list item ID.
     * @param allowMissingDependencies (optional) Allows restoring list items that refer to list items or contents that don't exist in the system.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return Ok
     */
    restore(id: string | null, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<void>;
    protected processRestore(response: Response): Promise<void>;
    /**
     * Get list item references
     * @param id The ID of the list item.
     * @param request Request options to specify how many references to fetch.
     * @return List item references
     */
    getReferences(id: string | null, request: ListItemReferencesRequest): Promise<ListItemReferencesResult>;
    protected processGetReferences(response: Response): Promise<ListItemReferencesResult>;
    /**
     * Create list item
     * @param request List item create request.
     * @param resolveBehaviors (optional) List of enums that control which parts of the list item are resolved and returned.
     * @param allowMissingDependencies (optional) Allows creating list items that refer to list items or contents that don't exist in the system.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @param waitSearchDocCreation (optional) Wait for the creation of the search document and the rendered display values.
                By default the endpoint waits for the search document creation. Passing false, the endpoint will return when the main entity has been created and the creation of the search document has been enqueued but not yet performed.
     * @return List item detail
     */
    create(request: ListItemCreateRequest, resolveBehaviors?: ListItemResolveBehavior[] | null | undefined, allowMissingDependencies?: boolean | undefined, timeout?: string | null | undefined, waitSearchDocCreation?: boolean | undefined): Promise<ListItemDetail>;
    protected processCreate(response: Response): Promise<ListItemDetail>;
    /**
     * Get multiple list items
     * @param ids (optional) List of list item IDs.
     * @param resolveBehaviors (optional) List of enums that control which parts of the list items are resolved and returned.
     * @return List of list item details
     */
    getMany(ids?: string[] | null | undefined, resolveBehaviors?: ListItemResolveBehavior[] | null | undefined): Promise<ListItemDetail[]>;
    protected processGetMany(response: Response): Promise<ListItemDetail[]>;
    /**
     * Create multiple list items
     * @param request List item create many request.
     * @return Business process
     */
    createMany(request: ListItemCreateManyRequest): Promise<BusinessProcess>;
    protected processCreateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Update multiple list items
     * @param request List item update many request.
     * @return Business process
     */
    updateMany(request: ListItemUpdateManyRequest): Promise<BusinessProcess>;
    protected processUpdateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple list items
     * @param request List item delete many request.
     * @return Business process
     */
    deleteMany(request: ListItemDeleteManyRequest): Promise<BusinessProcess>;
    protected processDeleteMany(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple list items - by filter
     * @param request Delete many by filter request.
     * @return Business process
     */
    deleteManyByFilter(request: ListItemDeleteManyFilterRequest): Promise<BusinessProcess>;
    protected processDeleteManyByFilter(response: Response): Promise<BusinessProcess>;
    /**
     * Restore multiple list items
     * @param request List item restore many request.
     * @return Business process
     */
    restoreMany(request: ListItemRestoreManyRequest): Promise<BusinessProcess>;
    protected processRestoreMany(response: Response): Promise<BusinessProcess>;
    /**
     * Get multiple list items references
     * @param request ListItemManyReferencesRequest
     * @return A list of references per list item.
     */
    getReferencesMany(request: ListItemManyReferencesRequest): Promise<ListItemReferencesResult>;
    protected processGetReferencesMany(response: Response): Promise<ListItemReferencesResult>;
    /**
     * Batch update fields - by IDs
     * @param request List item fields batch update request.
     * @return Business process
     */
    batchUpdateFieldsByIds(request: ListItemFieldsBatchUpdateRequest): Promise<BusinessProcess>;
    protected processBatchUpdateFieldsByIds(response: Response): Promise<BusinessProcess>;
    /**
     * Batch update fields - by filter
     * @param request List item fields batch update by filter request.
     * @return Business process
     */
    batchUpdateFieldsByFilter(request: ListItemFieldsBatchUpdateFilterRequest): Promise<BusinessProcess>;
    protected processBatchUpdateFieldsByFilter(response: Response): Promise<BusinessProcess>;
    /**
     * Search list items
     * @param request The list item search request.
     * @return List item search result
     */
    search(request: ListItemSearchRequest): Promise<ListItemSearchResult>;
    protected processSearch(response: Response): Promise<ListItemSearchResult>;
    /**
     * Aggregate list items
     * @param request The list item aggregation request.
     * @return Object aggregation result
     */
    aggregate(request: ListItemAggregationRequest): Promise<ObjectAggregationResult>;
    protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
}
export declare class LiveStreamClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Search
     * @param request Parameters for the search
     * @return Resulting live stream events
     */
    search(request: LiveStreamSearchRequest): Promise<LiveStreamSearchResult>;
    protected processSearch(response: Response): Promise<LiveStreamSearchResult>;
}
export declare class MetadataClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get status
     * @return The overall status of the contents and list items in comparison to the actual schemas' structure
     */
    getStatus(): Promise<MetadataStatus>;
    protected processGetStatus(response: Response): Promise<MetadataStatus>;
    /**
     * Update outdated
     * @return Business process
     */
    updateOutdated(): Promise<BusinessProcess>;
    protected processUpdateOutdated(response: Response): Promise<BusinessProcess>;
}
export declare class NotificationClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get notification
     * @param id ID of notification
     * @return Notification
     */
    get(id: string | null): Promise<Notification>;
    protected processGet(response: Response): Promise<Notification>;
    /**
     * Mark notification as read
     * @param id ID of notification
     * @return Notification
     */
    markAsRead(id: string | null): Promise<Notification>;
    protected processMarkAsRead(response: Response): Promise<Notification>;
    /**
     * Search notifications
     * @param request Notification search request
     * @return Notification search result
     */
    search(request: NotificationSearchRequest): Promise<NotificationCompactResult>;
    protected processSearch(response: Response): Promise<NotificationCompactResult>;
    /**
     * Aggregate on notifications
     * @param request Notification aggregation request
     * @return Aggregation result
     */
    aggregate(request: NotificationAggregationRequest): Promise<ObjectAggregationResult>;
    protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
    /**
     * Mark all notifications as read
     */
    markAllAsRead(): Promise<void>;
    protected processMarkAllAsRead(response: Response): Promise<void>;
    /**
     * Get email notification settings
     * @return Email notification settings
     */
    getEmailNotificationSettings(): Promise<EmailNotificationsSettings>;
    protected processGetEmailNotificationSettings(response: Response): Promise<EmailNotificationsSettings>;
    /**
     * Update email notification settings
     * @param configuration Email notification settings
     * @return Email notification settings
     */
    putEmailNotificationSettings(configuration: EmailNotificationsSettings): Promise<EmailNotificationsSettings>;
    protected processPutEmailNotificationSettings(response: Response): Promise<EmailNotificationsSettings>;
    /**
     * Get notification types available for email settings.
     */
    getAvailableNotificationTypes(): Promise<{
        [key: string]: NotificationType[];
    }>;
    protected processGetAvailableNotificationTypes(response: Response): Promise<{
        [key: string]: NotificationType[];
    }>;
}
export declare class OutputFormatClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Sets the download file name patterns for an output format
     * @param id ID of the output format.
     * @param patterns Dictionary containing patterns per metadata language.
    If this is set, at least the customer's default language is required.
    Set any other language to an empty string and a fallback to the default language will occur.
    Set parameter to null to clear any already set patterns.
     * @return Business process
     */
    setDownloadFileNamePatterns(id: string | null, patterns: {
        [key: string]: string;
    }): Promise<BusinessProcess>;
    protected processSetDownloadFileNamePatterns(response: Response): Promise<BusinessProcess>;
    /**
     * Sets the download file name patterns for multiple output formats
     * @param request The request containing the patterns for each output format.
     * @return Business process
     */
    setDownloadFileNamePatternsMany(request: OutputFormatDownloadFileNamePatternUpdateManyRequest): Promise<BusinessProcess>;
    protected processSetDownloadFileNamePatternsMany(response: Response): Promise<BusinessProcess>;
    /**
     * Enables or disables XMP writeback for an output format
     * @param id ID of the output format.
     * @param request The request containing the state to be set for the output format.
     * @return Business process
     */
    setXmpWritebackState(id: string | null, request: OutputFormatSetXmpWritebackStateRequest): Promise<BusinessProcess>;
    protected processSetXmpWritebackState(response: Response): Promise<BusinessProcess>;
    /**
     * Enables or disables XMP writeback for multiple output formats
     * @param request The request containing the state changes for each output format.
     * @return Business process
     */
    setXmpWritebackStateMany(request: OutputFormatSetXmpWritebackStateManyRequest): Promise<BusinessProcess>;
    protected processSetXmpWritebackStateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Updates permission-related settings for an output format
     * @param id ID of the output format.
     * @param request The request containing the settings for the output format.
     * @return Business process
     */
    setPermission(id: string | null, request: OutputFormatSetPermissionRequest): Promise<BusinessProcess>;
    protected processSetPermission(response: Response): Promise<BusinessProcess>;
    /**
     * Updates permission-related settings for multiple output formats
     * @param request The request containing the state changes for each output format.
     * @return Business process
     */
    setPermissionMany(request: OutputFormatSetPermissionManyRequest): Promise<BusinessProcess>;
    protected processSetPermissionMany(response: Response): Promise<BusinessProcess>;
    /**
     * Render output format preview
     * @param request Information about the OutputFormat as well as which Content to use for the preview.
     * @return Rendered file
     */
    renderFormatPreview(request: OutputFormatRenderPreviewRequest): Promise<FileResponse>;
    protected processRenderFormatPreview(response: Response): Promise<FileResponse>;
    /**
     * Get multiple output formats
     * @param ids (optional) Output format IDs to get information about. If this is omitted, all output formats in the system will be returned.
     * @return Array of Represents an output format.
     */
    getMany(ids?: string[] | null | undefined): Promise<OutputFormatDetail[]>;
    protected processGetMany(response: Response): Promise<OutputFormatDetail[]>;
    /**
     * Create output format
     * @param request Request containing information needed to create new output format.
     * @return Business process
     */
    create(request: OutputFormat): Promise<BusinessProcess>;
    protected processCreate(response: Response): Promise<BusinessProcess>;
    /**
     * Update output format
     * @param id Output format ID.
     * @param request Request containing information needed to update the output format.
     * @return Business process
     */
    update(id: string | null, request: OutputFormatEditable): Promise<BusinessProcess>;
    protected processUpdate(response: Response): Promise<BusinessProcess>;
    /**
     * Delete output format
     * @param id Output format ID.
     * @return Business process
     */
    delete(id: string | null): Promise<BusinessProcess>;
    protected processDelete(response: Response): Promise<BusinessProcess>;
    /**
     * Get output format
     * @param id Output format ID.
     * @return Represents an output format.
     */
    get(id: string | null): Promise<OutputFormatDetail>;
    protected processGet(response: Response): Promise<OutputFormatDetail>;
    /**
     * Create multiple output formats
     * @param request Request containing information needed to create new output format.
     * @return Business process
     */
    createMany(request: OutputFormatCreateManyRequest): Promise<BusinessProcess>;
    protected processCreateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Update multiple output formats
     * @param request Request containing information needed to update the output format.
     * @return Business process
     */
    updateMany(request: OutputFormatUpdateManyRequest): Promise<BusinessProcess>;
    protected processUpdateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple output formats
     * @param request The request with output format IDs to delete.
     * @return Business process
     */
    deleteMany(request: OutputFormatDeleteManyRequest): Promise<BusinessProcess>;
    protected processDeleteMany(response: Response): Promise<BusinessProcess>;
}
export declare class OutputClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get output
     * @param id Output ID.
     * @return Output detail
     */
    get(id: string | null): Promise<OutputDetail>;
    protected processGet(response: Response): Promise<OutputDetail>;
    /**
     * Search output documents
     * @param request The output search request.
     * @return Output result set
     */
    search(request: OutputSearchRequest): Promise<OutputSearchResult>;
    protected processSearch(response: Response): Promise<OutputSearchResult>;
    /**
     * Resets retry attempt counters.
     * @param request Request containing options to filter which outputs should be reset.
     * @return Business process tracking the resetting
     */
    resetRetryAttempts(request: OutputResetRetryAttemptsRequest): Promise<BusinessProcess>;
    protected processResetRetryAttempts(response: Response): Promise<BusinessProcess>;
}
export declare class ProfileClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get
     * @return User profile
     */
    get(): Promise<UserProfile>;
    protected processGet(response: Response): Promise<UserProfile>;
    /**
     * Update
     * @param request Request to update a user profile..
     * @return Updated user profile
     */
    update(request: UserProfileUpdateRequest): Promise<UserProfile>;
    protected processUpdate(response: Response): Promise<UserProfile>;
    /**
     * Request deletion
     * @return OK
     */
    requestDeletion(): Promise<void>;
    protected processRequestDeletion(response: Response): Promise<void>;
}
export declare class SchemaPermissionSetClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get schema permission set
     * @param id Schema permission set ID.
     * @return Detail of a schema permission set
     */
    get(id: string | null): Promise<SchemaPermissionSetDetail>;
    protected processGet(response: Response): Promise<SchemaPermissionSetDetail>;
    /**
     * Update schema permission set
     * @param id Schema permission set ID.
     * @param permissionSet Permission set
     * @return Detail of a schema permission set
     */
    update(id: string | null, permissionSet: SchemaPermissionSetUpdateRequest): Promise<SchemaPermissionSetDetail>;
    protected processUpdate(response: Response): Promise<SchemaPermissionSetDetail>;
    /**
     * Delete schema permission set
     * @param id Schema permission set ID.
     */
    delete(id: string | null): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Create schema permission set
     * @param permissionSet Permission set
     * @return Detail of a schema permission set
     */
    create(permissionSet: SchemaPermissionSetCreateRequest): Promise<SchemaPermissionSetDetail>;
    protected processCreate(response: Response): Promise<SchemaPermissionSetDetail>;
    /**
     * Get multiple schema permission sets
     * @param ids (optional) Ids
     * @return Array of Detail of a schema permission set
     */
    getMany(ids?: string[] | null | undefined): Promise<SchemaPermissionSetDetail[]>;
    protected processGetMany(response: Response): Promise<SchemaPermissionSetDetail[]>;
    /**
     * Transfer ownership of schema permission set
     * @param id Schema permission set ID.
     * @param request Request to transfer the ownership of a permission set.
     */
    transferOwnership(id: string | null, request: PermissionSetOwnershipTransferRequest): Promise<void>;
    protected processTransferOwnership(response: Response): Promise<void>;
    /**
     * Get permissions for schema permission set
     * @param id Schema permission set ID.
     * @return Array of Permission set rights
     */
    getPermissions(id: string | null): Promise<PermissionSetRight[]>;
    protected processGetPermissions(response: Response): Promise<PermissionSetRight[]>;
    /**
     * Create multiple schema permission sets
     * @param request Request to update multiple schema permission sets.
     * @return Response to a bulk operation
     */
    createMany(request: SchemaPermissionSetCreateManyRequest): Promise<BulkResponse>;
    protected processCreateMany(response: Response): Promise<BulkResponse>;
    /**
     * Update multiple schema permission sets
     * @param request Request to update multiple schema permissions sets.
     * @return Response to a bulk operation
     */
    updateMany(request: SchemaPermissionSetUpdateManyRequest): Promise<BulkResponse>;
    protected processUpdateMany(response: Response): Promise<BulkResponse>;
    /**
     * Delete multiple schema permission sets
     * @param request Request to delete multiple permission sets.
     * @return Response to a bulk operation
     */
    deleteMany(request: PermissionSetDeleteManyRequest): Promise<BulkResponse>;
    protected processDeleteMany(response: Response): Promise<BulkResponse>;
    /**
     * Transfer ownership of multiple schema permission sets
     * @param request Request to transfer the ownership of multiple permission sets.
     */
    transferOwnershipMany(request: PermissionSetOwnershipTransferManyRequest): Promise<void>;
    protected processTransferOwnershipMany(response: Response): Promise<void>;
    /**
     * Get permissions for multiple schema permission sets
     * @param ids (optional) Ids
     * @return Array of Rights that the current user has on a permission set
     */
    getPermissionsMany(ids?: string[] | null | undefined): Promise<PermissionSetUserPermissionRights[]>;
    protected processGetPermissionsMany(response: Response): Promise<PermissionSetUserPermissionRights[]>;
    /**
     * Search schema permission set
     * @param request Request to search permission sets.
     * @return Result of a permission set search operation
     */
    search(request: PermissionSetSearchRequest): Promise<PermissionSetSearchResult>;
    protected processSearch(response: Response): Promise<PermissionSetSearchResult>;
}
export declare class SchemaClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get schema
     * @param id The schema ID.
     * @return Schema detail
     */
    get(id: string | null): Promise<SchemaDetail>;
    protected processGet(response: Response): Promise<SchemaDetail>;
    /**
     * Update schema
     * @param id The schema ID.
     * @param request The schema update request.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @return Schema update result, containing the updated schema
     */
    update(id: string | null, request: SchemaUpdateRequest, timeout?: string | null | undefined): Promise<SchemaUpdateResult>;
    protected processUpdate(response: Response): Promise<SchemaUpdateResult>;
    /**
     * Delete schema
     * @param id The schema ID.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @return Schema delete result
     */
    delete(id: string | null, timeout?: string | null | undefined): Promise<SchemaDeleteResult>;
    protected processDelete(response: Response): Promise<SchemaDeleteResult>;
    /**
     * Exists schema
     * @param id The schema ID.
     * @return Schema Exists response
     */
    exists(id: string | null): Promise<SchemaExistsResponse>;
    protected processExists(response: Response): Promise<SchemaExistsResponse>;
    /**
     * Exists field in schema
     * @param schemaId The schema ID.
     * @param fieldId The field ID.
     * @return Field Exists response
     */
    fieldExists(schemaId: string | null, fieldId: string | null): Promise<FieldExistsResponse>;
    protected processFieldExists(response: Response): Promise<FieldExistsResponse>;
    /**
     * Gets all schemas referenced by the schema specified in id
     * @param id The schema ID.
     * @param sourceSchema (optional) If true, the returned schemas contain also the source schema for which the referenced schemas were requested. If false, the source schema is not returned (default behavior).
     * @return Referenced schema details
     */
    getReferenced(id: string | null, sourceSchema?: boolean | undefined): Promise<SchemaDetail[]>;
    protected processGetReferenced(response: Response): Promise<SchemaDetail[]>;
    /**
     * Transfer ownership
     * @param id The schema ID.
     * @param request Request detailing which user to transfer to.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @return OK
     */
    transferOwnership(id: string | null, request: SchemaOwnershipTransferRequest, timeout?: string | null | undefined): Promise<void>;
    protected processTransferOwnership(response: Response): Promise<void>;
    /**
     * Create schema
     * @param request The schema create request.
     * @param timeout (optional) Maximum time to wait for the operation to complete. If timeout is exceeded, the operation is not aborted but continues anyhow.
                Only the waiting is aborted, and the calls returned.
     * @return Schema create result, containing the created schema
     */
    create(request: SchemaCreateRequest, timeout?: string | null | undefined): Promise<SchemaCreateResult>;
    protected processCreate(response: Response): Promise<SchemaCreateResult>;
    /**
     * Get multiple schemas
     * @param ids (optional) Comma separated list of schema IDs.
     * @return List of schema details
     */
    getMany(ids?: string[] | null | undefined): Promise<SchemaDetail[]>;
    protected processGetMany(response: Response): Promise<SchemaDetail[]>;
    /**
     * Create multiple schemas
     * @param request The schema create many request.
     * @return BusinessProcess which can be awaited
     */
    createMany(request: SchemaCreateManyRequest): Promise<BusinessProcess>;
    protected processCreateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Update multiple schema
     * @param request Request to update multiple schemas.
     * @return BusinessProcess which can be awaited
     */
    updateMany(request: SchemaUpdateManyRequest): Promise<BusinessProcess>;
    protected processUpdateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Gets all schemas referenced by the schemas specified in ids
     * @param ids (optional) The schema IDs.
     * @param sourceSchema (optional) If true, the returned schemas contain also the source schemas for which the referenced schemas were requested. If false, the source schemas are not returned (default behavior).
     * @return Referenced schema details
     */
    getManyReferenced(ids?: string[] | null | undefined, sourceSchema?: boolean | undefined): Promise<SchemaDetail[]>;
    protected processGetManyReferenced(response: Response): Promise<SchemaDetail[]>;
    /**
     * Transfer ownership of multiple schemas
     * @param request Schema ownership transfer many request.
     * @return Business process
     */
    transferOwnershipMany(request: SchemaOwnershipTransferManyRequest): Promise<BusinessProcess>;
    protected processTransferOwnershipMany(response: Response): Promise<BusinessProcess>;
    /**
     * Search schemas
     * @param request The schema search request.
     * @return Schema search result
     */
    search(request: SchemaSearchRequest): Promise<SchemaSearchResult>;
    protected processSearch(response: Response): Promise<SchemaSearchResult>;
    /**
     * Retrieve the fields that can be used in an aggregator on a schema.
     * @param id The ID of the schema.
     * @return The list of fields
     */
    getAggregationFields(id: string | null): Promise<FieldInfo[]>;
    protected processGetAggregationFields(response: Response): Promise<FieldInfo[]>;
    /**
     * Retrieve the fields that can be used in an aggregator on multiple schemas.
     * @param ids (optional) The IDs of the schemas.
     * @return The list of fields
     */
    getAggregationFieldsMany(ids?: string[] | null | undefined): Promise<FieldInfo[]>;
    protected processGetAggregationFieldsMany(response: Response): Promise<FieldInfo[]>;
    /**
     * Retrieve the fields that can be used in a filter on a schema.
     * @param id The ID of the schema.
     * @return The list of fields
     */
    getFilterFields(id: string | null): Promise<FieldInfo[]>;
    protected processGetFilterFields(response: Response): Promise<FieldInfo[]>;
    /**
     * Retrieve the fields that can be used in a filter on multiple schemas.
     * @param ids (optional) The IDs of the schemas.
     * @return The list of fields
     */
    getFilterFieldsMany(ids?: string[] | null | undefined): Promise<FieldInfo[]>;
    protected processGetFilterFieldsMany(response: Response): Promise<FieldInfo[]>;
    /**
     * Retrieve the fields that can be used for sorting.
     * @param schemaTypes (optional) Schema types to include in search
     * @return The list of fields
     */
    getSortFieldsBySchemaTypes(schemaTypes?: SchemaType[] | null | undefined): Promise<SortFieldInfo[]>;
    protected processGetSortFieldsBySchemaTypes(response: Response): Promise<SortFieldInfo[]>;
}
export declare class SchemaTransferClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Import schemas
     * @param request The schema import request.
     * @return Transfer
     */
    import(request: SchemaImportRequest): Promise<Transfer>;
    protected processImport(response: Response): Promise<Transfer>;
}
export declare class ShareClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get share json
     * @param token Share token
     * @param languageCode (optional) Language code
     * @param resolveBehaviors (optional) List of enums that control which parts of the share are resolved and returned.
     * @param contentResolveLimit (optional) Optional limit the number of contents to resolve. Use a lower value for higher performance. If nothing is specified, everything is resolved.
     * @return ShareDetail
     */
    getShareJson(token: string | null, languageCode?: string | null | undefined, resolveBehaviors?: ShareResolveBehavior[] | null | undefined, contentResolveLimit?: number | null | undefined): Promise<ShareDetail>;
    protected processGetShareJson(response: Response): Promise<ShareDetail>;
    /**
     * Get share contents
     * @param token Share token
     * @param languageCode (optional) Language code
     * @param limit (optional) Number of contents to return
     * @param pageToken (optional) PageToken to page over contents
     * @return ShareContentDetailResult
     */
    getShareContents(token: string | null, languageCode?: string | null | undefined, limit?: number | undefined, pageToken?: string | null | undefined): Promise<ShareContentDetailResult>;
    protected processGetShareContents(response: Response): Promise<ShareContentDetailResult>;
    /**
     * Get shared outputs
     * @param token Share token
     * @return List of OutputResolveResult
     */
    getOutputsInShare(token: string | null): Promise<ShareOutputsResult>;
    protected processGetOutputsInShare(response: Response): Promise<ShareOutputsResult>;
    /**
     * Download shared outputs
     * @param token Share token
     * @param width (optional) Optional width in pixels to resize image
     * @param height (optional) Optional height in pixels to resize image
     * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
     */
    download(token: string | null, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
    protected processDownload(response: Response): Promise<FileResponse>;
    /**
     * Download selection of a share
     * @param token Share token
     * @param request Share download request
     * @return DownloadLink
     */
    createShareSelectionDownloadLink(token: string | null, request: ShareDownloadRequest): Promise<DownloadLink>;
    protected processCreateShareSelectionDownloadLink(response: Response): Promise<DownloadLink>;
    /**
     * Download shared output
     * @param token Share token
     * @param contentId The content id
     * @param outputFormatId The output format id
     * @param width (optional) Optional width in pixels to resize image
     * @param height (optional) Optional height in pixels to resize image
     * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
     */
    downloadSingleContent(token: string | null, contentId: string | null, outputFormatId: string | null, width?: number | null | undefined, height?: number | null | undefined, range?: string | null | undefined): Promise<FileResponse>;
    protected processDownloadSingleContent(response: Response): Promise<FileResponse>;
    /**
     * Download shared outputs
     * @param token Share token
     * @param conversionPreset Image editing specification
     * @param range (optional) The range of bytes to download (http range header): bytes={from}-{to} (e.g. bytes=0-100000)
     */
    downloadWithConversionPreset(token: string | null, conversionPreset: string | null, range?: string | null | undefined): Promise<FileResponse>;
    protected processDownloadWithConversionPreset(response: Response): Promise<FileResponse>;
    /**
     * Get
     * @param id Share Id (not token, use [GetShareJson](#operation/Share_GetShareJson) to get share by token)
     * @param resolveBehaviors (optional) List of enums that control which parts of the share are resolved and returned.
     * @param contentResolveLimit (optional) Optional limit the number of contents to resolve. Use a lower value for higher performance. If nothing is specified, everything is resolved.
     * @return Share detail
     */
    get(id: string | null, resolveBehaviors?: ShareResolveBehavior[] | null | undefined, contentResolveLimit?: number | null | undefined): Promise<ShareDetail>;
    protected processGet(response: Response): Promise<ShareDetail>;
    /**
     * Update
     * @param id The share id.
     * @param request The share update request.
     * @return BusinessProcess
     */
    update(id: string | null, request: ShareBaseUpdateRequest): Promise<BusinessProcess>;
    protected processUpdate(response: Response): Promise<BusinessProcess>;
    /**
     * Get contents in share
     * @param id Share Id
     * @param limit (optional) Number of contents to return
     * @param pageToken (optional) PageToken to page over contents
     * @return ShareContentDetailResult
     */
    getContentsInShare(id: string | null, limit?: number | undefined, pageToken?: string | null | undefined): Promise<ShareContentDetailResult>;
    protected processGetContentsInShare(response: Response): Promise<ShareContentDetailResult>;
    /**
     * Create
     * @param request Polymorphic create contract. Use either ShareBasicCreateRequest or ShareEmbedCreateRequest
     * @return BusinessProcess
     */
    create(request: ShareBaseCreateRequest): Promise<BusinessProcess>;
    protected processCreate(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple shares
     * @param request A delete many request containing the ids of the shares to delete.
     * @return BusinessProcess
     */
    deleteMany(request: ShareDeleteManyRequest): Promise<BusinessProcess>;
    protected processDeleteMany(response: Response): Promise<BusinessProcess>;
    /**
     * Revokes multiple shares
     * @param request A revoke many request containing the ids of the shares to revoke.
     * @return BusinessProcess
     */
    revoke(request: ShareRevokeManyRequest): Promise<BusinessProcess>;
    protected processRevoke(response: Response): Promise<BusinessProcess>;
    /**
     * Aggregate
     * @param request Aggregation request
     * @return Share aggregation result
     */
    aggregate(request: ShareAggregationRequest): Promise<ObjectAggregationResult>;
    protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
    /**
     * Search
     * @param request Search request
     * @return Share search result
     */
    search(request: ShareSearchRequest): Promise<ShareSearchResult>;
    protected processSearch(response: Response): Promise<ShareSearchResult>;
}
export declare class StatisticClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Retrieve single content statistics
     * @param contentId Id of Content
     * @param timeFrames (optional) Optionally aggregate data for given time frames
     */
    getSingleContentStatistics(contentId: string | null, timeFrames?: string[] | null | undefined): Promise<ContentStatisticsAggregated>;
    protected processGetSingleContentStatistics(response: Response): Promise<ContentStatisticsAggregated>;
    /**
     * Export content statistics
     * @param request Request
     * @return Business process
     */
    exportContentStatistics(request: ExportContentStatisticsRequest): Promise<BusinessProcess>;
    protected processExportContentStatistics(response: Response): Promise<BusinessProcess>;
    /**
     * Resolve download link
     * @param referenceId Reference id
     * @return Download link information
     */
    resolveDownloadLink(referenceId: string | null): Promise<DownloadLink>;
    protected processResolveDownloadLink(response: Response): Promise<DownloadLink>;
    /**
     * Add content events
     * @param request Request
     * @return Business process
     */
    addContentEvents(request: AddContentEventsRequest): Promise<BusinessProcess>;
    protected processAddContentEvents(response: Response): Promise<BusinessProcess>;
}
export declare class TemplateClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get template
     * @param id ID of template.
     * @return Template
     */
    get(id: string | null): Promise<Template>;
    protected processGet(response: Response): Promise<Template>;
    /**
     * Update template
     * @param id ID of template.
     * @param request Template
     * @return Template
     */
    update(id: string | null, request: TemplateUpdateRequest): Promise<Template>;
    protected processUpdate(response: Response): Promise<Template>;
    /**
     * Delete template
     * @param id ID of template
     */
    delete(id: string | null): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Create template
     * @param request TemplateCreateRequest
     * @return Template
     */
    create(request: TemplateCreateRequest): Promise<Template>;
    protected processCreate(response: Response): Promise<Template>;
    /**
     * Get all templates
     * @return All templates
     */
    getAll(): Promise<Template[]>;
    protected processGetAll(response: Response): Promise<Template[]>;
    /**
     * Search templates
     * @param searchRequest The template search request.
     * @return Template search result
     */
    search(searchRequest: TemplateSearchRequest): Promise<TemplateSearchResult>;
    protected processSearch(response: Response): Promise<TemplateSearchResult>;
}
export declare class TransferClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Create transfer
     * @param request The create transfer request
     * @return Transfer
     */
    create(request: CreateTransferRequest): Promise<Transfer>;
    protected processCreate(response: Response): Promise<Transfer>;
    /**
     * Get transfer details
     * @param id ID of transfer.
     * @return TransferDetail
     */
    get(id: string | null): Promise<TransferDetail>;
    protected processGet(response: Response): Promise<TransferDetail>;
    /**
     * Delete transfer
     * @param id ID of transfer.
     * @return OK
     */
    delete(id: string | null): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Import transfer
     * @param id ID of transfer.
     * @param request The ImportTransfer request.
     * @return Transfer
     */
    import(id: string | null, request: ImportTransferRequest): Promise<Transfer>;
    protected processImport(response: Response): Promise<Transfer>;
    /**
     * Import transfer partially
     * @param id ID of transfer.
     * @param request The ImportTransferPartial request.
     * @return Transfer
     */
    partialImport(id: string | null, request: ImportTransferPartialRequest): Promise<Transfer>;
    protected processPartialImport(response: Response): Promise<Transfer>;
    /**
     * Cancel transfer
     * @param id ID of transfer.
     * @return OK
     */
    cancel(id: string | null): Promise<void>;
    protected processCancel(response: Response): Promise<void>;
    /**
     * Search
     * @param request The transfer search request
     * @return TransferSearchResult
     */
    search(request: TransferSearchRequest): Promise<TransferSearchResult>;
    protected processSearch(response: Response): Promise<TransferSearchResult>;
    /**
     * Get file
     * @param id ID of file transfer.
     * @return FileTransferDetail
     */
    getFile(id: string | null): Promise<FileTransferDetail>;
    protected processGetFile(response: Response): Promise<FileTransferDetail>;
    /**
     * Search for files
     * @param request The file transfer search request
     * @return FileTransferSearchResult
     */
    searchFiles(request: FileTransferSearchRequest): Promise<FileTransferSearchResult>;
    protected processSearchFiles(response: Response): Promise<FileTransferSearchResult>;
    /**
     * Delete files
     * @param request The file transfer delete request
     */
    deleteFiles(request: FileTransferDeleteRequest): Promise<void>;
    protected processDeleteFiles(response: Response): Promise<void>;
    /**
     * Get blacklist
     * @return Blacklist
     */
    getBlacklist(): Promise<Blacklist>;
    protected processGetBlacklist(response: Response): Promise<Blacklist>;
    /**
     * Upload file
     * @param chunkNumber Information about chunk.
     * @param currentChunkSize Information about chunk.
     * @param totalSize Information about chunk.
     * @param totalChunks Information about chunk.
     * @param transferId ID of transfer.
     * @param requestId Identifier of file.
     * @param body (optional) Body
     * @return OK
     */
    uploadFile(chunkNumber: number, currentChunkSize: number, totalSize: number, totalChunks: number, transferId: string | null, requestId: string | null, body?: Blob | undefined): Promise<void>;
    protected processUploadFile(response: Response): Promise<void>;
}
export declare class UserRoleClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Search user roles
     * @param request User role search request.
     * @return Result of the user role search
     */
    search(request: UserRoleSearchRequest): Promise<UserRoleSearchResult>;
    protected processSearch(response: Response): Promise<UserRoleSearchResult>;
    /**
     * Get multiple user roles
     * @param ids (optional) User role IDs to get information about.
     * @return Array of Represents a user role, which associates users with user rights.
     */
    getMany(ids?: string[] | null | undefined): Promise<UserRoleDetail[]>;
    protected processGetMany(response: Response): Promise<UserRoleDetail[]>;
    /**
     * Create user role
     * @param request Request containing information needed to create new user role.
     * @return Represents a user role, which associates users with user rights.
     */
    create(request: UserRoleCreateRequest): Promise<UserRoleDetail>;
    protected processCreate(response: Response): Promise<UserRoleDetail>;
    /**
     * Create multiple user roles
     * @param request Request containing information needed to create new user role.
     * @return Response to a bulk operation
     */
    createMany(request: UserRoleCreateManyRequest): Promise<BulkResponse>;
    protected processCreateMany(response: Response): Promise<BulkResponse>;
    /**
     * Update multiple user roles
     * @param request Request containing information needed to update the user role.
     * @return Response to a bulk operation
     */
    updateMany(request: UserRoleUpdateManyRequest): Promise<BulkResponse>;
    protected processUpdateMany(response: Response): Promise<BulkResponse>;
    /**
     * Delete multiple user roles
     * @param request The request with user role IDs to delete.
     * @return Response to a bulk operation
     */
    deleteMany(request: UserRoleDeleteManyRequest): Promise<BulkResponse>;
    protected processDeleteMany(response: Response): Promise<BulkResponse>;
    /**
     * Get user role
     * @param id User role ID.
     * @return Represents a user role, which associates users with user rights.
     */
    get(id: string | null): Promise<UserRoleDetail>;
    protected processGet(response: Response): Promise<UserRoleDetail>;
    /**
     * Update user role
     * @param id User role ID.
     * @param request Request containing information needed to update the user role.
     * @return Represents a user role, which associates users with user rights.
     */
    update(id: string | null, request: UserRoleEditable): Promise<UserRoleDetail>;
    protected processUpdate(response: Response): Promise<UserRoleDetail>;
    /**
     * Delete user role
     * @param id User role ID.
     */
    delete(id: string | null): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
}
export declare class UserClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Get user
     * @param id User ID to search for.
     * @return Requested user details
     */
    get(id: string | null): Promise<UserDetail>;
    protected processGet(response: Response): Promise<UserDetail>;
    /**
     * Update user
     * @param id User ID to action on.
     * @param request New user information.
     * @return User details after the update of the user
     */
    update(id: string | null, request: UserUpdateRequest): Promise<UserDetail>;
    protected processUpdate(response: Response): Promise<UserDetail>;
    /**
     * Lock / unlock user
     * @param id User ID to action on.
     * @param request Request detailing if the user should be locked or unlocked.
     * @return OK
     */
    lock(id: string | null, request: UserLockRequest): Promise<void>;
    protected processLock(response: Response): Promise<void>;
    /**
     * Change lock state of multiple users
     * @param request Information about users to update and the desired lock state
     * @return Business process
     */
    lockMany(request: UserLockManyRequest): Promise<BusinessProcess>;
    protected processLockMany(response: Response): Promise<BusinessProcess>;
    /**
     * Change user's review state
     * @param id User ID to action on.
     * @param request Request detailing if the user should be set as _reviewed_ or _to be reviewed_.
     * @return OK
     */
    review(id: string | null, request: UserReviewRequest): Promise<void>;
    protected processReview(response: Response): Promise<void>;
    /**
     * Change Review state of multiple users
     * @param request Information about users to update and the desired review state
     * @return Business process
     */
    reviewMany(request: UserReviewManyRequest): Promise<BusinessProcess>;
    protected processReviewMany(response: Response): Promise<BusinessProcess>;
    /**
     * Invite user
     * @param id User ID to action on.
     * @return OK
     */
    invite(id: string | null): Promise<void>;
    protected processInvite(response: Response): Promise<void>;
    /**
     * Invite multiple users
     * @param request Information about users to invite
     * @return Business process
     */
    inviteMany(request: UserInviteManyRequest): Promise<BusinessProcess>;
    protected processInviteMany(response: Response): Promise<BusinessProcess>;
    /**
     * Reinvite user
     * @param id User ID to action on.
     * @return OK
     */
    reinvite(id: string | null): Promise<void>;
    protected processReinvite(response: Response): Promise<void>;
    /**
     * Reinvite users
     * @param request Information about users to reinvite
     * @return Business process
     */
    reInviteMany(request: UserReinviteManyRequest): Promise<BusinessProcess>;
    protected processReInviteMany(response: Response): Promise<BusinessProcess>;
    /**
     * Assign or unassign userRoles
     * @param request Information about users to modify and kind of operation
     * @return Business process
     */
    assignUserRoles(request: UserRoleAssignManyRequest): Promise<BusinessProcess>;
    protected processAssignUserRoles(response: Response): Promise<BusinessProcess>;
    /**
     * Delete user
     * @param id User ID
     * @param request Request with details about deletion
     * @return OK
     */
    delete(id: string | null, request: UserDeleteRequest): Promise<void>;
    protected processDelete(response: Response): Promise<void>;
    /**
     * Archive user
     * @param id User ID
     * @return OK
     */
    archive(id: string | null): Promise<void>;
    protected processArchive(response: Response): Promise<void>;
    /**
     * Restore user
     * @param id User ID to action on.
     * @return OK
     */
    restore(id: string | null): Promise<void>;
    protected processRestore(response: Response): Promise<void>;
    /**
     * Cancels a user triggered deletion request and returns user to _Reviewed_ state.
     * @param id User ID to action on.
     * @return OK
     */
    cancelDeletionRequest(id: string | null): Promise<void>;
    protected processCancelDeletionRequest(response: Response): Promise<void>;
    /**
     * Get user by owner token
     * @param tokenId ID of the owner token.
     * @return User details of the user referenced by the owner token
     */
    getByOwnerToken(tokenId: string | null): Promise<UserDetail>;
    protected processGetByOwnerToken(response: Response): Promise<UserDetail>;
    /**
     * Create user
     * @param request Requested user information.
     * @return Newly created user
     */
    create(request: UserCreateRequest): Promise<UserDetail>;
    protected processCreate(response: Response): Promise<UserDetail>;
    /**
     * Get multiple users
     * @param ids (optional) User IDs.
     * @return Details of all the users who were found
     */
    getMany(ids?: string[] | null | undefined): Promise<UserDetail[]>;
    protected processGetMany(response: Response): Promise<UserDetail[]>;
    /**
     * Search users
     * @param request User search request.
     * @return Result of the user search
     */
    search(request: UserSearchRequest): Promise<UserSearchResult>;
    protected processSearch(response: Response): Promise<UserSearchResult>;
    /**
     * Aggregate users
     * @param request User aggregation request.
     * @return Aggregation based on the request
     */
    aggregate(request: UserAggregationRequest): Promise<ObjectAggregationResult>;
    protected processAggregate(response: Response): Promise<ObjectAggregationResult>;
    /**
     * Update identity provider on multiple users
     * @param request User update identity provider request.
     * @return Business process
     */
    updateIdentityProviderMany(request: UserUpdateIdentityProviderManyRequest): Promise<BusinessProcess>;
    protected processUpdateIdentityProviderMany(response: Response): Promise<BusinessProcess>;
}
export declare class XmpMappingClient extends PictureparkClientBase {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(configuration: AuthClient, baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * Gets fields available for XMP mapping.
     * @return XmpMappingTargets containing both XMP fields and metadata fields that are available for mapping.
     */
    getAvailableTargets(): Promise<XmpMappingTargets>;
    protected processGetAvailableTargets(response: Response): Promise<XmpMappingTargets>;
    /**
     * Searches for XMP mappings
     * @param request Search request for getting configured XMP mappings.
     * @return Holds results of search for XMP mappings
     */
    search(request: XmpMappingEntrySearchRequest): Promise<XmpMappingEntrySearchResult>;
    protected processSearch(response: Response): Promise<XmpMappingEntrySearchResult>;
    /**
     * Create xmp mapping
     * @param request Request containing information needed to create new xmp mapping.
     * @return Business process
     */
    create(request: XmpMappingEntryCreateRequest): Promise<BusinessProcess>;
    protected processCreate(response: Response): Promise<BusinessProcess>;
    /**
     * Get multiple xmp mappings
     * @param ids (optional) Xmp mapping IDs to get information about.
     * @return Array of XMP mapping entry
     */
    getMany(ids?: string[] | null | undefined): Promise<XmpMappingEntry[]>;
    protected processGetMany(response: Response): Promise<XmpMappingEntry[]>;
    /**
     * Update xmp mapping
     * @param id Xmp mapping ID.
     * @param request Request containing information needed to update the xmp mapping.
     * @return Business process
     */
    update(id: string | null, request: XmpMappingEntry): Promise<BusinessProcess>;
    protected processUpdate(response: Response): Promise<BusinessProcess>;
    /**
     * Delete xmp mapping
     * @param id Xmp mapping ID.
     * @return Business process
     */
    delete(id: string | null): Promise<BusinessProcess>;
    protected processDelete(response: Response): Promise<BusinessProcess>;
    /**
     * Get xmp mapping
     * @param id Xmp mapping ID.
     * @return XMP mapping entry
     */
    get(id: string | null): Promise<XmpMappingEntry>;
    protected processGet(response: Response): Promise<XmpMappingEntry>;
    /**
     * Create multiple xmp mappings
     * @param request Request containing information needed to create new xmp mapping.
     * @return Business process
     */
    createMany(request: XmpMappingEntryCreateManyRequest): Promise<BusinessProcess>;
    protected processCreateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Update multiple xmp mappings
     * @param request Request containing information needed to update the xmp mapping.
     * @return Business process
     */
    updateMany(request: XmpMappingEntryUpdateManyRequest): Promise<BusinessProcess>;
    protected processUpdateMany(response: Response): Promise<BusinessProcess>;
    /**
     * Delete multiple xmp mappings
     * @param request The request with xmp mapping IDs to delete.
     * @return Business process
     */
    deleteMany(request: XmpMappingEntryDeleteManyRequest): Promise<BusinessProcess>;
    protected processDeleteMany(response: Response): Promise<BusinessProcess>;
}
/** Business process */
export interface BusinessProcess {
    /** ID of the business process. */
    id: string;
    /** ID of the business process definition associated to the business process. */
    processDefinitionId: string;
    /** ID of the document that is modified by the running of the business process. Used during the cancellation of the business process. */
    referenceId?: string | undefined;
    /** Type of the document that is modified by the running of the business process. Used during the cancellation of the business process. */
    referenceDocType?: string | undefined;
    /** True if the business process execution can be cancelled. False otherwise. */
    supportsCancellation: boolean;
    /** Scope of the business process. */
    businessProcessScope: BusinessProcessScope;
    /** Current life cycle of the business process. */
    lifeCycle: BusinessProcessLifeCycle;
    /** When the business process started. */
    startDate: Date;
    /** When the business process finished. */
    endDate: Date;
    /** Is the business process finished. */
    finished: boolean;
    /** List containing the history of all the state transitions of the business process. */
    stateHistory?: BusinessProcessState[] | undefined;
    /** Current state of the business process. */
    currentState?: string | undefined;
    /** Timestamp when the business process last reported progress. */
    lastReportedProgress?: Date | undefined;
    /** Id of the business process that will be automatically started after the completion of the current one, if any. */
    continuationBusinessProcessId?: string | undefined;
    kind: string;
}
/** Scope of the business process */
export declare enum BusinessProcessScope {
    System,
    User
}
/** Life cycle of the business process */
export declare enum BusinessProcessLifeCycle {
    Draft,
    InProgress,
    Succeeded,
    Cancelled,
    CancellationInProgress,
    Failed,
    SucceededWithErrors
}
/** State transition information of a business process */
export interface BusinessProcessState {
    /** State of the business process */
    state: string;
    /** Date and time of when the state transition was performed. */
    timestamp: Date;
    /** Eventual error associated to the state transition. */
    error?: ErrorResponse | undefined;
}
/** Error information with serialized exception */
export interface ErrorResponse {
    /** Serialized PictureparkBusinessException. */
    exception?: string | undefined;
    /** Trace ID. */
    traceId?: string | undefined;
    /** Trace job ID. */
    traceJobId?: string | undefined;
}
export interface Exception {
}
export interface PictureparkException extends Exception {
    traceLevel?: TraceLevel;
    traceId?: string | undefined;
    traceJobId?: string | undefined;
    httpStatusCode?: number;
    exceptionMessage?: string | undefined;
    kind: string;
}
export interface PictureparkBusinessException extends PictureparkException {
    customerId?: string | undefined;
    customerAlias?: string | undefined;
    userId?: string | undefined;
}
export interface PictureparkValidationException extends PictureparkBusinessException {
}
export declare enum TraceLevel {
    Critical,
    Error,
    Warning,
    Information,
    Verbose
}
export interface PictureparkConflictException extends PictureparkBusinessException {
}
export interface PictureparkTimeoutException extends PictureparkValidationException {
}
export interface PictureparkForbiddenException extends PictureparkBusinessException {
}
export interface UserEmailAlreadyExistsException extends PictureparkValidationException {
    email?: string | undefined;
}
export interface UnableToDeleteUserRoleException extends PictureparkValidationException {
    userRoleId?: string | undefined;
}
export interface UserRoleAssignedException extends UnableToDeleteUserRoleException {
}
export interface UserNotFoundException extends PictureparkBusinessException {
    missingUserId?: string | undefined;
}
export interface UserNotDeactivatedException extends PictureparkValidationException {
    notDeactivatedUserId?: string | undefined;
}
export interface UserWithOwnerTokensArchiveException extends PictureparkValidationException {
    notArchivedUserId?: string | undefined;
}
export interface UserInactiveOrDeletedException extends PictureparkValidationException {
    /** The ID of the inactive or deleted user in question. */
    affectedUserId?: string | undefined;
}
export interface InactiveOrDeletedUserRefusedAccessException extends PictureparkForbiddenException {
}
export interface TermsOfServiceNotNewestException extends PictureparkBusinessException {
}
export interface IllegalAuthorizationStateTransitionException extends PictureparkValidationException {
    requestedUserId?: string | undefined;
    authorizationState?: AuthorizationState;
    transition?: string | undefined;
}
/** User authorization state */
export declare enum AuthorizationState {
    Reviewed,
    ToBeReviewed,
    Invited,
    UserTriggeredDeactivation
}
export interface TermsOfServiceConsentRequiredException extends PictureparkForbiddenException {
}
export interface PictureparkNotFoundException extends PictureparkBusinessException {
    reference?: string | undefined;
}
export interface UserRolesNotFoundException extends PictureparkNotFoundException {
    userRoleIds?: string[] | undefined;
}
export interface UnauthorizedException extends PictureparkBusinessException {
}
export interface UserUnlockDisallowedException extends PictureparkValidationException {
    requestedUserId?: string | undefined;
    authorizationState?: AuthorizationState;
}
export interface UserAlreadyInRequestedLockStateException extends PictureparkBusinessException {
    affectedUserId?: string | undefined;
    userIsLocked?: boolean;
}
export interface LoginUsingIncorrectIdentityProviderException extends PictureparkForbiddenException {
    affectedUserId?: string | undefined;
}
export interface IdentityProviderNotFoundException extends PictureparkValidationException {
    missingIdentityProviderId?: string | undefined;
    external?: boolean;
}
export interface UserDoesNotSupportLocalLoginException extends PictureparkValidationException {
    affectedUserId?: string | undefined;
}
export interface UserAttributeNotSynchronizableException extends PictureparkValidationException {
    attributePath?: string | undefined;
}
export interface UnableToMapMultipleClaimTypesIntoSameAttributeException extends PictureparkValidationException {
    attributePath?: string | undefined;
}
export interface UnableToChangeMappedUserRolesForFederatedUserException extends PictureparkValidationException {
    affectedUserId?: string | undefined;
    userRoleIds?: string[] | undefined;
}
export interface UnableToDeleteDefaultUserRoleException extends UnableToDeleteUserRoleException {
}
export interface UnableToDeleteUserRoleReferencedInIdentityProviderGroupMappingException extends UnableToDeleteUserRoleException {
    identityProviderIds?: string[] | undefined;
}
export interface UserPropertyChangeNotSupportedException extends PictureparkValidationException {
    propertyPath?: string | undefined;
    affectedUserId?: string | undefined;
}
export interface UserNotLinkedWithIdsException extends PictureparkBusinessException {
    affectedUserId?: string | undefined;
}
export interface LanguageCodeNotExistingException extends PictureparkValidationException {
    languageCode?: string | undefined;
    existingLanguageCodes?: string[] | undefined;
}
export interface RenderingException extends PictureparkBusinessException {
}
export interface FormatNotApplicableForRenderingException extends RenderingException {
    contentRenderingType?: RenderingCategory;
    outputFormatId?: string | undefined;
}
export declare enum RenderingCategory {
    Unknown,
    Image,
    Document,
    Video,
    Audio,
    Vector
}
export interface FocalPointCropSizeMissingException extends PictureparkValidationException {
    contentId?: string | undefined;
    focalPointId?: string | undefined;
}
export interface ServiceProviderDeleteException extends PictureparkException {
    serviceProviderId?: string | undefined;
    detailedErrorMessage?: string | undefined;
}
export interface ServiceProviderCreateException extends PictureparkException {
    externalId?: string | undefined;
    detailErrorMessage?: string | undefined;
}
export interface ServiceProviderNotFoundException extends PictureparkException {
    missingServiceProviderId?: string | undefined;
}
export interface DocumentVersionNotFoundException extends PictureparkNotFoundException {
    documentType?: string | undefined;
    documentId?: string | undefined;
    documentVersion?: string | undefined;
}
export interface DefaultChannelDeleteException extends PictureparkValidationException {
}
export interface ChannelsNotFoundException extends PictureparkNotFoundException {
}
export interface SuperAdminRolesNotAssignableToChannelException extends PictureparkValidationException {
}
export interface ElasticVersionUpdateException extends PictureparkException {
    expectedVersion?: string | undefined;
    actualVersion?: string | undefined;
}
export interface InvalidVersionException extends PictureparkException {
    component?: string | undefined;
    version?: string | undefined;
    expectedVersion?: string | undefined;
}
export interface EnvironmentNotDeactivatedException extends PictureparkException {
}
export interface EnvironmentNotFoundException extends PictureparkException {
}
export interface EnvironmentDeactivationException extends PictureparkException {
    deactivationMessage?: string | undefined;
}
export interface CustomerClonesNotAcceptedException extends PictureparkValidationException {
}
export interface ShareNotFoundException extends PictureparkNotFoundException {
    shareId?: string | undefined;
}
export interface ShareByTokenNotFoundException extends PictureparkNotFoundException {
    token?: string | undefined;
}
export interface TokenGenerationException extends PictureparkBusinessException {
    retries?: number;
}
export interface ShareExpiredException extends PictureparkBusinessException {
    token?: string | undefined;
}
export interface ShareSizeLimitExceededException extends PictureparkValidationException {
    shareId?: string | undefined;
    limit?: number;
}
export interface DuplicateSharedOutputException extends PictureparkValidationException {
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
}
export interface DuplicateEmbedConversionPresetException extends PictureparkValidationException {
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
}
export interface OutputIdNotFoundException extends PictureparkNotFoundException {
    outputId?: string | undefined;
}
export interface OutputNotFoundException extends PictureparkNotFoundException {
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
}
export interface UnmodifiedOriginalOutputNotFoundException extends OutputNotFoundException {
}
export interface UnableToCreateOrModifyStaticOutputFormatException extends PictureparkValidationException {
}
export interface NotSupportedFileMappingException extends PictureparkValidationException {
    inputExtension?: string | undefined;
    targetFormatKind?: string | undefined;
}
export interface NotSupportedFileMappingForDynamicFormatException extends NotSupportedFileMappingException {
    formatId?: string | undefined;
}
export interface NotSupportedFileExtensionException extends PictureparkValidationException {
    extension?: string | undefined;
}
export interface DuplicateOutputFormatIdException extends PictureparkValidationException {
    id?: string | undefined;
}
export interface OutputEditingNotSupportedException extends PictureparkValidationException {
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
}
export interface OutputBackupNotRequestedException extends PictureparkValidationException {
}
export interface OutputBackupHashMismatchException extends PictureparkValidationException {
    requestedHash?: string | undefined;
    documentHash?: string | undefined;
}
export interface OutputOperationInProgressException extends PictureparkBusinessException {
}
export interface DownloadLinkExpiredException extends PictureparkBusinessException {
}
export interface RenderingNotAwaitedException extends PictureparkBusinessException {
}
export interface DuplicateContentDownloadRequestException extends PictureparkValidationException {
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
}
export interface InvalidContentDownloadRequestException extends PictureparkValidationException {
}
export interface DownloadNotFoundException extends PictureparkNotFoundException {
    token?: string | undefined;
}
export interface EmbedMultiDownloadException extends PictureparkValidationException {
    token?: string | undefined;
}
export interface ImageOptimizationLicensingException extends PictureparkValidationException {
}
export interface LeaseNotAcquiredException extends PictureparkBusinessException {
    resourceId?: string | undefined;
}
export interface OperationInProgressException extends PictureparkBusinessException {
    leaseResourceType?: LeaseResourceType;
}
export declare enum LeaseResourceType {
    SchemaEditing
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
export interface PartialOperationNotSupportedException extends PictureparkValidationException {
}
export interface ContractMismatchException extends PictureparkValidationException {
}
export interface InvalidArgumentException extends PictureparkValidationException {
    argumentName?: string | undefined;
    argumentValue?: string | undefined;
}
export interface ArgumentRangeException extends InvalidArgumentException {
    minAcceptableValue?: string | undefined;
    maxAcceptableValue?: string | undefined;
}
export interface UnknownException extends PictureparkBusinessException {
}
export interface OwnerTokenInUseException extends PictureparkValidationException {
    ownerTokenUserId?: string | undefined;
}
export interface InvalidValueFormatException extends InvalidArgumentException {
    expectedFormat?: string | undefined;
}
export interface ItemIdDuplicatedException extends PictureparkValidationException {
    id?: string | undefined;
}
export interface RequestSizeLimitExceededException extends PictureparkValidationException {
    argumentName?: string | undefined;
    limit?: number;
    requestedAmount?: number;
}
export interface CustomerViolationException extends PictureparkException {
    expectedCustomerId?: string | undefined;
    currentCustomerId?: string | undefined;
}
export interface CustomerAliasNotFoundException extends PictureparkException {
    customerAlias?: string | undefined;
}
export interface CustomerAliasInUseException extends PictureparkValidationException {
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
export interface CustomerBoostValuesInvalidException extends PictureparkValidationException {
}
export interface SnapshotRetentionTimeTooShortException extends PictureparkValidationException {
    snapshotRetentionTime?: string;
    minimumRetentionTime?: string;
}
export interface ReshardIndexNotAllowedException extends PictureparkValidationException {
}
export interface ReshardNumberOfShardsInvalidException extends PictureparkValidationException {
}
export interface ReshardNumberOfRoutingShardsInvalidException extends ReshardNumberOfShardsInvalidException {
}
export interface ReshardNumberOfShardsInvalidForExistingRoutingShardsException extends ReshardNumberOfShardsInvalidException {
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
export interface DuplicatedSearchBehaviorException extends PictureparkValidationException {
    duplicatedSearchBehaviors?: string | undefined;
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
export interface InvalidUiBehaviorInNonRootAggregatorException extends PictureparkValidationException {
    aggregatorName?: string | undefined;
}
export interface InvalidUiBehaviorConfigurationException extends PictureparkValidationException {
    aggregatorName?: string | undefined;
}
export interface InvalidSearchFieldInAggregatorException extends PictureparkValidationException {
    fieldName?: string | undefined;
    aggregatorName?: string | undefined;
}
export interface SearchStringTooLongException extends PictureparkValidationException {
    limit?: number;
}
export interface AggregationNameInvalidException extends PictureparkValidationException {
    aggregationName?: string | undefined;
    aggregationPrefix?: string | undefined;
}
export interface AggregationNameMissingException extends PictureparkValidationException {
}
/** Size of the aggregation is invalid. */
export interface AggregationSizeInvalidException extends PictureparkValidationException {
    /** The name identifying the aggregation. */
    aggregationName?: string | undefined;
    /** The invalid size of the aggregation: size must be equal or greater than 1. */
    aggregationSize?: number;
}
export interface AggregationFilterNotSupportedException extends PictureparkValidationException {
    aggregationName?: string | undefined;
    notSupportedFilterType?: string | undefined;
    supportedFilterTypes?: string[] | undefined;
}
export interface AggregationFieldMissingException extends PictureparkValidationException {
    aggregationName?: string | undefined;
}
export interface AggregationPathMissingException extends PictureparkValidationException {
    aggregationName?: string | undefined;
}
export interface DocumentVersionConflictException extends PictureparkConflictException {
    documentId?: string | undefined;
    documentType?: string | undefined;
    documentVersion?: number;
}
export interface RedisDatabaseExceededException extends PictureparkException {
    customerId?: string | undefined;
    customerCount?: number;
    maxCount?: number;
    startIndex?: number;
    redisDatabaseCount?: number;
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
}
export interface PermissionOwnershipTransferException extends PictureparkValidationException {
    transferUserId?: string | undefined;
    missingUserRight?: UserRight;
}
export declare enum UserRight {
    ManageContent,
    ManageSharings,
    ManageTransfer,
    ManageChannels,
    ManageSchemas,
    ManageUsers,
    ManageUserRoles,
    ManagePermissions,
    ManageSearchIndexes,
    ManageListItems,
    ManageServiceProviders,
    ManageEmbeds,
    ManageTemplates,
    ManageTermsOfService,
    ManageLiveStream,
    ManageDocumentHistory,
    ManageAllShares,
    ManageOutputFormats,
    ManageBusinessProcesses,
    ManageIdentityProviders,
    ManageXmpMappings,
    ReadStatistics,
    WriteStatistics,
    ExportStatistics,
    EditImages,
    ManageConversionPresetTemplates,
    ManageComments,
    ManageAllComments
}
export interface PermissionSetNotFoundException extends PictureparkNotFoundException {
    permissionSetIds?: string[] | undefined;
}
export interface PermissionSetAggregateException extends PictureparkValidationException {
    exceptions?: PictureparkException[] | undefined;
}
export interface DuplicateRightException extends PictureparkValidationException {
    permissionSetId?: string | undefined;
}
export interface PermissionValidationException extends PictureparkValidationException {
    permission?: string | undefined;
    operation?: string | undefined;
}
export interface PermissionSetInUseException extends PictureparkValidationException {
    reference?: string | undefined;
    referenceCount?: number;
}
export interface ContentPermissionException extends PictureparkValidationException {
    contentId?: string | undefined;
    contentRights?: ContentRight[] | undefined;
}
/** Content rights */
export declare enum ContentRight {
    View,
    AccessOriginal,
    EditMetadata,
    EditContent,
    ManagePermissions,
    Delete,
    ManageHistoricVersions
}
export interface ListItemPermissionException extends PictureparkValidationException {
    listItemId?: string | undefined;
    metadataRight?: MetadataRight;
}
/** Metadata rights */
export declare enum MetadataRight {
    View,
    ManageItems,
    ManageSchema
}
export interface SchemaPermissionException extends PictureparkValidationException {
    schemaId?: string | undefined;
    metadataRight?: MetadataRight;
}
/** This exception is an abstract base for permission set validation. */
export interface PermissionSetValidationException extends PictureparkValidationException {
    permissionSetId?: string | undefined;
}
export interface PermissionSetInvalidRightCombinationException extends PermissionSetValidationException {
}
export interface AmbiguousUserRoleRightsException extends PermissionSetValidationException {
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
    numberOfReferences?: number;
}
export interface ListItemUpdateManyException extends PictureparkBusinessException {
    failedItemsCount?: number;
    totalItemsCount?: number;
}
export interface ListItemSchemaMismatchException extends PictureparkValidationException {
    listItemId?: string | undefined;
    listItemSchemaId?: string | undefined;
    fieldSchemaId?: string | undefined;
}
export interface ListItemResolveBehaviorNotSupportedException extends PictureparkValidationException {
    behaviors?: ListItemResolveBehavior[] | undefined;
}
export declare enum ListItemResolveBehavior {
    Content,
    LinkedListItems,
    InnerDisplayValueThumbnail,
    InnerDisplayValueList,
    InnerDisplayValueDetail,
    InnerDisplayValueName,
    OuterDisplayValueThumbnail,
    OuterDisplayValueList,
    OuterDisplayValueDetail,
    OuterDisplayValueName,
    DynamicViewFields,
    DynamicViewFieldsWithHasItems
}
export interface TransferInfoNotFoundException extends PictureparkNotFoundException {
    transferInfoId?: string | undefined;
}
export interface FileTransferNotFoundException extends PictureparkNotFoundException {
    fileTransferId?: string | undefined;
}
export interface InvalidTransferTypeException extends PictureparkBusinessException {
    transferType?: TransferType;
}
/** Type of the transfer */
export declare enum TransferType {
    FileUpload,
    FileUploadAutoImport,
    WebDownload,
    SchemaImport
}
export interface TransferNotFoundException extends PictureparkNotFoundException {
    transferId?: string | undefined;
}
export interface WrongChunkSizeException extends PictureparkValidationException {
    actual?: number;
    expected?: number;
}
export interface ChunkSizeOutOfRangeException extends PictureparkValidationException {
    actual?: number;
    minimum?: number;
    maximum?: number;
}
export interface MaximumTransferSizeException extends PictureparkException {
    transferSize?: number;
    maximumTransferSize?: number;
    transferId?: string | undefined;
}
export interface FileIdDuplicatedException extends PictureparkValidationException {
    fileId?: string | undefined;
}
export interface UploadFailedException extends PictureparkBusinessException {
}
export interface MaximumNumberOfChunksExceededException extends PictureparkValidationException {
    transferId?: string | undefined;
    numberOfChunks?: number;
    maximumNumberOfChunks?: number;
}
export interface MaximumFileSizeExceededException extends PictureparkValidationException {
    transferId?: string | undefined;
    declaredFileSize?: number;
    maximumFileSize?: number;
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
export interface InvalidContentSchemaForMetadataValuesSchemaRemoveCommandException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface InvalidMetadataException extends PictureparkValidationException {
    metadataErrors?: MetadataError[] | undefined;
    validationErrors?: PictureparkBusinessException[] | undefined;
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
export interface RelationTypeMissingException extends PictureparkBusinessException {
}
export interface ReferencesUpdateException extends PictureparkBusinessException {
    exceptions?: ReferenceUpdateException[] | undefined;
}
export interface ReferenceUpdateException extends PictureparkBusinessException {
    /** This is the source of the reference. */
    referenceItemId?: string | undefined;
    /** This is the DocType of the source of the reference. */
    referenceType?: string | undefined;
    /** These exceptions describe why the source metadata item could not be updated. */
    exceptions?: PictureparkException[] | undefined;
}
export interface DuplicatedItemAssignedException extends PictureparkValidationException {
    itemId?: string | undefined;
    itemPath?: string | undefined;
}
export interface InvalidDataTypeException extends PictureparkValidationException {
    value?: any | undefined;
}
export interface LayerAssignmentInvalidException extends PictureparkValidationException {
    layerId?: string | undefined;
    value?: any | undefined;
}
export interface OutdatedMetadataUpdateInProgressException extends PictureparkValidationException {
}
export interface SortingSupportedOnlyOnTermsAndTermsRelationAggregatorsException extends PictureparkValidationException {
    aggregationName?: string | undefined;
}
export interface SchemasMetadataProtectionException extends PictureparkValidationException {
    schemaIds?: string[] | undefined;
    operation?: string | undefined;
}
export interface FilterTemplateRenderingException extends PictureparkValidationException {
}
export interface ResolvedLinkedItemsThresholdReachedException extends PictureparkValidationException {
    metadataItemId?: string | undefined;
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
export interface SchemaFieldIdPreviouslyUsedException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
    usedInSchemaId?: string | undefined;
}
export interface SchemaFieldIdAlreadyExistsInSchemaHierarchyException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
    existingInSchemaId?: string | undefined;
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
    schemaIds?: string[] | undefined;
    indexedFieldCount?: number;
    indexedFieldThreshold?: number;
}
export interface SortableFieldThresholdExceededException extends PictureparkValidationException {
    schemaIds?: string[] | undefined;
    sortableFieldCount?: number;
    sortableFieldThreshold?: number;
}
export interface DuplicateSchemaInfoException extends PictureparkBusinessException {
    schemaId?: string | undefined;
}
export interface SchemaFieldNumberRangeException extends PictureparkValidationException {
    fieldId?: string | undefined;
    propertyName?: string | undefined;
    minValue?: number;
    maxValue?: number;
}
export interface SchemaInUseContentSchemaException extends PictureparkValidationException {
    schemaId?: string | undefined;
    contentSchemaIds?: string[] | undefined;
}
export interface LayerAssignmentInUseWithContentsException extends PictureparkValidationException {
    schemaId?: string | undefined;
    usedAssignmentSchemaIds?: string[] | undefined;
}
export interface SchemaInUseListItemException extends PictureparkValidationException {
    schemaId?: string | undefined;
    listItemCount?: number;
}
export interface SchemaInUseContentException extends PictureparkValidationException {
    schemaId?: string | undefined;
    contentCount?: number;
}
export interface SchemaInUseFieldException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldNamespaces?: string[] | undefined;
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
export interface SchemaFieldNotFilterableException extends PictureparkValidationException {
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
export interface SchemaFieldInvalidBoostException extends PictureparkValidationException {
    fieldId?: string | undefined;
    schemaId?: string | undefined;
    boost?: number;
    allowedBoostValues?: number[] | undefined;
}
export interface SchemaFieldSortableInUseException extends PictureparkValidationException {
    fieldId?: string | undefined;
    schemaId?: string | undefined;
    channelIds?: string[] | undefined;
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
/** Type of the schema */
export declare enum SchemaType {
    Content,
    Layer,
    List,
    Struct
}
export interface SchemaPermissionConfigurationException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface SchemaMetadataProtectionSettingsNotSupportedForStructsException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface SchemaMetadataProtectionSettingsChangeNotAllowedForXmpMappedLayersException extends PictureparkValidationException {
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
export interface SchemaCountLimitReachedException extends PictureparkBusinessException {
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
/** The display pattern type */
export declare enum DisplayPatternType {
    Thumbnail,
    List,
    Detail,
    Name,
    DownloadFileName
}
export interface SchemaViewForAllException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface SystemLayerReferenceInvalidModificationException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface SchemaFieldAnalyzerInvalidException extends PictureparkValidationException {
    fieldId?: string | undefined;
    schemaId?: string | undefined;
    analyzers?: Analyzer[] | undefined;
    allowedAnalyzers?: Analyzer[] | undefined;
}
export declare enum Analyzer {
    None,
    Simple,
    Language,
    PathHierarchy,
    EdgeNGram,
    NGram,
    NoDiacritics
}
export interface SchemaFieldRelationMultipleTypesException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
}
export interface SchemaFieldNotRequirableException extends PictureparkValidationException {
    fieldId?: string | undefined;
    schemaId?: string | undefined;
}
export interface DisplayPatternTypeNotSupportedException extends PictureparkValidationException {
    schemaId?: string | undefined;
    displayPatternId?: string | undefined;
}
export interface SchemaFieldActivityInUseException extends PictureparkValidationException {
    fieldId?: string | undefined;
    schemaId?: string | undefined;
}
export interface SchemaFieldReferencedSchemaChangeNotAllowedException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
    oldReferencedSchemaId?: string | undefined;
    newReferencedSchemaId?: string | undefined;
}
export interface SchemaFieldReferencedSchemaSystemSchemaException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
    referencedSchemaId?: string | undefined;
}
export interface SchemaFieldRelationRelationTypeIdModificationNotAllowedException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
}
export interface SchemaFieldRelationTargetDocTypeModificationNotAllowedException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
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
export interface SchemaFieldNotSupportedException extends PictureparkValidationException {
    fieldId?: string | undefined;
    schemaId?: string | undefined;
    fieldType?: string | undefined;
}
export interface SchemaFieldDisplayPatternTypeNotSupportedException extends PictureparkValidationException {
    fieldId?: string | undefined;
    displayPatternType?: DisplayPatternType;
    supportedDisplayPatternTypes?: DisplayPatternType[] | undefined;
}
export interface SchemaFieldMarkdownNotMultilineException extends PictureparkValidationException {
    fieldId?: string | undefined;
    schemaId?: string | undefined;
}
export interface IndexingDisplayValueInFilterOnlySupportedForIndexedTagboxFieldsException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
    relatedFieldId?: string | undefined;
}
export interface SchemaFieldDynamicViewFieldInvalidFilterTemplateException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
    errors?: string[] | undefined;
}
export interface DeleteContentsWithReferencesException extends PictureparkValidationException {
    numberOfReferences?: number;
    numberOfShares?: number;
}
export interface ContentMetadataUpdateManyException extends PictureparkBusinessException {
    failedItemsCount?: number;
    totalItemsCount?: number;
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
    originalContentType?: ContentType;
    newContentType?: ContentType;
}
/** Content types */
export declare enum ContentType {
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
    Virtual
}
export interface ContentBackupFailedException extends PictureparkBusinessException {
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
    outputId?: string | undefined;
}
export interface ContentLayerSameRootException extends PictureparkValidationException {
    contentId?: string | undefined;
    layerIdsByRootSchema?: LayerIdsByRootSchema[] | undefined;
}
export interface LayerIdsByRootSchema {
    rootSchemaId?: string | undefined;
    layerSchemaIds?: string[] | undefined;
}
export interface ContentHistoricVersionNotFoundException extends PictureparkNotFoundException {
    contentId?: string | undefined;
    version?: number;
}
export interface UnableToDeleteLatestXmpWritebackGeneratedContentHistoricVersionException extends PictureparkValidationException {
    contentId?: string | undefined;
    version?: number;
}
export interface ContentSchemaChangeException extends PictureparkValidationException {
    /** Content for which a change to RequestedContentSchemaId would cause data loss */
    contentId?: string | undefined;
    /** ContentSchemaId to which the Content would have been changed */
    requestedContentSchemaId?: string | undefined;
    /** Layers assigned to this Content which are not allowed for contents of type RequestedContentSchemaId */
    incompatibleLayerAssignments?: string[] | undefined;
}
export interface ConcurrentFileReplacementDuringRepairException extends PictureparkConflictException {
    contentId?: string | undefined;
    expectedOriginalFileVersion?: number;
    actualOriginalFileVersion?: number;
}
export interface ContentResolveBehaviorNotSupportedException extends PictureparkValidationException {
    behaviors?: ContentResolveBehavior[] | undefined;
}
export declare enum ContentResolveBehavior {
    Content,
    LinkedListItems,
    Metadata,
    Outputs,
    InnerDisplayValueThumbnail,
    InnerDisplayValueList,
    InnerDisplayValueDetail,
    InnerDisplayValueName,
    Owner,
    Permissions,
    OuterDisplayValueThumbnail,
    OuterDisplayValueList,
    OuterDisplayValueDetail,
    OuterDisplayValueName,
    HistoricVersionCount,
    DynamicViewFields,
    DynamicViewFieldsWithHasItems
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
export interface BusinessProcessNotExternalException extends PictureparkForbiddenException {
    businessProcessId?: string | undefined;
}
export interface BusinessProcessCancellationNotSupportedException extends PictureparkValidationException {
    businessProcessId?: string | undefined;
}
export interface BusinessProcessContinuationException extends PictureparkBusinessException {
    continuationBusinessProcessId?: string | undefined;
    precedingBusinessProcessId?: string | undefined;
    precedingBusinessProcessException?: PictureparkException | undefined;
}
export interface BusinessProcessSummaryNotBatchBasedException extends PictureparkValidationException {
    businessProcessId?: string | undefined;
}
export interface BusinessProcessSummaryNotFoundException extends PictureparkNotFoundException {
    businessProcessId?: string | undefined;
}
export interface SnapshotTimeoutException extends PictureparkTimeoutException {
}
export interface SnapshotFailedException extends PictureparkBusinessException {
}
export interface AddMetadataLanguageTimeoutException extends PictureparkTimeoutException {
    environmentProcessId?: string | undefined;
}
export interface EnvironmentProcessAlreadyRunningException extends PictureparkValidationException {
    environmentProcessType?: EnvironmentProcessType;
}
export declare enum EnvironmentProcessType {
    AddMetadataLanguage,
    CustomerUpdate,
    EnvironmentUpdate,
    CustomerBoostValuesUpdate,
    CustomerReshard
}
export interface EnvironmentProcessNotFoundException extends PictureparkNotFoundException {
    environmentProcessId?: string | undefined;
}
export interface EnvironmentProcessWaitTimeoutException extends PictureparkTimeoutException {
    environmentProcessId?: string | undefined;
    waitedLifecycles?: string | undefined;
}
export interface CustomerBoostValuesUpdateTimeoutException extends PictureparkTimeoutException {
    environmentProcessId?: string | undefined;
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
    actual?: BusinessProcessLifeCycle;
}
export interface OnlyAccessibleToRecipientException extends PictureparkValidationException {
}
export interface EnvironmentNotAvailableException extends PictureparkException {
}
export interface CustomerNotAvailableException extends PictureparkException {
    customerId?: string | undefined;
}
export interface CustomerAliasHeaderMissingException extends PictureparkValidationException {
}
export interface BusinessRuleActionInvalidDocumentTypeException extends PictureparkValidationException {
    allowedDocumentTypes?: BusinessRuleTriggerDocType[] | undefined;
}
export declare enum BusinessRuleTriggerDocType {
    Content,
    ListItem
}
export interface BusinessRuleActionsMissingException extends PictureparkValidationException {
}
export interface BusinessRuleConditionMissingException extends PictureparkValidationException {
}
export interface BusinessRuleConditionsMissingException extends PictureparkValidationException {
}
export interface BusinessRuleConfigurationValidationException extends PictureparkValidationException {
    innerExceptions?: PictureparkValidationException[] | undefined;
}
export interface BusinessRuleSchemaIdInvalidException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface BusinessRulePermissionSetIdInvalidException extends PictureparkValidationException {
    permissionSetId?: string | undefined;
}
export interface BusinessRuleRuleIdDuplicationException extends PictureparkValidationException {
}
export interface BusinessRuleRuleIdMissingException extends PictureparkValidationException {
}
export interface BusinessRuleTriggerPointMissingException extends PictureparkValidationException {
}
export interface BusinessRuleValidationException extends PictureparkValidationException {
    ruleId?: string | undefined;
    innerExceptions?: PictureparkValidationException[] | undefined;
}
export interface BusinessRuleRegularExpressionInvalidException extends PictureparkValidationException {
    regex?: string | undefined;
}
export interface BusinessRuleConditionInvalidTriggerPointException extends PictureparkValidationException {
    allowedDocTypes?: BusinessRuleTriggerDocType[] | undefined;
    allowedActions?: BusinessRuleTriggerAction[] | undefined;
}
export declare enum BusinessRuleTriggerAction {
    Create,
    Update,
    FileReplacement,
    Schedule
}
export interface BusinessRuleRefIdsMissingException extends PictureparkValidationException {
}
export interface BusinessRulePathInvalidException extends PictureparkValidationException {
    path?: string | undefined;
}
export interface BusinessRuleFieldIdInvalidException extends PictureparkValidationException {
    fieldId?: string | undefined;
}
export interface BusinessRuleContentPermissionSetIdsMissingException extends PictureparkValidationException {
}
export interface BusinessRuleFieldPathInvalidException extends PictureparkValidationException {
    fieldPath?: string | undefined;
}
export interface BusinessRulePolygonInvalidException extends PictureparkValidationException {
}
export interface BusinessRuleArrayIndexInvalidException extends PictureparkValidationException {
    index?: string | undefined;
}
export interface BusinessRuleDictionaryKeyInvalidException extends PictureparkValidationException {
    key?: string | undefined;
}
export interface BusinessRuleProjectionTransformationsMissingException extends PictureparkValidationException {
}
export interface BusinessRuleInvalidVariableNameException extends PictureparkValidationException {
    name?: string | undefined;
}
export interface BusinessRuleTransformationGroupTransformationsMissingException extends PictureparkValidationException {
}
export interface BusinessRuleTransformationGroupInputsMissingException extends PictureparkValidationException {
}
export interface BusinessRuleNamedCacheNameInvalidException extends PictureparkValidationException {
    cacheName?: string | undefined;
}
export interface BusinessRuleNGramTransformationSizeInvalidException extends PictureparkValidationException {
    size?: number;
    minSize?: number;
    maxSize?: number;
}
export interface BusinessRuleNGramTransformationMinWordLengthInvalidException extends PictureparkValidationException {
    minWordLength?: number;
}
export interface BusinessRuleNGramTransformationMaxWordLengthInvalidException extends PictureparkValidationException {
    maxWordLength?: number;
}
export interface BusinessRuleNotificationInvalidIdException extends PictureparkValidationException {
    id?: string | undefined;
}
export interface BusinessRuleNotificationNoRecipientsException extends PictureparkValidationException {
}
export interface BusinessRuleNotificationRecipientUserIdMissingException extends PictureparkValidationException {
}
export interface BusinessRuleNotificationRecipientUserRoleIdMissingException extends PictureparkValidationException {
}
export interface BusinessRuleNumberSequenceInvalidIdException extends PictureparkValidationException {
    id?: string | undefined;
}
export interface BusinessRuleNumberSequenceIdDuplicationException extends PictureparkValidationException {
    id?: string | undefined;
}
export interface BusinessRuleScheduleInvalidCronExpressionException extends PictureparkValidationException {
    expression?: string | undefined;
}
export interface BusinessRuleScheduleFilterMissingException extends PictureparkValidationException {
}
export interface BusinessRuleScheduleRulesMissingException extends PictureparkValidationException {
}
export interface BusinessRuleStringContainsConditionValuesToMatchMissingException extends PictureparkValidationException {
}
export interface BusinessRuleUserInUserRolesConditionUserRoleIdsMissingException extends PictureparkValidationException {
}
export interface BusinessRuleDateMathTransformationTimeSpanInvalidException extends PictureparkValidationException {
    timeSpan?: string | undefined;
}
export interface BusinessRuleTransferOwnershipTransferUserIdMissingException extends PictureparkValidationException {
}
export interface BusinessRuleOutputFormatIdMissingException extends PictureparkValidationException {
}
export interface BusinessRuleEnqueueCreateEmbedActionExpirationDateInvalidException extends PictureparkValidationException {
    expirationDate?: string | undefined;
}
export interface NamedCacheConfigurationException extends PictureparkValidationException {
    innerExceptions?: PictureparkValidationException[] | undefined;
}
export interface NamedCacheNameMissingException extends PictureparkValidationException {
}
export interface NamedCacheNameDuplicationException extends PictureparkValidationException {
    name?: string | undefined;
}
export interface ListItemNamedCacheSchemaIdInvalidException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface ListItemNamedCacheKeyFieldsInvalidException extends PictureparkValidationException {
}
export interface SchemaTagboxFilterLookupNamedCacheSchemaIdInvalidException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface NoTagsFoundException extends PictureparkBusinessException {
}
export interface OutputNotAvailableException extends PictureparkBusinessException {
}
export interface ModelNotFoundException extends PictureparkNotFoundException {
}
export interface DisplayValueRerenderingInProgressException extends PictureparkValidationException {
}
export interface OutputFormatNotFoundException extends PictureparkNotFoundException {
    outputFormatId?: string | undefined;
}
export interface OutputFormatSourceNotDefinedException extends PictureparkValidationException {
    outputFormatId?: string | undefined;
}
export interface OutputFormatRetentionTimeOutOfRangeException extends ArgumentRangeException {
    outputFormatId?: string | undefined;
}
export interface NotSupportedFileExtensionForFormatException extends NotSupportedFileExtensionException {
    formatKind?: string | undefined;
    outputFormatId?: string | undefined;
}
export interface OutputFormatXmpWritebackNotSupportedException extends PictureparkValidationException {
    outputFormatId?: string | undefined;
}
export interface OutputFormatXmpWritebackDerivedFromCopyFormatNotSupportedException extends OutputFormatXmpWritebackNotSupportedException {
    derivingCopyFormatIds?: string[] | undefined;
}
export interface OutputFormatsInUseException extends PictureparkValidationException {
    outputFormatIds?: string[] | undefined;
    dependentOutputFormatIds?: string[] | undefined;
}
export interface OutputFormatOperationInProgressException extends PictureparkBusinessException {
}
export interface StaticOutputFormatModificationNotSupportedException extends PictureparkValidationException {
    outputFormatId?: string | undefined;
    property?: string | undefined;
}
export interface OriginalOutputFormatModificationNotSupportedException extends PictureparkValidationException {
}
export interface OutputFormatSourceNotValidForRenderingCategoryException extends PictureparkValidationException {
    outputFormatId?: string | undefined;
    sourceFormatId?: string | undefined;
    renderingCategory?: RenderingCategory;
}
export interface CollectionSizeLimitExceededException extends PictureparkValidationException {
    collectionId?: string | undefined;
    limit?: number;
}
export interface CollectionModificationNotAllowedException extends PictureparkValidationException {
    collectionId?: string | undefined;
}
export interface CollectionNotFoundException extends PictureparkNotFoundException {
    collectionId?: string | undefined;
}
export interface NonDefaultTemplateNameNotAllowedException extends PictureparkValidationException {
    name?: string | undefined;
}
export interface SystemTemplateModificationNotAllowedException extends PictureparkValidationException {
    templateId?: string | undefined;
}
export interface TemplateDuplicationException extends PictureparkValidationException {
    duplicatedTemplateId?: string | undefined;
}
export interface TemplateLanguageCodeNotSupportedException extends PictureparkValidationException {
    languageCode?: string | undefined;
    supportedLanguageCodes?: string[] | undefined;
}
export interface TemplateMediaTypesMissingException extends PictureparkValidationException {
    requiredMediaTypes?: string[] | undefined;
}
export interface TemplateMediaTypesNotSupportedException extends PictureparkValidationException {
    unsupportedMediaTypes?: string[] | undefined;
}
export interface TemplateNotFoundException extends PictureparkNotFoundException {
}
export interface XmpMappingFieldNotSupported extends PictureparkValidationException {
    fieldPath?: string | undefined;
}
export interface XmpMappingFieldNotFoundException extends PictureparkValidationException {
    fieldPath?: string | undefined;
}
export interface XmpMappingSchemaNotAvailableForFileContentSchemaException extends PictureparkValidationException {
    schemaId?: string | undefined;
}
export interface XmpMappingFieldToLayerWithRequiredFieldsNotAllowedException extends PictureparkValidationException {
    layerId?: string | undefined;
}
export interface XmpMappingFieldToLayerWithMetadataProtectionForCreateOrUpdateNotSupportedException extends PictureparkValidationException {
    layerId?: string | undefined;
}
export interface XmpMappingFieldInUseException extends PictureparkValidationException {
    schemaId?: string | undefined;
    fieldId?: string | undefined;
}
export interface XmpMappingConfigurationInvalidException extends PictureparkValidationException {
    fieldPath?: string | undefined;
    expectedConfiguration?: string | undefined;
}
export interface ActivityMappingInvalidException extends PictureparkValidationException {
    activityMapping?: string | undefined;
}
export interface StatisticsFeatureNotEnabledException extends PictureparkValidationException {
    scope?: string | undefined;
}
export interface StatisticsExportNotEnabledException extends StatisticsFeatureNotEnabledException {
}
export interface StatisticsReadNotEnabledException extends StatisticsFeatureNotEnabledException {
}
export interface StatisticsWriteNotEnabledException extends StatisticsFeatureNotEnabledException {
}
export interface ConversionPresetTemplateNotFoundException extends PictureparkNotFoundException {
    conversionPresetTemplateId?: string | undefined;
}
export interface CommentNotFoundException extends PictureparkNotFoundException {
    id?: string | undefined;
}
export interface CommentOwnershipFailureException extends PictureparkValidationException {
    commentId?: string | undefined;
}
export interface CommentReplyDeletionException extends PictureparkValidationException {
    commentId?: string | undefined;
}
export interface CommentReplyParentException extends PictureparkValidationException {
    parentId?: string | undefined;
}
export interface CommentReplyContentMismatchException extends PictureparkValidationException {
    parentId?: string | undefined;
    contentId?: string | undefined;
}
/** Create request to create a BusinessProcess. */
export interface BusinessProcessCreateRequest {
    /** Indicates if the system starting the business process supports cancellation. */
    supportsCancellation: boolean;
    /** Notification data to send to the user when creating the business process.
Set to null to not create a notification. */
    notification?: BusinessProcessNotificationUpdate | undefined;
    /** Initial state of the business process. */
    initialState: string;
}
/** Notification update for a business process. */
export interface BusinessProcessNotificationUpdate {
    /** The title the message that is shown to the user should have. */
    title: TranslatedStringDictionary;
    /** The message shown to the user. */
    message: TranslatedStringDictionary;
    /** An optional navigation link that allows the user to jump to a page giving more information
about the process. */
    navigationLink?: string | undefined;
    /** The event type of the notification. */
    eventType: NotificationEventType;
}
/** A custom dictionary type to distinguish language specific class properties. */
export interface TranslatedStringDictionary {
    [key: string]: string | any;
}
export declare enum NotificationEventType {
    Pending,
    InProgress,
    Success,
    Error,
    Warning,
    Information
}
/** Transitions the business process to a new state and/or life cycle. */
export interface BusinessProcessStateChangeRequest {
    /** The new state of the business process. */
    state: string;
    /** The new life cycle of the business process. */
    lifeCycle: BusinessProcessLifeCycle;
    /** An optional notification update to be posted together with the transition. */
    notification?: BusinessProcessNotificationUpdate | undefined;
}
/** Updates the notification of a business process without changing the state or the life cycle. */
export interface BusinessProcessNotificationUpdateRequest extends BusinessProcessNotificationUpdate {
}
/** Result from waiting for state(s) on a business process */
export interface BusinessProcessWaitForStateResult {
    /** The state that was hit. */
    stateHit?: string | undefined;
    /** The business process. */
    businessProcess: BusinessProcess;
}
/** Result from waiting for life cycle(s) on a business process */
export interface BusinessProcessWaitForLifeCycleResult {
    /** The life cycle that was hit. */
    lifeCycleHit?: BusinessProcessLifeCycle | undefined;
    /** The business process. */
    businessProcess: BusinessProcess;
}
/** Detailed representation of a business process */
export interface BusinessProcessDetails extends BusinessProcess {
    /** Details for the business process. */
    details?: BusinessProcessDetailsDataBase | undefined;
}
/** Base class for the details of a business process */
export interface BusinessProcessDetailsDataBase {
    kind: string;
}
/** Business process detailed information regarding a batch operation */
export interface BusinessProcessDetailsDataBatchResponse extends BusinessProcessDetailsDataBase {
    /** The DocType on which the operation was performed. */
    docType: string;
    /** The response of the batch operation. */
    response: BatchResponse;
}
/** Response from a batch operation */
export interface BatchResponse {
    /** Rows in the response. */
    rows: BatchResponseRow[];
}
/** Row in a batch operation response */
export interface BatchResponseRow {
    /** Id of the item. */
    id: string;
    /** Indicates if the operation succeeded. */
    succeeded: boolean;
    /** Status code of the operation. */
    status: number;
    /** New version of the item. */
    version: number;
    /** If the operation did not succeed, this contains error information. */
    error?: ErrorResponse | undefined;
    /** The identifier provided by user in the corresponding request (or null if none was provided). Used only in bulk creation. */
    requestId?: string | undefined;
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
    /** Ids of the list items that were not imported because already found in the system or due to errors */
    skippedListItemIds?: string[] | undefined;
    /** Ids of the list items that were successfully imported */
    importedListItemIds?: string[] | undefined;
}
export interface BusinessProcessDetailsDataContentImport extends BusinessProcessDetailsDataBase {
    /** Items that were imported. */
    items?: ContentImportResult[] | undefined;
}
/** Represents an item imported during a content import */
export interface ContentImportResult {
    /** ID of the file transfer. */
    fileTransferId: string;
    /** ID of the resulting content. */
    contentId?: string | undefined;
    /** State of the item. */
    state?: string | undefined;
    /** Indicates if the operation succeeded. */
    succeeded: boolean;
    /** If the operation did not succeeded, this contains error related information. */
    error?: ErrorResponse | undefined;
}
export interface BusinessProcessSummaryBase {
    kind: string;
}
export interface BusinessProcessSummarySchemaImport extends BusinessProcessSummaryBase {
    /** The result of the import schema operation */
    schemaImportResult?: SchemaImportResult | undefined;
    /** The result of the import list item operation */
    listItemImportResult?: ListItemImportResult | undefined;
}
export interface BusinessProcessSummaryBatchBased extends BusinessProcessSummaryBase {
    /** Succeeded item count. */
    succeededItemCount?: number;
    /** Failed item count. */
    failedItemCount?: number;
    /** Document type that was changed in the business process. */
    docType?: string | undefined;
}
export interface BusinessProcessBatch {
    pageToken?: string | undefined;
    data?: BusinessProcessBatchItemBase | undefined;
}
export interface BusinessProcessBatchItemBase {
    kind: string;
}
export interface BusinessProcessBatchItemBatchResponse extends BusinessProcessBatchItemBase {
    docType?: string | undefined;
    items?: BatchResponseRow[] | undefined;
}
export interface BusinessProcessBatchItemContentImport extends BusinessProcessBatchItemBase {
    items?: ContentImportResult[] | undefined;
}
/** Base class for search results */
export interface BaseResultOfBusinessProcess {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: BusinessProcess[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfBusinessProcess extends BaseResultOfBusinessProcess {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Search result from a search for business processes */
export interface BusinessProcessSearchResult extends SearchBehaviorBaseResultOfBusinessProcess {
}
export interface QueryDebugInformation {
    general?: string | undefined;
    auditTrail?: string | undefined;
    request?: any | undefined;
    response?: any | undefined;
}
/** Search request to search for business processes */
export interface BusinessProcessSearchRequest {
    /** Limits the document count of the result set. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the BusinessProcessSearchResult.
Warning! It severely affects performance. */
    debugMode: boolean;
}
/** The filters' base class */
export interface FilterBase {
    kind: string;
}
/** Used to put filters in "and" */
export interface AndFilter extends FilterBase {
    /** The filters to put in "and". All kinds of filters are accepted. */
    filters?: FilterBase[] | undefined;
}
/** Put filters in "or" */
export interface OrFilter extends FilterBase {
    /** The filters to put in "or". All kinds of filters are accepted. */
    filters?: FilterBase[] | undefined;
}
/** Negates the specified filter */
export interface NotFilter extends FilterBase {
    /** The filter to be negated. */
    filter: FilterBase;
}
/** Filters over a range of date time values */
export interface DateRangeFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
    /** The date time range. */
    range: DateRange;
}
/** The date time range class used in filters */
export interface DateRange {
    /** Language specific range names. */
    names?: TranslatedStringDictionary | undefined;
    /** The from value: it can be a datetime string or a pattern now(+-)(int)(YMDHm). */
    from?: string | undefined;
    /** The to value: it can be a datetime string or a pattern now(+-)(int)(YMDHm). */
    to?: string | undefined;
}
/** Filters over the existence of a field's value */
export interface ExistsFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
}
/** Filters geo point values based on a bounding box */
export interface GeoBoundingBoxFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
    /** The top left corner of the bounding box's geo location (latitude and longitude). */
    topLeft: GeoLocation;
    /** The bottom right corner of the bounding box's geo location (latitude and longitude). */
    bottomRight: GeoLocation;
}
/** It stores geo location information (latitude and longitude) */
export interface GeoLocation {
    /** The latitude */
    lat?: number;
    /** The longitude */
    lon?: number;
}
/** Filters within the radius of the distance from a location */
export interface GeoDistanceFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
    /** The point of origin to calculate the distance from (latitude/longitude). */
    location: GeoLocation;
    /** The distance in meters from the point of origin. */
    distance?: number;
}
/** Filters on nested documents */
export interface NestedFilter extends FilterBase {
    /** The path pointing to the nested document (i.e. personLayer.nestedAddress). */
    path: string;
    /** The filter to be applied on the nested documents. */
    filter: FilterBase;
}
/** Filters over a range of numeric values */
export interface NumericRangeFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
    /** The numeric range on which filtering. */
    range: NumericRange;
}
/** The numeric range class */
export interface NumericRange {
    /** Language specific range names. */
    names?: TranslatedStringDictionary | undefined;
    /** The from value. */
    from?: number | undefined;
    /** The to value. */
    to?: number | undefined;
}
/** Filters field's values based on a prefix */
export interface PrefixFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
    /** The value to be used as prefix. */
    prefix: string;
}
/** Filters values exactly containing a term */
export interface TermFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
    /** The value to use to filter on. */
    term: string;
}
/** Filters values containing at least one of the terms */
export interface TermsFilter extends FilterBase {
    /** The field's name to execute the filter on. It is composed by the field ids of the hierarchy joined with "."
(i.e. personLayer.address.street). */
    field: string;
    /** The list of values to be filtered on. At least one must match to return results. */
    terms: string[];
}
/** Filters aggregations */
export interface AggregationFilter extends FilterBase {
    /** The name of the aggregation this filter is connected to. */
    aggregationName?: string | undefined;
    /** The filter to be applied. */
    filter?: FilterBase | undefined;
    /** Autogenerated Guid at request time, for precise aggregation result mapping. */
    temporaryAggregatorRequestId?: string | undefined;
}
/** Filters on child documents */
export interface ChildFilter extends FilterBase {
    /** The type of the child document. */
    childType: string;
    /** The filter to be applied on the child document. All kinds of filters are accepted. */
    filter: FilterBase;
}
/** Filters on parent documents */
export interface ParentFilter extends FilterBase {
    /** The type of the parent document. */
    parentType: string;
    /** The filter to be applied on the child document. All kinds of filters are accepted. */
    filter: FilterBase;
}
/** Search behaviors */
export declare enum SearchBehavior {
    DropInvalidCharactersOnFailure,
    WildcardOnSingleTerm,
    SimplifiedSearch,
    WildcardOnEveryTerm,
    SimplifiedSearchOr
}
/** Represents the business rule configuration. */
export interface BusinessRuleConfiguration {
    /** Disables the rule engine completely. */
    disableRuleEngine: boolean;
    /** Rules. */
    rules?: BusinessRule[] | undefined;
    /** Named caches. */
    caches?: NamedCacheConfigurationBase[] | undefined;
    /** Notifications. */
    notifications?: BusinessRuleNotification[] | undefined;
    /** Numbers sequences. */
    numberSequences?: BusinessRuleNumberSequence[] | undefined;
    /** Schedules. */
    schedules?: BusinessRuleSchedule[] | undefined;
}
/** A business rule */
export interface BusinessRule {
    /** User defined ID of the rule. */
    id?: string | undefined;
    /** Trigger point. */
    triggerPoints?: BusinessRuleTriggerPoint[] | undefined;
    /** Enable. */
    isEnabled: boolean;
    /** Language specific rule names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific rule description. */
    description?: TranslatedStringDictionary | undefined;
    /** Enable trace logs for this rule. */
    enableTracing: boolean;
    kind: string;
}
/** Represents a trigger point for a business rule */
export interface BusinessRuleTriggerPoint {
    /** Execution scope. */
    executionScope: BusinessRuleExecutionScope;
    /** Document type. */
    documentType: BusinessRuleTriggerDocType;
    /** Action performed. */
    action: BusinessRuleTriggerAction;
}
export declare enum BusinessRuleExecutionScope {
    MainDoc,
    SearchDoc
}
/** A business rule configurable by specific actions and conditions */
export interface BusinessRuleConfigurable extends BusinessRule {
    /** The condition that makes this rule trigger. */
    condition?: BusinessRuleCondition | undefined;
    /** Optional transformations to apply. */
    transformationGroups?: BusinessRuleTransformationGroup[] | undefined;
    /** The actions that are performed when this rule triggers. */
    actions?: BusinessRuleAction[] | undefined;
}
/** Conditions on which a business rule is executed */
export interface BusinessRuleCondition {
    /** Optional trace log reference ID set by the system when EnableTracing is set to true on the associated rule. */
    traceRefId?: string | undefined;
    /** Language specific condition names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific condition description. */
    description?: TranslatedStringDictionary | undefined;
    kind: string;
}
/** Links multiple conditions with a boolean operator */
export interface BooleanCondition extends BusinessRuleCondition {
    /** The conditions. */
    conditions?: BusinessRuleCondition[] | undefined;
}
/** Links conditions with AND */
export interface AndCondition extends BooleanCondition {
}
/** Links conditions with OR */
export interface OrCondition extends BooleanCondition {
}
/** Matches when a layer was assigned */
export interface LayerAssignedCondition extends BusinessRuleCondition {
    /** Layer id to match on. */
    layerId?: string | undefined;
}
/** Matches when a layer was unassigned */
export interface LayerUnassignedCondition extends BusinessRuleCondition {
    /** Layer id to match on. */
    layerId?: string | undefined;
}
/** Matches when a permission set was assigned */
export interface ContentPermissionSetAssignedCondition extends BusinessRuleCondition {
    /** Permission set id to match on. */
    permissionSetId?: string | undefined;
}
/** Matches when a permission set was unassigned */
export interface ContentPermissionSetUnassignedCondition extends BusinessRuleCondition {
    /** Permission set id to match on. */
    permissionSetId?: string | undefined;
}
/** Matches when a field matching the field path string (JSON path) changes to the expected value. */
export interface FieldValueChangedCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
    /** Expected value for the field to have to satisfy the condition */
    expectedValue?: any | undefined;
}
/** Matches when a field matching the field path string (JSON path) has the expected value. */
export interface FieldValueCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
    /** Expected value for the field to have to satisfy the condition */
    expectedValue?: any | undefined;
}
/** Matches when a field matching the field path string (JSON Path) changes and matches the given regular expression. */
export interface MatchRegexCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
    /** Regular expression */
    regex?: string | undefined;
    /** Optional variable name to store the matched regex groups in */
    storeIn?: string | undefined;
}
/** Matches when a field matching the field path string (JSON Path) changes and matches one of the specified values in ValuesToMatch */
export interface StringContainsCondition extends BusinessRuleCondition {
    /** JSON path to the field. */
    fieldPath?: string | undefined;
    /** A list of string value that will checked if at least one of them is contained in the string value identified by the FieldPath. */
    valuesToMatch?: string[] | undefined;
    /** Optional value to be stored in the variable identified by StoreIn. It can be simple value or a complex object. */
    valueToStore?: any | undefined;
    /** Decide if the StringContains condition should be processed case sensitive. */
    caseSensitive?: boolean;
    /** Optional variable name to store the ValueToStore in */
    storeIn?: string | undefined;
}
/** Matches when one or all the user roles specified in UserRoleIds are assigned to the user retrieved from the path UserIdPath */
export interface UserInUserRolesCondition extends BusinessRuleCondition {
    /** JSON path to the field containing the id of the user that needs to be checked. */
    userIdPath?: string | undefined;
    /** A static list of user role ids that will checked: depending on MatchMode all the user roles or only one of them must be assigned to the user. */
    userRoleIds?: string[] | undefined;
    /** Decide if all the user roles must be assigned to the user or only one of them. */
    matchMode?: ConditionMatchMode;
}
/** How a list of values in the condition should be matched during the comparison. */
export declare enum ConditionMatchMode {
    All,
    Any
}
/** Matches when a tag in a tagbox matching the field path string (JSON path) is newly assigned. */
export interface TagboxItemAssignedCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
    /** Ref Id of the list item that was assigned in the tagbox */
    refId?: string | undefined;
}
/** Matches when a tag in a tagbox matching the field path string (JSON path) is removed. */
export interface TagboxItemUnassignedCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
    /** Ref Id of the list item that was unassigned from the tagbox */
    refId?: string | undefined;
}
/** Matches when the content schema of a metadata item equals the one set in the condition. */
export interface ContentSchemaCondition extends BusinessRuleCondition {
    /** Content schema id to match on. */
    schemaId?: string | undefined;
}
export interface NumberCompareCondition extends BusinessRuleCondition {
    /** JSON path to the field. */
    fieldPath?: string | undefined;
    /** Mode to use for comparison. */
    mode?: BusinessRuleNumberCompareConditionMode;
    /** Value to compare to. */
    value?: number;
}
export declare enum BusinessRuleNumberCompareConditionMode {
    LessThan,
    LessThanEqual,
    Equal,
    GreaterThanEqual,
    GreaterThan
}
/** Matches when a relationship entry in a relationship field matching the field path string (JSON path) is newly assigned. */
export interface ContentRelationItemAssignedCondition extends BusinessRuleCondition {
    /** Content id that should be matched against. */
    contentId?: string | undefined;
    /** JSON path to the field */
    fieldPath?: string | undefined;
}
/** Matches when a relationship entry in a relationship field matching the field path string (JSON path) is removed. */
export interface ContentRelationItemUnassignedCondition extends BusinessRuleCondition {
    /** Content id that should be matched against. */
    contentId?: string | undefined;
    /** JSON path to the field */
    fieldPath?: string | undefined;
}
/** Matches when the geo point from the field specified by the field path is inside the specified polygon. */
export interface GeoPointWithinPolygonCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
    /** List of points that form the polygon for the geo fence.
Must include at least 3 points. */
    polygon?: LatLon[] | undefined;
}
/** Stores a coordinate */
export interface LatLon {
    /** Latitude */
    lat: number;
    /** Longitude */
    lon: number;
}
/** Matches whenever the assigned content permission sets changed. */
export interface ContentPermissionSetsChangedCondition extends BusinessRuleCondition {
}
/** Matches whenever the assigned content(s) in a relationship field changed. */
export interface ContentRelationItemsChangedCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
}
/** Matches whenever the assigned layers of a content changed. */
export interface LayersChangedCondition extends BusinessRuleCondition {
    /** Optional list of layer schema ids that must be added during the current content update operation in order for the condition to match. */
    addedLayerIds?: string[] | undefined;
    /** Optional list of layer schema ids that must be removed during the current content update operation in order for the condition to match. */
    removedLayerIds?: string[] | undefined;
}
/** Matches whenever the assigned item(s) in a tagbox changed. */
export interface TagboxItemsChangedCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
}
/** Matches when a field matching the field path string (JSON path) is empty. */
export interface FieldEmptyCondition extends BusinessRuleCondition {
    /** JSON path to the field */
    fieldPath?: string | undefined;
}
/** Matches when the inner condition is not matching. */
export interface NotCondition extends BusinessRuleCondition {
    /** Inner condition. */
    condition?: BusinessRuleCondition | undefined;
}
/** Business rule transformation group: A group of transformations to run for the specified inputs */
export interface BusinessRuleTransformationGroup {
    /** The inputs of the transformation group. */
    inputs?: string[] | undefined;
    /** A list of transformations to apply. */
    transformations?: BusinessRuleTransformation[] | undefined;
    /** Variable name where the final result should be stored in. */
    storeIn?: string | undefined;
    /** Optional trace log reference ID set by the system when EnableTracing is set to true on the associated rule. */
    traceRefId?: string | undefined;
    /** Language specific transformation group names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific transformation group description. */
    description?: TranslatedStringDictionary | undefined;
}
/** Business rule transformation */
export interface BusinessRuleTransformation {
    /** Optional trace log reference ID set by the system when EnableTracing is set to true on the associated rule. */
    traceRefId?: string | undefined;
    /** Language specific transformation names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific transformation description. */
    description?: TranslatedStringDictionary | undefined;
    kind: string;
}
/** Takes an item from a dictionary by its key. */
export interface TakeDictionaryValueTransformation extends BusinessRuleTransformation {
    /** Key of the item. */
    key?: string | undefined;
}
/** Takes an item from an array by its index. */
export interface TakeArrayValueTransformation extends BusinessRuleTransformation {
    /** Index of the item. */
    index?: string | undefined;
}
/** Joins the input by a configurable separator */
export interface JoinByTransformation extends BusinessRuleTransformation {
    /** Separator to use. */
    separator?: string | undefined;
}
/** Uses a named cache to lookup a value. */
export interface LookupCacheTransformation extends BusinessRuleTransformation {
    /** Name of the cache to use. */
    namedCache?: string | undefined;
    /** Choose what should be returned.
Found: return the value of the found item in the lookup cache, null if not found.
NotFound: return the input key value of the not found item, null if found.
All: return the value of the found item in the lookup cache or the input key value of the not found item. */
    lookupReturnedItems?: LookupItemsMatch;
}
/** How should happen the match on a lookup cache */
export declare enum LookupItemsMatch {
    Found,
    NotFound,
    All
}
/** Produces N-grams based on splitting a text on whitespace characters. Removes punctuation as well. */
export interface NGramTransformation extends BusinessRuleTransformation {
    /** Maximum size of n-grams to produce.
Settings this to 3 will produce unigrams, bigrams, trigrams. */
    size?: number;
    /** Minimum length of a word to be considered. */
    minWordLength?: number;
    /** Maximum length of a word to be considered. */
    maxWordLength?: number | undefined;
}
/** Transforms a list by applying a set of transformation for each item in the list. */
export interface ProjectionTransformation extends BusinessRuleTransformation {
    /** Transformations to apply. */
    transformations?: BusinessRuleTransformation[] | undefined;
}
/** Splits the input by separators, optionally trimming the entries afterwards. */
export interface SplitTransformation extends BusinessRuleTransformation {
    /** Separators to use, supports variables, an array of strings including escape sequences or null to split on any white space character. */
    separators?: any | undefined;
    /** Keeps empty items. Empty items will be returned as empty strings. */
    keepEmpty?: boolean;
    /** Trims each entry for punctuation and white space. */
    trim?: boolean;
}
/** Add / remove a time span to a date time */
export interface DateMathTransformation extends BusinessRuleTransformation {
    /** String representation of a time span. */
    timeSpan?: string | undefined;
}
/** Action to be performed by a business rule */
export interface BusinessRuleAction {
    /** Optional trace log reference ID set by the system when EnableTracing is set to true on the associated rule. */
    traceRefId?: string | undefined;
    /** Language specific action names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific action description. */
    description?: TranslatedStringDictionary | undefined;
    kind: string;
}
/** Assigns a layer, adding the default values to the data dictionary */
export interface AssignLayerAction extends BusinessRuleAction {
    /** The ID of the layer. */
    layerId?: string | undefined;
    /** An object containing default values (used for example to populate required fields). */
    defaultValues?: any | undefined;
}
/** Removes a layer */
export interface UnassignLayerAction extends BusinessRuleAction {
    /** The ID of the layer. */
    layerId?: string | undefined;
}
/** Assign a value to all fields matching the FieldPath (JSON path). */
export interface AssignValueAction extends BusinessRuleAction {
    /** Path to the object the value should be inserted in. */
    path?: string | undefined;
    /** ID of the field, the value should be inserted in. */
    fieldId?: string | undefined;
    /** Value to assign. */
    value?: any | undefined;
    /** Indicates whether existing values should be replaced.
Note: for multi fieldsets and relations, this setting controls, if the value is added
to the already existing values or if the existing values shall be overwritten. */
    replace?: boolean;
}
/** Assigns one or multiple tag box items to the multi tagbox identified by the path (JSON path). */
export interface AssignTagboxItemsAction extends BusinessRuleAction {
    /** Path to the object the tagbox is contained in. */
    path?: string | undefined;
    /** ID of the tagbox field. */
    fieldId?: string | undefined;
    /** List of refIds of the items that should be assigned. */
    refIds?: any | undefined;
    /** Indicates whether all the already assigned tags get replaced by the set specified in the action.
If false, the not already assigned tags get added, the rest is left as is. */
    replace?: boolean;
}
/** Removes one or multiple tag box items from the multi tagbox identified by the path (JSON path). */
export interface UnassignTagboxItemsAction extends BusinessRuleAction {
    /** Path to the object the tagbox is contained in. */
    path?: string | undefined;
    /** ID of the tagbox field. */
    fieldId?: string | undefined;
    /** List of refIds of the items that should be removed. */
    refIds?: any | undefined;
}
/** Assigns one or more permission sets to a content. */
export interface AssignContentPermissionSetsAction extends BusinessRuleAction {
    /** IDs of the permission sets to assign. */
    permissionSetIds?: any | undefined;
    /** Indicates whether the already assigned permissions should be replaced or merged. */
    replace?: boolean;
}
/** Removes one or more permission sets from a content. */
export interface UnassignContentPermissionSetsAction extends BusinessRuleAction {
    /** IDs of the permission sets to unassign. */
    permissionSetIds?: any | undefined;
}
/** Produces a message that is enqueued to the integration bus for a service provider to consume */
export interface ProduceMessageAction extends BusinessRuleAction {
}
/** Assigns a set of list item ids to all multi tag boxes in a layer where the filter defined on the tagbox does allow assignment of the ID. */
export interface AssignTagboxItemsInLayerAction extends BusinessRuleAction {
    /** Named cache to use for lookup, should be of type SchemaTagboxFilterLookupNamedCacheConfiguration */
    namedCache?: string | undefined;
    /** List of refIds of the items that should be assigned. */
    refIds?: any | undefined;
    /** Indicates where the assignment should be additive to the already assigned tags
or if existing tags should be replaced. */
    replace?: boolean;
}
/** Enqueue content for tagging */
export interface EnqueueTaggingAction extends BusinessRuleAction {
    /** Options to use while tagging. */
    options?: TaggingOptionsBase | undefined;
}
/** Options for tagging */
export interface TaggingOptionsBase {
    /** Override for the output format ID to tag. */
    tagOutputFormatId?: string | undefined;
    /** Override for the cache to use. */
    keywordLookupCacheName?: string | undefined;
    /** Override for the layer to assign. */
    taggingLayerId?: string | undefined;
    /** Override for the field id where found tags are stored. */
    foundTagsFieldId?: string | undefined;
    /** Override for the field id where not found tags are stored. */
    missingKeywordsFieldId?: string | undefined;
    kind: string;
}
/** Options for clarifai tagging */
export interface ClarifaiTaggingOptions extends TaggingOptionsBase {
    /** Override for the model to use */
    model?: string | undefined;
    /** Override for the language to use */
    language?: string | undefined;
    /** Minimum value a concept must have to be considered */
    minimumValue?: string | undefined;
}
export interface SimulatedTaggingOptions extends TaggingOptionsBase {
    /** Number of keywords to assign. */
    numberOfKeywords?: string | undefined;
}
/** Produces a notification that is enqueued to users, user groups or owners recipients */
export interface ProduceNotificationAction extends BusinessRuleAction {
    /** ID of the notification to produce. */
    notificationId?: string | undefined;
    /** Recipients of the notification. */
    recipients: NotificationRecipientBase[];
}
export interface NotificationRecipientBase {
    kind: string;
}
export interface UserNotificationRecipient extends NotificationRecipientBase {
    /** User ID. */
    userId: string;
}
export interface UserRoleNotificationRecipient extends NotificationRecipientBase {
    /** User role ID. */
    userRoleId: string;
}
export interface UserRightNotificationRecipient extends NotificationRecipientBase {
    /** User right. */
    userRight: UserRight;
}
export interface OwnerNotificationRecipient extends NotificationRecipientBase {
}
/** Action to get a number from a configured number sequence and store it in a variable. */
export interface GetNumberFromNumberSequenceAction extends BusinessRuleAction {
    /** ID of the sequence number to get number from. */
    numberSequenceId?: string | undefined;
    /** Variable name to store number in. */
    storeIn?: string | undefined;
}
/** Enqueue content for transfer ownership */
export interface EnqueueTransferOwnershipAction extends BusinessRuleAction {
    /** Id of the user to whom the ownership should be transferred. */
    transferUserId?: string | undefined;
}
/** Enqueue creation of an embed */
export interface EnqueueCreateEmbedAction extends BusinessRuleAction {
    /** Name of the embed. If empty, it will be automatically initialized with the 'Embed_{RuleId}'. */
    embedName?: string | undefined;
    /** Optional description of the embed. */
    embedDescription?: string | undefined;
    /** Output format of the content to be embedded. */
    outputFormatId: string;
    /** Optional conversion to apply to the output. */
    conversionString?: string | undefined;
    /** Indicates if the conversion is locked and therefore cannot be changed by the caller of the embed URI. */
    lockDeliveryOptions?: boolean;
    /** Optional date when embed expires and cannot be accessed anymore: It must be in ISO format, with or without milliseconds 'yyyy-MM-ddTHH:mm:ss(.fffffff)K'. */
    expirationDate?: string | undefined;
    /** Optional variable name to store in the url of the embed that will be created. */
    storeIn?: string | undefined;
}
/** A business rule expressed as a script */
export interface BusinessRuleScript extends BusinessRule {
    /** Script */
    script?: string | undefined;
}
/** Named cache configuration */
export interface NamedCacheConfigurationBase {
    /** Name of named cache. */
    name?: string | undefined;
    /** Indicates if the lookup should be case sensitive. */
    caseSensitive: boolean;
    kind: string;
}
/** List item named cache */
export interface ListItemNamedCacheConfiguration extends NamedCacheConfigurationBase {
    /** ID of the schema to cache (should have SchemaType = List) */
    schemaId?: string | undefined;
    /** List of IDs of fields to use as a composite key */
    keyFields?: string[] | undefined;
    /** An optional filter to narrow down the cached list items */
    filter?: FilterBase | undefined;
    /** Include child schemas when caching list items */
    includeAllSchemaChildren?: boolean;
}
/** Creates a cache for all multi tag boxes in a schema Lookup key is then in the format [ fieldId, refId ], returns the refId if matched by the filter */
export interface SchemaTagboxFilterLookupNamedCacheConfiguration extends NamedCacheConfigurationBase {
    /** The layer id. */
    schemaId?: string | undefined;
}
export interface InverseListItemNamedCacheConfiguration extends NamedCacheConfigurationBase {
    /** ID of the schema to cache (should have SchemaType = List) */
    schemaId?: string | undefined;
    /** ID of the field that yields the value */
    valueField?: string | undefined;
    /** An optional filter to narrow down the cached list items */
    filter?: FilterBase | undefined;
    /** Include child schemas when caching list items */
    includeAllSchemaChildren?: boolean;
}
/** Configuration for a notification sent by ProduceNotificationAction. */
export interface BusinessRuleNotification {
    /** ID of the notification. */
    id?: string | undefined;
    /** Title of the notification. */
    title?: TranslatedStringDictionary | undefined;
    /** Message of the notification. */
    message?: TranslatedStringDictionary | undefined;
    /** Indicates if a collection of the items affected should be created. */
    createCollection: boolean;
    /** Name of the template to use when converting the notification to an item in the email notifications. */
    templateName?: string | undefined;
}
/** Configuration for a number sequence. */
export interface BusinessRuleNumberSequence {
    /** ID of number sequence. */
    id?: string | undefined;
    /** Format.
Refer to https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings for guidance.
Note: formatting of numbers use invariant culture. */
    format?: string | undefined;
    /** Starting number of the sequence.
Note: When changing this, existing sequence number will be reset to new starting number and might produce duplicate numbers. */
    start: number;
}
/** Schedules business rules to run on a regular time frame. Note: If schedules do not complete within 15 minutes, next execution will be skipped */
export interface BusinessRuleSchedule {
    /** Language specific names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific description. */
    description?: TranslatedStringDictionary | undefined;
    /** Cron expression to specify run time.
Refer to https://github.com/HangfireIO/Cronos#cron-format for reference.
Minimum interval supported is 15 minutes. */
    cronExpression?: string | undefined;
    /** IDs of business rules to run during schedule, regardless of trigger point */
    ruleIds?: string[] | undefined;
    /** Doc type of items that should be loaded. */
    docType: BusinessRuleTriggerDocType;
    /** Search string to apply when searching for items to load. */
    searchString?: string | undefined;
    /** Filter to apply when searching for items to load. */
    filter?: FilterBase | undefined;
    /** Indicates if schedule is enabled. */
    isEnabled: boolean;
}
/** Update request for changing business rule configuration */
export interface BusinessRuleConfigurationUpdateRequest extends BusinessRuleConfiguration {
}
/** Base class for search results */
export interface BaseResultOfBusinessRuleTraceLog {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: BusinessRuleTraceLog[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfBusinessRuleTraceLog extends BaseResultOfBusinessRuleTraceLog {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorWithAggregationBaseResultOfBusinessRuleTraceLog extends SearchBehaviorBaseResultOfBusinessRuleTraceLog {
    /** Results of the aggregation, if any aggregators was passed in the request. */
    aggregationResults?: AggregationResult[] | undefined;
}
/** Holds results of trace log search. */
export interface BusinessRuleTraceLogSearchResult extends SearchBehaviorWithAggregationBaseResultOfBusinessRuleTraceLog {
}
/** Result of an aggregation */
export interface AggregationResult {
    /** Name of the aggregation. */
    name: string;
    /** When there are lots of unique terms, Elastic Search only returns the top terms; this number is the sum of the document counts for all buckets that are not part of the response. */
    sumOtherDocCount?: number | undefined;
    /** Items returned for the aggregation. Each item consists of a bucket with the matched value and the number of matches.
Optionally inner aggregations for further drill down can be available. */
    aggregationResultItems?: AggregationResultItem[] | undefined;
}
/** Aggregation result item */
export interface AggregationResultItem {
    /** Value matched. */
    name: string;
    /** Number of items matched. */
    count: number;
    /** Ready to use filter to filter the data based on the aggregation result values.
It can be passed as one of the aggregation filters of an aggregation query: it returns documents meeting the aggregation condition. */
    filter?: AggregationFilter | undefined;
    /** True if the current result item matches on of the aggregation filters sent in the query. */
    active: boolean;
    /** Inner aggregation results, if inner aggregations were provided in the query. */
    aggregationResults?: AggregationResult[] | undefined;
}
/** Contains a trace for a single document affected by potentially multiple business rules being evaluated and executed. */
export interface BusinessRuleTraceLog {
    /** ID of the trace. */
    id?: string | undefined;
    /** ID of the document. */
    documentId?: string | undefined;
    /** Type of the document. */
    documentType: BusinessRuleTriggerDocType;
    /** IDs of rules that were traced for this document. */
    ruleIds?: string[] | undefined;
    /** Detailed information about rules traced. */
    rules?: BusinessRuleTracedRule[] | undefined;
    /** Validation errors occuring after all rules have ran. */
    validationErrors?: ErrorResponse[] | undefined;
    /** General errors occuring when saving the document. */
    generalErrors?: ErrorResponse[] | undefined;
    /** Audit information. */
    audit?: UserAudit | undefined;
}
/** Traced Business rule */
export interface BusinessRuleTracedRule {
    /** Configuration of the rule as it was running. Enriched with trace ref IDs. */
    configuration?: BusinessRule | undefined;
    /** Evaluations performed for this rule. */
    evaluations?: BusinessRuleTracedEvaluation[] | undefined;
}
/** Evaluation trace of a business rule */
export interface BusinessRuleTracedEvaluation {
    /** Indicates if the rule was found to be executable. */
    conditionSatisfied: boolean;
    /** Detailed evaluation results for each condition. */
    conditions?: BusinessRuleTracedEvaluationCondition[] | undefined;
    /** Detailed results for transformation groups. */
    transformationGroups?: BusinessRuleTracedTransformationGroup[] | undefined;
    /** Detailed steps performed by actions. */
    actions?: BusinessRuleTracedAction[] | undefined;
    /** State of variables after all transformation groups were ran. */
    variables?: {
        [key: string]: string;
    } | undefined;
}
/** Detail trace for business rule condition */
export interface BusinessRuleTracedEvaluationCondition {
    /** Trace reference ID of condition. */
    traceRefId?: string | undefined;
    /** Indicates if this condition evaluated to true. */
    satisfied: boolean;
    /** Additional reason why condition evaluated to given result. */
    reason?: string | undefined;
}
/** Trace of transformation group */
export interface BusinessRuleTracedTransformationGroup {
    /** Trace reference ID of transformation group. */
    traceRefId?: string | undefined;
    /** Serialized JSON of input for group */
    input?: string | undefined;
    /** Serialized JSON of output for group */
    output?: string | undefined;
    /** Detailed traces for each step performed by transformations in group. */
    transformations?: BusinessRuleTracedTransformation[] | undefined;
}
/** Trace of single transformation step */
export interface BusinessRuleTracedTransformation {
    /** Trace reference ID of transformation. */
    traceRefId?: string | undefined;
    /** Serialized JSON of input of transformation */
    input?: string | undefined;
    /** Serialized JSON of output of transformation */
    output?: string | undefined;
}
/** Detailed trace for business rule action */
export interface BusinessRuleTracedAction {
    /** Trace reference ID of action */
    traceRefId?: string | undefined;
    /** Indicates if the action modified the document */
    documentModified: boolean;
    /** Additional information provided by the trace */
    text?: string | undefined;
}
/** Audit information */
export interface UserAudit {
    /** The date on which the document was created. */
    creationDate: Date;
    /** The last date on which the document was modified. */
    modificationDate: Date;
    /** ID of the user who created the document. */
    createdByUser?: string | undefined;
    /** ID of the last user who modified the document. */
    modifiedByUser?: string | undefined;
}
export interface BusinessRuleTraceLogSearchRequest {
    /** Enable debug mode to get as result of the Searched additional debug information. Warning! Severely affects performance. */
    debugMode: boolean;
    /** Special filters used to filter down independently the aggregations' values and the search results on specific conditions.
For the search results, the aggregation filters are used to create a Filter that is put in AND with the eventual existing Filter of the search request to nail down the search results. The filters generated
by the aggregation filters are put in OR each other if they have the same AggregationName, and then such groups are put in AND.
For the aggregation values, only the original Filter of the search request is used to nail down the data to be considered for the aggregations. Then, on top of that, for each aggregator in the search request, a Filter is created to filter down the
aggregation results of that aggregation: depending if the AggregationName of the AggregationFilter matches the AggregationName of the Aggregator, the filter is put in OR (if it matches) or in AND (if it does not match it).
Moreover, an AggregationFilter ensures that the related value is returned in the AggregationResults also if the top aggregation values returned by default do not contain it. */
    aggregationFilters?: AggregationFilter[] | undefined;
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators?: AggregatorBase[] | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Limits the document count of the result set. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Fields and respective directions requested to sort the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
}
/** It is the base class for all aggregators. */
export interface AggregatorBase {
    /** The slug name of the aggregation. It must be unique per aggregation request. */
    name: string;
    /** Language specific field names. */
    names?: TranslatedStringDictionary | undefined;
    /** An optional aggregator list for nested aggregations. */
    aggregators?: AggregatorBase[] | undefined;
    /** An optional filter to limit the data set the aggregation is operation on. */
    filter?: FilterBase | undefined;
    /** Optional behavior that the UI should keep in regards to the aggregation */
    uiBehavior?: UiAggregatorBehavior | undefined;
    kind: string;
}
/** Behavior that the UI should keep in regards to the aggregation */
export interface UiAggregatorBehavior {
    /** Filters should be enabled in the UI. */
    enableFilter: boolean;
    /** Suggestions should be enabled in the UI. */
    enableSuggestions: boolean;
    /** Search functionality should be enabled in the filters in the UI. */
    enableSearchInFilter: boolean;
}
/** A multi-bucket range aggregator dedicated for date values. */
export interface DateRangeAggregator extends AggregatorBase {
    /** The field's ID to execute the aggregation on. */
    field: string;
    /** A list of date time ranges. */
    ranges: DateRangeForAggregator[];
}
/** The date range class used in aggregators. */
export interface DateRangeForAggregator {
    /** Language specific range names. */
    names?: TranslatedStringDictionary | undefined;
    /** The from value: it can be a datetime string or a pattern now(+-)(int)(YMDHm). */
    from?: string | undefined;
    /** The to value: it can be a datetime string or a pattern now(+-)(int)(YMDHm). */
    to?: string | undefined;
}
/** A multi-bucket range aggregator that works on geo_point fields */
export interface GeoDistanceAggregator extends AggregatorBase {
    /** The field's ID to execute the aggregation on. */
    field: string;
    /** The point of origin to calculate the distance from (latitude/longitude). */
    location: GeoLocation;
    /** A list of distance ranges. */
    ranges: GeoDistance[];
}
/** Stores geo distance information for gei distance aggregation */
export interface GeoDistance {
    /** Language specific geo distance names. */
    names?: TranslatedStringDictionary | undefined;
    /** The distance in meters. */
    distance: number;
}
/** A special single bucket aggregation that enables aggregating on nested documents */
export interface NestedAggregator extends AggregatorBase {
    /** The path pointing to the nested object. */
    path: string;
}
/** A multi-bucket range aggregator. */
export interface NumericRangeAggregator extends AggregatorBase {
    /** The field's ID to execute the aggregation on. */
    field?: string | undefined;
    /** A list of numeric ranges on which aggregate. */
    ranges: NumericRangeForAggregator[];
}
/** The numeric range for aggregator class */
export interface NumericRangeForAggregator {
    /** Language specific range names. */
    names?: TranslatedStringDictionary | undefined;
    /** The from value. */
    from?: number | undefined;
    /** The to value. */
    to?: number | undefined;
}
/** A multi-bucket value aggregator */
export interface TermsAggregator extends AggregatorBase {
    /** The field's ID to execute the aggregation on. Only not analyzed fields are supported. */
    field: string;
    /** It defines how many term buckets should be returned out of the overall terms list. */
    size?: number | undefined;
    /** Includes values for which buckets will be created. Supports regular expression strings or arrays of exact values. */
    includes?: string[] | undefined;
    /** Excludes values for which buckets will be created. Supports regular expression strings or arrays of exact values. */
    excludes?: string[] | undefined;
    /** Limits the possible returned aggregation values by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** Search fields to be used to search the SearchString value into. If no search field is specified, the Field value is used. */
    searchFields?: string[] | undefined;
    /** Sort settings for the aggregation results. If no sort is specified, aggregation is sorted on the item count. */
    sort?: SortInfo | undefined;
}
/** Sorting information */
export interface SortInfo {
    /** The field's ID to sort on. */
    field?: string | undefined;
    /** The sort direction (ascending/descending). */
    direction: SortDirection;
}
/** The sort direction */
export declare enum SortDirection {
    Asc,
    Desc
}
/** A multi-bucket value aggregator used for aggregations on relation item ids. */
export interface TermsRelationAggregator extends TermsAggregator {
    /** Type of the item target of the relation. It is used to resolve the target ID. */
    documentType?: TermsRelationAggregatorDocumentType;
}
export declare enum TermsRelationAggregatorDocumentType {
    Content,
    ListItem,
    Schema,
    User,
    ContentPermissionSet,
    Owner,
    UserRole
}
/** A multi-bucket value aggregator used for aggregations on indexed enum values. */
export interface TermsEnumAggregator extends TermsAggregator {
    /** Type of the enum target of the relation. It is used to resolve the enum translation. */
    enumType: string;
}
export interface Channel {
    /** ID of channel. */
    id: string;
    /** Numeric sort order of the channel. Channels are returned ordered by this field. */
    sortOrder: number;
    /** The search index ID where the channel requests the content from. Only RootContentSearchIndex is supported. */
    searchIndexId: string;
    /** An optional search filter. Limits the content document result set on each search and aggregation request. */
    filter?: FilterBase | undefined;
    /** Language specific names. */
    names: TranslatedStringDictionary;
    /** Default sort order specified for the channel to sort the results of a content search. */
    sort: SortInfo[];
    /** Fields to be used for sorting in content browser when displaying the channel. The information is only set and consumed by the client, not by the server. */
    sortFields: SortField[];
    /** An optional list of aggregators. These aggregations are added by default on each aggregation requests. */
    aggregations: AggregatorBase[];
    /** An Optional list of fields. These fields extend the list of simple search fields outside the bounds of any schema field configuration. */
    extendedSimpleSearchFields: string[];
    /** User roles granted access to the channel. */
    grantedUserRoleIds: string[];
    /** Display pattern to use for rendering details when 0 results are returned */
    missingResultsDisplayPatterns: TranslatedStringDictionary;
    /** Audit information. */
    audit: UserAudit;
    /** Grants rights to all the users to view the channel. */
    viewForAll: boolean;
}
export interface SortField {
    /** The path of the field ({schemaId}.{fieldId}) */
    path: string;
    /** The translated name of the field to be shown in the UI. */
    names: TranslatedStringDictionary;
}
export interface ChannelCreateRequest {
    /** ID of the channel. */
    id?: string | undefined;
    /** Default sort order specified for the channel to sort the results of a content search. */
    sort?: SortInfo[] | undefined;
    /** Order in which the channels should be displayed. */
    sortOrder: number;
    /** Fields to be used for sorting in content browser when displaying the channel. The information is only set and consumed by the client, not by the server. */
    sortFields: SortField[];
    /** Language specific channel names. */
    names: TranslatedStringDictionary;
    /** Language specific names. */
    searchIndexId?: string | undefined;
    /** User roles granted access to the channel. */
    grantedUserRoleIds?: string[] | undefined;
    /** An optional list of aggregators. These aggregations are added by default on each aggregation requests. */
    aggregations?: AggregatorBase[] | undefined;
    /** An optional search filter. Limits the content document result set on each search and aggregation request. */
    filter?: FilterBase | undefined;
    /** An Optional list of fields. These fields extend the list of simple search fields outside the bounds of any schema field configuration. */
    extendedSimpleSearchFields?: string[] | undefined;
    /** Display pattern to use for rendering details when 0 results are returned */
    missingResultsDisplayPatterns?: TranslatedStringDictionary | undefined;
    /** Grants rights to all the users to view the channel. */
    viewForAll: boolean;
}
export interface ChannelUpdateRequest {
    /** Default sort order specified for the channel to sort the results of a content search. */
    sort?: SortInfo[] | undefined;
    /** Order in which the channels should be displayed. */
    sortOrder: number;
    /** Fields to be used for sorting in content browser when displaying the channel. The information is only set and consumed by the client, not by the server. */
    sortFields: SortField[];
    names: TranslatedStringDictionary;
    /** Language specific names. */
    searchIndexId?: string | undefined;
    /** User roles granted access to the channel. */
    grantedUserRoleIds?: string[] | undefined;
    /** An optional list of aggregators. These aggregations are added by default on each aggregation requests. */
    aggregations?: AggregatorBase[] | undefined;
    /** An optional search filter. Limits the content document result set on each search and aggregation request. */
    filter?: FilterBase | undefined;
    /** An Optional list of fields. These fields extend the list of simple search fields outside the bounds of any schema field configuration. */
    extendedSimpleSearchFields?: string[] | undefined;
    /** Display pattern to use for rendering details when 0 results are returned */
    missingResultsDisplayPatterns?: TranslatedStringDictionary | undefined;
    /** Grants rights to all the users to view the channel. */
    viewForAll: boolean;
}
export interface FieldInfo {
    /** The path of the field ({schemaId}.{fieldId}) */
    path?: string | undefined;
    /** The ID of the field. */
    fieldId?: string | undefined;
    /** The type of the field. */
    type?: string | undefined;
    /** Flag indicating if the search when aggregating the field is supported or not. */
    allowSearch: boolean;
    /** Identifies a static field not retrieved from the dynamic metadata fields. */
    static: boolean;
    /** Path of the nested object, if the current field is part of a nested object */
    nestedPath?: string | undefined;
}
export interface SortFieldInfo {
    /** The path of the field ({schemaId}.{fieldId}) */
    path: string;
    /** Identifies a static field not retrieved from the dynamic metadata fields. */
    static: boolean;
}
/** Base class for detail of permission sets */
export interface PermissionSetDetailOfContentRight {
    /** The permission set ID. */
    id: string;
    /** Language specific permission set names. */
    names: TranslatedStringDictionary;
    /** A list of content or metadata rights authorizing operations on Content Items or List Items. */
    userRolesRights?: PermissionUserRoleRightsOfContentRight[] | undefined;
    /** A list of permission set rights authorizing operations on this permission set. */
    userRolesPermissionSetRights?: PermissionUserRoleRightsOfPermissionSetRight[] | undefined;
    /** When true this permission set will derogate all other configured permission sets on the Content Item or List Item. */
    exclusive: boolean;
    /** The owner token ID. Defines the permission set owner. */
    ownerTokenId: string;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
/** Detail of a content permission set */
export interface ContentPermissionSetDetail extends PermissionSetDetailOfContentRight {
}
/** Rights assigned to a user role. */
export interface PermissionUserRoleRightsOfContentRight {
    /** The user role ID. */
    userRoleId?: string | undefined;
    /** Language specific user role names. */
    names?: TranslatedStringDictionary | undefined;
    /** List of rights: they can be content, metadata or permission set rights, depending on the type defined on the class
(ContentRight, MetadataRight, PermissionSetRight). */
    rights?: ContentRight[] | undefined;
}
/** Rights assigned to a user role. */
export interface PermissionUserRoleRightsOfPermissionSetRight {
    /** The user role ID. */
    userRoleId?: string | undefined;
    /** Language specific user role names. */
    names?: TranslatedStringDictionary | undefined;
    /** List of rights: they can be content, metadata or permission set rights, depending on the type defined on the class
(ContentRight, MetadataRight, PermissionSetRight). */
    rights?: PermissionSetRight[] | undefined;
}
/** Permission set rights */
export declare enum PermissionSetRight {
    Apply,
    Manage
}
/** Audit information */
export interface UserAuditDetail {
    /** The date on which the document was created. */
    creationDate: Date;
    /** The last date on which the document was modified. */
    modificationDate: Date;
    /** ID of the user who created the document. */
    createdByUser?: User | undefined;
    /** ID of the last user who modified the document. */
    modifiedByUser?: User | undefined;
}
export interface User {
    /** User's Picturepark ID. */
    id?: string | undefined;
    /** User's first name. */
    firstName?: string | undefined;
    /** User's last name. */
    lastName?: string | undefined;
    /** Email address of the user (doubles as username). */
    emailAddress: string;
    /** Marks a user that was deleted from the system. */
    isDeleted: boolean;
}
export interface PermissionSetCreateRequestOfContentRight {
    /** Language specific permission set names. */
    names: TranslatedStringDictionary;
    /** A list of content or metadata rights authorizing operations on Content Items or List Items. */
    userRolesRights?: UserRoleRightsOfContentRight[] | undefined;
    /** A list of permission set rights authorizing operations on this permission set. */
    userRolesPermissionSetRights?: UserRoleRightsOfPermissionSetRight[] | undefined;
    /** When true this permission set will derogate all other configured permission sets on Content Items or List Items. */
    exclusive: boolean;
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
}
/** Request to create a content permission set */
export interface ContentPermissionSetCreateRequest extends PermissionSetCreateRequestOfContentRight {
}
export interface UserRoleRightsOfContentRight {
    /** The user role id. */
    userRoleId?: string | undefined;
    /** A permission container which can hold content, metadata or permission set rights. */
    rights?: ContentRight[] | undefined;
}
export interface UserRoleRightsOfPermissionSetRight {
    /** The user role id. */
    userRoleId?: string | undefined;
    /** A permission container which can hold content, metadata or permission set rights. */
    rights?: PermissionSetRight[] | undefined;
}
/** Base class for permission set update requests */
export interface PermissionSetUpdateRequestOfContentRight {
    /** Language specific permission set names. */
    names: TranslatedStringDictionary;
    /** A list of content or metadata rights authorizing operations on Content Items or List Items. */
    userRolesRights?: UserRoleRightsOfContentRight[] | undefined;
    /** A list of permission set rights authorizing operations on this permission set. */
    userRolesPermissionSetRights?: UserRoleRightsOfPermissionSetRight[] | undefined;
}
/** Request to update a content permission set */
export interface ContentPermissionSetUpdateRequest extends PermissionSetUpdateRequestOfContentRight {
}
/** Request to transfer the ownership of a permission set */
export interface PermissionSetOwnershipTransferRequest {
    /** The ID of the user to whom the permission set ownership should be transferred to. */
    transferUserId: string;
}
/** Response to a bulk operation */
export interface BulkResponse {
    /** Rows of the bulk response. */
    rows?: BulkResponseRow[] | undefined;
}
/** Row information of a bulk response */
export interface BulkResponseRow {
    /** ID of the document. */
    id: string;
    /** Version of the document. */
    version: number;
    /** Eventual error. */
    error?: string | undefined;
    /** True if item successfully saved. False otherwise. */
    succeeded: boolean;
    /** Returned status code. */
    status: number;
    /** The identifier provided by user in the corresponding request (or null if none was provided). Used only in bulk creation. */
    requestId?: string | undefined;
}
/** Request to create multiple content permission sets */
export interface ContentPermissionSetCreateManyRequest {
    /** Content permission set update requests. */
    items?: ContentPermissionSetCreateRequest[] | undefined;
}
/** Request to update multiple content permission sets */
export interface ContentPermissionSetUpdateManyRequest {
    /** Content permission sets update requests. */
    items?: ContentPermissionSetUpdateRequestItem[] | undefined;
}
/** Base class for permission set update requests */
export interface PermissionSetUpdateRequestItemOfContentRight extends PermissionSetUpdateRequestOfContentRight {
    /** The permission set ID. */
    id: string;
}
/** Request to update a content permission set */
export interface ContentPermissionSetUpdateRequestItem extends PermissionSetUpdateRequestItemOfContentRight {
}
/** Request to delete multiple permission sets */
export interface PermissionSetDeleteManyRequest {
    /** Permission set IDs. */
    permissionSetIds?: string[] | undefined;
}
/** Request to transfer the ownership of multiple permission sets */
export interface PermissionSetOwnershipTransferManyRequest {
    /** Permission set ownership transfer requests. */
    items?: PermissionSetOwnershipTransferItem[] | undefined;
}
export interface PermissionSetOwnershipTransferItem extends PermissionSetOwnershipTransferRequest {
    /** The permission set ID. */
    permissionSetId?: string | undefined;
}
/** Rights that the current user has on a permission set */
export interface PermissionSetUserPermissionRights {
    /** Permission set ID. */
    permissionSetId?: string | undefined;
    /** List of rights on the permission set specified by PermissionSetId */
    permissionSetRights?: PermissionSetRight[] | undefined;
}
/** Base class for search results */
export interface BaseResultOfPermissionSet {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: PermissionSet[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfPermissionSet extends BaseResultOfPermissionSet {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Result of a permission set search operation */
export interface PermissionSetSearchResult extends SearchBehaviorBaseResultOfPermissionSet {
}
/** Permission set */
export interface PermissionSet {
    /** The permission set ID. */
    id: string;
    /** When true this permission set will derogate all other configured permission sets.
Cannot be changed after creation. */
    exclusive: boolean;
    /** Language specific permission set names. */
    names: TranslatedStringDictionary;
}
/** Request to search permission sets */
export interface PermissionSetSearchRequest {
    /** The string used to query the data. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied in the specified order. */
    searchBehaviors?: SearchBehavior[] | undefined;
    sort?: SortInfo[] | undefined;
    /** Limits the number of the returned schemas. Defaults to 30. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    filter?: FilterBase | undefined;
    /** Filters based on the PermissionSetRight of the user. */
    rightFilter?: PermissionSetRight | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the result.
Warning! It severely affects performance. */
    debugMode: boolean;
    /** When searching in multi language fields, limit the searchable fields to the ones corresponding to the specified languages.
If not specified, all metadata languages defined in the system are used. */
    searchLanguages?: string[] | undefined;
}
/** Content detail */
export interface ContentDetail {
    /** The ID of the content schema. The SchemaType of the specified schema must be Content.
The schema specifies the structure of the Content dictionary. */
    contentSchemaId: string;
    /** An optional list of IDs of the schemas that form the layers of the content.
The SchemaType of the specified schemas must be Layer. */
    layerSchemaIds?: string[] | undefined;
    /** All the IDs of the referenced list items (tagboxes) that do not exist in the system. */
    brokenReferenceIds?: string[] | undefined;
    /** All the IDs of the indirectly referenced list items (tagboxes) that do not exist in the system.
They are referenced list items that reference at least a list item that do not exist in the system. */
    brokenIndirectReferenceIds?: string[] | undefined;
    /** All the IDs of the contents or list items target of a relation that do not exist in the system. */
    brokenRelationTargetIds?: string[] | undefined;
    /** The content data of the content. It's an object of dynamic metadata whose structure is defined in the Content schema identified.
by the ContentSchemaId property. */
    content?: any | undefined;
    /** The metadata belonging to the layers of the content. It's a dictionary of dynamic metadata whose structure is defined in the Layer schemas identified
by the LayerSchemaIds property. */
    metadata?: {
        [key: string]: any;
    } | undefined;
    /** The content ID. */
    id: string;
    /** An optional list of content permission set IDs which control content permissions. These permissions control content accessibility for the users that do not own the content. */
    contentPermissionSetIds?: string[] | undefined;
    /** The Outputs generated from the content. They identifies the rendered files generated by the system.
They are available only for file base contents, and they depends on the output formats configured in the system. */
    outputs?: Output[] | undefined;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
    /** The owner token ID. Defines the content owner. */
    ownerTokenId: string;
    /** The resolved owner. */
    owner?: User | undefined;
    /** Content type. */
    contentType: ContentType;
    /** Contains language specific display values. They are calculated values based on the template stored in the Content schema DisplayPatterns property. */
    displayValues?: DisplayValueDictionary | undefined;
    /** The actual lifecycle value of the content. Becomes Inactive when the content is deleted. */
    lifeCycle: LifeCycle;
    /** List of content rights the user has on this content */
    contentRights?: ContentRight[] | undefined;
    /** Activity information: dynamically mapped from configured metadata fields or from audit information if no mapping is configured. */
    activity?: Activity | undefined;
    /** The number of historized versions of the content. Contains null if
(i) not requested by using HistoricVersionCount resolve behavior,
(ii) user lacks ManageHistoricVersions right on the content,
(iii) user lacks ManageContent user right,
(iv) historic versioning is disabled or
(v) content is a virtual item (ContentType is Virtual). */
    historicVersionCount?: number | undefined;
}
/** Output */
export interface Output {
    /** The ID of the output. Can be null for dynamic outputs which are not rendered yet. */
    id?: string | undefined;
    /** The ID of the output format this output represents. */
    outputFormatId: string;
    /** The ID of the content for which this output has been created. */
    contentId: string;
    /** The rendering state of the output file. */
    renderingState: OutputRenderingState;
    /** Detail of the output that are format dependent. */
    detail?: OutputDataBase | undefined;
    /** Date and time of the backup of the output file. */
    backupTimestamp?: Date | undefined;
    /** Number of rendering retry attempts left. */
    attemptsLeft: number;
    /** Version counter incremented every time this output is rendered (or in case of Original when new original is uploaded). */
    fileVersion: number;
    /** Whether this Output belongs to a dynamic OutputFormat */
    dynamicRendering: boolean;
    kind: string;
}
export declare enum OutputRenderingState {
    InProgress,
    Completed,
    Failed,
    Skipped,
    NoLicense,
    RerenderRequested
}
/** Base class for the output detail dependent on the file format. */
export interface OutputDataBase {
    /** The extension of the file. */
    fileExtension?: string | undefined;
    /** The path where the file is stored. */
    filePath?: string | undefined;
    /** The size of the file in bytes. */
    fileSizeInBytes?: number | undefined;
    /** The SHA-1 hash of the file. */
    sha1Hash?: string | undefined;
    /** The original filename of the file. */
    originalFileName?: string | undefined;
    kind: string;
}
/** Output information for an image file. */
export interface OutputDataImage extends OutputDataBase {
    /** The width of the image. */
    width?: number;
    /** The height of the image. */
    height?: number;
}
/** Output information for an audio file. */
export interface OutputDataAudio extends OutputDataBase {
    /** Duration of the audio stream in seconds. */
    durationInSeconds?: number | undefined;
}
/** Output information for a video file. */
export interface OutputDataVideo extends OutputDataBase {
    /** Duration of the video in seconds. */
    durationInSeconds?: number;
    /** With of the video. */
    width?: number;
    /** Height of the video. */
    height?: number;
    /** The sprites making up the key frames of the video. */
    sprites?: Sprite[] | undefined;
}
/** The sprite of a video sprite */
export interface Sprite {
    /** The width of the sprite. */
    width: number;
    /** The height of the sprite. */
    height: number;
    /** Y coordinate of the sprite in the saved file. */
    y: number;
    /** X coordinate of the sprite in the saved file. */
    x: number;
    /** The starting point in time of the sprite in the video. */
    start: string;
    /** The ending point in time of the sprite in the video. */
    end: string;
}
/** Output information for a document file. */
export interface OutputDataDocument extends OutputDataBase {
    /** Number of document's pages. */
    pageCount?: number;
}
/** Output information for a vector file. */
export interface OutputDataVector extends OutputDataBase {
}
/** Default output information */
export interface OutputDataDefault extends OutputDataBase {
}
/** Output detail */
export interface OutputDetail extends Output {
}
export interface DisplayValueDictionary {
    [key: string]: string | any;
}
/** Lifecycle */
export declare enum LifeCycle {
    Draft,
    Active,
    Inactive,
    Deleted
}
export interface Activity {
    creationDate?: Date | undefined;
    modificationDate?: Date | undefined;
}
export interface ProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    extensions: {
        [key: string]: any;
    };
}
/** Values that represent thumbnail sizes. */
export declare enum ThumbnailSize {
    Small,
    Medium,
    Large,
    Preview,
    ExtraLarge
}
/** Request to create a content */
export interface ContentCreateRequest {
    /** The ID of the content schema. The SchemaType of the specified schema must be Content.
The schema specifies the structure of the Content dictionary. */
    contentSchemaId: string;
    /** An optional list of IDs of the schemas that form the layers of the content.
The SchemaType of the specified schemas must be Layer. */
    layerSchemaIds?: string[] | undefined;
    /** The content data of the content. It's an object of dynamic metadata whose structure is defined in the Content schema identified by the ContentSchemaId property. */
    content?: any | undefined;
    /** The dynamic data structure matching the field schematics of the schemas with type layer (LayerSchemaIds).
The metadata belonging to the layers of the content. It's a dictionary of dynamic metadata whose structure is defined in the Layer schemas identified
by the LayerSchemaIds property. */
    metadata?: {
        [key: string]: any;
    } | undefined;
    /** An optional list of content permission set IDs which control content permissions. These permissions control content accessibility for the users that do not own the content. */
    contentPermissionSetIds?: string[] | undefined;
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
}
/** Request to update content metadata */
export interface ContentMetadataUpdateRequest {
    /** An optional list of IDs of the schemas that should be updated/replaced based on the options below and Metadata provided.
The SchemaType of the specified schemas must be Layer. */
    layerSchemaIds?: string[] | undefined;
    /** The content data of the content. It's an object of dynamic metadata whose structure is defined in the Content schema identified by
the ContentSchemaId property. Updating the Content property is only possible for virtual items (contents
whose ContentType is Virtual).
Update of content data will be done only if this attribute has any data, i.e. if it's not null or empty. */
    content?: any | undefined;
    /** The dynamic data structure matching the field schematics of the schemas with type layer (LayerSchemaIds).
The metadata belonging to the layers of the content. It's a dictionary of dynamic metadata whose structure is defined in the Layer schemas identified
by the LayerSchemaIds property.
If there are no data for a specified LayerSchemaId, it is treated as empty. */
    metadata?: {
        [key: string]: any;
    } | undefined;
    /** Options to modify the behavior for updating the layers.
Merge: the content is updated so that the assigned layers to the content will be a merge of the ones specified in the LayerSchemaIds property
and the ones already existing; existing assigned layers not specified in the property are kept and missing layers are assigned.
Replace: the content is updated so that only the layers specified in the LayerSchemaIds property are assigned to the content;
existing assigned layers not specified in the property are removed and missing layers are assigned.
Defaults to Merge. */
    layerSchemasUpdateOptions: UpdateOption;
    /** Options to modify the behavior for updating the values of schemas.
Merge: the values specified in the Metadata dictionary are merged to the existing values of the corresponding schema on the content.
Replace: the values specified in the Metadata dictionary entirely replace any existing value of the corresponding schema on the content.
Defaults to Merge. */
    layerFieldsUpdateOptions: UpdateOption;
    /** Options to modify the behavior for updating the content.
Merge: the values specified in the Content object are merged to the existing content.
Replace: the values specified in the Content object entirely replace the content.
Defaults to Merge. */
    contentFieldsUpdateOptions: UpdateOption;
}
/** Controls the update of metadata */
export declare enum UpdateOption {
    Merge,
    Replace
}
/** Request to update the permissions of a content */
export interface ContentPermissionsUpdateRequest {
    /** A list of content permission set IDs which control content permissions that will be updated on the content.
These permissions control content accessibility for the users that do not own the content. */
    contentPermissionSetIds: string[];
}
/** Request to transfer the content ownership */
export interface ContentOwnershipTransferRequest {
    /** The ID of the user to whom the content ownership has to be transferred to. */
    transferUserId: string;
}
/** Result for CheckContentSchemaIdChangeRequest */
export interface CheckContentSchemaIdChangeResult {
    /** List of operations which incur loss of data if carried out */
    problematicChanges?: ContentSchemaChangeException[] | undefined;
    /** List of errors preventing validation of ContentSchema change */
    errors?: CheckContentSchemaIdChangeResultErrorItem[] | undefined;
}
export interface CheckContentSchemaIdChangeResultErrorItem {
    /** Request for which this error occured */
    request?: CheckContentSchemaIdChangeRequestItem | undefined;
    /** Error which occured when trying to check ContentSchema change (e.g. ContentNotFoundException or ContentPermissionException) */
    exception?: PictureparkException | undefined;
}
/** Change of ContentSchemaId to check */
export interface CheckContentSchemaIdChangeRequestItem {
    /** Content for which to check a ContentSchemaId change */
    contentId?: string | undefined;
    /** ContentSchemaId to change to */
    newContentSchemaId?: string | undefined;
}
/** Request to check if given changes to ContentSchemaId are possible without data loss due to restrictions (LayerSchemaIds) on assigned metadata */
export interface CheckContentSchemaIdChangeRequest {
    /** Operations which should be checked */
    requests?: CheckContentSchemaIdChangeRequestItem[] | undefined;
}
export interface ContentFileUpdateRequestBase {
    /** ID of the file transfer to use to replace the content file. */
    fileTransferId: string;
}
/** Request to check if update of a content file incurs data loss */
export interface ContentFileUpdateCheckRequest extends ContentFileUpdateRequestBase {
}
/** Request to update a content file */
export interface ContentFileUpdateRequest extends ContentFileUpdateRequestBase {
    /** Whether ContentType is allowed to change. This is needed if the newly uploaded file is of a different type (e.g. ".jpg" is replaced by ".svg") */
    allowContentTypeChange?: boolean;
    /** When enabled, content file update will take place regardless of any layers that are not compatible with updated ContentSchemaId.
For better safety, consider using AcceptableLayerUnassignments instead. */
    allowAnyLayerUnassignment?: boolean;
    /** Allow removal of given Layers from Content if needed. Ignored when AllowAnyLayerUnassignment is enabled. */
    acceptableLayerUnassignments?: string[] | undefined;
}
/** Result to a get content references operation */
export interface ContentReferencesResult {
    /** List of references. Only available when requested in the request. */
    metadataReferences?: MetadataReferenceResult | undefined;
    /** List of share references */
    shareReferences?: ContentShareReferenceResult | undefined;
}
/** Base class for search results */
export interface BaseResultOfMetadataReference {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: MetadataReference[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Result for getting references. */
export interface MetadataReferenceResult extends BaseResultOfMetadataReference {
    /** Indicates if any reference is originating from an item that the current user does not have access to. */
    isReferencedByRestrictedItem?: boolean | undefined;
}
/** Reference to a metadata item */
export interface MetadataReference {
    /** Target ID of reference. */
    targetMetadataItemId: string;
    /** Indicates if the source of the reference is restricted because of permissions.
If this is true and the SourceMetadataItemId property is filled, the user does not have the
edit permission on the source metadata item. If the SourceMetadataItemId is null, the user also
does not have the view permission on that item. */
    isRestricted: boolean;
    /** ID of the source of the reference. */
    sourceMetadataItemId?: string | undefined;
    /** DocType of the source of the reference. */
    sourceDocType?: string | undefined;
}
/** Base class for search results */
export interface BaseResultOfContentShareReference {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: ContentShareReference[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Result class for share reference search */
export interface ContentShareReferenceResult extends BaseResultOfContentShareReference {
}
/** Share information for a share referencing a content */
export interface ContentShareReference {
    /** ID of the share. */
    id?: string | undefined;
    /** Name of the share. */
    name?: string | undefined;
    /** Audit information. */
    audit?: UserAudit | undefined;
    /** Type of the share. */
    shareType: ShareType;
    /** The email address of the user who created the share. */
    emailAddress?: string | undefined;
}
export declare enum ShareType {
    Basic,
    Embed
}
/** Request to get the references to a content */
export interface ContentReferencesRequest {
    /** Limits the number of the returned metadata references by setting paging information. */
    references?: MetadataReferencesPagingRequest | undefined;
    /** Limits the number of the returned share references by setting paging information. */
    shares?: PagingRequest | undefined;
}
/** Request to page data */
export interface PagingRequest {
    /** Limits the number of the returned schemas. Defaults to 0. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
}
/** Request to get paginated metadata references */
export interface MetadataReferencesPagingRequest extends PagingRequest {
    /** Set to true to check if any incoming references are originating from an item the current user does not have full access to. */
    fetchReferencedByRestrictedItem?: boolean;
}
/** Result of output resolution. */
export interface OutputResolveResult {
    /** ID of output. */
    id?: string | undefined;
    /** ID of output format. */
    outputFormatId: string;
    /** ID of content. */
    contentId: string;
    /** Rendering state of output. */
    renderingState: OutputRenderingState;
    /** Whether this Output belongs to a dynamic OutputFormat */
    dynamicRendering: boolean;
    /** Size of file, if already known */
    fileSize?: number | undefined;
}
/** Request to create a content download link */
export interface ContentDownloadLinkCreateRequest {
    /** List of content information to generate the download link */
    contents: ContentDownloadRequestItem[];
    /** Indicates if a progress message shall be shown to the user, notifying once the download is completed. */
    notifyProgress: boolean;
}
/** Information needed to generate a content download link */
export interface ContentDownloadRequestItem {
    /** ID of the content that is going to be downloaded. */
    contentId: string;
    /** ID of the output format that is going to be downloaded. */
    outputFormatId: string;
}
/** Download link information */
export interface DownloadLink {
    /** Token of the download, used to generate the url. */
    downloadToken: string;
    /** Url of the download link. */
    downloadUrl: string;
}
/** Request to create multiple contents */
export interface ContentCreateManyRequest {
    /** Allows creating contents that refer to list items or contents that don't exist in the system. */
    allowMissingDependencies: boolean;
    /** Items to be created. */
    items: ContentCreateRequest[];
}
/** Request to update many contents metadata */
export interface ContentMetadataUpdateManyRequest {
    /** Allows storing references to list items or contents that don't exist in the system. */
    allowMissingDependencies: boolean;
    /** Update items */
    items: ContentMetadataUpdateItem[];
}
/** Item to update content metadata */
export interface ContentMetadataUpdateItem extends ContentMetadataUpdateRequest {
    /** The ID of the content. */
    id: string;
}
/** Request to update multiple contents permissions */
export interface ContentPermissionsUpdateManyRequest {
    /** Content permissions update items */
    items: ContentPermissionsUpdateItem[];
}
/** Content permissions update item */
export interface ContentPermissionsUpdateItem extends ContentPermissionsUpdateRequest {
    /** ID of the content. */
    contentId: string;
}
/** Request to transfer multiple contents ownerships */
export interface ContentOwnershipTransferManyRequest {
    /** List of Content Permissions ownership transfer items. */
    items: ContentOwnershipTransferItem[];
}
/** Content ownership transfer item */
export interface ContentOwnershipTransferItem extends ContentOwnershipTransferRequest {
    /** The content ID. */
    contentId: string;
}
/** Request to delete multiple contents. */
export interface ContentDeleteManyRequest {
    /** IDs of the contents to delete. */
    contentIds: string[];
    /** A value indicating whether references to the contents should be removed. */
    forceReferenceRemoval: boolean;
    /** Create a progress notification and notify on progress. Notifications are shown in the UI only to the same use who triggered the delete request. */
    notifyProgress: boolean;
}
/** Request to delete multiple contents based on a provided filter */
export interface ContentDeleteManyFilterRequest {
    /** Filters the contents that need to be deleted. */
    filterRequest: ContentFilterRequest;
    /** A value indicating whether references to the content items should be removed. */
    forceReferenceRemoval: boolean;
    /** Create a progress notification and notify on progress. Notifications are shown in the UI only to the same use who triggered the delete request. */
    notifyProgress: boolean;
}
export interface ContentFilterRequest {
    /** Limits the simple search fields to the fields available in the specified channel. */
    channelId?: string | undefined;
    /** Only searches the specified language values. Defaults to all metadata languages of the language configuration. */
    searchLanguages?: string[] | undefined;
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
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
export declare enum ContentSearchType {
    Metadata,
    FullText,
    MetadataAndFullText
}
export declare enum LifeCycleFilter {
    ActiveOnly,
    All,
    InactiveOnly,
    ActiveInactiveOnly
}
/** Filter items with broken or not broken dependencies */
export declare enum BrokenDependenciesFilter {
    All,
    NotBrokenOnly,
    BrokenOnly
}
/** Request to restore multiple contents */
export interface ContentRestoreManyRequest {
    /** IDs of the contents to restore. */
    contentIds: string[];
    /** Allows creating contents that refer to list items or contents that don't exist in the system. */
    allowMissingDependencies: boolean;
}
/** Request to get multiple contents' references */
export interface ContentManyReferencesRequest {
    /** The IDs of the contents whose references need to be retrieved. */
    contentIds: string[];
    /** Limits the number of the returned metadata references by setting paging information. */
    references?: MetadataReferencesPagingRequest | undefined;
    /** Limits the number of the returned share references by setting paging information. */
    shares?: PagingRequest | undefined;
}
/** Resolves outputs available for given content ids. */
export interface OutputResolveManyRequest {
    /** The IDs of the contents whose outputs should to be retrieved. */
    contentIds: string[];
}
export interface ContentRepairRequestBase {
    /** Settings to use if no specific settings for a requested Content were specified */
    defaultSettings?: ContentRepairSettings | undefined;
    kind: string;
}
export interface ContentRepairByFilterRequest extends ContentRepairRequestBase {
    /** Filter used to enumerate Contents to repair */
    filter: ContentFilterRequest;
    /** Settings for specific contents (overwrites DefaultSettings) */
    repairSettingOverrides?: ContentRepairRequestItem[] | undefined;
}
export interface ContentRepairRequestItem {
    /** Content to repair */
    contentId: string;
    /** Options for this repair */
    settings?: ContentRepairSettings | undefined;
}
export interface ContentRepairSettings {
    /** List of layers that can be unassigned (due to change of ContentSchemaId and LayerSchemaIds) */
    acceptableLayerUnassignments?: string[] | undefined;
    /** Whether to enforce XmpWriteback for Outputs of Content (ignored if repair was not performed) */
    forceInvalidateXmpWriteback: boolean;
}
export interface ContentRepairBatchRequest extends ContentRepairRequestBase {
    /** List of contents and options for repair */
    items?: ContentRepairRequestItem[] | undefined;
}
/** Base class for the content metadata batch requests. */
export interface MetadataValuesChangeRequestBase {
    /** Changes that need to be applied to the existing content metadata. The same set of changes is applied to all contents. */
    changeCommands: MetadataValuesChangeCommandBase[];
    /** Allows updating contents with references to list items or contents that do not exist in the system. */
    allowMissingDependencies: boolean;
    /** Create a progress notification and notify on progress. Notifications are shown in the UI only to the same use who triggered the batch update. */
    notifyProgress: boolean;
    kind: string;
}
/** Request to batch update contents' fields based on content IDs */
export interface ContentFieldsBatchUpdateRequest extends MetadataValuesChangeRequestBase {
    /** The IDs of the contents whose fields need to be updated. */
    contentIds: string[];
}
/** The base class for metadata value change commands. */
export interface MetadataValuesChangeCommandBase {
    /** The ID of the schema to which the operation scope is addressed. */
    schemaId: string;
    kind: string;
}
/** Updates schema values */
export interface MetadataValuesSchemaUpdateCommand extends MetadataValuesChangeCommandBase {
    /** An object containing the metadata values to add / update. */
    value: any;
}
/** Adds or updates schema values */
export interface MetadataValuesSchemaUpsertCommand extends MetadataValuesChangeCommandBase {
    /** An object containing the metadata values to add / update. */
    value: any;
}
/** Removes schema and all its values */
export interface MetadataValuesSchemaRemoveCommand extends MetadataValuesChangeCommandBase {
}
/** Replaces schema values */
export interface MetadataValuesSchemaReplaceCommand extends MetadataValuesChangeCommandBase {
    /** An object containing the metadata values for the schema. The existing dictionary will be entirely overwritten. */
    value: any;
}
/** Removes a field and its value from the values of the specified schema */
export interface MetadataValuesFieldRemoveCommand extends MetadataValuesChangeCommandBase {
    /** The path of the field to be removed within the specified schema (i.e. remove the street from the address of a person: fieldPath = "address.streetName", schemaId = "PersonLayer") */
    fieldPath: string;
}
/** Adds a list item to a FieldMultiTagbox field */
export interface MetadataValuesSchemaItemAddCommand extends MetadataValuesChangeCommandBase {
    /** The path of the field relative to the Content or Layer schema values defined by the schemaId property.
(i.e. add a team (existing list item) to the work information of a person: fieldPath = "workInfo.teams", schemaId = "PersonLayer"). */
    fieldPath: string;
    /** The field namespace */
    fieldNamespace: string;
    /** The ID of the list item to be added. */
    referenceId: string;
}
/** Removes a list item from a FieldMultiTagbox field */
export interface MetadataValuesSchemaItemRemoveCommand extends MetadataValuesChangeCommandBase {
    /** The path of the field relative to the Content or Layer schema values defined by the schemaId property.
(i.e. add a team (existing list item) to the work information of a person: fieldPath = "workInfo.teams", schemaId = "PersonLayer"). */
    fieldPath: string;
    /** The field namespace. */
    fieldNamespace: string;
    /** The ID of the list item to be removed. */
    referenceId: string;
}
/** Request to batch update contents' fields based on a filter */
export interface ContentFieldsBatchUpdateFilterRequest extends MetadataValuesChangeRequestBase {
    /** Filters the contents on which the change commands must be applied. */
    filterRequest: ContentFilterRequest;
}
/** Base class for search results */
export interface BaseResultOfContent {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Content[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfContent extends BaseResultOfContent {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorWithAggregationBaseResultOfContent extends SearchBehaviorBaseResultOfContent {
    /** Results of the aggregation, if any aggregators was passed in the request. */
    aggregationResults?: AggregationResult[] | undefined;
}
/** Result for content search operation */
export interface ContentSearchResult extends SearchBehaviorWithAggregationBaseResultOfContent {
    /** Result of rights aggregation count requested in rightsAggregations in the ContentSearchRequest. */
    rightsAggregationsCounts?: ContentRightAggregationCount[] | undefined;
}
/** Combination of ContentRight and found document count */
export interface ContentRightAggregationCount {
    /** ContentRight. */
    contentRight: ContentRight;
    /** Found document count. */
    count: number;
}
export interface Content {
    /** Audit information. */
    audit?: UserAudit | undefined;
    /** The id of the schema with schema type content. */
    contentSchemaId: string;
    /** The content type of this content. All except Virtual are binary files. */
    contentType: ContentType;
    /** An optional id list of schemas with schema type layer. */
    layerSchemaIds?: string[] | undefined;
    /** Contains display values of the specified language, rendered according to the content schema's display pattern configuration. */
    displayValues: {
        [key: string]: string;
    };
    id: string;
    /** All the ids of the broken references (tagboxes) */
    brokenReferenceIds?: string[] | undefined;
    /** All the ids of the broken indirect references (tagbox that has a property that reference a broken tagbox) */
    brokenIndirectReferenceIds?: string[] | undefined;
    /** All the target ids of the broken relations */
    brokenRelationTargetIds?: string[] | undefined;
    /** Life cycle of content */
    lifeCycle: LifeCycle;
    /** List of content rights the user has on this content. Values are returned only if related resolve behavior is requested in the search request. */
    contentRights?: ContentRight[] | undefined;
}
/** Request to aggregate contents based on the aggregators defined on a channel */
export interface ContentAggregationOnChannelRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Special filters used to filter down independently the aggregations' values and the search results on specific conditions.
For the search results, the aggregation filters are used to create a Filter that is put in AND with the eventual existing Filter of the search request to nail down the search results. The filters generated
by the aggregation filters are put in OR each other if they have the same AggregationName, and then such groups are put in AND.
For the aggregation values, only the original Filter of the search request is used to nail down the data to be considered for the aggregations. Then, on top of that, for each aggregator in the search request, a Filter is created to filter down the
aggregation results of that aggregation: depending if the AggregationName of the AggregationFilter matches the AggregationName of the Aggregator, the filter is put in OR (if it matches) or in AND (if it does not match it).
Moreover, an AggregationFilter ensures that the related value is returned in the AggregationResults also if the top aggregation values returned by default do not contain it. */
    aggregationFilters?: AggregationFilter[] | undefined;
    /** Limits the simple search fields to the fields available in the specified channel. Defaults to RootChannel.
For the ContentAggregationOnChannelRequest only, the existing aggregation saved on the channel are retrieved and used to perform the aggregation. */
    channelId?: string | undefined;
    /** When searching in multi language fields, limit the searchable fields to the ones corresponding to the specified languages.
If not specified, all metadata languages defined in the system are used. */
    searchLanguages?: string[] | undefined;
    /** Limit the search to the contents belonging to the specified collection. */
    collectionId?: string | undefined;
    /** Limits the aggregation to the contents that have the specified life cycle state. Defaults to ActiveOnly. */
    lifeCycleFilter: LifeCycleFilter;
    /** Limits the aggregation to the contents that have or not have broken references. By default it includes both. */
    brokenDependenciesFilter: BrokenDependenciesFilter;
    /** Type of search to be performed: search only in metadata, only in the extracted fulltext from the file or both. Default to Metadata. */
    searchType: ContentSearchType;
}
/** Request to search contents */
export interface ContentSearchRequest extends ContentAggregationOnChannelRequest {
    /** Limits the display values included in the search response. Defaults to all display values. */
    displayPatternIds?: string[] | undefined;
    /** Sorts the search results. Sorting on a field not marked as Sortable in the Content schema will throw an exception. */
    sort?: SortInfo[] | undefined;
    /** Limits the document count of the result set. */
    limit?: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Limits the contents to the ones the user has the specified ContentRights. */
    rightsFilter?: ContentRight[] | undefined;
    /** Returns the aggregated document counts to the ones the user has the specified ContentRights.
Produces the rightsAggregationCounts on the ContentSearchResult. View will be ignored as the totalResults already gives this information. */
    rightsAggregations?: ContentRight[] | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the ContentSearchResult.
Warning! It severely affects performance. */
    debugMode?: boolean;
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators?: AggregatorBase[] | undefined;
    /** List of enums that allow additional resolutions on top of the standard Content result */
    resolveBehaviors?: ContentSearchResolveBehavior[] | undefined;
}
/** Enum that allow additional resolutions on top of the standard Content result */
export declare enum ContentSearchResolveBehavior {
    Permissions
}
/** Result for an aggregation operation */
export interface ObjectAggregationResult {
    /** How long did the search and aggregation took. */
    elapsedMilliseconds: number;
    /** Results of the aggregation. */
    aggregationResults: AggregationResult[];
    /** Search string used to query the data */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Request to aggregate contents based on the specified aggregators */
export interface ContentAggregationRequest extends ContentAggregationOnChannelRequest {
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators: AggregatorBase[];
}
/** Base class for search results */
export interface BaseResultOfHistoricVersion {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: HistoricVersion[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
export interface HistoricVersionSearchResult extends BaseResultOfHistoricVersion {
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
export interface HistoricVersion {
    /** Sequential version number. */
    versionNumber: number;
    /** Content ID. */
    contentId?: string | undefined;
    /** The datetime when this version was replaced. */
    replaced: Date;
    /** User who replaced this version. */
    user?: User | undefined;
    /** File name for this version. */
    fileName?: string | undefined;
    /** True if this version was created by XMP writeback (as the version without the mutation). */
    createdByXmpWriteback: boolean;
    /** ID of the original output associated with this version. */
    originalOutputId?: string | undefined;
}
export interface HistoricVersionSearchRequest {
    /** Will exclude the historic versions that were created by XMP writeback */
    excludeXmpWritebackGenerated: boolean;
    /** Limits the document count of the result set. Defaults to 30. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the BusinessProcessSearchResult.
Warning! It severely affects performance. */
    debugMode: boolean;
}
export interface CommentEditable {
    /** Text of the comment message. */
    message: string;
}
/** Represents a comment */
export interface Comment extends CommentEditable {
    /** Comment ID. */
    id: string;
    /** ID of the content this comment is on. */
    contentId: string;
    /** ID of the parent comment, in case this comment is a reply. */
    parentId?: string | undefined;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
export interface CommentCreateRequest extends CommentEditable {
    /** ID of the parent comment, in case the comment should be a reply. */
    parentId?: string | undefined;
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
}
/** Base class for search results */
export interface BaseResultOfComment {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Comment[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
export interface CommentSearchResult extends BaseResultOfComment {
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
export interface CommentSearchRequest {
    /** Limits the document count of the result set. Defaults to 30. */
    limit: number;
    /** If set to true, the result set will be sorted in an ascending order based on time of when which comment was originally created, replies will be always in descending order.
If false, the result set will be sorted in a descending order of when which comment was originally created. */
    ascending: boolean;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the CommentSearchResult.
Warning! It severely affects performance. */
    debugMode: boolean;
}
/** Base class for search results */
export interface BaseResultOfConversionPresetTemplate {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: ConversionPresetTemplate[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfConversionPresetTemplate extends BaseResultOfConversionPresetTemplate {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Holds results of the conversion preset template search */
export interface ConversionPresetTemplateSearchResult extends SearchBehaviorBaseResultOfConversionPresetTemplate {
}
/** Holds information needed for conversion preset template update. */
export interface ConversionPresetTemplateUpdateRequest {
    /** Language specific names. */
    names: TranslatedStringDictionary;
    /** Language specific descriptions. */
    descriptions?: TranslatedStringDictionary | undefined;
    /** The template for the conversion. */
    template?: string | undefined;
}
/** Represents a conversion preset template */
export interface ConversionPresetTemplate extends ConversionPresetTemplateUpdateRequest {
    /** Conversion preset template ID. */
    id: string;
    /** The output format ID to which the conversion preset template is associated. */
    outputFormatId: string;
}
/** Conversion preset templates search request */
export interface ConversionPresetTemplateSearchRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Fields and respective directions requested to sort the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
    /** Limits the document count of the result set. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
    debugMode: boolean;
    /** When searching in multi language fields, limit the searchable fields to the ones corresponding to the specified languages.
If not specified, all metadata languages defined in the system are used. */
    searchLanguages?: string[] | undefined;
}
/** Represents the detail of a conversion preset template */
export interface ConversionPresetTemplateDetail extends ConversionPresetTemplate {
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
/** Holds information needed for conversion preset template creation */
export interface ConversionPresetTemplateCreateRequest extends ConversionPresetTemplateUpdateRequest {
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
    /** The output format ID to which the conversion preset template is associated */
    outputFormatId: string;
}
/** Used to create multiple new conversion preset templates at once. */
export interface ConversionPresetTemplateCreateManyRequest {
    /** Conversion preset templates items to be created. */
    items?: ConversionPresetTemplateCreateRequest[] | undefined;
}
/** Used to modify multiple conversion preset templates at once. */
export interface ConversionPresetTemplateUpdateManyRequest {
    /** Conversion preset templates items to be modified. */
    items?: ConversionPresetTemplateUpdateManyRequestItem[] | undefined;
}
/** Represents one item to be modified in a bulk update operation on conversion preset templates. */
export interface ConversionPresetTemplateUpdateManyRequestItem extends ConversionPresetTemplateUpdateRequest {
    /** ID of the conversion preset templates to modify. */
    id?: string | undefined;
}
/** Used to remove multiple conversion preset templates at once. */
export interface ConversionPresetTemplateDeleteManyRequest {
    /** List of IDs of conversion preset templates to remove. */
    ids?: string[] | undefined;
}
export interface DisplayValueStatus {
    /** The schema ids (of type Content or Layer) for which the re-rendering of the display values is needed. */
    contentOrLayerSchemaIds?: string[] | undefined;
    /** The schema ids (of type List) for which the re-rendering of the display values is needed. */
    listSchemaIds?: string[] | undefined;
    /** The state of the display values compared to the schema structure (UpToDate = ok, Outdated = re-rendering needed). */
    state: DisplayValuesState;
}
export declare enum DisplayValuesState {
    UpToDate,
    Outdated,
    RerenderingInProgress
}
export interface DocumentHistory {
    documentId?: string | undefined;
    documentVersion: number;
    documentType?: string | undefined;
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
export declare enum DocumentChangeAction {
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
    /** Contains an RFC 6902 compatible patch that can be applied on the old document to get the new document.
Use a library like jsondiffpatch.net (https://github.com/wbish/jsondiffpatch.net)
or jsondiffpatch (https://github.com/benjamine/jsondiffpatch) to process this. */
    patch?: any | undefined;
}
export interface DocumentHistorySearchResult {
    /** The upper bound of the total number of matching documents. */
    maxResults: number;
    /** The matched documents. */
    results: DocumentHistory[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
export interface DocumentHistorySearchRequest {
    /** Limits the start date of the search request. By default no limitation set. */
    from: Date;
    /** Limits the end date of the search request. By default no limitation set. */
    to: Date;
    /** Limits the document count of the result set. Defaults to 30. */
    limit: number;
    /** To get a large amount of data, page token returned from the response can be used to get all data. */
    pageToken?: string | undefined;
    /** Limits the search to a specific document ID. E.g. contentId */
    documentId?: string | undefined;
    /** The document version to search. Default to -1 to not limit to a specific document version. */
    documentVersion: number;
    /** Limits the search to a specific document type. */
    documentType?: string | undefined;
    /** Sorts the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
}
export interface IdentityProviderEditable {
    /** Mapping of identity provider claims to user attributes */
    claimMapping?: IdpClaimToUserAttributeMapping[] | undefined;
    /** Name of the identity provider claim that holds group membership information */
    groupClaimType?: string | undefined;
    /** IdP (AD) group to user role ID mapping */
    groupMapping?: IdpGroupToUserRoleMapping[] | undefined;
    /** Optional user role ID that will be assigned to a user is none of the group mappings produce a match */
    fallbackUserRoleId?: string | undefined;
}
/** Represents an identity provider defined in IdentityServer and its Picturepark configuration */
export interface IdentityProvider extends IdentityProviderEditable {
    /** Identity provider ID (has to match an existing IdP defined in IdentityServer) */
    id?: string | undefined;
    /** Name of the identity provider as defined in IdentityServer */
    name?: string | undefined;
    /** Display name of the identity provider as defined in IdentityServer */
    displayName?: string | undefined;
}
export interface IdpClaimToUserAttributeMapping {
    /** Claim type name coming from external identity provider */
    claimType?: string | undefined;
    /** Path to a user attribute to synchronize */
    userAttributePath?: string | undefined;
}
export interface IdpGroupToUserRoleMapping {
    /** Name of the group on external identity provider */
    group?: string | undefined;
    /** User role ID as defined in CP */
    userRoleId?: string | undefined;
}
/** Basic information about an identity provider */
export interface IdentityProviderBasicInfo {
    /** Identity provider ID (has to match an existing IdP defined in IdentityServer) */
    id?: string | undefined;
    /** Name of the identity provider as defined in IdentityServer */
    name?: string | undefined;
    /** Display name of the identity provider as defined in IdentityServer */
    displayName?: string | undefined;
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
/** Customer configuration information */
export interface CustomerInfo {
    /** The customer ID. */
    customerId: string;
    /** The name of the customer instance. */
    name: string;
    /** Alias of the customer instance. */
    customerAlias: string;
    /** The base URL of identity server to authenticate the user using OpenID Connect. */
    identityServerUrl: string;
    /** The base API URL. */
    apiUrl: string;
    /** Information if the query details can be enabled when searching. For debug purposes only. */
    enableQueryDetails: boolean;
    /** Configured languages of customer instance (system, metadata, share, default). */
    languageConfiguration: LanguageConfigurationInfo;
    /** Languages including translations for the configured system and metadata and share languages. */
    languages: Language[];
    /** Configured rendering outputs including translations for the customer instance. */
    outputFormats: OutputFormatInfo[];
    /** Boost levels that can be applied to a metadata field to boost the the significance of the field in a search operation. */
    boostValues: number[];
    /** Apps registered for this customer */
    apps?: CustomerApp[] | undefined;
    modificationDate: Date;
    /** Url to access Frontend service */
    baseUrl: string;
    /** Base bath to access logos of customer (including trailing slash), available images: name, full, small, background */
    logosUrl: string;
    /** License options and states */
    licenseInformation: LicenseInfo;
    /** Customer settings */
    settings: CustomerInfoSettings;
    /** True if a dashboard overview template is available. */
    hasDashboard: boolean;
}
export interface LanguageConfiguration {
    /** A list of languages serving as system languages. */
    systemLanguages: string[];
    /** A list of languages serving as metadata languages. */
    metadataLanguages: string[];
    /** The default language. Not the be confused with the metadata fallback language x-default. */
    defaultLanguage: string;
}
export interface LanguageConfigurationInfo extends LanguageConfiguration {
    /** Share languages based on defined ShareMail templates. */
    shareLanguages: string[];
}
export interface Language {
    /** Language translations. */
    name: TranslatedStringDictionary;
    /** IETF language tag. E.g en, en-US, de. */
    ietf: string;
    /** Two letter ISO language code. E.g. en, de. */
    twoLetterISOLanguageName?: string | undefined;
    /** Three letter ISO language code. E.g. eng, deu. */
    threeLetterISOLanguageName?: string | undefined;
    /** Region code of the language. E.g. US, DE, CH. */
    regionCode?: string | undefined;
}
export interface OutputFormatInfo {
    /** Output ID. */
    id: string;
    /** Output translations. */
    names: TranslatedStringDictionary;
}
export interface CustomerApp {
    appId?: string | undefined;
    name?: TranslatedStringDictionary | undefined;
    description?: TranslatedStringDictionary | undefined;
    icon?: string | undefined;
}
/** Customer license information */
export interface LicenseInfo {
    /** State of content historic versioning */
    historicVersioningState: HistoricVersioningState;
    /** State of statistics features for Content */
    contentStatistics: StatisticsLicenseState;
    /** Licensing options for image optimization. */
    imageOptimization: ImageOptimizationLicenseState;
}
export declare enum HistoricVersioningState {
    Disabled,
    Suspended,
    Enabled
}
export interface StatisticsLicenseState {
    /** Defines whether the respective statistics are gathered periodically */
    collection: boolean;
    /** Allows or prevents access to read endpoints */
    read: boolean;
    /** Allows or prevents access to write endpoints */
    write: boolean;
    /** Allows or prevents export of the respective statistics */
    export: boolean;
}
export interface ImageOptimizationLicenseState {
    /** Whether image optimization can be used when delivering embeds. */
    embedDelivery: boolean;
    /** Whether edit output endpoint is available in API. */
    apiOutputEditing: boolean;
}
/** Customer settings within customer information */
export interface CustomerInfoSettings {
    /** Default expiration time span as number of milliseconds that will be applied as default by the UI when creating a new Share */
    uiDefaultShareExpirationTime?: number | undefined;
    /** Prefix to be used for the zip file created when downloading multiple contents */
    downloadPrefixName: string;
}
export interface SystemStatus {
    /** The status of the search indices. */
    searchIndicesStatus?: StatusOfSearchIndexState[] | undefined;
    /** The status of the display values. */
    displayValuesStatus?: StatusOfDisplayValuesState[] | undefined;
    /** The status of the contents and list items. */
    metadataStatus?: StatusOfMetadataState[] | undefined;
}
export interface StatusOfSearchIndexState {
    id?: string | undefined;
    state: SearchIndexState;
}
export declare enum SearchIndexState {
    Green,
    Yellow,
    Red
}
export interface StatusOfDisplayValuesState {
    id?: string | undefined;
    state: DisplayValuesState;
}
export interface StatusOfMetadataState {
    id?: string | undefined;
    state: MetadataState;
}
/** The state of the contents and list items */
export declare enum MetadataState {
    UpToDate,
    Outdated,
    UpdateInProgress
}
/** List item detail */
export interface ListItemDetail {
    /** The list item ID. */
    id: string;
    /** The ID of the content schema. The SchemaType of the specified schema must be List. */
    contentSchemaId: string;
    /** The content data of the list item. It's an object of dynamic metadata whose structure is defined in the Content schema specified
by the ContentSchemaId property. */
    content?: any | undefined;
    /** Contains language specific display values. They are calculated values based on the template stored in the Content schema DisplayPatterns property. */
    displayValues?: DisplayValueDictionary | undefined;
    /** All the IDs of the referenced list items (tagboxes) that do not exist in the system. */
    brokenReferenceIds?: string[] | undefined;
    /** All the IDs of the contents or list items target of a relation that do not exist in the system. */
    brokenRelationTargetIds?: string[] | undefined;
    /** All the IDs of the indirectly referenced list items (tagboxes) that do not exist in the system.
They are referenced list items that reference at least a list item that do not exist in the system. */
    brokenIndirectReferenceIds?: string[] | undefined;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
    /** Activity information: dynamically mapped from configured metadata fields or from audit information if no mapping is configured. */
    activity?: Activity | undefined;
}
/** Request to update an existing list item */
export interface ListItemUpdateRequest {
    /** The content data of the list item. It's an object of dynamic metadata whose structure is defined in the Content schema of the list item. */
    content?: any | undefined;
    /** Options to modify the behavior for updating the content.
Merge: the values specified in the Content object are merged to the existing content.
Replace: the values specified in the Content object entirely replace any existing content.
Defaults to Merge. */
    contentFieldsUpdateOptions: UpdateOption;
}
/** Result from getting references to list items. */
export interface ListItemReferencesResult {
    /** List of references. Only available when requested in the request. */
    metadataReferences?: MetadataReferenceResult | undefined;
}
/** Request to get the references to a list item */
export interface ListItemReferencesRequest {
    /** Limits the number of the returned metadata references by setting paging information. */
    references?: MetadataReferencesPagingRequest | undefined;
}
/** Request to create a list item */
export interface ListItemCreateRequest {
    /** The ID of the content schema. The SchemaType of the specified schema must be List. */
    contentSchemaId: string;
    /** The content data of the list item. It's an object of dynamic metadata whose structure is defined in the Content schema. */
    content?: any | undefined;
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
}
/** Request to create multiple list items */
export interface ListItemCreateManyRequest {
    /** Allows creating list items that refer to list items or contents that don't exist in the system. */
    allowMissingDependencies: boolean;
    /** Items to be created. */
    items: ListItemCreateRequest[];
}
/** Request to update multiple list items */
export interface ListItemUpdateManyRequest {
    /** Allows updating list items with references to list items or contents that don't exist in the system. */
    allowMissingDependencies: boolean;
    /** Items to be updated. */
    items: ListItemUpdateItem[];
}
export interface ListItemUpdateItem extends ListItemUpdateRequest {
    /** The list item id. */
    id: string;
}
/** Request to delete multiple list items */
export interface ListItemDeleteManyRequest {
    /** IDs of the list items to delete. */
    listItemIds: string[];
    /** A value indicating whether references to the list item should be removed. */
    forceReferenceRemoval: boolean;
    /** Create a progress notification and notify on progress. Notifications are shown in the UI only to the same use who triggered the delete request. */
    notifyProgress: boolean;
}
/** Request to delete multiple list items based on a provided filter */
export interface ListItemDeleteManyFilterRequest {
    /** Filters the list items that need to be deleted. */
    filterRequest: ListItemFilterRequest;
    /** A value indicating whether references to the list item should be removed. */
    forceReferenceRemoval: boolean;
    /** Create a progress notification and notify on progress. Notifications are shown in the UI only to the same use who triggered the delete request. */
    notifyProgress: boolean;
}
/** Request to filter list items */
export interface ListItemFilterRequest {
    /** The string used to query the data. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional filter to limit the list items. */
    filter?: FilterBase | undefined;
    /** Broadens the search to include all schema descendant list items. */
    includeAllSchemaChildren: boolean;
    /** Limits the search among the list items of the provided schemas. */
    schemaIds?: string[] | undefined;
    /** When searching in multi language fields, limit the searchable fields to the ones corresponding to the specified languages.
If not specified, all metadata languages defined in the system are used. */
    searchLanguages?: string[] | undefined;
    /** Limits the search to the list items that have or not have broken references. By default it includes both. */
    brokenDependenciesFilter: BrokenDependenciesFilter;
}
/** Request to restore multiple deleted list items */
export interface ListItemRestoreManyRequest {
    /** The IDs of the list items to restore. */
    listItemIds: string[];
    /** Allows restoring list items that refer to list items or contents that don't exist in the system. */
    allowMissingDependencies: boolean;
}
/** Request to get the references to multiple list items */
export interface ListItemManyReferencesRequest {
    /** The IDs of the list items whose references need to be retrieved. */
    listItemIds: string[];
    /** Limits the number of the returned metadata references by setting paging information. */
    references?: MetadataReferencesPagingRequest | undefined;
}
/** Request to batch update list items' fields based on list item IDs */
export interface ListItemFieldsBatchUpdateRequest {
    /** The ids of the list items whose fields need to be updated. */
    listItemIds: string[];
    /** Changes that need to be applied to the existing list items. The same set of changes is applied to all list items. */
    changeCommands: MetadataValuesChangeCommandBase[];
    /** Allows updating list items with references to list items or contents that do not exist in the system. */
    allowMissingDependencies: boolean;
    /** Create a progress notification and notify on progress. Notifications are shown in the UI only to the same use who triggered the batch update. */
    notifyProgress: boolean;
}
/** Request to batch update list items' fields based on a filter */
export interface ListItemFieldsBatchUpdateFilterRequest {
    /** Filters the list items on which the change commands must be applied. */
    filterRequest: ListItemFilterRequest;
    /** Changes that need to be applied to the existing list items. The same set of changes is applied to all list items. */
    changeCommands: MetadataValuesChangeCommandBase[];
    /** Allow updating list items with references to list items or contents that do not exist in the system. */
    allowMissingDependencies: boolean;
    /** Create a progress notification and notify on progress. Notifications are shown in the UI only to the same use who triggered the batch update. */
    notifyProgress: boolean;
}
/** Base class for search results */
export interface BaseResultOfListItem {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: ListItem[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfListItem extends BaseResultOfListItem {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorWithAggregationBaseResultOfListItem extends SearchBehaviorBaseResultOfListItem {
    /** Results of the aggregation, if any aggregators was passed in the request. */
    aggregationResults?: AggregationResult[] | undefined;
}
/** Result for list item search operation */
export interface ListItemSearchResult extends SearchBehaviorWithAggregationBaseResultOfListItem {
}
export interface ListItem {
    /** Audit information. */
    audit?: UserAudit | undefined;
    /** The list item id. */
    id: string;
    /** The id of the schema with schema type list. */
    contentSchemaId: string;
    /** Contains language specific display values, rendered according to the list schema's display pattern configuration. */
    displayValues?: DisplayValueDictionary | undefined;
    /** The content data of the list item. */
    content?: any | undefined;
    /** All the ids of the broken references (tagboxes) */
    brokenReferenceIds?: string[] | undefined;
    /** All the target ids of the broken relations */
    brokenRelationTargetIds?: string[] | undefined;
    /** All the ids of the broken indirect references (tagbox that has a property that reference a broken tagbox) */
    brokenIndirectReferenceIds?: string[] | undefined;
    /** LifeCycle of list item */
    lifeCycle: LifeCycle;
}
/** Request to aggregate list items */
export interface ListItemSearchAndAggregationBaseRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Special filters used to filter down independently the aggregations' values and the search results on specific conditions.
For the search results, the aggregation filters are used to create a Filter that is put in AND with the eventual existing Filter of the search request to nail down the search results. The filters generated
by the aggregation filters are put in OR each other if they have the same AggregationName, and then such groups are put in AND.
For the aggregation values, only the original Filter of the search request is used to nail down the data to be considered for the aggregations. Then, on top of that, for each aggregator in the search request, a Filter is created to filter down the
aggregation results of that aggregation: depending if the AggregationName of the AggregationFilter matches the AggregationName of the Aggregator, the filter is put in OR (if it matches) or in AND (if it does not match it).
Moreover, an AggregationFilter ensures that the related value is returned in the AggregationResults also if the top aggregation values returned by default do not contain it. */
    aggregationFilters?: AggregationFilter[] | undefined;
    /** Broadens the search to include all schema descendant list items. */
    includeAllSchemaChildren: boolean;
    /** Limits the aggregation to the list items that have or not have broken references. By default it includes both. */
    brokenDependenciesFilter: BrokenDependenciesFilter;
    /** Limits the search among the list items of the provided schemas. */
    schemaIds?: string[] | undefined;
    /** When searching in multi language fields, limit the searchable fields to the ones corresponding to the specified languages.
If not specified, all metadata languages defined in the system are used. */
    searchLanguages?: string[] | undefined;
    /** Limits the aggregation to the list items that have the specified life cycle state. Defaults to ActiveOnly. */
    lifeCycleFilter: LifeCycleFilter;
}
/** Request to search list items */
export interface ListItemSearchRequest extends ListItemSearchAndAggregationBaseRequest {
    /** Fields and respective directions requested to sort the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
    /** Limits the document count of the result set. */
    limit?: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the ListItemSearchResult.
Warning! It severely affects performance. */
    debugMode?: boolean;
    /** List of enums that control which parts of the list item are resolved and returned. */
    resolveBehaviors?: ListItemResolveBehavior[] | undefined;
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators?: AggregatorBase[] | undefined;
}
/** Request to aggregate list items */
export interface ListItemAggregationRequest extends ListItemSearchAndAggregationBaseRequest {
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators: AggregatorBase[];
}
/** Base class for search results */
export interface BaseResultOfLiveStream {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: LiveStream[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Results of live stream search. */
export interface LiveStreamSearchResult extends BaseResultOfLiveStream {
}
export interface LiveStream {
    id: string;
    document?: string | undefined;
    scopeType?: string | undefined;
    timestamp: Date;
    traceJob?: LiveStreamTraceJob | undefined;
    audit?: UserAudit | undefined;
}
export interface LiveStreamTraceJob {
    traceJobId?: string | undefined;
    ipAddress?: string | undefined;
    userId?: string | undefined;
    apiClientId?: string | undefined;
}
export interface LiveStreamSearchRequest {
    /** Sets the start date and time for results based on Timestamp attribute. */
    from: Date;
    /** Sets the end date and time for results based on Timestamp attribute. */
    to: Date;
    /** Optionally limits the result to only the specified scope type. */
    scopeType?: string | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Limits the document count of the result set. Defaults to 30. */
    limit: number;
    /** To get a large amount of data, page token returned from the response can be used to get all data. */
    pageToken?: string | undefined;
}
/** The overall status of the contents and list items in comparison to the actual schemas' structure */
export interface MetadataStatus {
    /** The schema ids (of type Content or Layer) for which the contents are outdated and need to be updated. */
    contentOrLayerSchemaIds?: string[] | undefined;
    /** The schema ids (of type List) for which the the list items are outdated and need to be updated. */
    listSchemaIds?: string[] | undefined;
    /** The global state of the Contents and ListItems compared to the schema structure (Green = ok, Red = update needed). */
    state: MetadataState;
    /** The field ids that that cannot be used and needs to be cleaned up after updating the outdated contents and list items. */
    fieldIdsToCleanup?: {
        [key: string]: string[];
    } | undefined;
}
export interface Notification {
    id: string;
    recipientUserId?: string | undefined;
    referenceDocType?: string | undefined;
    referenceId?: string | undefined;
    audit?: UserAudit | undefined;
    titleCode: TitleCode;
    messageCode: MessageCode;
    detail?: NotificationDetailBase | undefined;
    state: NotificationState;
    eventType: NotificationEventType;
}
export declare enum TitleCode {
    TransferInProgressTitle,
    TransferCompletedTitle,
    ImportInProgressTitle,
    ImportCompletedTitle,
    ShareNewShareTitle,
    TransferCancelledTitle,
    ImportCancelledTitle,
    ImportCompletedWithErrors,
    SchemaImportInProgressTitle,
    SchemaImportCompletedTitle,
    SchemaImportFailedTitle,
    UserRegisteredTitle,
    NewUserRegisteredEmailSubject,
    UserLockedEmailSubject,
    UserUnlockedEmailSubject,
    UserReviewedEmailSubject,
    UserInvitationEmailSubject,
    UserTriggeredDeactivationRequest,
    UserTriggeredDeactivationRequestMailSubject,
    IndexDraft,
    IndexCreate,
    IndexInactive,
    IndexActive,
    IndexClosed,
    IndexReindexInProgress,
    IndexCancelled,
    ReindexProgressDraft,
    ReindexProgressInProgress,
    ReindexProgressCompleted,
    ReindexProgressCancelled,
    ReindexProgressFailed,
    ReindexProgressCompletedWithErrors,
    ContentBatchEditInProgress,
    ContentBatchEditCompleted,
    ContentBatchEditProgressFailed,
    ContentBatchEditProgressCompletedWithErrors,
    ListItemBatchEditInProgress,
    ListItemBatchEditCompleted,
    ListItemBatchEditProgressFailed,
    ListItemBatchEditProgressCompletedWithErrors,
    ContentBackupRecoveryDraft,
    ContentBackupRecoveryInProgress,
    ContentBackupRecoveryCompleted,
    ContentBackupRecoveryForcefullyCompleted,
    ContentBackupRecoveryCancelled,
    ContentBackupRecoveryFailed,
    ContentOwnershipBatchEditInProgress,
    ContentOwnershipBatchEditCompleted,
    ContentOwnershipBatchEditProgressFailed,
    ContentOwnershipBatchEditProgressCompletedWithErrors,
    ContentPermissionsBatchEditInProgress,
    ContentPermissionsBatchEditCompleted,
    ContentPermissionsBatchEditProgressFailed,
    ContentPermissionsBatchEditProgressCompletedWithErrors,
    ListItemDeactivateManyInProgress,
    ListItemDeactivateManyCompleted,
    ListItemDeactivateManyProgressFailed,
    ListItemDeactivateManyProgressCompletedWithErrors,
    ContentDeactivateManyInProgress,
    ContentDeactivateManyCompleted,
    ContentDeactivateManyProgressFailed,
    ContentDeactivateManyProgressCompletedWithErrors,
    ExternalBusinessProcessTitle,
    MetadataRelatedItemsInProgress,
    MetadataRelatedItemsProgressFailed,
    MetadataRelatedItemsProgressCompletedWithErrors,
    MetadataRelatedItemsCompleted,
    AutoTaggingInProgress,
    AutoTaggingSucceeded,
    AutoTaggingSucceededWithErrors,
    AutoTaggingFailed,
    AutoTaggingCancelled,
    ContentUpdateManyInProgress,
    ContentUpdateManyCompleted,
    ContentUpdateManyCompletedWithErrors,
    ContentUpdateManyFailed,
    MetadataRelatedItemsBySchemaInProgress,
    MetadataRelatedItemsBySchemaFailed,
    MetadataRelatedItemsBySchemaCompletedWithErrors,
    MetadataRelatedItemsBySchemaCompleted,
    MetadataOutdatedItemsUpdateInProgress,
    MetadataOutdatedItemsUpdateCompleted,
    MetadataOutdatedItemsUpdateCompletedWithErrors,
    MetadataOutdatedItemsUpdateFailed,
    BatchRenderingInProgress,
    BatchRenderingCompleted,
    BatchRenderingCompletedWithErrors,
    BatchRenderingFailed,
    BusinessRuleTitle,
    StatisticsExportDraft,
    StatisticsExportInProgress,
    StatisticsExportCompleted,
    StatisticsExportFailed,
    StatisticsExportCancelled,
    NewComment,
    UserEmailConflictSolved,
    UserEmailConflictSolvedSubject,
    SupportUserDeactivation,
    ImportFailedTitle
}
export declare enum MessageCode {
    TransferInProgressMessage,
    TransferCompletedMessage,
    ImportInProgressMessage,
    ImportCompletedMessage,
    ShareNewShareMessage,
    TransferCancelledMessage,
    ImportCancelledMessage,
    ImportFailedMessage,
    TransferInProgressWithFailedMessage,
    TransferCompletedWithFailedMessage,
    TransferCancelledWithFailedMessage,
    ImportInProgressWithFailedMessage,
    ImportCompletedWithFailedMessage,
    ImportCancelledWithFailedMessage,
    SchemaImportInProgressMessage,
    SchemaImportCompletedMessage,
    SchemaImportFailedMessage,
    UserRegisteredMessage,
    UserLockedMessage,
    UserReviewedMessage,
    IndexDraft,
    IndexCreate,
    IndexInactive,
    IndexActive,
    IndexClosed,
    IndexReindexInProgress,
    IndexCancelled,
    ReindexProgressDraft,
    ReindexProgressInProgress,
    ReindexProgressCompleted,
    ReindexProgressCancelled,
    ReindexProgressFailed,
    ReindexProgressCompletedWithErrors,
    ContentBatchEditInProgress,
    ContentBatchEditCompleted,
    ContentBatchEditProgressFailed,
    ContentBatchEditProgressCompletedWithErrors,
    ListItemBatchEditInProgress,
    ListItemBatchEditCompleted,
    ListItemBatchEditProgressFailed,
    ListItemBatchEditProgressCompletedWithErrors,
    ContentBackupRecoveryDraft,
    ContentBackupRecoveryInProgress,
    ContentBackupRecoveryCompleted,
    ContentBackupRecoveryForcefullyCompleted,
    ContentBackupRecoveryCancelled,
    ContentBackupRecoveryFailed,
    ContentOwnershipBatchEditInProgress,
    ContentOwnershipBatchEditCompleted,
    ContentOwnershipBatchEditProgressFailed,
    ContentOwnershipBatchEditProgressCompletedWithErrors,
    ContentPermissionsBatchEditInProgress,
    ContentPermissionsBatchEditCompleted,
    ContentPermissionsBatchEditProgressFailed,
    ContentPermissionsBatchEditProgressCompletedWithErrors,
    UserTriggeredDeactivationRequestMessage,
    UserEmailConflictSolved,
    ListItemDeactivateManyInProgress,
    ListItemDeactivateManyCompleted,
    ListItemDeactivateManyProgressFailed,
    ListItemDeactivateManyProgressCompletedWithErrors,
    ContentDeactivateManyInProgress,
    ContentDeactivateManyCompleted,
    ContentDeactivateManyProgressFailed,
    ContentDeactivateManyProgressCompletedWithErrors,
    ExternalBusinessProcessMessage,
    MetadataRelatedItemsInProgress,
    MetadataRelatedItemsProgressFailed,
    MetadataRelatedItemsProgressCompletedWithErrors,
    MetadataRelatedItemsCompleted,
    AutoTaggingInProgress,
    AutoTaggingSucceeded,
    AutoTaggingSucceededWithErrors,
    AutoTaggingFailed,
    AutoTaggingCancelled,
    ContentUpdateManyInProgress,
    ContentUpdateManyCompleted,
    ContentUpdateManyCompletedWithErrors,
    ContentUpdateManyFailed,
    MetadataRelatedItemsBySchemaInProgress,
    MetadataRelatedItemsBySchemaFailed,
    MetadataRelatedItemsBySchemaCompletedWithErrors,
    MetadataRelatedItemsBySchemaCompleted,
    MetadataOutdatedItemsUpdateInProgress,
    MetadataOutdatedItemsUpdateCompleted,
    MetadataOutdatedItemsUpdateCompletedWithErrors,
    MetadataOutdatedItemsUpdateFailed,
    BatchRenderingInProgress,
    BatchRenderingCompleted,
    BatchRenderingCompletedWithErrors,
    BatchRenderingFailed,
    BusinessRuleMessage,
    StatisticsExportDraft,
    StatisticsExportInProgress,
    StatisticsExportCompleted,
    StatisticsExportFailed,
    StatisticsExportCancelled,
    NewComment
}
export interface NotificationDetailBase {
    kind: string;
}
export interface NotificationDetailBusinessProcessBase extends NotificationDetailBase {
    businessProcessId: string;
    businessProcessLifeCycle?: BusinessProcessLifeCycle;
    supportsCancellation: boolean;
}
export interface NotificationDetailTransferBase extends NotificationDetailBusinessProcessBase {
    fileProgress?: number;
    fileCount?: number;
    failedCount?: number;
    cancelledCount?: number;
    name?: string | undefined;
    transferId: string;
}
export interface NotificationDetailTransfer extends NotificationDetailTransferBase {
}
export interface NotificationDetailTransferImport extends NotificationDetailTransferBase {
    collectionId?: string | undefined;
}
export interface NotificationDetailShare extends NotificationDetailBase {
    token?: string | undefined;
    shareId: string;
}
export interface NotificationDetailSchemaImport extends NotificationDetailBusinessProcessBase {
    schemaCount?: number;
    schemaProgress?: number;
    listItemCount?: number;
    listItemProgress?: number;
    name?: string | undefined;
    transferId: string;
    importedSchemaCount?: number;
    skippedSchemaCount?: number;
    importedListItemCount?: number;
    skippedListItemCount?: number;
    relatedItemCount?: number;
    relatedItemProgress?: number;
}
export interface NotificationDetailIndexReindexProgress extends NotificationDetailBusinessProcessBase {
    indexId: string;
    expected?: number;
    current?: number;
}
export interface NotificationDetailUserRegistered extends NotificationDetailBase {
    displayName?: string | undefined;
    userId: string;
}
export interface NotificationDetailContentBackupRecovery extends NotificationDetailBusinessProcessBase {
    contentTotalCount?: number;
    contentProgressCount?: number;
}
export interface NotificationDetailExternalBusinessProcess extends NotificationDetailBusinessProcessBase {
    title?: TranslatedStringDictionary | undefined;
    message?: TranslatedStringDictionary | undefined;
    navigationLink?: string | undefined;
}
export interface NotificationDetailBusinessRule extends NotificationDetailBase {
    /** Title of the notification */
    title?: TranslatedStringDictionary | undefined;
    /** Message of the notification */
    message?: TranslatedStringDictionary | undefined;
    /** Id of collection, if created */
    collectionId?: string | undefined;
    /** Id of BusinessRule notification configuration */
    notificationId: string;
}
export interface NotificationDetailProgressBase extends NotificationDetailBusinessProcessBase {
    total?: number;
    succeeded?: number;
    failed?: number;
}
export interface NotificationDetailTagging extends NotificationDetailProgressBase {
}
export interface NotificationDetailBatchRendering extends NotificationDetailProgressBase {
}
export interface NotificationDetailStatisticsExport extends NotificationDetailProgressBase {
}
export interface NotificationDetailProgressWithRelatedItemsBase extends NotificationDetailProgressBase {
    relatedItemCount?: number;
    relatedItemProgress?: number;
}
export interface NotificationDetailMetadataItemCreateRelatedItems extends NotificationDetailProgressWithRelatedItemsBase {
}
export interface NotificationDetailMetadataItemCreateRelatedItemsBySchema extends NotificationDetailProgressWithRelatedItemsBase {
}
export interface NotificationDetailMetadataItemUpdateOutdated extends NotificationDetailProgressWithRelatedItemsBase {
}
export interface NotificationDetailContentBatchEditBase extends NotificationDetailProgressBase {
    collectionId?: string | undefined;
}
export interface NotificationDetailContentMetadataBatchEdit extends NotificationDetailContentBatchEditBase {
}
export interface NotificationDetailContentOwnershipBatchEdit extends NotificationDetailContentBatchEditBase {
}
export interface NotificationDetailContentPermissionsBatchEdit extends NotificationDetailContentBatchEditBase {
}
export interface NotificationDetailMetadataItemDeactivationBase extends NotificationDetailProgressWithRelatedItemsBase {
    referencingItemsCount?: number;
    referencingItemsProgress?: number;
}
export interface NotificationDetailContentDeactivation extends NotificationDetailMetadataItemDeactivationBase {
}
export interface NotificationDetailListItemMetadataBatchEdit extends NotificationDetailProgressWithRelatedItemsBase {
}
export interface NotificationDetailListItemDeactivation extends NotificationDetailMetadataItemDeactivationBase {
}
export interface NotificationDetailComment extends NotificationDetailBase {
    reason?: CommentNotificationReason;
    contentId?: string | undefined;
    commenterName?: string | undefined;
    commentMessage?: string | undefined;
    count?: number;
}
/** Reason for a comment notification. */
export declare enum CommentNotificationReason {
    Owned,
    Replied,
    Mentioned
}
export declare enum NotificationState {
    Draft,
    Unread,
    Read,
    Deleted,
    Null
}
/** Base class for search results */
export interface BaseResultOfNotification {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Notification[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
export interface NotificationCompactResult extends BaseResultOfNotification {
    dataFetchStamp?: Date;
    aggregationResults?: AggregationResult[] | undefined;
}
export interface NotificationSearchAndAggregationBaseRequest {
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Special filters used to filter down independently the aggregations' values and the search results on specific conditions.
For the search results, the aggregation filters are used to create a Filter that is put in AND with the eventual existing Filter of the search request to nail down the search results. The filters generated
by the aggregation filters are put in OR each other if they have the same AggregationName, and then such groups are put in AND.
For the aggregation values, only the original Filter of the search request is used to nail down the data to be considered for the aggregations. Then, on top of that, for each aggregator in the search request, a Filter is created to filter down the
aggregation results of that aggregation: depending if the AggregationName of the AggregationFilter matches the AggregationName of the Aggregator, the filter is put in OR (if it matches) or in AND (if it does not match it).
Moreover, an AggregationFilter ensures that the related value is returned in the AggregationResults also if the top aggregation values returned by default do not contain it. */
    aggregationFilters?: AggregationFilter[] | undefined;
}
export interface NotificationSearchRequest extends NotificationSearchAndAggregationBaseRequest {
    /** Limits the document count of the result set. */
    limit?: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Fields and respective directions requested to sort the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators?: AggregatorBase[] | undefined;
}
export interface NotificationAggregationRequest extends NotificationSearchAndAggregationBaseRequest {
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators: AggregatorBase[];
}
/** Email notification settings */
export interface EmailNotificationsSettings {
    /** Settings for notification sources */
    sources?: {
        [key: string]: EmailNotificationsSourceSettings;
    } | undefined;
}
/** Email notification settings for a specific notification source */
export interface EmailNotificationsSourceSettings {
    /** Interval. */
    interval: EmailNotificationsInterval;
    /** Exclusions from the default set by DisableAll property.
List of notification IDs which are excluded or included from the email, depending on the DisableAll property. */
    exclusions?: string[] | undefined;
    /** Receive all
            
When set to false, Exclusions property acts as a blacklist (all items are included by default).
When set to true, Exclusions property acts as a whitelist (no items are included by default). */
    disableAll: boolean;
}
/** Interval for email notifications */
export declare enum EmailNotificationsInterval {
    Daily,
    Hourly,
    QuarterHourly,
    EveryFiveMinutes,
    Off
}
/** Notification that is available for email settings. */
export interface NotificationType {
    /** ID of the notification. */
    id?: string | undefined;
    /** Title of the notification. */
    title?: TranslatedStringDictionary | undefined;
}
/** Used to change the download file name pattern for multiple formats at once. */
export interface OutputFormatDownloadFileNamePatternUpdateManyRequest {
    /** Download file name update requests to be processed. */
    items: OutputFormatDownloadFileNamePatternUpdateRequestItem[];
}
/** Represents a change to the download file name pattern to one output format. */
export interface OutputFormatDownloadFileNamePatternUpdateRequestItem {
    /** ID of the output format to set pattern for. */
    id: string;
    /** The patterns to use per metadata language.
The customer's default language is required. */
    patterns?: TranslatedStringDictionary | undefined;
}
/** Defines additional settings for XmpWriteback */
export interface XmpWritebackOptions {
    /** Defines how data from XmpMappings interacts with unaltered Xmp data contained in originally uploaded file */
    mergeMode: XmpWritebackMergeMode;
}
export interface OutputFormatSetXmpWritebackStateRequest extends XmpWritebackOptions {
    /** Indicates if XMP writeback shall be enabled for the format. */
    enabled?: boolean;
}
/** Defines how data from XmpMappings interacts with unaltered Xmp data */
export declare enum XmpWritebackMergeMode {
    MappingOnly,
    MergeWithOriginal
}
/** Used to change the state of XMP writeback for multiple output formats at once. */
export interface OutputFormatSetXmpWritebackStateManyRequest {
    /** XMP writeback state changes to be processed. */
    items?: OutputFormatSetXmpWritebackStateRequestItem[] | undefined;
}
/** Represents a change to the XMP writeback state to one output format. */
export interface OutputFormatSetXmpWritebackStateRequestItem extends OutputFormatSetXmpWritebackStateRequest {
    /** ID of the output format to set XMP writeback state for. */
    id: string;
}
/** Request to change permission-related settings on an OutputFormat */
export interface OutputFormatSetPermissionRequest {
    /** Indicates if outputs of this format should be accessible for users not having AccessOriginal permission on the content. */
    viewForAll: boolean;
}
/** Used to change permission-related settings on multiple OutputFormat */
export interface OutputFormatSetPermissionManyRequest {
    /** Permission changes to be processed. */
    items?: OutputFormatSetPermissionRequestItem[] | undefined;
}
/** Represents a change to permission-related settings of an OutputFormat&gt; */
export interface OutputFormatSetPermissionRequestItem extends OutputFormatSetPermissionRequest {
    /** ID of the output format to set permission for. */
    id: string;
}
/** Specifies for which content a given format should be rendered */
export interface OutputFormatRenderPreviewRequest {
    /** The content for which the format should be rendered */
    contentId?: string | undefined;
    /** The format which should be rendered. */
    outputFormat?: OutputFormatRenderingSpecification | undefined;
}
/** Used to specify how to render derived outputs */
export interface OutputFormatRenderingSpecification {
    /** Which output format should be used as a source of data. */
    sourceOutputFormats?: SourceOutputFormats | undefined;
    /** Information about the technical format of the data, e.g. JPEG, AAC or video still. */
    format?: FormatBase | undefined;
}
/** Defines the source used for rendering an OutputFormat depending on the type of content */
export interface SourceOutputFormats {
    /** The source to be used for content of type Image */
    image?: string | undefined;
    /** The source to be used for content of type Video */
    video?: string | undefined;
    /** The source to be used for content of type Document */
    document?: string | undefined;
    /** The source to be used for content of type Audio */
    audio?: string | undefined;
    /** The source to be used for content of type Vector */
    vector?: string | undefined;
}
export interface FormatBase {
    kind: string;
}
export interface FormatWithFixedExtensionBase extends FormatBase {
    /** The filename extension of the file produced by this Format. */
    extension?: string | undefined;
}
/** Special format that represents the original. */
export interface OriginalFormat extends FormatBase {
}
/** A format that, when rendered, simply copies the source file. Primarily intended for use with XmpWriteback. */
export interface CopyFormat extends FormatBase {
}
/** Base class for ImageFormats such as JPEG, PNG, TIFF, ... */
export interface ImageFormatBase extends FormatWithFixedExtensionBase {
    /** Color profile to use. Colorspace is derived from the chosen profile. */
    colorProfile?: ColorProfile | undefined;
    /** The method of conversion for color spaces (e.g. CMYK to RGB). Further information can be found here: http://www.colourphil.co.uk/rendering_intents.shtml */
    colorTransformationIntent?: ColorTransformationIntent;
    /** Horizontal resolution in dpi (dots per inch) */
    horizontalResolution?: number | undefined;
    /** Vertical resolution in dpi (dots per inch) */
    verticalResolution?: number | undefined;
    /** Copy clipping paths from input. */
    keepClippingPath?: boolean;
    /** Allows resizing of the image. */
    resizeAction?: ResizeAction | undefined;
    /** A collection of actions to be applied during rendering. */
    actions?: ImageActionBase[] | undefined;
}
/** Available color profiles */
export declare enum ColorProfile {
    AdobeRgb1998,
    AppleRgb,
    ColorMatchRgb,
    EciRgbV1,
    EciRgbV2,
    Srgb,
    SrgbColorSpaceProfile,
    EuropeIsoCoatedFogra27,
    EuroscaleCoated,
    EuroscaleUncoated,
    IsoCoated,
    IsoCoatedEciV2,
    JapanColor2001Coated,
    JapanColor2001Uncoated,
    JapanColor2002Newspaper,
    JapanWebCoated,
    UsSheetfedCoated,
    UsSheetfedUncoated,
    UsWebCoatedSwop,
    UsWebUncoated,
    IsoCoatedV2Grey1cBas,
    IsoCoated300EciV2,
    CoatedFogra27,
    CoatedFogra39,
    UncoatedFogra29,
    WebCoatedFogra28,
    WebCoatedSwop2006Grade3,
    WebCoatedSwop2006Grade5,
    Isonewspaper26v4,
    Isonewspaper26v4Grey
}
/** http://www.colourphil.co.uk/rendering_intents.shtml */
export declare enum ColorTransformationIntent {
    RelativeColorimetricBpc,
    AbsoluteColorimetric,
    Perceptual,
    RelativeColorimetric,
    Saturation
}
/** Specifies image resize parameters. */
export interface ResizeAction {
    /** Target width for the output. */
    width: number;
    /** Target height for the output. */
    height: number;
    /** Specifies additional resize behaviour. */
    resizeMode: ResizeMode;
}
/** Specifies how the dimensions of a ResizeAction are applied to the content */
export declare enum ResizeMode {
    Fit,
    Shrink,
    Resize
}
export interface ImageActionBase {
    kind: string;
}
/** An ImageAction that allows different forms of modifying alpha information in an image. */
export interface AlphaHandlingAction extends ImageActionBase {
    /** Specifies the kind of alpha handling to be applied. */
    alphaHandling?: AlphaHandling;
    /** Specifies potentially needed color information for alpha handling. Must be given in RGB hex format (8 bit per channel). */
    replacementRgbColorHexCode?: string | undefined;
}
/** Specifies the kind of AlphaHandling to be applied to an image */
export declare enum AlphaHandling {
    DiscardAlpha,
    ReplaceAlpha,
    ReplaceInvertedAlpha
}
/** Parameters for cropping actions. */
export interface CropActionGeneric extends ImageActionBase {
    /** Defines position of cropping rectangle. */
    position?: CropPositionBase | undefined;
    /** Defines size of cropping rectangle. */
    size?: CropSizeBase | undefined;
}
/** Defines position of cropping rectangle. */
export interface CropPositionBase {
    kind: string;
}
export interface CropOriginAbsolute extends CropPositionBase {
    /** X-Coordinate of top left point of the cropping rectangle. */
    x?: number;
    /** Y-Coordinate of top left point of the cropping rectangle. */
    y?: number;
}
export interface CropCenterRelative extends CropPositionBase {
    /** Relative horizontal position of center for crop. 0.5 designates the center of the image. */
    x?: number;
    /** Relative vertical position of center for crop. 0.5 designates the center of the image. */
    y?: number;
}
export interface CropPositionGravity extends CropPositionBase {
    /** Gravity of the cropping rectangle. */
    gravity?: CropGravity;
}
export declare enum CropGravity {
    NorthWest,
    North,
    NorthEast,
    East,
    SouthEast,
    South,
    SouthWest,
    West,
    Center
}
/** Defines size of cropping rectangle. */
export interface CropSizeBase {
    kind: string;
}
export interface CropSizeAbsolute extends CropSizeBase {
    /** Width of the cropping rectangle. */
    width?: number;
    /** Height of the cropping rectangle. */
    height?: number;
}
export interface CropSizeRelative extends CropSizeBase {
    /** Width of the cropping rectangle in range [0, 1]. */
    width?: number;
    /** Height of the cropping rectangle in range [0, 1]. */
    height?: number;
}
export interface CropActionAbsoluteSizeBase extends CropActionGeneric {
    height?: number;
    width?: number;
}
/** An ImageAction that allows cropping an image. */
export interface CropAction extends CropActionAbsoluteSizeBase {
    x?: number;
    y?: number;
}
/** An ImageAction that allows cropping an image, weighing the cropping rectangle on a gravity. */
export interface GravityBasedCropAction extends CropActionAbsoluteSizeBase {
    gravity?: CropGravity;
}
/** An ImageAction that allows cropping an image, positioning the cropping rectangle relative to the width/height of the image. */
export interface RelativeCropAction extends CropActionAbsoluteSizeBase {
    x?: number;
    y?: number;
}
/** Increases sharpness of an image by using the unsharp mask technique. */
export interface UnsharpenMaskAction extends ImageActionBase {
    /** Unsharp mask amount (the difference between blurred and original image). */
    amount?: number;
    /** Blur radius used to produce unfocused version of the image. */
    radius?: number;
    /** The threshold value for the unsharp mask in range [0, 1] */
    threshold?: number;
}
/** An ImageAction that allows rendering a watermark to an image */
export interface WatermarkAction extends ImageActionBase {
    /** Identifies the image to be used as watermark */
    watermarkFilePath?: string | undefined;
    /** Margin to the left border of the image, in pixels */
    marginLeft?: number | undefined;
    /** Margin to the top of the image, in pixels */
    marginTop?: number | undefined;
    /** Margin to the right border of the image, in pixels */
    marginRight?: number | undefined;
    /** Margin to the bottom of the image, in pixels */
    marginBottom?: number | undefined;
    /** Scales the opacity of the watermark */
    opacity?: number;
    /** Scales the watermark width according to the size of the final image. */
    widthRatio?: number;
    /** Scales the watermark height according to the size of the final image. */
    heightRatio?: number;
}
/** An ImageAction that allows rotating an image. */
export interface RotateAction extends ImageActionBase {
    /** Degrees to rotate the image in. */
    degrees?: number;
    /** Direction the rotation should be applied in. */
    direction?: RotateDirection;
}
export declare enum RotateDirection {
    Clockwise,
    CounterClockwise
}
/** Renders a JPEG image. */
export interface JpegFormat extends ImageFormatBase {
    /** Compression quality. Must be in range [0,100] and defaults to 80. */
    quality?: number;
    /** Whether to use chroma subsampling or not. */
    chromaSubsamplingEnabled?: boolean;
}
/** Renders a PNG image. */
export interface PngFormat extends ImageFormatBase {
}
/** Renders a TIFF image */
export interface TiffFormat extends ImageFormatBase {
    /** Specifies whether color channels should be premultiplied with alpha (associated alpha) or not (unassociated alpha). */
    alphaPremultiplied?: boolean;
    /** Specifies the compression type to use. */
    compressionType?: CompressionType;
    /** Preserve (including size affecting changes) unspecified extraChannels. */
    includeUnspecifiedTiffExtraChannels?: boolean;
}
/** Available compression types. */
export declare enum CompressionType {
    None,
    Lzw,
    Rle,
    Zip
}
/** Renders a WebP image. */
export interface WebPFormat extends ImageFormatBase {
    /** Compression quality. Must be in range [0,100] and defaults to 90. */
    quality?: number;
}
/** Renders an AVIF image. */
export interface AvifFormat extends ImageFormatBase {
    /** Compression quality. Must be in range [0,100] and defaults to 90. */
    quality?: number;
}
/** Base class for rendering video. */
export interface VideoFormatBase extends FormatWithFixedExtensionBase {
}
/** Renders H.264 in mp4 container. */
export interface Mp4VideoFormat extends VideoFormatBase {
    /** Allows resizing of the video. */
    resizeAction?: ResizeAction | undefined;
    /** Gets or sets the encoding audio codec. */
    audioCodec?: AudioFormatBase | undefined;
    /** Gets or sets the encoding codec preset. */
    preset?: Preset;
}
/** Base class for rendering audio. */
export interface AudioFormatBase extends FormatWithFixedExtensionBase {
}
/** Video rendering preset, see http://dev.beandog.org/x264_preset_reference.html for more information. */
export declare enum Preset {
    Ultrafast,
    Superfast,
    Veryfast,
    Faster,
    Fast,
    Medium,
    Slow,
    Slower
}
/** Generates a sprite image of the input video. */
export interface VideoSpriteFormat extends VideoFormatBase {
    /** Specifies the dimensions of a single frame in the sprite. */
    spriteResizeAction?: ResizeAction | undefined;
    /** Limit for the number of frames to generate. */
    maxNumberOfSprites?: number;
    /** JPEG-quality to use for the sprite. */
    quality?: number;
}
export interface VideoStillFormat extends VideoFormatBase {
    /** Specifies the position from which to produce the image. */
    positionInSeconds?: number;
}
/** Specifies Aac encoding for the output and additional settings for the encoder. */
export interface AacAudioFormat extends AudioFormatBase {
    /** Gets or sets the encoding profile. */
    profile?: Profile;
    /** Gets or sets the encoding coder. */
    coder?: Coder;
    /** Gets or sets the bitrate of the encoding in kbps. */
    bitrate?: number | undefined;
    /** Gets or sets the encoding variable bit rate (VBR) - 1 is lowest quality and 5 is highest quality. */
    variableBitRate?: number | undefined;
}
export declare enum Profile {
    Aac_low,
    Mpeg2_aac_low,
    Aac_ltp,
    Aac_main
}
/** Audio coders */
export declare enum Coder {
    Twoloop,
    Anmr,
    Fast
}
/** Generates a waveform image from an Audio source. */
export interface AudioStillFormat extends AudioFormatBase {
}
/** Renders an MP3 audio file. */
export interface Mp3AudioFormat extends AudioFormatBase {
    /** Gets or sets the encoding bitrate. This setting and Quality are mutually exclusive. */
    bitrate?: number | undefined;
    /** Gets or sets the encoding quality. This setting and Bitrate are mutually exclusive.
Values can be set it range of 0 to 9, where a lower value is a higher quality. */
    quality?: number | undefined;
}
/** Base class for rendering documents. */
export interface DocumentFormatBase extends FormatWithFixedExtensionBase {
}
/** Render a document to a raster image */
export interface DocumentStillFormat extends DocumentFormatBase {
    /** Allows resizing of the image. */
    resizeAction?: ResizeAction | undefined;
}
export interface PdfFormat extends DocumentFormatBase {
    /** Specifies compression quality used for ReduceFileSize. */
    jpegQuality?: number;
    /** Whether to linearize the output for fast web viewing. */
    fastWebView?: boolean;
    /** Whether to apply measures to decrease output size or not. */
    reduceFileSize?: boolean;
    /** Whether to extract document full text from this output. */
    extractFullText?: boolean;
}
/** Base class for rendering vector graphics. */
export interface VectorFormatBase extends FormatWithFixedExtensionBase {
}
/** Render a PDF to SVG */
export interface SvgFormat extends VectorFormatBase {
}
/** Render a vector graphic to a raster image */
export interface VectorStillFormat extends VectorFormatBase {
    /** Specifies output dimensions for raster operation */
    resizeAction?: ResizeAction | undefined;
}
/** Represents the editable part of the output format. */
export interface OutputFormatEditable extends OutputFormatRenderingSpecification {
    /** Language specific names. */
    names: TranslatedStringDictionary;
    /** How long should the dynamic outputs created from this format be kept. */
    retentionTime?: string;
    /** Optional patterns (liquid syntax) that produce the filename for item of this output format.
If set, the customer's default language is required. */
    downloadFileNamePatterns?: TranslatedStringDictionary | undefined;
    /** Indicates if outputs of this format should be accessible for users not having AccessOriginal permission on the content. */
    viewForAll?: boolean;
    /** Indicates if metadata should be written into XMP header of outputs where applicable and configured. */
    enableXmpWriteback?: boolean;
    /** Defines additional settings for XmpWriteback */
    xmpWritebackOptions?: XmpWritebackOptions | undefined;
}
/** Represents an output format. */
export interface OutputFormat extends OutputFormatEditable {
    /** Output format ID. */
    id?: string | undefined;
    /** Marks if this is a system output format. */
    system?: boolean;
    /** A dynamic output format is not rendered automatically, but only on demand. */
    dynamic?: boolean;
    /** Specifies if output format should be taken into account during data extraction. */
    dataExtraction?: boolean;
    /** Temporary outputs will not be backed up. */
    temporary?: boolean;
}
/** Represents an output format. */
export interface OutputFormatDetail extends OutputFormat {
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
/** Used to create multiple new output formats at once. */
export interface OutputFormatCreateManyRequest {
    /** Output format items to be created. */
    items?: OutputFormat[] | undefined;
}
/** Used to modify multiple output formats at once. */
export interface OutputFormatUpdateManyRequest {
    /** Output format items to be modified. */
    items?: OutputFormatUpdateManyRequestItem[] | undefined;
}
/** Represents one item to be modified in a bulk update operation on output formats. */
export interface OutputFormatUpdateManyRequestItem extends OutputFormatEditable {
    /** ID of the output format to modify. */
    id?: string | undefined;
}
/** Used to remove multiple output formats at once. */
export interface OutputFormatDeleteManyRequest {
    /** List of IDs of output formats to remove. */
    ids?: string[] | undefined;
}
/** Base class for search results */
export interface BaseResultOfOutput {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Output[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
export interface OutputSearchResult extends BaseResultOfOutput {
}
export interface OutputSearchRequest {
    /** Limits the document count of the result set. Defaults to 30. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** List of Content ids you want to use to fetch the outputs. */
    contentIds?: string[] | undefined;
    /** The allowed rendering states of the outputs you want to fetch. */
    renderingStates?: OutputRenderingState[] | undefined;
    /** The file extension of the outputs you want to fetch. */
    fileExtensions?: string[] | undefined;
    /** The output format id of the outputs you want to fetch. */
    outputFormatIds?: string[] | undefined;
}
export interface OutputResetRetryAttemptsRequest {
    /** List of output IDs you want to filter on. If this field is not empty, the other will be ignored. */
    outputIds?: string[] | undefined;
    /** List of Content IDs you want to filter on. */
    contentIds?: string[] | undefined;
    /** The file extension of the outputs you want to filter on. */
    fileExtensions?: string[] | undefined;
    /** The IDs of the output formats you want to filter on. */
    outputFormatIds?: string[] | undefined;
    /** Should the successful filter results also be reset (and subsequently re-rendered)? */
    includeCompleted: boolean;
}
/** User profile. */
export interface UserProfile {
    /** ID of the user. */
    id?: string | undefined;
    /** Email address. */
    emailAddress?: string | undefined;
    /** First name. */
    firstName?: string | undefined;
    /** Last name. */
    lastName?: string | undefined;
    /** Language code. */
    languageCode?: string | undefined;
    /** Address. */
    address?: UserAddress | undefined;
    /** Authorization state. */
    authorizationState: AuthorizationState;
    /** Indicates if the user is locked. */
    isLocked: boolean;
    /** A list of user rights assigned to the user. */
    userRights?: UserRight[] | undefined;
    /** A list of user role IDs assigned to the user. */
    userRoleIds?: string[] | undefined;
    /** Indicates if the user has not accepted the latest terms of consent. */
    termsConsentExpired: boolean;
    /** A list of system user roles assigned to the user. */
    systemUserRoles?: SystemUserRole[] | undefined;
    /** Indicates if the user has the developer flag set. */
    isDeveloper: boolean;
    /** Federated user is a user who is (currently) governed by an external identity provider. */
    isFederated: boolean;
}
/** User's address */
export interface UserAddress {
    /** Company address line */
    company?: string | undefined;
    /** Company department. */
    department?: string | undefined;
    /** Street and house number. */
    address?: string | undefined;
    /** Additional address line. */
    alternativeAddress?: string | undefined;
    /** ZIP code. */
    zip?: string | undefined;
    /** City or town. */
    city?: string | undefined;
    /** Phone number. */
    phone?: string | undefined;
    /** Country code. */
    countryCode?: string | undefined;
}
/** System user roles. */
export declare enum SystemUserRole {
    Administrator
}
/** Request to update a user profile. */
export interface UserProfileUpdateRequest {
    /** ID of the user. */
    id?: string | undefined;
    /** Email address. */
    emailAddress?: string | undefined;
    /** First name. */
    firstName?: string | undefined;
    /** Last name. */
    lastName?: string | undefined;
    /** Language code. */
    languageCode?: string | undefined;
    /** Address. */
    address?: UserAddress | undefined;
}
/** Base class for detail of permission sets */
export interface PermissionSetDetailOfMetadataRight {
    /** The permission set ID. */
    id: string;
    /** Language specific permission set names. */
    names: TranslatedStringDictionary;
    /** A list of content or metadata rights authorizing operations on Content Items or List Items. */
    userRolesRights?: PermissionUserRoleRightsOfMetadataRight[] | undefined;
    /** A list of permission set rights authorizing operations on this permission set. */
    userRolesPermissionSetRights?: PermissionUserRoleRightsOfPermissionSetRight[] | undefined;
    /** When true this permission set will derogate all other configured permission sets on the Content Item or List Item. */
    exclusive: boolean;
    /** The owner token ID. Defines the permission set owner. */
    ownerTokenId: string;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
/** Detail of a schema permission set */
export interface SchemaPermissionSetDetail extends PermissionSetDetailOfMetadataRight {
}
/** Rights assigned to a user role. */
export interface PermissionUserRoleRightsOfMetadataRight {
    /** The user role ID. */
    userRoleId?: string | undefined;
    /** Language specific user role names. */
    names?: TranslatedStringDictionary | undefined;
    /** List of rights: they can be content, metadata or permission set rights, depending on the type defined on the class
(ContentRight, MetadataRight, PermissionSetRight). */
    rights?: MetadataRight[] | undefined;
}
export interface PermissionSetCreateRequestOfMetadataRight {
    /** Language specific permission set names. */
    names: TranslatedStringDictionary;
    /** A list of content or metadata rights authorizing operations on Content Items or List Items. */
    userRolesRights?: UserRoleRightsOfMetadataRight[] | undefined;
    /** A list of permission set rights authorizing operations on this permission set. */
    userRolesPermissionSetRights?: UserRoleRightsOfPermissionSetRight[] | undefined;
    /** When true this permission set will derogate all other configured permission sets on Content Items or List Items. */
    exclusive: boolean;
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
}
/** Request to create a schema permission set */
export interface SchemaPermissionSetCreateRequest extends PermissionSetCreateRequestOfMetadataRight {
}
export interface UserRoleRightsOfMetadataRight {
    /** The user role id. */
    userRoleId?: string | undefined;
    /** A permission container which can hold content, metadata or permission set rights. */
    rights?: MetadataRight[] | undefined;
}
/** Base class for permission set update requests */
export interface PermissionSetUpdateRequestOfMetadataRight {
    /** Language specific permission set names. */
    names: TranslatedStringDictionary;
    /** A list of content or metadata rights authorizing operations on Content Items or List Items. */
    userRolesRights?: UserRoleRightsOfMetadataRight[] | undefined;
    /** A list of permission set rights authorizing operations on this permission set. */
    userRolesPermissionSetRights?: UserRoleRightsOfPermissionSetRight[] | undefined;
}
/** Request to update a schema permission set */
export interface SchemaPermissionSetUpdateRequest extends PermissionSetUpdateRequestOfMetadataRight {
}
/** Request to update multiple schema permission sets */
export interface SchemaPermissionSetCreateManyRequest {
    /** Schema permission sets create requests. */
    items?: SchemaPermissionSetCreateRequest[] | undefined;
}
/** Request to update multiple schema permissions sets */
export interface SchemaPermissionSetUpdateManyRequest {
    /** Schema permission sets update requests. */
    items?: SchemaPermissionSetUpdateRequestItem[] | undefined;
}
/** Base class for permission set update requests */
export interface PermissionSetUpdateRequestItemOfMetadataRight extends PermissionSetUpdateRequestOfMetadataRight {
    /** The permission set ID. */
    id: string;
}
/** Request to update a schema permission set */
export interface SchemaPermissionSetUpdateRequestItem extends PermissionSetUpdateRequestItemOfMetadataRight {
}
/** The details of a schema */
export interface SchemaDetail {
    /** The schema ID. It is unique throughout the whole customer setup. */
    id: string;
    /** System generated schema namespace. It contains the full schema hierarchy up to the root schema (i.e. [RootSchemaId].[ParentSchemaId].[SchemaId]). */
    schemaNamespace: string;
    /** The parent schema ID. */
    parentSchemaId?: string | undefined;
    /** List of schema types. Currently only one schema type can be assigned to this list, and it cannot be modified once the schema is created. */
    types: SchemaType[];
    /** Language specific schema names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific schema descriptions. */
    descriptions?: TranslatedStringDictionary | undefined;
    /** An optional list of schemas' IDs with type layer. For a Content schema it stores the layers that can be assigned to a content. */
    layerSchemaIds?: string[] | undefined;
    /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
    displayPatterns: DisplayPattern[];
    /** The schema fields. */
    fields?: FieldBase[] | undefined;
    /** A list of schema fields overwrite information. It is used to overwrite the field configuration coming from the parent schema.
Only a subset of properties of a FieldSingleTagbox and FieldMultiTagbox can be be overwritten. All other properties and fields cannot. */
    fieldsOverwrite?: FieldOverwriteBase[] | undefined;
    /** Sorts content documents and/or list items. In order for the sorting to work properly, the Sortable property of the related field
must be set to true. Multiple sorting is supported: they are applied in the specified order. */
    sort?: SortInfo[] | undefined;
    /** An optional list of aggregations to show grouped list item documents. When aggregations are defined for a List,
the UI uses such information to show the available filters and grouped results. */
    aggregations?: AggregatorBase[] | undefined;
    /** Identifies a system provided schema. A system schema cannot be created, updated or deleted. */
    system: boolean;
    /** The owner token ID. Defines the schema owner. */
    ownerTokenId: string;
    /** Defines a schema as viewable by everyone. Everyone with ManageSchema user permission is able to see the schema. */
    viewForAll: boolean;
    /** An optional list of schema permission set IDs which control schema permissions. */
    schemaPermissionSetIds?: string[] | undefined;
    /** If the schema if of type Layer, the list contains the schemas with type Content
that reference the layer. */
    referencedInContentSchemaIds?: string[] | undefined;
    /** The complete list of all descendant schema IDs. */
    descendantSchemaIds?: string[] | undefined;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
    /** The number of fields generated by the schema in the search index for filtering, searching and sorting. */
    searchFieldCount?: SearchFieldCount | undefined;
    /** Metadata protection options. */
    metadataProtection?: MetadataProtection | undefined;
}
/** Represent the template whose value will be resolved based on the actual content. */
export interface DisplayPattern {
    /** The template engine used for parsing the display patterns. */
    templateEngine: TemplateEngine;
    /** The display pattern type. */
    displayPatternType: DisplayPatternType;
    /** Language specific pattern templates. */
    templates?: TranslatedStringDictionary | undefined;
}
/** The template engine used for parsing the display patterns */
export declare enum TemplateEngine {
    DotLiquid
}
/** The field base class */
export interface FieldBase {
    /** The field ID. It can be a slug; it must be unique within the schema hierarchy (ancestors / descendants); it must be begin with lower case. */
    id: string;
    /** The index ID is auto generated by the system. */
    indexId?: string | undefined;
    /** The field namespace is auto generated by the system: it carries the hierarchy information. */
    fieldNamespace?: string | undefined;
    /** Language specific field names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific field descriptions. */
    descriptions?: TranslatedStringDictionary | undefined;
    /** Defines if a field value is mandatory or not. */
    required: boolean;
    /** Field is stored for filtering. */
    index: boolean;
    /** Field is stored for simple search. */
    simpleSearch: boolean;
    /** Field is stored for sorting. */
    sortable: boolean;
    kind: string;
}
/** The field used to store a boolean */
export interface FieldBoolean extends FieldBase {
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
}
/** The field used to store a date */
export interface FieldDate extends FieldBase {
    /** The date format structure. */
    format?: string | undefined;
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
}
/** The field used to store a date time */
export interface FieldDateTime extends FieldBase {
    /** The date time format structure. */
    format?: string | undefined;
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
    /** If set to true, the date time value is automatically set when a content or list item is created. */
    initializeOnItemCreation?: boolean;
}
/** The field used to store multiple date time values */
export interface FieldDateTimeArray extends FieldDateTime {
    /** The maximum number of items that can be stored. */
    maximumItems?: number | undefined;
    /** The minimum number of items that must be stored. */
    minimumItems?: number | undefined;
}
/** The field used to store a decimal value */
export interface FieldDecimal extends FieldBase {
    /** The decimal pattern structure. */
    pattern?: string | undefined;
    /** The minimum possible value. */
    minimum?: number | undefined;
    /** The maximum possible value. */
    maximum?: number | undefined;
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
}
/** The field used to store a dictionary of values */
export interface FieldDictionary extends FieldBase {
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
}
/** The field used to store multiple dictionaries' values */
export interface FieldDictionaryArray extends FieldDictionary {
    /** The maximum number of items that can be stored. */
    maximumItems?: number | undefined;
    /** The minimum number of items that must be stored. */
    minimumItems?: number | undefined;
}
/** The field used to store a geo point */
export interface FieldGeoPoint extends FieldBase {
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
}
/** A field that can be triggered, and store in such occasion the id of the user and the time that triggered it. The last user who triggered it and the last time in which it was triggered can be used for filtering or for simple search (if enabled on the field). Such information are stored in two inner fields: "triggeredBy" and "triggeredOn". In order to be triggered in a Content or ListItem metadata dictionary, the special '"_trigger": true' should be sent in the data of the field itself. */
export interface FieldTrigger extends FieldBase {
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
}
/** The field used to store a long value */
export interface FieldLong extends FieldBase {
    /** The long pattern structure. */
    pattern?: string | undefined;
    /** The minimum possible value. */
    minimum?: number | undefined;
    /** The maximum possible value. */
    maximum?: number | undefined;
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
}
/** The field used to store multiple long values */
export interface FieldLongArray extends FieldLong {
    /** The maximum number of items that can be stored. */
    maximumItems?: number | undefined;
    /** The minimum number of items that must be stored. */
    minimumItems?: number | undefined;
}
/** The field used to store a single fieldset */
export interface FieldSingleFieldset extends FieldBase {
    /** The ID of the schema to be used as fieldset (it must be of type Struct). */
    schemaId: string;
    /** Indexing information of fields of the related schema identified by the SchemaId property */
    schemaIndexingInfo?: SchemaIndexingInfo | undefined;
}
/** Indexing information for a schema */
export interface SchemaIndexingInfo {
    /** A collection of indexing information for the fields of a schema */
    fields?: FieldIndexingInfo[] | undefined;
    /** Schema's display value Name is stored for filtering. Only available for tagbox fields. */
    includeNameDisplayValueInFilters: boolean;
}
/** Indexing information for a field of a schema */
export interface FieldIndexingInfo {
    /** The field ID. */
    id: string;
    /** Field is stored for filtering. */
    index: boolean;
    /** Field is stored for simple search. */
    simpleSearch: boolean;
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost: number;
    /** Indexing information of schema's fields related to this field (if existing). */
    relatedSchemaIndexing?: SchemaIndexingInfo | undefined;
}
/** The field used to store multiple fieldsets */
export interface FieldMultiFieldset extends FieldBase {
    /** The ID of the schema to be used as fieldset (it must be of type Struct, and it cannot be a system schema). */
    schemaId: string;
    /** Indexing information of fields of the related schema identified by the SchemaId property. */
    schemaIndexingInfo?: SchemaIndexingInfo | undefined;
    /** The maximum number of items that can be stored. */
    maximumItems?: number | undefined;
    /** The minimum number of items that must be stored. */
    minimumItems?: number | undefined;
}
/** The field used to store a single tagbox */
export interface FieldSingleTagbox extends FieldBase {
    /** The ID of the schema to be used as tagbox (it must be of type List). */
    schemaId: string;
    /** Indexing information of fields of the related schema identified by the SchemaId property. */
    schemaIndexingInfo?: SchemaIndexingInfo | undefined;
    /** An optional filter to limit the list items. */
    filter?: FilterBase | undefined;
    /** Json serialized template used for creating new list item (no logic is implemented in backend). */
    listItemCreateTemplate?: string | undefined;
    /** Defines the display pattern type to be used (Name or List only) when showing a tagbox item in view mode. Defaults to "Name".
The information is only consumed by the client application. No actual logic is implemented in the backend. */
    viewModeDisplayPatternType?: DisplayPatternType;
}
/** The field used to store multiple tagboxes */
export interface FieldMultiTagbox extends FieldBase {
    /** The ID of the schema to be used as tagbox (it must be of type List). */
    schemaId: string;
    /** Indexing information of fields of the related schema identified by the SchemaId property */
    schemaIndexingInfo?: SchemaIndexingInfo | undefined;
    /** The maximum number of items that can be stored. */
    maximumItems?: number | undefined;
    /** The minimum number of items that must be stored. */
    minimumItems?: number | undefined;
    /** An optional filter to limit the returned list items. */
    filter?: FilterBase | undefined;
    /** Json serialized template used for creating new list item (no logic is implemented in backend). */
    listItemCreateTemplate?: string | undefined;
    /** Defines the display pattern type to be used (Name or List only) when showing a tagbox item in view mode. Defaults to "Name".
The information is only consumed by the client application. No actual logic is implemented in the backend. */
    viewModeDisplayPatternType?: DisplayPatternType;
}
/** The field used to store a string value */
export interface FieldString extends FieldBase {
    /** A DotLiquid template. If set, it transforms the field in a calculated field, so that its value is calculated based on this template. */
    template?: string | undefined;
    /** Contains a regex validation pattern. */
    pattern?: string | undefined;
    /** The minimum string's length. */
    minimumLength?: number | undefined;
    /** The maximum string's length. */
    maximumLength?: number | undefined;
    /** Defines how the value must be analyzed for filtering by ElasticSearch. A string field can have multiple analyzers, but only one per analyzer type.
The analyzers are applied only if the Index property is set to true. */
    indexAnalyzers?: AnalyzerBase[] | undefined;
    /** Defines how the value must be analyzed for searches by ElasticSearch. A string field can have multiple analyzers, but only one per analyzer type.
The analyzers are applied only if the SimpleSearch property is set to true. */
    simpleSearchAnalyzers?: AnalyzerBase[] | undefined;
    /** Defines that the field value must be displayed in a multiline component. */
    multiLine?: boolean;
    /** If values are stored in this list, field values are limited to these ones. */
    grantedValues?: string[] | undefined;
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
    /** Stores information on how values of this field should be rendered */
    renderingType?: StringRenderingType;
}
/** The analyzer base class */
export interface AnalyzerBase {
    kind: string;
}
/** An analyzer using the ElasticSearch's EdgeNGram tokenizer */
export interface EdgeNGramAnalyzer extends AnalyzerBase {
    /** The analyzer type: EdgeNGram */
    type?: Analyzer;
    /** The suffix for the analyzed field: edgengram. */
    fieldSuffix?: string | undefined;
}
/** An analyzer using an ElasticSearch's language tokenizer */
export interface LanguageAnalyzer extends AnalyzerBase {
    /** The analyzer type: Language */
    type?: Analyzer;
    /** The suffix for the analyzed field: language. */
    fieldSuffix?: string | undefined;
}
/** An analyzer using the ElasticSearch's NGram tokenizer */
export interface NGramAnalyzer extends AnalyzerBase {
    /** The analyzer type: NGram */
    type?: Analyzer;
    /** The suffix for the analyzed field: ngram. */
    fieldSuffix?: string | undefined;
}
/** An analyzer using the ElasticSearch's path hierarchy tokenizer */
export interface PathHierarchyAnalyzer extends AnalyzerBase {
    /** The analyzer type: PathHierarchy */
    type?: Analyzer;
    /** The suffix for the analyzed field: pathhierarchy. */
    fieldSuffix?: string | undefined;
}
/** An analyzer using a custom pattern tokenizer */
export interface SimpleAnalyzer extends AnalyzerBase {
    /** The analyzer type: Simple */
    type?: Analyzer;
    /** The suffix for the analyzed field: simple. */
    fieldSuffix?: string | undefined;
}
/** An analyzer that removes diacritics from words and uses a custom pattern tokenizer */
export interface NoDiacriticsAnalyzer extends AnalyzerBase {
    /** The analyzer type: NoDiacritics */
    type?: Analyzer;
    /** The suffix for the analyzed field: nodiacritics. */
    fieldSuffix?: string | undefined;
}
/** Describes how a string value should be rendered */
export declare enum StringRenderingType {
    Default,
    Markdown
}
/** The field used to store multiple string values */
export interface FieldStringArray extends FieldString {
    /** The maximum number of items that can be stored. */
    maximumItems?: number | undefined;
    /** The minimum number of items that must be stored. */
    minimumItems?: number | undefined;
}
/** The field used to store a translated string values */
export interface FieldTranslatedString extends FieldBase {
    /** Contains a regex validation pattern. */
    pattern?: string | undefined;
    /** The minimum string's length. */
    minimumLength?: number | undefined;
    /** The maximum string's length. */
    maximumLength?: number | undefined;
    /** Defines how the value must be analyzed for filtering by ElasticSearch. A string field can have multiple analyzers, but only one per analyzer type.
The analyzers are applied only if the Index property is set to true. */
    indexAnalyzers?: AnalyzerBase[] | undefined;
    /** Defines how the value must be analyzed for searches by ElasticSearch. A string field can have multiple analyzers, but only one per analyzer type.
The analyzers are applied only if the SimpleSearch property is set to true. */
    simpleSearchAnalyzers?: AnalyzerBase[] | undefined;
    /** Defines that the field value must be displayed in a multiline component. */
    multiLine?: boolean;
    /** Sets the required metadata languages for the translation field. The langauge configuration limits the available metadata languages.
If Required is true, the field and all its metadata languages are required.
If Required is false, the field can be left empty, but as soon as a value is entered all required metadata languages are mandatory. */
    requiredMetadataLanguages?: string[] | undefined;
    /** A DotLiquid template. If set, it transforms the field in a calculated field, so that its value is calculated based on this template.
             */
    template?: string | undefined;
    /** Value to prioritize search results. Set to 1 by default. Ignored if SimpleSearch not set to true. */
    boost?: number;
    /** Stores information on how values of this field should be rendered */
    renderingType?: StringRenderingType;
}
/** The field used to store a single relation */
export interface FieldSingleRelation extends FieldBase {
    /** The ID of the schema used for relation metadata (it must be of type Struct, and it cannot be a system schema). */
    schemaId: string;
    /** Indexing information of fields of the related schema identified by the SchemaId property. */
    schemaIndexingInfo?: SchemaIndexingInfo | undefined;
    /** Defines the allowed elation types. */
    relationTypes: RelationType[];
    /** Settings for displaying purposes in the UI */
    uiSettings?: RelationUiSettings | undefined;
}
/** Defines a relation */
export interface RelationType {
    /** The ID of the relation type. */
    id: string;
    /** Language specific relation names. */
    names?: TranslatedStringDictionary | undefined;
    /** Defines the type of the document target of the relation. Currently supported: Content, ListItem. */
    targetDocType: string;
    /** An optional filter to limit the documents of type TargetDocType. */
    filter?: FilterBase | undefined;
}
export interface ItemFieldUiSettingsViewItemBase {
    /** Maximum number of rows to be displayed in the List view. */
    maxListRows?: number | undefined;
    /** Maximum number of rows to be displayed in the Thumbnail views. */
    maxThumbRows?: number | undefined;
    /** The view to be used when rendering the field. */
    view: ItemFieldViewMode;
    /** Whether related content should be shown in UI download dialog */
    showRelatedContentOnDownload?: boolean | undefined;
}
/** Ui settings for the single and multi relationship fields */
export interface RelationUiSettings extends ItemFieldUiSettingsViewItemBase {
}
/** The view mode for related items */
export declare enum ItemFieldViewMode {
    List,
    ThumbSmall,
    ThumbMedium
}
/** Ui settings for FieldDynamicView */
export interface DynamicViewFieldUiSettings extends ItemFieldUiSettingsViewItemBase {
}
/** The field used to store multiple relations */
export interface FieldMultiRelation extends FieldBase {
    /** The ID of the schema used for relation metadata (it must be of type Struct, and it cannot be a system schema). */
    schemaId: string;
    /** Indexing information of fields of the related schema identified by the SchemaId property. */
    schemaIndexingInfo?: SchemaIndexingInfo | undefined;
    /** The relation types supported by the field. */
    relationTypes: RelationType[];
    /** The maximum number of items that can be stored. */
    maximumItems?: number | undefined;
    /** The minimum number of items that must be stored. */
    minimumItems?: number | undefined;
    /** Settings for displaying purposes in the UI */
    uiSettings?: RelationUiSettings | undefined;
}
/** Stores a filter template which can be used to query for related items */
export interface FieldDynamicView extends FieldBase {
    /** Type of item this field points to. Restricted to Content at this time. */
    targetDocType: string;
    /** Settings for displaying purposes in the UI */
    viewUiSettings: DynamicViewFieldUiSettings;
    /** Template to generate filter based on current item. */
    filterTemplate: FilterBase;
    /** Specifies sorting to be used in search with FilterBase&gt; from FilterTemplate */
    sort: SortInfo[];
}
/** Base class to overwrite field's information */
export interface FieldOverwriteBase {
    /** The field's ID whose information need to be overwritten. */
    id?: string | undefined;
    /** Defines if a field value is mandatory or not: this value will overwrite the existing Required value specified in the parent schema  if
OverwriteRequired is set to true. */
    required: boolean;
    /** Enable the overwriting of the Required property of the field specified by the Id property. */
    overwriteRequired: boolean;
    kind: string;
}
/** Overwritten information for FieldSingleTagbox */
export interface FieldOverwriteSingleTagbox extends FieldOverwriteBase {
    /** An optional filter to limit the list items: this value will overwrite the existing Filter value specified in the parent schema  if
OverwriteFilter is set to true. */
    filter?: FilterBase | undefined;
    /** Enable the overwriting of the Filter property of the field specified by the Id property. */
    overwriteFilter?: boolean;
    /** Json serialized template used for creating new list item: this value will overwrite the existing ListItemCreateTemplate value specified in the parent schema  if
OverwriteListItemCreateTemplate is set to true. */
    listItemCreateTemplate?: string | undefined;
    /** Enable the overwriting of the ListItemCreateTemplate property of the field specified by the Id property. */
    overwriteListItemCreateTemplate?: boolean;
}
/** Overwritten information for FieldMultiTagbox */
export interface FieldOverwriteMultiTagbox extends FieldOverwriteBase {
    /** An optional filter to limit the list items: this value will overwrite the existing Filter value specified in the parent schema if
OverwriteFilter is set to true. */
    filter?: FilterBase | undefined;
    /** Enable the overwriting of the Filter property of the field specified by the Id property. */
    overwriteFilter?: boolean;
    /** Json serialized template used for creating new list item: this value will overwrite the existing ListItemCreateTemplate value specified in the parent schema if
OverwriteListItemCreateTemplate is set to true. */
    listItemCreateTemplate?: string | undefined;
    /** Enable the overwriting of the ListItemCreateTemplate property of the field specified by the Id property. */
    overwriteListItemCreateTemplate?: boolean;
    /** The maximum number of items that can be stored: this value will overwrite the existing MaximumItems value specified in the parent schema if
OverwriteMaximumItems is set to true. */
    maximumItems?: number | undefined;
    /** Enable the overwriting of the MaximumItems property of the field specified by the Id property. */
    overwriteMaximumItems?: boolean;
    /** The minimum number of items that must be stored: this value will overwrite the existing MinimumItems value specified in the parent schema if
OverwriteMinimumItems is set to true. */
    minimumItems?: number | undefined;
    /** Enable the overwriting of the MinimumItems property of the field specified by the Id property. */
    overwriteMinimumItems?: boolean;
}
/** Count information of fields in the search index for filtering, searching and sorting */
export interface SearchFieldCount {
    /** The number of fields created in the search index to store filter information for a schema. */
    indexedField: number;
    /** The number of fields created in the search index to store search information for a schema. */
    simpleSearchField: number;
    /** The number of fields created in the search index to store sorting information for a schema. */
    sortableField: number;
}
/** Metadata protection options */
export interface MetadataProtection {
    /** Prevent creation of items in ContentSchemas/Lists or assignments of Layers. */
    preventCreate: boolean;
    /** Prevent updating metadata associated with schema. */
    preventUpdate: boolean;
    /** Prevent deletion of items in ContentSchemas/Lists or unassignments of Layers. */
    preventDelete: boolean;
}
/** Exists response */
export interface SchemaExistsResponse {
    /** It indicates if it exists. */
    exists: boolean;
}
/** Response for a query if a field exists */
export interface FieldExistsResponse {
    /** Indicates if a field with the specified ID currently exists. */
    exists: boolean;
    /** Indicates if a field with the specified ID was previously used.
A field ID that was previously in use cannot be used again. */
    previouslyUsed: boolean;
    /** If the field does already exist or has already existed, this will contain the ID
of the schema containing it. It case of parent-child schemas, a field ID
has to be unique across the schema hierarchy. */
    schemaId?: string | undefined;
}
/** Result of a schema update operation */
export interface SchemaUpdateResult {
    /** The details of the updated schema. */
    schema?: SchemaDetail | undefined;
}
/** Request to update an existing schema */
export interface SchemaUpdateRequest {
    /** Language specific schema names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific schema descriptions. */
    descriptions?: TranslatedStringDictionary | undefined;
    /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
    displayPatterns?: DisplayPattern[] | undefined;
    /** The schema fields. */
    fields?: FieldBase[] | undefined;
    /** A list of schema fields overwrite information. It is used to overwrite the field configuration coming from the parent schema.
Only a subset of properties of a FieldSingleTagbox and FieldMultiTagbox can be be overwritten. All other properties and fields cannot. */
    fieldsOverwrite?: FieldOverwriteBase[] | undefined;
    /** An optional list of aggregations to show grouped list item documents. When aggregations are defined for a List,
the UI uses such information to show the available filters and grouped results. */
    aggregations?: AggregatorBase[] | undefined;
    /** Sorts content documents and/or list items. In order for the sorting to work properly, the Sortable property of the related field
must be set to true. Multiple sorting is supported: they are applied in the specified order. */
    sort?: SortInfo[] | undefined;
    /** Defines a schema as viewable by everyone. Everyone with ManageSchema user permission is able to see the schema. */
    viewForAll: boolean;
    /** An optional list of schema permission set IDs which control schema permissions. */
    schemaPermissionSetIds?: string[] | undefined;
    /** An optional list of schemas' IDs with type layer. For a Content schema it stores the layers that can be assigned to a content. */
    layerSchemaIds?: string[] | undefined;
    /** If the schema if of type Layer, the list contains the schemas with type Content
that reference the layer. */
    referencedInContentSchemaIds?: string[] | undefined;
    /** Metadata protection options. */
    metadataProtection?: MetadataProtection | undefined;
}
/** Result of a schema delete operation */
export interface SchemaDeleteResult {
}
export interface SchemaOwnershipTransferRequest {
    /** The id of the user to whom the schema has to be transferred to. */
    transferUserId?: string | undefined;
}
/** Result of a schema create operation */
export interface SchemaCreateResult {
    /** The details of the created schema. */
    schema?: SchemaDetail | undefined;
}
/** Request to create a schema */
export interface SchemaCreateRequest {
    /** The schema ID. It can be a slug, but must be unique throughout the whole customer setup. */
    id: string;
    /** The parent schema ID. */
    parentSchemaId?: string | undefined;
    /** List of schema types. Currently only one schema type can be assigned to this list, and it cannot be modified once the schema is created. */
    types?: SchemaType[] | undefined;
    /** Language specific schema names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific schema descriptions. */
    descriptions?: TranslatedStringDictionary | undefined;
    /** Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. */
    displayPatterns: DisplayPattern[];
    /** The schema fields. */
    fields?: FieldBase[] | undefined;
    /** A list of schema fields overwrite information. It is used to overwrite the field configuration coming from the parent schema.
Only a subset of properties of a FieldSingleTagbox and FieldMultiTagbox can be be overwritten. All other properties and fields cannot. */
    fieldsOverwrite?: FieldOverwriteBase[] | undefined;
    /** An optional list of aggregations to show grouped list item documents. When aggregations are defined for a List,
the UI uses such information to show the available filters and grouped results. */
    aggregations?: AggregatorBase[] | undefined;
    /** Sorts content documents and/or list items. In order for the sorting to work properly, the Sortable property of the related field
must be set to true. Multiple sorting is supported: they are applied in the specified order. */
    sort?: SortInfo[] | undefined;
    /** Defines a schema as viewable by everyone. Everyone with ManageSchema user permission is able to see the schema. */
    viewForAll: boolean;
    /** An optional list of schema permission set IDs which control schema permissions. */
    schemaPermissionSetIds?: string[] | undefined;
    /** An optional list of schemas' IDs with type layer. For a Content schema it stores the layers that can be assigned to a content. */
    layerSchemaIds?: string[] | undefined;
    /** If the schema if of type Layer, the list contains the schemas with type Content
that reference the layer. */
    referencedInContentSchemaIds?: string[] | undefined;
    /** Metadata protection options. */
    metadataProtection?: MetadataProtection | undefined;
}
/** Request to create multiple schemas */
export interface SchemaCreateManyRequest {
    /** The schemas to create. Cyclic dependencies between schemas are supported, if they
are all in the same request. */
    schemas: SchemaCreateRequest[];
}
/** Request to update multiple schemas */
export interface SchemaUpdateManyRequest {
    /** The schemas to update. */
    schemas: SchemaUpdateItem[];
}
/** Item to update a schema */
export interface SchemaUpdateItem extends SchemaUpdateRequest {
    /** Id of the schema to update */
    id: string;
}
export interface SchemaOwnershipTransferManyRequest {
    /** The schema ids. */
    schemaIds?: string[] | undefined;
    /** The id of user to whom the schemas have to be transferred to. */
    transferUserId?: string | undefined;
}
/** Base class for search results */
export interface BaseResultOfSchema {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Schema[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfSchema extends BaseResultOfSchema {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Result for schema search operation */
export interface SchemaSearchResult extends SearchBehaviorBaseResultOfSchema {
}
/** A schema */
export interface Schema {
    /** The schema ID. It is unique throughout the whole customer setup. */
    id: string;
    /** The parent schema ID. */
    parentSchemaId?: string | undefined;
    /** List of schema types. Currently only one schema type can be assigned to this list, and it cannot be modified once the schema is created. */
    types?: SchemaType[] | undefined;
    /** Language specific schema names. */
    names?: TranslatedStringDictionary | undefined;
    /** Language specific schema descriptions. */
    descriptions?: TranslatedStringDictionary | undefined;
    /** An optional list of schemas' IDs with type layer. For a Content schema it stores the layers that can be assigned to a content. */
    layerSchemaIds?: string[] | undefined;
    /** The count of all fields. */
    fieldCount: number;
    /** The count of all schema descendants with an immediate inheritance. */
    childCount: number;
    /** The descendant depth of the schema. */
    level: number;
    /** Identifies a system provided schema. A system schema cannot be created, updated or deleted. */
    system: boolean;
}
/** Request to search schemas */
export interface SchemaSearchRequest {
    /** The string used to query the data. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied in the specified order. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Sorts the search results. Currently only sorting on the Names property is allowed. */
    sort?: SortInfo[] | undefined;
    /** Limits the number of the returned schemas. Defaults to 30. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** An optional filter to limit the schemas. */
    filter?: FilterBase | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the SchemaSearchResult.
Warning! It severely affects performance. */
    debugMode: boolean;
    /** When searching in multi language fields, limit the searchable fields to the ones corresponding to the specified languages.
If not specified, all metadata languages in the system are used. */
    searchLanguages?: string[] | undefined;
    /** Limits the schemas to the ones the user has the specified MetadataRights. */
    rightsFilter?: MetadataRight[] | undefined;
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
/** Transfer states */
export declare enum TransferState {
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
    ImportCompletedWithErrors,
    UploadCompletedWithErrors,
    UploadCancellationInProgress,
    ImportDone
}
/** Request to import schemas and list items */
export interface SchemaImportRequest {
    /** ID of the file transfer identifying the file previously uploaded. */
    fileTransferId: string;
    /** Allow creating list items that refer to list items or contents that don't exist in the system. */
    allowMissingDependencies: boolean;
    /** Import the list items belonging to the schema. */
    importListItems: boolean;
}
/** Share detail */
export interface ShareDetail {
    /** Share ID. */
    id: string;
    /** Name of share. */
    name: string;
    /** Description of share entered by user. */
    description?: string | undefined;
    /** Creator of share. */
    creator: ShareUser;
    /** Audit information. */
    audit: UserAudit;
    /** Detailed information about contents in the share. */
    contentSelections: ShareContentDetail[];
    /** List of all contents in share including outputs. */
    contents: ShareContentBase[];
    /** List of shared layers. */
    layerSchemaIds?: string[] | undefined;
    /** Detail of share. */
    data?: ShareDataBase | undefined;
    /** Date when share expires and cannot be accessed anymore. */
    expirationDate?: Date | undefined;
    /** Info if share is already expired. */
    expired: boolean;
    /** Defined access for contents in share. */
    outputAccess: OutputAccess;
    /** Type of share. */
    shareType: ShareType;
    /** Schema detail of the content and the layers. */
    schemas?: SchemaDetail[] | undefined;
    /** Page token to retrieve next page of content selections. */
    pageToken?: string | undefined;
    /** Number of contents in share. */
    contentCount: number;
}
/** Reduced set of user information used for shares */
export interface ShareUser {
    /** Name of user */
    displayName: string;
    /** MD5 hash of email address. Can be used to display gravatar image */
    emailHash: string;
}
/** Detail of shared content */
export interface ShareContentDetail {
    /** The ID of the schema with schema type content. */
    contentSchemaId: string;
    /** An optional ID list of schemas with type layer. */
    layerSchemaIds?: string[] | undefined;
    /** The content data. It's an object of dynamic metadata whose structure is defined in the Content schema specified
by the ContentSchemaId property. */
    content: any;
    /** The metadata belonging to the layers of the content. It's a dictionary of dynamic metadata whose structure is defined in the Layer schemas identified
by the LayerSchemaIds property. */
    metadata?: {
        [key: string]: any;
    } | undefined;
    /** Content ID. */
    id: string;
    /** List of shared outputs for this content. */
    outputs: ShareOutputBase[];
    /** The type of content */
    contentType: ContentType;
    /** Contains language specific display values, rendered according to the content schema's display pattern configuration. */
    displayValues: DisplayValueDictionary;
    /** Contains an URL that can be used to retrieve the icon corresponding to the file type. */
    iconUrl?: string | undefined;
}
/** Base of shared output */
export interface ShareOutputBase {
    /** Content ID. */
    contentId: string;
    /** Output format ID. */
    outputFormatId: string;
    /** Url to directly view output. In case of BasicShare if not fetched using a token, a placeholder {token} is included which needs to be replaced with the recipient's token */
    viewUrl?: string | undefined;
    /** Url to directly download output. In case of BasicShare if not fetched using a token, a placeholder {token} is included which needs to be replaced with the recipient's token */
    downloadUrl?: string | undefined;
    /** Output details. */
    detail?: OutputDataBase | undefined;
    /** Whether this Output belongs to a dynamic OutputFormat */
    dynamicRendering: boolean;
    /** The rendering state of the output file. */
    renderingState: OutputRenderingState;
    kind: string;
}
/** Shared output for basic share */
export interface ShareOutputBasic extends ShareOutputBase {
}
/** Shared output for embed share */
export interface ShareOutputEmbed extends ShareOutputBase {
    /** Share token for the shared output. */
    token?: string | undefined;
}
export interface ShareContentBase {
    /** Content ID to share. */
    contentId: string;
    /** List of output formats for this content to share. If not specified outer OutputAccess is used. */
    outputFormatIds?: string[] | undefined;
    kind: string;
}
/** Shared content */
export interface ShareContent extends ShareContentBase {
}
/** Embedded content */
export interface EmbedContent extends ShareContentBase {
    /** Conversion presets: Each output format of the shared content can be optionally converted/edited
when delivering. */
    conversionPresets?: ConversionPreset[] | undefined;
}
/** Preset for converting an output. */
export interface ConversionPreset {
    /** OutputFormatId of output to be converted. */
    outputFormatId: string;
    /** Conversion to apply to the output. */
    conversion?: string | undefined;
    /** Indicates if the conversion is locked and therefore cannot be changed by the caller of the embed URI. */
    locked: boolean;
}
/** Base of share data */
export interface ShareDataBase {
    /** The URL to access the share. */
    url: string;
    kind: string;
}
/** Embed share data */
export interface ShareDataEmbed extends ShareDataBase {
    /** Token for the embed share. */
    token: string;
}
/** Basic share data */
export interface ShareDataBasic extends ShareDataBase {
    /** List of recipients added using email address */
    mailRecipients: MailRecipient[];
    /** List of recipients that exist in Picturepark. */
    internalRecipients: InternalRecipient[];
    /** Language of share. */
    languageCode?: string | undefined;
}
/** Share mail recipient */
export interface MailRecipient {
    /** User information including email. */
    userEmail: UserEmail;
    /** Recipient specific token. */
    token?: string | undefined;
    /** URL to access the share for this recipient. */
    url?: string | undefined;
}
export interface UserEmail {
    /** First name. */
    firstName?: string | undefined;
    /** Last name. */
    lastName?: string | undefined;
    /** Email address */
    emailAddress: string;
}
/** Internal share recipient */
export interface InternalRecipient {
    /** User information of recipient. */
    recipient: User;
    /** Recipient specific token. */
    token?: string | undefined;
    /** URL to access the share for this recipient. */
    url?: string | undefined;
}
export declare enum OutputAccess {
    Full,
    Preview,
    None
}
export declare enum ShareResolveBehavior {
    Schemas
}
/** Base class for search results */
export interface BaseResultOfShareContentDetail {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: ShareContentDetail[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
export interface ShareContentDetailResult extends BaseResultOfShareContentDetail {
}
export interface ShareOutputsResult {
    outputs?: OutputResolveResult[] | undefined;
    contentInfos?: ShareContentInfo[] | undefined;
}
export interface ShareContentInfo {
    /** Content ID. */
    id?: string | undefined;
    /** The type of content */
    contentType: ContentType;
    /** The ID of the schema with schema type content. */
    contentSchemaId?: string | undefined;
}
/** Request specifying which part of a share should be downloaded */
export interface ShareDownloadRequest {
    /** Specifies which content / output format combinations should be downloaded. */
    items: ContentDownloadRequestItem[];
}
/** Base of update request for share */
export interface ShareBaseUpdateRequest {
    /** Name of share. */
    name: string;
    /** Optional date when share expires and cannot be accessed anymore. */
    expirationDate?: Date | undefined;
    /** Optional description of share. */
    description?: string | undefined;
    /** List of contents including outputs. Existing items needs to be sent again, otherwise they will be removed. */
    contents: ShareContentBase[];
    /** List of content layers to share. */
    layerSchemaIds?: string[] | undefined;
    /** Access for content outputs in share. */
    outputAccess: OutputAccess;
    kind: string;
}
/** Update request for basic share */
export interface ShareBasicUpdateRequest extends ShareBaseUpdateRequest {
}
/** Update request for embed share */
export interface ShareEmbedUpdateRequest extends ShareBaseUpdateRequest {
}
/** Base create request for share */
export interface ShareBaseCreateRequest {
    /** Name of share. */
    name: string;
    /** Optional description of share. */
    description?: string | undefined;
    /** Optional date when share expires and cannot be accessed anymore. */
    expirationDate?: Date | undefined;
    /** List of contents including outputs to share. */
    contents: ShareContentBase[];
    /** List of content layers to share. */
    layerSchemaIds?: string[] | undefined;
    /** Access for content outputs in share. */
    outputAccess: OutputAccess;
    kind: string;
}
export interface ShareBasicCreateRequest extends ShareBaseCreateRequest {
    /** List of external mail recipients which are no Picturepark users. */
    recipientEmails?: UserEmail[] | undefined;
    /** System language used for share (mail and detail page). en or de. */
    languageCode: string;
    /** Set to true to disable the creation of notifications and emails to recipients. */
    suppressNotifications?: boolean;
}
/** Create request for embed share */
export interface ShareEmbedCreateRequest extends ShareBaseCreateRequest {
}
export interface ShareDeleteManyRequest {
    /** IDs of shares to delete. */
    ids: string[];
}
export interface ShareRevokeManyRequest {
    ids?: string[] | undefined;
}
/** Request to aggregate shares based on the specified aggregators */
export interface ShareSearchAndAggregationBaseRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Special filters used to filter down independently the aggregations' values and the search results on specific conditions.
For the search results, the aggregation filters are used to create a Filter that is put in AND with the eventual existing Filter of the search request to nail down the search results. The filters generated
by the aggregation filters are put in OR each other if they have the same AggregationName, and then such groups are put in AND.
For the aggregation values, only the original Filter of the search request is used to nail down the data to be considered for the aggregations. Then, on top of that, for each aggregator in the search request, a Filter is created to filter down the
aggregation results of that aggregation: depending if the AggregationName of the AggregationFilter matches the AggregationName of the Aggregator, the filter is put in OR (if it matches) or in AND (if it does not match it).
Moreover, an AggregationFilter ensures that the related value is returned in the AggregationResults also if the top aggregation values returned by default do not contain it. */
    aggregationFilters?: AggregationFilter[] | undefined;
}
/** Request to aggregate shares based on the specified aggregators */
export interface ShareAggregationRequest extends ShareSearchAndAggregationBaseRequest {
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators: AggregatorBase[];
}
/** Base class for search results */
export interface BaseResultOfShare {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Share[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfShare extends BaseResultOfShare {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorWithAggregationBaseResultOfShare extends SearchBehaviorBaseResultOfShare {
    /** Results of the aggregation, if any aggregators was passed in the request. */
    aggregationResults?: AggregationResult[] | undefined;
}
/** Result for share search operation */
export interface ShareSearchResult extends SearchBehaviorWithAggregationBaseResultOfShare {
}
/** Share */
export interface Share {
    /** Share ID. */
    id: string;
    /** Name of share. */
    name?: string | undefined;
    /** List of shared content IDs. */
    contentIds: string[];
    /** Audit information. */
    audit: UserAudit;
    /** Date when share expires and cannot be accessed anymore. */
    expirationDate?: Date | undefined;
    /** Type of share. */
    shareType: ShareType;
    /** Share is readonly if the current user is not the creator but only the recipient. */
    isReadOnly: boolean;
}
/** Request to search shares */
export interface ShareSearchRequest extends ShareSearchAndAggregationBaseRequest {
    /** Limits the document count of the result set. */
    limit?: number;
    /** Fields and respective directions requested to sort the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
    debugMode?: boolean;
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators?: AggregatorBase[] | undefined;
}
export interface ContentStatisticsAggregated {
    /** Contains aggregated data for the complete lifetime of the Content */
    overall: ContentStatisticsData;
    /** Contains aggregated data according to requested time frames */
    timeFrames: ContentStatisticsAggregatedTimeFrameBucket[];
}
export interface ContentStatisticsData {
    /** Statistical data for downloads of a Content */
    downloads?: ContentDownloads | undefined;
    /** Statistical data of share-related activities for a Content */
    sharings: ContentSharings;
}
export interface ContentDownloads {
    /** Total downloads of content (regardless of formats, single download of multiple formats is counted once) */
    total: number;
    /** Downloads of content through basic Share */
    share: number;
    /** Downloads of content through embed */
    embed: number;
}
export interface ContentSharings {
    /** Times this Content was added to a Share (does not decrease when removed from Share) */
    shareAdd: number;
    /** Times this Content was added to an Embed (does not decrease when removed from Embed) */
    embedAdd: number;
}
export interface ContentStatisticsAggregatedTimeFrameBucket {
    /** The timeframe for which statistical data in this bucket was aggregated */
    timeFrame: string;
    /** Aggregated data for timeframe */
    data: ContentStatisticsData;
}
export interface ExportContentStatisticsRequest {
    /** Allows filtering of retrieved statistical data */
    filter?: ContentFilterRequest | undefined;
    /** Optional begin of time range for which statistical data should be exported */
    after?: Date | undefined;
    /** Optional end of time range for which statistical data should be exported */
    before?: Date | undefined;
    /** Whether exported information should be separated by api client */
    aggregateApiClients: boolean;
    /** Enrich export with Name display value of Content */
    includeContentNames: boolean;
    /** Desired temporal resolution of exported data. Must not be lower than 1 hour */
    interval?: string | undefined;
    /** Whether notifications should be published for progress and completion */
    notifyProgress: boolean;
}
export interface AddContentEventsRequest {
    /** Data to be added to statistics */
    events: AddContentEventsRequestItem[];
}
export interface AddContentEventsRequestItem {
    /** Specifies at which time the events happened. The information will be automatically aggregated according to internal temporal resolution of statistics. */
    timestamp: Date;
    /** Specifies content for which the events happened */
    contentId: string;
    /** Optionally specify the used ApiClient. Defaults to the API Client sending this request. */
    apiClientId?: string | undefined;
    /** Data to be added to statistics */
    statistics: ContentStatisticsDataEditable;
    /** Optionally specify an additional id under which the supplied data should be tracked. This
Id is only used internally and cannot be retrieved through API or export. */
    externalEventTraceId?: string | undefined;
}
export interface ContentStatisticsDataEditable {
    /** Statistical data for downloads of a Content */
    downloads?: ContentDownloadsEditable | undefined;
}
export interface ContentDownloadsEditable {
    /** Total downloads of content (regardless of formats, single download of multiple formats is counted once) */
    total: number;
    /** Downloads of content through basic Share */
    share: number;
    /** Downloads of content through embed */
    embed: number;
}
/** Request to update a template */
export interface TemplateUpdateRequest {
    /** Language specific names. */
    names: TranslatedStringDictionary;
    /** Values per media type for the template. */
    values: TemplateValue[];
}
/** Request to create a new template */
export interface TemplateCreateRequest extends TemplateUpdateRequest {
    /** Name of the template. */
    name: string;
    /** Language code of the template. */
    languageCode: string;
    /** Type of the template. */
    templateType: TemplateType;
}
/** Template */
export interface Template extends TemplateCreateRequest {
    /** ID of template. */
    id: string;
    /** Indicates if this is a read-only system template. */
    system?: boolean;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
export declare enum TemplateType {
    ShareMail,
    SharePage,
    NewUserRegisteredMail,
    UserLockedMail,
    UserUnlockedMail,
    UserReviewedMail,
    UserInvitationMail,
    ShareNotFoundPage,
    UserTriggeredDeactivationRequestMail,
    UserEmailConflictSolvedMail,
    NotificationMail,
    NotificationMailItem,
    DashboardPage,
    CommentNotificationMailItem
}
/** Media type specific value for a template */
export interface TemplateValue {
    /** Media type. */
    mediaType: string;
    /** Text. */
    text: string;
}
/** Result for template search operation */
export interface TemplateSearchResult {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Template[];
}
/** Request to search for templates */
export interface TemplateSearchRequest {
    /** Language code of the template. */
    languageCode?: string | undefined;
    /** Type of the template. */
    templateType?: TemplateType | undefined;
}
/** Creates a transfer. */
export interface CreateTransferRequest {
    /** Name of transfer. */
    name: string;
    /** Type of transfer. */
    transferType: TransferType;
    /** Files uploaded in transfer.
The client is responsible for uploading files to backend.
Required when TransferType is FileUpload or FileUploadAutoImport. */
    files?: TransferUploadFile[] | undefined;
    /** Weblinks downloaded in transfer.
The backend will download files using HTTP, therefore public access to files is needed.
Required when TransferType is WebDownload. */
    webLinks?: TransferWebLink[] | undefined;
    /** Name of collection created after transfer. */
    collectionName?: string | undefined;
    /** A value indicating whether to create a collection after importing the transfer. */
    createCollection: boolean;
}
/** Represents the base class for transfer items. */
export interface TransferFile {
    /** Replaced in favor of RequestId. Client generated identifier of the item. */
    identifier?: string | undefined;
    /** Client generated identifier of the item. */
    requestId?: string | undefined;
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
    /** Optional target filename of the file. */
    fileName?: string | undefined;
}
/** Represents a transfer and includes detailed information. */
export interface TransferDetail extends Transfer {
    /** Audit information. */
    audit: UserAudit;
    /** Number of items processed. */
    itemProgress?: number;
    /** Total number of items. */
    itemCount?: number;
    /** Number of items currently being uploaded. */
    fileUploadInProgressCount?: number;
    /** Number of items currently being processed in data extraction. */
    dataExtractionInProgressCount?: number;
    /** Number of items failed. */
    itemsFailed?: number;
    /** Number of items cancelled. */
    itemsCancelled?: number;
    /** Time stamp of last progress update from data extraction. */
    lastDataExtractionProgressTimeStamp?: Date | undefined;
    /** Time stamp of last progress update from upload. */
    lastFileUploadProgressTimeStamp?: Date | undefined;
}
export interface ImportTransferRequest {
    /** An optional id list of schemas with type layer. */
    layerSchemaIds?: string[] | undefined;
    /** The metadata to be assigned to the imported content. It's a dictionary of dynamic metadata whose structure is defined in the Layer schemas identified
by the LayerSchemaIds property. */
    metadata?: {
        [key: string]: any;
    } | undefined;
    /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
    contentPermissionSetIds?: string[] | undefined;
}
export interface ImportTransferPartialRequest {
    items?: FileTransferCreateItem[] | undefined;
}
export interface FileTransferCreateItem {
    fileId: string;
    /** An optional id list of schemas with type layer. */
    layerSchemaIds?: string[] | undefined;
    /** The metadata to be assigned to the imported content. It's a dictionary of dynamic metadata whose structure is defined in the Layer schemas identified
by the LayerSchemaIds property. */
    metadata?: {
        [key: string]: any;
    } | undefined;
    /** An optional id list of content permission sets. Controls content accessibility outside of content ownership. */
    contentPermissionSetIds?: string[] | undefined;
}
/** Base class for search results */
export interface BaseResultOfTransfer {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: Transfer[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfTransfer extends BaseResultOfTransfer {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Result from a search for transfers. */
export interface TransferSearchResult extends SearchBehaviorBaseResultOfTransfer {
}
/** Request to search for transfers. */
export interface TransferSearchRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Limits the document count of the result set. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Enable debug mode: additional debug information regarding the query execution and reason of the matched documents are returned in the TransferSearchResult.
Warning! It severely affects performance. */
    debugMode: boolean;
}
/** Representation of a file transfer. */
export interface FileTransfer {
    /** ID of file transfer. */
    id: string;
    /** Name of file transfer. */
    name: string;
    /** Replaced in favor of RequestId. Client provided identifier. */
    identifier?: string | undefined;
    /** Client provided identifier. */
    requestId: string;
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
    /** Outputs rendered during data extraction phase. */
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
export interface FileTransferOutput {
    id?: string | undefined;
    filePath?: string | undefined;
    outputSource: OutputSource;
}
export declare enum OutputSource {
    Rendered,
    Embedded
}
export declare enum FileTransferState {
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
/** Base class for search results */
export interface BaseResultOfFileTransfer {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: FileTransfer[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfFileTransfer extends BaseResultOfFileTransfer {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Result from a search for file transfers. */
export interface FileTransferSearchResult extends SearchBehaviorBaseResultOfFileTransfer {
}
/** Request to search for file transfers. */
export interface FileTransferSearchRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Limits the document count of the result set. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
}
/** Deletes files from transfer. */
export interface FileTransferDeleteRequest {
    /** ID of transfer. */
    transferId: string;
    /** List of IDs of file transfers to delete. */
    fileTransferIds: string[];
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
/** Base class for search results */
export interface BaseResultOfUserRole {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: UserRole[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfUserRole extends BaseResultOfUserRole {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Holds results of the user role search. */
export interface UserRoleSearchResult extends SearchBehaviorBaseResultOfUserRole {
}
/** Represents a user role, which associates users with user rights. */
export interface UserRoleEditable {
    /** Language specific user role names. */
    names: TranslatedStringDictionary;
    /** All user rights for this user role. */
    userRights: UserRight[];
}
/** Represents a user role, which associates users with user rights. */
export interface UserRole extends UserRoleEditable {
    /** User role ID. */
    id: string;
}
export interface UserRoleSearchRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Fields and respective directions requested to sort the search results. */
    sort?: SortInfo[] | undefined;
    /** Limits the document count of the result set. Defaults to 30. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Filter applied to user roles. */
    filter?: FilterBase | undefined;
    /** Enable debug mode to get as result of the Searched additional debug information. Warning! It severely affects performance. */
    debugMode: boolean;
    /** Which languages to search against when using the search string. */
    searchLanguages?: string[] | undefined;
    /** Defines if the user roles with system user role Administrator is returned. */
    includeAdministratorSystemUserRole: boolean;
}
/** Represents a user role, which associates users with user rights. */
export interface UserRoleDetail extends UserRole {
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
/** Holds information needed to create multiple user roles. */
export interface UserRoleCreateManyRequest {
    /** Multiple user creation requests. */
    items: UserRoleCreateRequest[];
}
/** Holds information needed for user role creation. */
export interface UserRoleCreateRequest extends UserRoleEditable {
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
}
/** Holds information about which user roles and how are requested to be updated. */
export interface UserRoleUpdateManyRequest {
    /** New value for user roles with specified IDs. */
    items: UserRole[];
}
/** Holds information about which user roles are requested to be deleted. */
export interface UserRoleDeleteManyRequest {
    /** IDs of the user roles to delete. */
    ids: string[];
}
/** Detail information about a user. */
export interface UserDetail extends User {
    /** User roles the user should be assigned to. Overwrites the original user roles. */
    userRoles?: UserRoleAssignment[] | undefined;
    /** Comment saved for the user. */
    comment?: string | undefined;
    /** Preferred language, e.g. for correspondence. */
    languageCode?: string | undefined;
    /** User's address. */
    address?: UserAddress | undefined;
    /** Identity provider that governs this user or null for Picturepark's own IdentityServer. */
    identityProviderId?: string | undefined;
    /** Owner tokens referencing the user. */
    ownerTokens?: OwnerToken[] | undefined;
    /** Authorization state the user is currently in. */
    authorizationState?: AuthorizationState;
    /** Locked users are unable to log in and use the system. */
    isLocked?: boolean;
    /** Life cycle state the user is currently in. */
    lifeCycle?: LifeCycle;
    /** The support user is a user created for Picturepark support personnel. */
    isSupportUser?: boolean;
    /** Read-only users can't be removed from the system, e.g. service user. */
    isReadOnly?: boolean;
    /** Federated user is a user who is (currently) governed by an external identity provider. */
    isFederated?: boolean;
    /** Audit information. */
    audit?: UserAuditDetail | undefined;
}
export interface UserRoleAssignment {
    /** User role assigned. */
    userRole?: UserRole | undefined;
    /** Marks user roles that were assigned automatically to a federated user based on group mapping of a federated identity provider. */
    isFederated: boolean;
}
export interface OwnerToken {
    /** The ownertoken id. */
    id?: string | undefined;
    /** The id of the user to whom this ownertoken currently belongs to. */
    userId?: string | undefined;
}
/** Represents the updateable fields of the user. */
export interface UserUpdateRequest extends User {
    /** User roles the user should be assigned to. Overwrites the original user roles. */
    userRoles?: UserRole[] | undefined;
    /** Comment saved for the user. */
    comment?: string | undefined;
    /** Preferred language, e.g. for correspondence. */
    languageCode: string;
    /** User's address. */
    address?: UserAddress | undefined;
    /** Identity provider that governs this user or null for Picturepark's own IdentityServer. */
    identityProviderId?: string | undefined;
}
export interface UserLockRequest {
    /** Indicates the requested lock state of the user.
If _true_ was specified, the user will be _locked_. _False_ will unlock the previously _locked_ user.
If User is already in desired state, this will be returned as error. */
    lock: boolean;
}
/** Base class for requests affecting multiple users */
export interface UserManyRequestBase {
    /** User IDs. */
    userIds: string[];
}
/** Request update of lock state of multiple users */
export interface UserLockManyRequest extends UserManyRequestBase {
    /** Indicates the requested lock state of the users.
If _true_ was specified, the users will be _locked_. _False_ will unlock the previously _locked_ users.
Users which are already in desired state will be returned as errors. */
    lock: boolean;
}
/** Holds additional information for user review. */
export interface UserReviewRequest {
    /** Indicates the requested review state of the user.
If _true_ is specified, user will be transitioned into _reviewed_ state. _False_ will put the user back into _to be reviewed_ state. */
    reviewed: boolean;
    /** If true, no email will be sent to inform the user that they were reviewed. */
    suppressEmail: boolean;
}
/** Review many request */
export interface UserReviewManyRequest extends UserManyRequestBase {
    /** Indicates the requested review state of the user.
If _true_ is specified, user will be transitioned into _reviewed_ state. _False_ will put the user back into _to be reviewed_ state. */
    reviewed: boolean;
    /** If true, no email will be sent to inform the users that they were reviewed. */
    suppressEmail?: boolean;
}
/** Request for inviting users (applies to users in states ToBeReviewed + Reviewed) */
export interface UserInviteManyRequest extends UserManyRequestBase {
}
/** Request for re-inviting users (applies to users in states Invited) */
export interface UserReinviteManyRequest extends UserManyRequestBase {
}
/** Request to update role assignment of users. */
export interface UserRoleAssignManyRequest extends UserManyRequestBase {
    /** Users roles to modify. */
    userRoleIds: string[];
    /** Defines how to apply specified UserRoleIds to UserIds
If an operation results in no change for a user, that user will be returned as succeeded. */
    operation: UserRoleAssignmentOperationType;
}
/** User role assignment operation type */
export declare enum UserRoleAssignmentOperationType {
    Add,
    Remove,
    Update
}
/** Details of the user deletion. */
export interface UserDeleteRequest {
    /** User ID of user who will take over the ownership of the content currently owned by the deleted user. */
    ownerTokenTransferUserId?: string | undefined;
}
/** Holds information needed for user creation. */
export interface UserCreateRequest {
    /** User's first name. */
    firstName?: string | undefined;
    /** User's last name. */
    lastName?: string | undefined;
    /** Email address of the user (doubles as username). */
    emailAddress: string;
    /** Preferred language, e.g. for correspondence. */
    languageCode: string;
    /** IDs of user roles the user is assigned to. */
    userRoleIds?: string[] | undefined;
    /** User address. */
    address?: UserAddress | undefined;
}
/** Base class for search results */
export interface BaseResultOfUserWithRoles {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: UserWithRoles[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfUserWithRoles extends BaseResultOfUserWithRoles {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorWithAggregationBaseResultOfUserWithRoles extends SearchBehaviorBaseResultOfUserWithRoles {
    /** Results of the aggregation, if any aggregators was passed in the request. */
    aggregationResults?: AggregationResult[] | undefined;
}
/** Holds results of the user search. */
export interface UserSearchResult extends SearchBehaviorWithAggregationBaseResultOfUserWithRoles {
}
/** User information retrieved via search */
export interface UserWithRoles {
    /** IDs of user roles user is assigned to */
    userRoleIds?: string[] | undefined;
    /** User's Picturepark ID. */
    id: string;
    /** User's first name. */
    firstName?: string | undefined;
    /** User's last name. */
    lastName?: string | undefined;
    /** Email address of the user (doubles as username). */
    emailAddress: string;
    /** Authorization state the user is currently in. */
    authorizationState: AuthorizationState;
    /** Life cycle state the user is currently in. */
    lifeCycle: LifeCycle;
    /** A locked user is not allowed to log in. */
    isLocked: boolean;
    /** A support user is a user created for Picturepark support personnel. */
    isSupportUser: boolean;
    /** Read-only users can't be removed from the system, e.g. service user. */
    isReadOnly: boolean;
    /** Federated user is a user who is (currently) governed by an external identity provider. */
    isFederated: boolean;
}
/** Represents an aggregation request over users. */
export interface UserSearchAndAggregationBaseRequest {
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Return only users in certain life cycle state(s). */
    lifeCycleFilter: LifeCycleFilter;
    /** Return only users with certain user rights. */
    userRightsFilter?: UserRight[] | undefined;
    /** Special filters used to filter down independently the aggregations' values and the search results on specific conditions.
For the search results, the aggregation filters are used to create a Filter that is put in AND with the eventual existing Filter of the search request to nail down the search results. The filters generated
by the aggregation filters are put in OR each other if they have the same AggregationName, and then such groups are put in AND.
For the aggregation values, only the original Filter of the search request is used to nail down the data to be considered for the aggregations. Then, on top of that, for each aggregator in the search request, a Filter is created to filter down the
aggregation results of that aggregation: depending if the AggregationName of the AggregationFilter matches the AggregationName of the Aggregator, the filter is put in OR (if it matches) or in AND (if it does not match it).
Moreover, an AggregationFilter ensures that the related value is returned in the AggregationResults also if the top aggregation values returned by default do not contain it. */
    aggregationFilters?: AggregationFilter[] | undefined;
    /** Includes the service user in result. */
    includeServiceUser: boolean;
    /** Restricts the results to users that are editable for calling user.
If set to true, IncludeServiceUser is ignored. */
    editableOnly: boolean;
}
/** Represents user search request. */
export interface UserSearchRequest extends UserSearchAndAggregationBaseRequest {
    /** Fields and respective directions requested to sort the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
    /** Limits the document count of the result set. */
    limit?: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Enable debug mode to get as result of the Searched additional debug information. Warning! Severely affects performance. */
    debugMode?: boolean;
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators?: AggregatorBase[] | undefined;
}
/** Represents an aggregation request over users. */
export interface UserAggregationRequest extends UserSearchAndAggregationBaseRequest {
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators: AggregatorBase[];
}
/** Request to update identity provider assignment of users. */
export interface UserUpdateIdentityProviderManyRequest extends UserManyRequestBase {
    /** Identity provider to assign to users. */
    identityProviderId?: string | undefined;
}
/** Represents a list of source/target fields for XMP mappings */
export interface XmpMappingTargets {
    /** Fields in XMP/Exif. */
    xmpFields: XmpField[];
    /** Fields in metadata. */
    metadataFields: MetadataField[];
}
/** Represents a field in XMP that can be mapped from or to */
export interface XmpField {
    /** Path of the field in XMP. */
    path?: string | undefined;
    /** Indicates if the field can be written to. */
    isWritable: boolean;
    /** Data type of the field. */
    dataType: XmpFieldDataType;
}
/** Data types of XMP fields */
export declare enum XmpFieldDataType {
    Simple,
    LangAlt,
    List
}
/** Represents a field in metadata that XMP can be mapped to or from */
export interface MetadataField {
    /** Path to the field in metadata. */
    path: string;
    /** Indicates if the field can act as target for a mapping.
If field is read-only, it can only act as source of a mapping. */
    isWritable: boolean;
    /** Data type of the field. */
    dataType: MetadataFieldDataType;
    /** A list of field IDs that can be used as a key field when a tagbox is mapped. */
    availableKeyFields?: string[] | undefined;
}
/** Data types of metadata fields */
export declare enum MetadataFieldDataType {
    Simple,
    TranslatedString,
    Tagbox
}
/** Base class for search results */
export interface BaseResultOfXmpMappingEntry {
    /** The total number of matching documents. */
    totalResults: number;
    /** The matched documents. */
    results: XmpMappingEntry[];
    /** The search execution time in milliseconds. */
    elapsedMilliseconds: number;
    /** An optional token to access the next page of results for those endpoints that support backend scrolling logic. */
    pageToken?: string | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorBaseResultOfXmpMappingEntry extends BaseResultOfXmpMappingEntry {
    /** The search string used to query the data. */
    searchString?: string | undefined;
    /** Flag to notify if the SearchString was modified compared to the original requested one. */
    isSearchStringRewritten?: boolean;
    /** Additional information regarding the query execution and reason of the matched documents. Multiple items are returned if multiple queries were performed. */
    queryDebugInformation?: QueryDebugInformation[] | undefined;
}
/** Base class for search result queries that support SearchBehaviors */
export interface SearchBehaviorWithAggregationBaseResultOfXmpMappingEntry extends SearchBehaviorBaseResultOfXmpMappingEntry {
    /** Results of the aggregation, if any aggregators was passed in the request. */
    aggregationResults?: AggregationResult[] | undefined;
}
/** Holds results of search for XMP mappings */
export interface XmpMappingEntrySearchResult extends SearchBehaviorWithAggregationBaseResultOfXmpMappingEntry {
}
/** Editable properties of a XMP mapping entry */
export interface XmpMappingEntryEditable {
    /** Direction of the mapping. */
    direction: MappingDirection;
    /** Priority of the mapping. */
    priority: number;
    /** Stop processing further mappings for the same field if a value was found. */
    stopProcessing: boolean;
    /** Path to source property in XMP. */
    xmpPath: string;
    /** Path to target property in metadata. */
    metadataPath: string;
    /** Optional additional configuration for the mapping. */
    configuration?: XmpMappingEntryConfigurationBase | undefined;
}
/** XMP mapping entry */
export interface XmpMappingEntry extends XmpMappingEntryEditable {
    id: string;
}
/** Direction of mapping of XMP data */
export declare enum MappingDirection {
    XmpToMetadata,
    MetadataToXmp,
    Both
}
export interface XmpMappingEntryConfigurationBase {
    kind: string;
}
/** Additional configuration for a mapping tagbox fields */
export interface XmpMappingEntryConfigurationTagbox extends XmpMappingEntryConfigurationBase {
    /** IDs of key fields. */
    keyFieldIds: string[];
    /** Indicates if lookup shall be performed case sensitive. */
    caseSensitive: boolean;
    /** Indicates if child schemas should also be included. */
    includeAllSchemaChildren: boolean;
}
/** Search request for getting configured XMP mappings */
export interface XmpMappingEntrySearchRequest {
    /** Enable debug mode to get as result of the Searched additional debug information. Warning! Severely affects performance. */
    debugMode: boolean;
    /** Special filters used to filter down independently the aggregations' values and the search results on specific conditions.
For the search results, the aggregation filters are used to create a Filter that is put in AND with the eventual existing Filter of the search request to nail down the search results. The filters generated
by the aggregation filters are put in OR each other if they have the same AggregationName, and then such groups are put in AND.
For the aggregation values, only the original Filter of the search request is used to nail down the data to be considered for the aggregations. Then, on top of that, for each aggregator in the search request, a Filter is created to filter down the
aggregation results of that aggregation: depending if the AggregationName of the AggregationFilter matches the AggregationName of the Aggregator, the filter is put in OR (if it matches) or in AND (if it does not match it).
Moreover, an AggregationFilter ensures that the related value is returned in the AggregationResults also if the top aggregation values returned by default do not contain it. */
    aggregationFilters?: AggregationFilter[] | undefined;
    /** List of aggregators that defines how the items should be aggregated. */
    aggregators?: AggregatorBase[] | undefined;
    /** An optional search filter. Limits the document result set. */
    filter?: FilterBase | undefined;
    /** Limits the document count of the result set. */
    limit: number;
    /** The token used to retrieve the next page of results. It must be null on first request and only filled with the returned pageToken to request next page of results. */
    pageToken?: string | undefined;
    /** Limits the search by using a query string filter. The Lucene query string syntax is supported. */
    searchString?: string | undefined;
    /** An optional list of search behaviors. All the passed behaviors will be applied. */
    searchBehaviors?: SearchBehavior[] | undefined;
    /** Fields and respective directions requested to sort the search results. Sorting on a not indexed field will throw an exception. */
    sort?: SortInfo[] | undefined;
}
/** Request to create XMP mapping */
export interface XmpMappingEntryCreateRequest extends XmpMappingEntryEditable {
    /** Optional client reference for this request.
Will be returned back in response to make easier for clients to match request items with the respective results.
It is not persisted anywhere and it is ignored in single operations. */
    requestId?: string | undefined;
}
/** Request to create many XMP mappings */
export interface XmpMappingEntryCreateManyRequest {
    /** Mappings to create. */
    items?: XmpMappingEntryCreateRequest[] | undefined;
}
/** Request to update many XMP mappings */
export interface XmpMappingEntryUpdateManyRequest {
    /** Items to update. */
    items?: XmpMappingEntry[] | undefined;
}
/** Request to delete many XMP mappings */
export interface XmpMappingEntryDeleteManyRequest {
    /** IDs to delete. */
    ids?: string[] | undefined;
}
export interface DataDictionary {
    [key: string]: any;
}
export interface Message {
    id?: string | undefined;
    retries: number;
    retriesPerformed: number;
    priority: number;
    deduplicate: boolean;
    kind: string;
}
export interface LiveStreamMessage extends Message {
    customerId?: string | undefined;
    customerAlias?: string | undefined;
    timestamp?: Date;
    scope?: string | undefined;
    documentChange?: DocumentChange | undefined;
    applicationEvent?: ApplicationEvent | undefined;
}
export interface DocumentChange {
    documentName?: string | undefined;
    documentId?: string | undefined;
    version: number;
    action?: string | undefined;
    timeStamp: Date;
}
export interface ApplicationEvent {
    timestamp: Date;
    kind: string;
}
export interface TransferEvent extends ApplicationEvent {
    transferId?: string | undefined;
    state?: TransferState;
}
export interface ReindexEvent extends ApplicationEvent {
    indexId?: string | undefined;
    state?: IndexState;
}
export declare enum IndexState {
    Draft,
    Create,
    Inactive,
    Active,
    Closed,
    ReindexInProgress,
    Cancelled
}
export interface ContentDetailViewEvent extends ApplicationEvent {
    contentIds?: string[] | undefined;
}
export interface ContentDownloadEvent extends ApplicationEvent {
    downloadInfos?: DownloadTrackingInfo[] | undefined;
    fileSize?: number;
    shareToken?: string | undefined;
    range?: string | undefined;
}
export interface DownloadTrackingInfo {
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    contentDisposition: ContentDisposition;
}
export declare enum ContentDisposition {
    Attachment,
    Inline
}
export interface ContentShareEvent extends ApplicationEvent {
    shareId?: string | undefined;
    shareType?: ShareType;
    addedContentIds?: string[] | undefined;
}
export interface SessionRenewalEvent extends ApplicationEvent {
    authorizationState?: AuthorizationState;
}
export interface SharePageViewEvent extends ApplicationEvent {
    shareToken?: string | undefined;
}
export interface ApiStatisticsEvent extends ApplicationEvent {
    requestsPerClient?: {
        [key: string]: number;
    } | undefined;
}
export interface TrafficStatisticsEvent extends ApplicationEvent {
    service?: string | undefined;
    requestSize?: number;
    responseSize?: number;
}
export interface OutputRenderedEvent extends ApplicationEvent {
    outputId?: string | undefined;
    contentId?: string | undefined;
    outputFormatId?: string | undefined;
    renderingState?: OutputRenderingState;
}
export interface ConfigurationChangeEvent extends ApplicationEvent {
    documentType?: string | undefined;
}
export interface CustomerChangeEvent extends ConfigurationChangeEvent {
    lifeCycle?: LifeCycle;
}
export interface SearchReindexCompletedEvent extends ApplicationEvent {
    searchIndex?: SearchIndexType;
    items?: number;
    duration?: string;
}
export declare enum SearchIndexType {
    Content,
    ListItem
}
export interface BusinessRuleFiredEvent extends ApplicationEvent {
    details?: BusinessRuleFiredEventDetail[] | undefined;
}
export interface BusinessRuleFiredEventDetail {
    documentId?: string | undefined;
    documentType?: string | undefined;
    ruleIds?: string[] | undefined;
}
export interface BusinessProcessCancellationRequestedEvent extends ApplicationEvent {
    businessProcessId?: string | undefined;
}
export interface DataExtractionRepairEvent extends ApplicationEvent {
    contentRepairRequestId?: string | undefined;
    contentId?: string | undefined;
    error?: ErrorResponse | undefined;
    hadChanges?: boolean;
}
export interface ConsoleMessage extends Message {
    command?: string | undefined;
    arguments?: TupleOfStringAndString[] | undefined;
    targetQueue?: string | undefined;
}
export interface TupleOfStringAndString {
    item1: string;
    item2: string;
}
export interface NodeInfoMessage extends Message {
    nodeId?: string | undefined;
    hostName?: string | undefined;
    lastResponseTime?: Date;
    serviceName?: string | undefined;
    fileVersion?: string | undefined;
    productVersion?: string | undefined;
    release?: string | undefined;
    logLevel?: string | undefined;
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
    characterCount?: number;
    characterCountWithSpaces?: number;
    lineCount?: number;
    pageCount?: number;
    slideCount?: number;
    paragraphCount?: number;
    revisionNumber?: number;
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
    width?: number;
    height?: number;
    widthInInch?: number;
    heightInInch?: number;
    widthInCm?: number;
    heightInCm?: number;
    colorSpace?: string | undefined;
    colorProfile?: string | undefined;
    bitsPerPixel?: number;
    bitsPerChannel?: number;
    channels?: string | undefined;
    pixelFormat?: string | undefined;
    hasAlpha?: boolean;
    isIndexed?: boolean;
    isExtended?: boolean;
    horizontalResolution?: number;
    verticalResolution?: number;
    totalFrames?: number;
    totalUnspecifiedTiffExtraChannels?: number;
    hasExifData?: boolean;
    hasIptcData?: boolean;
    hasAdobeResourceData?: boolean;
    hasXmpData?: boolean;
    uncompressedSizeInBytes?: number;
}
export interface VideoMetadata extends FileMetadata {
    width?: number;
    height?: number;
    durationInSeconds?: number;
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
export interface VectorMetadata extends FileMetadata {
    author?: string | undefined;
    creator?: string | undefined;
    publisher?: string | undefined;
    company?: string | undefined;
    title?: string | undefined;
    pageCount?: number;
    epsInfo?: EpsMetadata | undefined;
}
/** Base class of meta information for a dynamic view field */
export interface DynamicViewFieldMetaBase {
    kind: string;
}
/** Meta information for a dynamic view field */
export interface DynamicViewFieldMeta extends DynamicViewFieldMetaBase {
    /** Filter for the dynamic view field. */
    filter: FilterBase;
    /** Sorting information. */
    sort?: SortInfo[] | undefined;
    /** Target doc type. */
    targetDocType: string;
}
/** Meta information for a dynamic view field including a flag that indicates if the rendered filter does match some items. */
export interface DynamicViewFieldMetaWithHasItems extends DynamicViewFieldMeta {
    /** indicates if the rendered filter does match some items. */
    hasItems?: boolean;
}
/** Meta information for a dynamic view field where the filter could not be rendered successfully. */
export interface DynamicViewFieldMetaWithRenderingError extends DynamicViewFieldMetaBase {
    /** Error. */
    error?: string | undefined;
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
export declare class SwaggerException extends Error {
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
export declare class OidcClientSettings {
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
export declare class AccessTokenAuthClient extends AuthClient {
    private accessToken;
    constructor(pictureparkApiUrl: string, customerAlias: string, accessToken: string);
    transformHttpRequestOptions(options: RequestInit): Promise<RequestInit>;
}
