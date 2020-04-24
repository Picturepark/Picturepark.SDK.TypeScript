import { Component, Input, OnChanges, SimpleChanges, Injector } from '@angular/core';

// LIBRARIES
import { ThumbnailSize, Channel, Content, ContentSearchFacade } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import { ShareContentDialogComponent } from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../shared-module/services/basket/basket.service';

// INTERFACES
import { ContentDownloadDialogService } from '../content-download-dialog/content-download-dialog.service';

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
  @Input()
  public channel: Channel | null = null;

  basket$ = this.basketService.basketChange;

  constructor(
    private basketService: BasketService,
    public facade: ContentSearchFacade,
    private contentDownloadDialogService: ContentDownloadDialogService,
    injector: Injector
  ) {
    super('ContentBrowserComponent', injector, facade);
  }

  async init(): Promise<void> {}

  initSort(): void {
    this.sortingTypes = [
      {
        field: 'relevance',
        name: this.translationService.translate('SortMenu.Relevance'),
      },
      {
        field: 'fileMetadata.fileName',
        name: this.translationService.translate('SortMenu.FileName'),
      },
      {
        field: 'audit.creationDate',
        name: this.translationService.translate('SortMenu.CreationDate'),
      },
      {
        field: 'audit.modificationDate',
        name: this.translationService.translate('SortMenu.ModificationDate'),
      },
    ];
    this.activeSortingType = this.sortingTypes[0];

    this.views = [
      {
        name: 'List',
        icon: 'list',
        type: 'list',
        thumbnailSize: ThumbnailSize.Small,
      },
      {
        name: 'Small',
        icon: 'collections',
        type: 'thumbnailSmall',
        thumbnailSize: ThumbnailSize.Small,
      },
      {
        name: 'Medium',
        icon: 'collections',
        type: 'thumbnailMedium',
        thumbnailSize: ThumbnailSize.Medium,
      },
      {
        name: 'Large',
        icon: 'collections',
        type: 'thumbnailLarge',
        thumbnailSize: ThumbnailSize.Large,
      },
    ];
    this.activeView = this.views[2];
  }

  onScroll(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['channel'] && changes['channel'].currentValue) {
      this.facade.searchRequestState.channelId = this.channel!.id;
      // Trigger load
      if (this.channel?.aggregations) {
        this.facade.patchRequestState({ aggregators: this.channel.aggregations });
      } else {
        this.facade.patchRequestState({});
      }
    }
  }

  public previewSelectedItem(): void {
    const content = this.items.find((i) => i === this.selectedItems[0]);
    if (content) {
      this.previewItem(content);
    }
  }

  public trackByThumbnailSize(index: number, thumbnailSize: string): string {
    return thumbnailSize;
  }

  // OPEN SHARE CONTENT DIALOG
  openShareContentDialog(): void {
    const dialogRef = this.dialog.open(ShareContentDialogComponent, {
      data: this.selectedItems,
      autoFocus: false,
      width: '640px',
    });

    const instance = dialogRef.componentInstance;
    instance.title = 'ShareContentDialog.CreateShare';
  }

  // OPEN DOWNLOAD CONTENT DIALOG
  openDownloadContentDialog(): void {
    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: this.selectedItems,
    });
  }

  // CHECK IF ELEMENT CONTAINS CLASS NAME
  checkContains(elementClassName: string): boolean {
    const containClasses = ['browser__items'];
    return containClasses.some((iClass) => elementClassName.includes(iClass));
  }

  // CLEAR SELECTION
  cancel(): void {
    this.selectionService.clear();
  }
}
