import { Component, Input, OnChanges, SimpleChanges, Injector } from '@angular/core';

// LIBRARIES
import {
  ThumbnailSize,
  Channel,
  Content,
  ContentSearchFacade,
  SortDirection,
  UserRight,
  StorageKey,
  parseJSON,
  LoggerService,
  ContentSearchInputState,
  AggregationFilter,
  SortInfo,
} from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import { ShareContentDialogComponent } from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../shared-module/services/basket/basket.service';

// INTERFACES
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';
import { ItemBasketSelection } from './components/content-browser-item/interfaces/content-browser-item.interface';
import { ISortItem } from '../../shared-module/components/browser-base/interfaces/sort-item';
import { SessionService } from '../../shared-module/services/session/session.service';

@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html',
  styleUrls: [
    '../../shared-module/components/browser-base/browser-base.component.scss',
    './content-browser.component.scss',
    './content-browser-resp.component.scss',
  ],
})
export class ContentBrowserComponent extends BaseBrowserComponent<Content> implements OnChanges {
  @Input() channel: Channel | null = null;
  hasManageSharingsRight = this.sessionService.hasRight(UserRight.ManageSharings);

  constructor(
    private sessionService: SessionService,
    private basketService: BasketService,
    public facade: ContentSearchFacade,
    private contentDownloadDialogService: ContentDownloadDialogService,
    private loggerService: LoggerService,
    injector: Injector
  ) {
    super('ContentBrowserComponent', injector, facade);
  }

  async init(): Promise<void> {}

  initSort(): void {
    this.views = [
      {
        name: this.translationService.translate('ContentBrowser.ViewTypeList'),
        icon: 'list',
        type: 'list',
        thumbnailSize: ThumbnailSize.Small,
      },
      {
        name: this.translationService.translate('ContentBrowser.ThumbnailSmall'),
        icon: 'collections',
        type: 'thumbnailSmall',
        thumbnailSize: ThumbnailSize.Small,
      },
      {
        name: this.translationService.translate('ContentBrowser.ThumbnailMedium'),
        icon: 'collections',
        type: 'thumbnailMedium',
        thumbnailSize: ThumbnailSize.Medium,
      },
      {
        name: this.translationService.translate('ContentBrowser.ThumbnailLarge'),
        icon: 'collections',
        type: 'thumbnailLarge',
        thumbnailSize: ThumbnailSize.Large,
      },
    ];
    this.activeView = this.views[2];
  }

  private setSortFields(sort: SortInfo[]) {
    if (!this.channel?.sortFields?.length) {
      this.sortingTypes = [];
      this.activeSortingType = undefined;
      return;
    }

    this.sortingTypes = this.channel.sortFields.map(s => ({
      name: this.translationService.translate(s.names),
      field: s.path,
    }));

    let sortField: ISortItem | undefined;
    let sortDirection: SortDirection | undefined;

    if (sort?.length) {
      sortField = this.sortingTypes.find(f => f.field === sort?.[0].field);
      sortDirection = sort[0].direction;
    }

    this.setSort(sortField ?? this.sortingTypes[0], sortDirection ? sortDirection === SortDirection.Asc : false, false);
  }

  onScroll(): void {
    this.loadData()?.subscribe();
  }

  update(searchRequestState: ContentSearchInputState) {
    const states = this.channelSearchRequestStates;
    states[searchRequestState.channelId] = searchRequestState;
    this.localStorageService.set(StorageKey.ChannelSearchRequestStates, JSON.stringify(states));
    super.update(searchRequestState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const channel = changes?.channel?.currentValue as Channel;
    if (changes?.channel?.previousValue?.id !== channel?.id) this.facade.resetRequestState();
    if (!channel) return;

    this.localStorageService.set(StorageKey.ActiveChannel, JSON.stringify(channel.toJSON()));

    const searchRequestState = this.channelSearchRequestStates[channel.id];

    this.setSortFields(searchRequestState?.sort ?? channel.sort);

    // Trigger load
    this.facade.patchRequestState({
      channelId: channel.id,
      ...(channel.aggregations && { aggregators: channel.aggregations }),
      ...(searchRequestState && {
        searchMode: searchRequestState.searchMode,
        searchString: searchRequestState.searchString,
        aggregationFilters: searchRequestState.aggregationFilters.map(filter => AggregationFilter.fromJS(filter)),
        sort: searchRequestState.sort,
      }),
    });
  }

  get channelSearchRequestStates(): { [id: string]: ContentSearchInputState } {
    const statesStr = this.localStorageService.get(StorageKey.ChannelSearchRequestStates);
    const statesJson = statesStr ? parseJSON(statesStr, this.loggerService) : undefined;
    return statesJson || {};
  }

  previewSelectedItem(): void {
    const content = this.items.find(i => i === this.selectedItems[0]);
    if (content) {
      this.previewItem(content);
    }
  }

  trackByThumbnailSize(index: number, thumbnailSize: string): string {
    return thumbnailSize;
  }

  // OPEN SHARE CONTENT DIALOG
  openShareContentDialog(): void {
    const dialogRef = this.dialog.open(ShareContentDialogComponent, {
      data: [...this.selectedItems],
      autoFocus: false,
      maxHeight: '95vh',
      maxWidth: '99vw',
      width: '840px',
      panelClass: ['pp-dialog'],
    });

    const instance = dialogRef.componentInstance;
    instance.title = 'ShareContentDialog.CreateShare';
  }

  // OPEN DOWNLOAD CONTENT DIALOG
  openDownloadContentDialog(): void {
    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: [...this.selectedItems],
    });
  }

  handleBasketChanges(basketSelection: ItemBasketSelection) {
    const selectedItemsIds = this.selectedItems.map(i => i.id);
    if (selectedItemsIds.includes(basketSelection.itemId)) {
      if (basketSelection.addItem) {
        this.basketService.addItems(selectedItemsIds);
      } else {
        this.basketService.removeItems(selectedItemsIds);
      }
    } else {
      if (basketSelection.addItem) {
        this.basketService.addItem(basketSelection.itemId);
      } else {
        this.basketService.removeItem(basketSelection.itemId);
      }
    }
  }

  // CHECK IF ELEMENT CONTAINS CLASS NAME
  checkContains(elementClassName: string): boolean {
    const containClasses = ['browser__items'];
    return containClasses.some(iClass => elementClassName.includes(iClass));
  }

  // CLEAR SELECTION
  cancel(): void {
    this.selectionService.clear();
  }
}
