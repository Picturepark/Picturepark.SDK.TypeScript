import {
  Component, Input, Output, OnChanges, EventEmitter,
  SimpleChanges, OnInit, NgZone, OnDestroy
} from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

import { SortingType } from './models/sorting-type';
import { ContentModel } from './models/content-model';
import { BasketService } from './../../services/basket.service';
import { ContentItemSelectionService } from './../../services/content-item-selection.service';
import {
  ContentService, ThumbnailSize,
  ContentDownloadLinkCreateRequest,
  ContentSearchRequest, FilterBase, SortInfo,
  SortDirection, ContentSearchType, BrokenDependenciesFilter, LifeCycleFilter, Channel
} from './../../services/services';

// TODO: add virtual scrolling (e.g. do not create a lot of div`s, only that are presented on screen right now)
// currently experimental feature of material CDK
@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html',
  styleUrls: ['./content-browser.component.scss']
})
export class ContentBrowserComponent implements OnChanges, OnInit, OnDestroy {
  private lastSelectedIndex = 0;

  private readonly ItemsPerRequest = 75;

  private basketItems: string[] = [];

  public selectedItems: string[] = [];

  public totalResults: number | null = null;

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

  private scrollSubscription: Subscription;
  private basketSubscription: Subscription;
  private contentItemSelectionSubscription: Subscription;

  constructor(
    private contentItemSelectionService: ContentItemSelectionService,
    private basketService: BasketService,
    private contentService: ContentService,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone) {

    this.basketSubscription = this.basketService.basketChange.subscribe((basketItems) => {
      this.basketItems = basketItems;
      this.items.forEach(model => model.isInBasket = basketItems.some(basketItem => basketItem === model.item.id));
    });

    this.contentItemSelectionSubscription = this.contentItemSelectionService.selectedItems.subscribe((items) => {
      this.selectedItems = items;
      this.items.forEach(model => model.isSelected = items.some(selectedItem => selectedItem === model.item.id));
    });
  }

  public ngOnInit(): void {
    this.scrollSubscription = this.scrollDispatcher.scrolled()
      .subscribe(scrollable => {
        if (scrollable) {
          const nativeElement = scrollable.getElementRef().nativeElement as HTMLElement;
          const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - (2 * nativeElement.clientHeight);

          if (scrollCriteria && !this.isLoading && this.items.length !== this.totalResults) {
            this.ngZone.run(() => this.loadData())
          }
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['channel'] || changes['filter'] || changes['query']) {
      this.update();
    }
  }

  public ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
    this.basketSubscription.unsubscribe();
    this.contentItemSelectionSubscription.unsubscribe();
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
    this.items = [];
    this.loadData();
  }

  public previewItem(id: string) {
    this.previewItemChange.emit(id);
  }

  public downloadItems() {
    const request = new ContentDownloadLinkCreateRequest({
      contents: this.selectedItems.map(item => ({ contentId: item, outputFormatId: 'Original' }))
    });

    this.contentService.createDownloadLink(request).subscribe(data => {
      if (data.downloadUrl) {
        window.location.replace(data.downloadUrl)
      }
    });
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
        start: this.items.length,
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

      this.contentService.search(request).subscribe(searchResult => {
        this.totalResults = searchResult.totalResults;

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
    }
  }
}
