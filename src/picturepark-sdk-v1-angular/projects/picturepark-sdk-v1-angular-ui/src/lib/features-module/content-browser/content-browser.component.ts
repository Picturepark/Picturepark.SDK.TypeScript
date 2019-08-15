import { Component, Input, OnChanges, SimpleChanges, Injector } from '@angular/core';

// LIBRARIES
import {
  ContentService, ThumbnailSize, ContentSearchRequest, SortInfo, SortDirection,
  ContentSearchType, BrokenDependenciesFilter, LifeCycleFilter, Channel, SearchBehavior, Content, ContentSearchResult
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import {
  ShareContentDialogComponent
} from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../shared-module/services/basket/basket.service';

// INTERFACES
import { Observable } from 'rxjs';
import { ContentDownloadDialogService } from '../dialog/components/content-download-dialog/content-download-dialog.service';

// TODO: add virtual scrolling (e.g. do not create a lot of div`s, only that are presented on screen right now)
// currently experimental feature of material CDK
@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html',
  styleUrls: [
    '../../shared-module/components/browser-base/browser-base.component.scss',
    './content-browser.component.scss',
    './content-browser-resp.component.scss'
  ]
})
export class ContentBrowserComponent extends BaseBrowserComponent<Content> implements OnChanges {

  @Input()
  public channel: Channel | null = null;

  constructor(
    private basketService: BasketService,
    private contentService: ContentService,
    private contentDownloadDialogService: ContentDownloadDialogService,
    injector: Injector
  ) {

    super('ContentBrowserComponent', injector);

  }

  async init(): Promise<void> {
    // BASKET SUBSCRIBER
    const basketSubscription = this.basketService.basketChange.subscribe(basketItems => {
      this.items.forEach(model => model.isInBasket = basketItems.some(basketItem => basketItem === model.item.id));
    });

    // UNSUBSCRIBE
    this.subscription.add(basketSubscription);
  }

  initSort(): void {
    this.sortingTypes = [
      {
        field: 'relevance',
        name: this.translationService.translate('SortMenu.Relevance')
      }, {
        field: 'fileMetadata.fileName',
        name: this.translationService.translate('SortMenu.FileName')
      }, {
        field: 'audit.creationDate',
        name: this.translationService.translate('SortMenu.CreationDate')
      }, {
        field: 'audit.modificationDate',
        name: this.translationService.translate('SortMenu.ModificationDate')
      }
    ];
    this.activeSortingType = this.sortingTypes[0];

    this.views = [{
      name: 'List',
      icon: 'list',
      type: 'list'
    }, {
      name: 'Small',
      icon: 'collections',
      type: 'thumbnailSmall',
      thumbnailSize: ThumbnailSize.Small
    }, {
      name: 'Medium',
      icon: 'collections',
      type: 'thumbnailMedium',
      thumbnailSize: ThumbnailSize.Medium
    }, {
      name: 'Large',
      icon: 'collections',
      type: 'thumbnailLarge',
      thumbnailSize: ThumbnailSize.Large
    }];
    this.activeView = this.views[2];
  }

  onScroll(): void {
    this.loadData();
  }

  getSearchRequest(): Observable<ContentSearchResult> | undefined {
    if (!this.channel || !this.channel.id) { return; }

    const request = new ContentSearchRequest({
      debugMode: false,
      pageToken: this.nextPageToken,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      filter: this.filter ? this.filter : undefined,
      channelId: this.channel!.id,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      limit: this.pageSize,
      searchString: this.searchString,
      searchType: ContentSearchType.MetadataAndFullText,
      searchBehaviors: [
        SearchBehavior.SimplifiedSearch,
        SearchBehavior.DropInvalidCharactersOnFailure,
        SearchBehavior.WildcardOnSingleTerm
      ],
      sort: this.activeSortingType.field === 'relevance' ? [] : [
        new SortInfo({
          field: this.activeSortingType.field,
          direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
        })
      ]
    });

    return this.contentService.search(request);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['channel'] || changes['filter'] || changes['searchString']) {
      this.update();
    }
  }

  public previewSelectedItem(): void {
    this.previewItem(this.selectedItems[0]);
  }

  public trackByThumbnailSize(index: number, thumbnailSize: string): string {
    return thumbnailSize;
  }

  // OPEN SHARE CONTENT DIALOG
  openShareContentDialog(): void {

    const dialogRef = this.dialog.open(ShareContentDialogComponent, {
      data: this.selectedItems,
      autoFocus: false,
      width: '640px'
    });

    const instance = dialogRef.componentInstance;
    instance.title = 'ShareContentDialog.CreateShare';

  }

  // OPEN DOWNLOAD CONTENT DIALOG
  openDownloadContentDialog(): void {
    this.contentDownloadDialogService.showDialog(this.items.filter(i => i.isSelected).map(i => i.item));
  }

  // CHECK IF ELEMENT CONTAINS CLASS NAME
  checkContains(elementClassName: string): boolean {
    const containClasses = ['browser__items'];
    return containClasses.some(iClass => elementClassName.includes(iClass));
  }

  // CLEAR SELECTION
  cancel(): void {
    this.contentItemSelectionService.clear();
  }

}
