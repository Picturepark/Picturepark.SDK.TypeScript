import { Component, Input, OnChanges, SimpleChanges, Injector } from '@angular/core';

// LIBRARIES
import {
  ThumbnailSize,
  Channel,
  Content,
  ContentSearchFacade,
  SortDirection,
  UserRight,
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
  @Input() channel: Channel;
  hasManageSharingsRight = this.sessionService.hasRight(UserRight.ManageSharings);

  constructor(
    private sessionService: SessionService,
    private basketService: BasketService,
    public facade: ContentSearchFacade,
    private contentDownloadDialogService: ContentDownloadDialogService,
    injector: Injector
  ) {
    super('ContentBrowserComponent', injector, facade);
  }

  async init(): Promise<void> {}

  initSort(): void {
    this.setSortFields();

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

  private setSortFields() {
    if (this.channel.sortFields?.length) {
      this.sortingTypes = this.channel.sortFields.map(s => ({
        name: this.translationService.translate(s.names),
        field: s.path,
      }));

      let sortField: ISortItem | undefined;
      let sortDirection: SortDirection | undefined;

      if (this.channel.sort?.length) {
        sortField = this.sortingTypes.find(f => f.field === this.channel.sort[0].field);
        sortDirection = this.channel.sort[0].direction;
      }

      this.isAscending = sortDirection ? sortDirection === SortDirection.Asc : false;
      this.setSort(sortField ?? this.sortingTypes[0], this.isAscending, false);
    }
  }

  onScroll(): void {
    this.loadData()?.subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const channel = changes?.channel?.currentValue as Channel;
    if (channel) {
      this.setSortFields();

      this.facade.searchRequestState.channelId = channel.id;
      // Trigger load
      this.facade.patchRequestState({ aggregators: channel.aggregations });
    }
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
