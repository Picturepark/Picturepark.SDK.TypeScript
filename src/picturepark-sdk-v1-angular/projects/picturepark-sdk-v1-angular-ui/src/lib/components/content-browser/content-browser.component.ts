import {
  Component, Input, Output, OnChanges, EventEmitter,
  SimpleChanges, OnInit, NgZone
} from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

import { SortingType } from './models/sorting-type';
import { ContentModel } from './models/content-model';
import { BasketService } from './../../services/basket.service';
import { ContentItemSelectionService } from './../../services/content-item-selection.service';
import {
  ContentService, ThumbnailSize,
  ContentDownloadLinkCreateRequest,
  ContentSearchRequest, FilterBase, SortInfo,
  SortDirection, ContentSearchType, BrokenDependenciesFilter, LifeCycleFilter, Channel
} from '@picturepark/sdk-v1-angular';
import { BaseComponent } from '../base.component';

// TODO: add virtual scrolling (e.g. do not create a lot of div`s, only that are presented on screen right now)
// currently experimental feature of material CDK
@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html',
  styleUrls: ['./content-browser.component.scss']
})
export class ContentBrowserComponent extends BaseComponent implements OnChanges, OnInit {
  private lastSelectedIndex = 0;

  private _totalResults: number | null = null;

  private readonly ItemsPerRequest = 50;

  private basketItems: string[] = [];

  public selectedItems: string[] = [];

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

  get totalResults(): number | null {
    return this._totalResults;
  }

  set totalResults(total: number | null) {
    this._totalResults = total;
    this.totalResultsChange.emit(total);
  }

  constructor(
    private contentItemSelectionService: ContentItemSelectionService,
    private basketService: BasketService,
    private contentService: ContentService,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone) {
    super();

    const basketSubscription = this.basketService.basketChange.subscribe((basketItems) => {
      this.basketItems = basketItems;
      this.items.forEach(model => model.isInBasket = basketItems.some(basketItem => basketItem === model.item.id));
    });
    this.subscription.add(basketSubscription);

    const contentItemSelectionSubscription = this.contentItemSelectionService.selectedItems.subscribe((items) => {
      this.selectedItems = items;
      this.items.forEach(model => model.isSelected = items.some(selectedItem => selectedItem === model.item.id));
    });
    this.subscription.add(contentItemSelectionSubscription);
  }

  public ngOnInit(): void {
    const scrollSubscription = this.scrollDispatcher.scrolled()
      .subscribe(scrollable => {
        if (scrollable) {
          const nativeElement = scrollable.getElementRef().nativeElement as HTMLElement;
          const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - (2 * nativeElement.clientHeight);

          if (scrollCriteria && !this.isLoading && this.items.length !== this.totalResults) {
            this.ngZone.run(() => this.loadData());
          }
        }
      });
    this.subscription.add(scrollSubscription);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['channel'] || changes['filter'] || changes['query']) {
      this.update();
    }
  }

  public setSortingType(newValue: SortingType) {
    if (newValue === SortingType.relevance) {
      this.isAscending = null;
    } else if (this.isAscending === null) {
      this.isAscending = true;
    }

    this.activeSortingType = newValue;
    this.update();
  }

  public update() {
    this.totalResults = null;
    this.nextPageToken = undefined;
    this.items = [];
    this.loadData();
  }

  public previewItem(id: string) {
    this.previewItemChange.emit(id);
  }

  public previewSelectedItem() {
    this.previewItem(this.selectedItems[0]);
  }

  public downloadItems() {
    const request = new ContentDownloadLinkCreateRequest({
      contents: this.selectedItems.map(item => ({ contentId: item, outputFormatId: 'Original' }))
    });

    const linkSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
      if (data.downloadUrl) {
        window.location.replace(data.downloadUrl);
      }
    });
    this.subscription.add(linkSubscription);
  }

  public toggleItems(isSelected: boolean) {
    if (isSelected === true) {
      this.contentItemSelectionService.addItems(this.items.map((model) => model.item.id || ''));
    } else {
      this.contentItemSelectionService.clear();
    }
  }

  public itemClicked($event: MouseEvent, index: number) {
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

  private loadData() {
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
        sort: this.activeSortingType === this.sortingTypes.relevance ? [] : [
          new SortInfo({
            field: this.activeSortingType,
            direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
          })
        ]
      });

      const searchSubscription = this.contentService.search(request).subscribe(searchResult => {
        this.totalResults = searchResult.totalResults;
        this.nextPageToken = searchResult.pageToken;

        if (searchResult.results) {
          this.items.push(...searchResult.results.map(item => {
            const isInBasket = this.basketItems.some(basketItem => basketItem === item.id);

            return new ContentModel(item, isInBasket);
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

  public trackByItem(index, item: ContentModel) {
    return item.item.id;
  }

  public trackByThumbnailSize(index, thumbnailSize: string) {
    return thumbnailSize;
  }
}
