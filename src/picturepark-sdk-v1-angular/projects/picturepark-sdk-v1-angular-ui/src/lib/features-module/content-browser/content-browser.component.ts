import {
  Component, Input, Output, OnChanges, EventEmitter, SimpleChanges,
  OnInit, NgZone, Inject, HostListener
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

// LIBRARIES
import {
  ContentService, ThumbnailSize, ContentSearchRequest, FilterBase, SortInfo, SortDirection,
  ContentSearchType, BrokenDependenciesFilter, LifeCycleFilter, Channel, SearchBehavior
} from '@picturepark/sdk-v1-angular';
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfiguration, ConfigActions } from '../../configuration';

// COMPONENTS
import { BaseComponent } from '../../shared-module/components/base.component';
import {
  ContentDownloadDialogComponent
} from '../dialog/components/content-download-dialog/content-download-dialog.component';
import {
  ShareContentDialogComponent
} from '../dialog/components/share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../shared-module/services/basket/basket.service';
import { ContentItemSelectionService } from '../../shared-module/services/content-item-selection/content-item-selection.service';
import { LiquidRenderingService } from '../../shared-module/services/liquid-rendering/liquid-rendering.service';

// INTERFACES
import { ContentModel } from './models/content-model';
import { SortingType } from './models/sorting-type';

// TODO: add virtual scrolling (e.g. do not create a lot of div`s, only that are presented on screen right now)
// currently experimental feature of material CDK
@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html',
  styleUrls: ['./content-browser.component.scss', './content-browser-resp.component.scss']
})
export class ContentBrowserComponent extends BaseComponent implements OnChanges, OnInit {

  private lastSelectedIndex = 0;

  private _totalResults: number | null = null;

  private _selectedItems: string[] = [];

  private readonly ItemsPerRequest = 50;

  private basketItems: string[] = [];

  public nextPageToken: string | undefined;

  public isLoading = false;

  public items: ContentModel[] = [];

  public isAscending: boolean | null = null;

  public thumbnailSizes = ThumbnailSize;

  public thumbnailSizesArray: string[] = Object.keys(ThumbnailSize).map(key => ThumbnailSize[key]);

  public activeThumbnailSize: ThumbnailSize | null = ThumbnailSize.Medium;

  public isListView = false;

  public sortingTypes = SortingType;

  public activeSortingType = SortingType.relevance;

  public configActions: ConfigActions;

  @Input()
  public channel: Channel | null = null;

  @Input()
  public query = '';

  @Input()
  public filter: FilterBase | null = null;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  @Output()
  public totalResultsChange = new EventEmitter<number | null>();

  @Output()
  public selectedItemsChange = new EventEmitter<string[]>();

  get totalResults(): number | null {
    return this._totalResults;
  }

  set totalResults(total: number | null) {
    this._totalResults = total;
    this.totalResultsChange.emit(total);
  }

  get selectedItems(): string[] {
    return this._selectedItems;
  }

  set selectedItems(items: string[]) {
    this._selectedItems = items;
    this.selectedItemsChange.emit(items);
  }

  constructor(
    @Inject(PICTUREPARK_UI_CONFIGURATION) private pictureParkUIConfig: PictureparkUIConfiguration,
    private contentItemSelectionService: ContentItemSelectionService,
    private basketService: BasketService,
    private contentService: ContentService,
    public dialog: MatDialog,
    private liquidRenderingService: LiquidRenderingService,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
  ) {

    super();

  }

