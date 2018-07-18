import { ThumbnailSize, ContentDownloadLinkCreateRequest } from './../../services/services';
import { SortingType } from './models/sorting-type';
import { BasketService } from './../../services/basket.service';
import { Subscription } from 'rxjs';

import {
  Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, OnInit, NgZone, OnDestroy
} from '@angular/core';

import {
  ContentService, ContentSearchRequest,
  FilterBase, SortInfo, SortDirection, Content, ContentSearchType, BrokenDependenciesFilter, LifeCycleFilter, Channel
} from '../../services/services';

import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ContentModel } from './models/content-model';


// TODO: add virtual scrolling (e.g. do not create a lot of div`s, only that are presented on screen right now)
@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html',
  styleUrls: ['./content-browser.component.scss']
})
export class ContentBrowserComponent implements OnChanges, OnInit, OnDestroy {
  private readonly ItemsPerRequest = 75;

  private basketItems: string[] = [];

  public selectedItems: string[] = [];

  public totalResults: number | null = null;

  public isLoading = false;

  public items: ContentModel[] = [];

  public isAscending: boolean | null = null;

  public thumbnailSizes = ThumbnailSize;

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

  constructor(
    private basketService: BasketService,
    private contentService: ContentService,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone) {

    this.basketSubscription = this.basketService.basketChange.subscribe((basketItems) => {
      this.basketItems = basketItems;
      this.items.forEach(item => item.isInBasket = basketItems.some(basketItem => basketItem === item.item.id));
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
        window.open(data.downloadUrl);
      }
    });
  }

  public toggleItems(isSelected: boolean) {
    this.items.forEach(item => item.isSelected = isSelected);
    this.selectedItems = this.items.filter(item => item.isSelected === true).map(item => item.item.id || '');
  }

  public itemClicked($event: MouseEvent, itemModel: ContentModel) {
    if ($event.ctrlKey) {
      itemModel.isSelected = !itemModel.isSelected;
    } else if ($event.shiftKey) {
      itemModel.isSelected = true;

      const firsIndex = this.items.findIndex(item => item.isSelected === true);
      const lastIndexReversed = this.items.slice().reverse().findIndex(item => item.isSelected === true);
      const lastIndex = lastIndexReversed >= 0 ? this.items.length - lastIndexReversed : lastIndexReversed;

      this.items.slice(firsIndex, lastIndex).forEach(item => item.isSelected = true);
    } else {
      this.items.forEach(item => item.isSelected = false);
      itemModel.isSelected = true;
    }

    this.selectedItems = this.items.filter(item => item.isSelected === true).map(item => item.item.id || '');
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
        // TODO select sort.
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
