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


// TODO: add virtual scrolling (e.g. do not create a lot of div`s, only that are presented on screen right now)
@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html',
  styleUrls: ['./content-browser.component.scss']
})
export class ContentBrowserComponent implements OnChanges, OnInit, OnDestroy {
  private readonly ItemsPerRequest = 50;

  private basketItems: string[] = [];

  public selectedItems: string[] = [];

  public totalResults: number | null = null;

  isLoading = false;
  items: ContentModel[] = [];

  @Input()
  channel: Channel | null = null;

  @Input()
  query = '';

  @Input()
  filter: FilterBase | null = null;

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
      this.items.forEach(item => item.isInBasket = basketItems.includes(item.item.id || ''));
    });
  }

  public previewItem(id: string) {
    this.previewItemChange.emit(id);
  }

  public toggleItems(isSelected: boolean) {
    this.items.forEach(item => item.isSelected = isSelected);
  }

  public itemClicked($event: MouseEvent, itemModel: ContentModel) {
    if ($event.ctrlKey) {
      itemModel.isSelected = !itemModel.isSelected;
      this.selectedItems = this.items.filter(item => item.isSelected === true).map(item => item.item.id || '');
    } else {
      this.items.forEach(item => item.isSelected = false);
      itemModel.isSelected = true;
      this.selectedItems = [itemModel.item.id || ''];
    }
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

  public ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
    this.basketSubscription.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['channel'] || changes['filter'] || changes['query']) {
      this.totalResults = null;
      this.items = [];
      this.loadData();
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
        // TODO select sort.
        sort: [
          new SortInfo({
            field: 'audit.creationDate',
            direction: SortDirection.Desc
          })
        ]
      });

      this.contentService.search(request).subscribe(searchResult => {
        this.totalResults = searchResult.totalResults;

        if (searchResult.results) {
          this.items.push(...searchResult.results.map(item => {
            const isInBasket = this.basketItems.includes(item.id || '');

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

// TODO: move this class to separate folder.
export class ContentModel {
  isSelected = false;
  isInBasket = false;
  item: Content;

  constructor(item: Content, isInBasket: boolean) {
    this.item = item;
    this.isInBasket = isInBasket;
  }
}
