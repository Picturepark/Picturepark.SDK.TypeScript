import { BaseComponent } from '../base.component';
import { Injector, OnInit, NgZone, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LazyGetter } from 'lazy-get-decorator';

// ANGULAR CDK
import { ScrollDispatcher } from '@angular/cdk/scrolling';

import { ConfigActions, PictureparkUIConfiguration, PICTUREPARK_UI_CONFIGURATION } from '../../../configuration';
import {
  IEntityBase,
  ThumbnailSize,
  SearchFacade,
  SortInfo,
  SortDirection,
  SearchInputState,
  AggregationResult,
} from '@picturepark/sdk-v1-angular';
import { SelectionService } from '../../services/selection/selection.service';
import { ISortItem } from './interfaces/sort-item';
import { TranslationService } from '../../services/translations/translation.service';
import { IBrowserView } from './interfaces/browser-view';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class BaseBrowserComponent<TEntity extends IEntityBase> extends BaseComponent implements OnInit {
  // Services
  @LazyGetter()
  protected get scrollDispatcher(): ScrollDispatcher {
    return this.injector.get(ScrollDispatcher);
  }
  @LazyGetter()
  protected get ngZone(): NgZone {
    return this.injector.get(NgZone);
  }
  @LazyGetter()
  protected get translationService(): TranslationService {
    return this.injector.get(TranslationService);
  }
  @LazyGetter()
  public get selectionService(): SelectionService<TEntity> {
    return new SelectionService<TEntity>();
  }
  @LazyGetter()
  protected get dialog(): MatDialog {
    return this.injector.get(MatDialog);
  }

  public self: BaseBrowserComponent<TEntity>;

  protected pictureParkUIConfig: PictureparkUIConfiguration;

  public configActions: ConfigActions;
  public isLoading = false;
  public items: TEntity[] = [];
  public isAscending: boolean | null = null;
  public activeSortingType: ISortItem;
  public sortingTypes: ISortItem[];
  public views: IBrowserView[];
  public activeView: IBrowserView;
  public activeThumbnailSize: ThumbnailSize = ThumbnailSize.Medium;

  protected scrollDebounceTime = 0;

  @Output() public selectedItemsChange = new EventEmitter<TEntity[]>();
  @Output() public previewItemChange = new EventEmitter<TEntity>();

  private _selectedItems: TEntity[] = [];
  private lastSelectedIndex = 0;

  totalResults$ = this.facade.totalResults$;
  items$ = this.facade.items$;
  aggregationResults$: Observable<AggregationResult[] | undefined> = this.facade.aggregationResults$;

  abstract init(): Promise<void>;
  abstract initSort(): void;
  abstract onScroll(): void;
  abstract checkContains(elementClassName: string): boolean;

  constructor(
    protected componentName: string,
    protected injector: Injector,
    public facade: SearchFacade<TEntity, SearchInputState>
  ) {
    super(injector);

    this.self = this;
    // Init default sort
    this.initSort();
    if (!this.sortingTypes) {
      this.sortingTypes = [
        {
          field: 'relevance',
          name: this.translationService.translate('SortInfo.Relevance'),
        },
      ];
      this.activeSortingType = this.sortingTypes[0];
    }
    this.setSort(this.activeSortingType, this.isAscending ?? true, false);

    this.pictureParkUIConfig = injector.get<PictureparkUIConfiguration>(PICTUREPARK_UI_CONFIGURATION);
  }

  async ngOnInit(): Promise<void> {
    this.configActions = this.pictureParkUIConfig[this.componentName];

    // Scroll loader
    this.sub = this.scrollDispatcher
      .scrolled()
      .pipe(debounceTime(this.scrollDebounceTime))
      .subscribe((scrollable) => {
        if (!scrollable) {
          return;
        }

        const nativeElement = scrollable.getElementRef().nativeElement;
        const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - 2 * nativeElement.clientHeight;

        if (scrollCriteria && !this.isLoading && this.items.length !== this.facade.searchResultState.totalResults) {
          this.ngZone.run(() => this.onScroll());
        }
      });

    // Item selection
    this.sub = this.selectionService.selectedItems.subscribe((items) => {
      this.selectedItems = items;
    });

    // Call abstract init class
    await this.init();

    // Subscribe to searchInput changes and trigger reload
    this.sub = this.facade.searchRequest$.subscribe(() => this.update());

    // Subscribe to loading
    this.sub = this.facade.getLoadingInfos('all').subscribe((i) => (this.isLoading = i));
  }

  get selectedItems(): TEntity[] {
    return this._selectedItems;
  }

  set selectedItems(items: TEntity[]) {
    this._selectedItems = items;
    this.selectedItemsChange.emit(items);
  }

  public trackByItem(index: number, item: TEntity): string {
    return item.id;
  }

  public update(): void {
    this.facade.searchResultState.nextPageToken = undefined;
    this.items = [];
    this.loadData();
  }

  public loadData(): void {
    if (this.isLoading) {
      return;
    }

    const request = this.facade.search();
    if (!request) {
      return;
    }

    this.sub = request.subscribe(async (searchResult) => {
      if (searchResult.results) {
        const items = searchResult.results.map((i) => i);
        this.items.push(...items);
        this.prepareData(items);
      }

      this.facade.setResultState({
        totalResults: searchResult.totalResults,
        results: [...this.facade.searchResultState.results, ...searchResult.results],
        nextPageToken: searchResult.pageToken,
        aggregationResults: searchResult.aggregationResults,
      });
    });
  }

  protected prepareData(items: TEntity[]): void {}

  /**
   * Click event to trigger selection (ctrl + shift click)
   */
  public itemClicked(event: MouseEvent, index: number): void {
    const itemModel = this.items[index];
    if (event.ctrlKey) {
      this.lastSelectedIndex = index;
      this.selectionService.toggle(itemModel);
      return;
    } else if (event.shiftKey) {
      const firstIndex = this.lastSelectedIndex < index ? this.lastSelectedIndex : index;
      const lastIndex = this.lastSelectedIndex < index ? index : this.lastSelectedIndex;

      const itemsToAdd = this.items.slice(firstIndex, lastIndex + 1).map((i) => i);

      this.selectionService.clear();
      this.selectionService.addItems(itemsToAdd);
      return;
    }

    this.lastSelectedIndex = index;
    this.selectionService.clear();
    this.selectionService.addItem(itemModel);
  }

  public itemPressed(event: Event, index: number): void {
    const itemModel = this.items[index];
    if (event.type === 'tap') {
      this.lastSelectedIndex = index;
      this.selectionService.toggle(itemModel);
      return;
    }

    this.lastSelectedIndex = index;
    this.selectionService.clear();
    this.selectionService.addItem(itemModel);
  }

  public toggleItems(isSelected: boolean): void {
    if (isSelected === true) {
      this.selectionService.addItems(this.items.map((model) => model));
    } else {
      this.selectionService.clear();
    }
  }

  public previewItem(item: TEntity): void {
    this.previewItemChange.emit(item);
  }

  setSort(newValue: ISortItem, isAscending: boolean, reload: boolean = true): void {
    if (newValue.field === 'relevance') {
      this.isAscending = null;
    } else {
      this.isAscending = isAscending;
    }

    this.activeSortingType = newValue;
    const sort =
      this.activeSortingType.field === 'relevance'
        ? []
        : [
            new SortInfo({
              field: this.activeSortingType.field,
              direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc,
            }),
          ];

    if (reload) {
      this.facade.patchRequestState({ sort });
    } else {
      this.facade.searchRequestState.sort = sort;
    }
  }

  changeView(view: IBrowserView): void {
    this.activeView = view;
    if (view.thumbnailSize) {
      this.activeThumbnailSize = view.thumbnailSize;
    }
  }

  // HANDLE COMPONENENT CLICK EVENT
  @HostListener('document:click', ['$event'])
  handleClick(event: any): void {
    if (this.dialog.openDialogs.length > 0) {
      return;
    }

    if (this.checkContains(event.srcElement.className)) {
      this.selectionService.clear();
    }
  }
}