  ngOnInit() {

    // GET COMPONENT CONFIG ACTIONS
    this.configActions = this.pictureParkUIConfig['ContentBrowserComponent'];

    // BASKET SUBSCRIBER
    const basketSubscription = this.basketService.basketChange.subscribe((basketItems) => {
      this.basketItems = basketItems;
      this.items.forEach(model => model.isInBasket = basketItems.some(basketItem => basketItem === model.item.id));
    });

    // CONTENT ITEM SELECTION SUBSCRIBER
    const contentItemSelectionSubscription = this.contentItemSelectionService.selectedItems.subscribe((items) => {
      this.selectedItems = items;
      this.items.forEach(model => model.isSelected = items.some(selectedItem => selectedItem === model.item.id));
    });

    // SCROLL SUBSCRIBER
    const scrollSubscription = this.scrollDispatcher.scrolled().subscribe(scrollable => {
      if (scrollable) {

        const nativeElement = scrollable.getElementRef().nativeElement as HTMLElement;
        const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - (2 * nativeElement.clientHeight);

        if (scrollCriteria && !this.isLoading && this.items.length !== this.totalResults) {
          this.ngZone.run(() => this.loadData());
        }
      }
    });

    // UNSUBSCRIBE
    this.subscription.add(basketSubscription);
    this.subscription.add(contentItemSelectionSubscription);
    this.subscription.add(scrollSubscription);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['channel'] || changes['filter'] || changes['query']) {
      this.update();
    }
  }

  public setSortingType(newValue: SortingType): void {
    if (newValue === SortingType.relevance) {
      this.isAscending = null;
    } else if (this.isAscending === null) {
      this.isAscending = true;
    }

    this.activeSortingType = newValue;
    this.update();
  }

  public update(): void {
    this.totalResults = null;
    this.nextPageToken = undefined;
    this.items = [];
    this.loadData();
  }

  public previewItem(id: string): void {
    this.previewItemChange.emit(id);
  }

  public previewSelectedItem(): void {
    this.previewItem(this.selectedItems[0]);
  }

  public toggleItems(isSelected: boolean): void {
    if (isSelected === true) {
      this.contentItemSelectionService.addItems(this.items.map((model) => model.item.id || ''));
    } else {
      this.contentItemSelectionService.clear();
    }
  }

  public itemClicked($event: MouseEvent, index: number): void {
    const itemModel = this.items[index];

    if ($event.ctrlKey) {
      this.lastSelectedIndex = index;

      if (itemModel.isSelected === true) {
        this.contentItemSelectionService.removeItem(itemModel.item.id || '');
      } else {
        this.contentItemSelectionService.addItem(itemModel.item.id || '');
      }
    } else if ($event.shiftKey) {
      const firstIndex = this.lastSelectedIndex < index ? this.lastSelectedIndex : index;
      const lastIndex = this.lastSelectedIndex < index ? index : this.lastSelectedIndex;

      const itemsToAdd = this.items.slice(firstIndex, lastIndex + 1).map(model => model.item.id || '');

      this.contentItemSelectionService.clear();
      this.contentItemSelectionService.addItems(itemsToAdd);
    } else {
      this.lastSelectedIndex = index;
      this.contentItemSelectionService.clear();
      this.contentItemSelectionService.addItem(itemModel.item.id || '');
    }
  }

  private loadData(): void {
    if (this.channel && this.channel.id && !this.isLoading) {
      this.isLoading = true;

      const request = new ContentSearchRequest({
        debugMode: false,
        pageToken: this.nextPageToken,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        filter: this.filter ? this.filter : undefined,
        channelId: this.channel.id,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly,
        limit: this.ItemsPerRequest,
        searchString: this.query,
        searchType: ContentSearchType.MetadataAndFullText,
        searchBehaviors: [
          SearchBehavior.SimplifiedSearch,
          SearchBehavior.DropInvalidCharactersOnFailure,
          SearchBehavior.WildcardOnSingleTerm
        ],
        sort: this.activeSortingType === this.sortingTypes.relevance ? [] : [
          new SortInfo({
            field: this.activeSortingType,
            direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
          })
        ]
      });

      const searchSubscription = this.contentService.search(request).subscribe(async searchResult => {

        this.totalResults = searchResult.totalResults;
        this.nextPageToken = searchResult.pageToken;

        if (searchResult.results) {
          await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
          this.items.push(...searchResult.results.map(item => {
            const isInBasket = this.basketItems.some(basketItem => basketItem === item.id);
            const contentModel = new ContentModel(item, isInBasket);
            contentModel.isSelected = this.selectedItems.indexOf(item.id) !== -1;
            return contentModel;
          }));
        }

        this.isLoading = false;
      }, () => {
        this.totalResults = null;
        this.isLoading = false;
      });
      this.subscription.add(searchSubscription);
    }
  }

  public trackByItem(index, item: ContentModel): string {
    return item.item.id;
  }

  public trackByThumbnailSize(index, thumbnailSize: string): string {
    return thumbnailSize;
  }

  // OPEN SHARE CONTENT DIALOG
  openShareContentDialog(): void {

    const dialogRef = this.dialog.open(ShareContentDialogComponent, {
      data: this.selectedItems,
      autoFocus: false
    });

    const instance = dialogRef.componentInstance;
    instance.title = 'ShareContentDialog.CreateShare';

  }

  // OPEN DOWNLOAD CONTENT DIALOG
  openDownloadContentDialog(): void {

    const dialogRef = this.dialog.open(ContentDownloadDialogComponent, {
      data: this.items.filter(i => i.isSelected).map(i => i.item),
      autoFocus: false
    });

    const instance = dialogRef.componentInstance;
    instance.title = 'ContentDownloadDialog.Title';

  }

  // HANDLE COMPONENENT CLICK EVENT
  @HostListener('document:click', ['$event'])
  handleClick(event: any): void {

    if (this.dialog.openDialogs.length > 0) { return; }

    if (this.checkContains(event.srcElement.className)) {
      this.contentItemSelectionService.clear();
    }

  }

  // CHECK IF ELEMENT CONTAINS CLASS NAME
  public checkContains(elementClassName: string): boolean {
    const containClasses = ['content-browser__items'];
    return containClasses.some(iClass => elementClassName.includes(iClass));
  }

}
