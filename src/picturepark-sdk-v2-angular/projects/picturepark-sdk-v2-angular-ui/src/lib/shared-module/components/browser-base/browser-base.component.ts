import { BaseComponent } from '../base.component';
import { OnInit, NgZone, Output, EventEmitter, HostListener, Directive, inject, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// ANGULAR CDK
import { ScrollDispatcher } from '@angular/cdk/scrolling';

import { ConfigActions, PICTUREPARK_UI_CONFIGURATION } from '../../../configuration';
import {
  IEntityBase,
  ThumbnailSize,
  SearchFacade,
  SortInfo,
  SortDirection,
  SearchInputState,
  AggregationResult,
} from '@picturepark/sdk-v2-angular';
import { SelectionService } from '../../services/selection/selection.service';
import { ISortItem } from './interfaces/sort-item';
import { TranslationService } from '../../services/translations/translation.service';
import { IBrowserView } from './interfaces/browser-view';
import { debounceTime, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RangeSelection } from './interfaces/range-selection';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive()
export abstract class BaseBrowserComponent<TEntity extends IEntityBase> extends BaseComponent implements OnInit {
  protected scrollDispatcher = inject(ScrollDispatcher);
  protected ngZone = inject(NgZone);
  protected translationService = inject(TranslationService);
  selectionService: SelectionService<TEntity> = new SelectionService();
  protected dialog = inject(MatDialog);

  self: BaseBrowserComponent<TEntity>;

  protected pictureParkUIConfig = inject(PICTUREPARK_UI_CONFIGURATION);

  configActions: ConfigActions;
  isLoading = false;
  items: TEntity[] = [];
  isAscending: boolean | null = null;
  activeSortingType: ISortItem;
  sortingTypes: ISortItem[];
  views: IBrowserView[];
  activeView: IBrowserView;
  activeThumbnailSize: ThumbnailSize = ThumbnailSize.Medium;

  protected scrollDebounceTime = 0;

  @Output() selectedItemsChange = new EventEmitter<TEntity[]>();
  @Output() previewItemChange = new EventEmitter<TEntity>();

  private lastSelectedIndex = 0;
  private lastRangeSelection: RangeSelection | null;

  selectedItems = toSignal(this.selectionService.selectedItems, { requireSync: true });
  selectedItemsCount = computed(() => this.selectedItems().length);

  totalResults$ = this.facade.totalResults$;
  items$ = this.facade.items$;
  aggregationResults$: Observable<AggregationResult[] | undefined> = this.facade.aggregationResults$;

  abstract init(): Promise<void>;
  abstract initSort(): void;
  abstract onScroll(): void;
  abstract checkContains(elementClassName: string): boolean;

  constructor(protected componentName: string, public facade: SearchFacade<TEntity, SearchInputState>) {
    super();

    this.self = this;
    // Init default sort
    this.initSort();
    if (!this.sortingTypes) {
      this.sortingTypes = [
        {
          field: '_score',
          name: this.translationService.translate('SortMenu.Relevance'),
        },
      ];
      this.activeSortingType = this.sortingTypes[0];
    }
    this.setSort(this.activeSortingType, this.isAscending ?? true, false);
  }

  async ngOnInit(): Promise<void> {
    this.configActions = this.pictureParkUIConfig[this.componentName];

    // Scroll loader
    this.sub = this.scrollDispatcher
      .scrolled()
      .pipe(debounceTime(this.scrollDebounceTime))
      .subscribe(scrollable => {
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
    this.sub = this.selectionService.selectedItems.subscribe(items => {
      this.selectedItemsChange.emit(items);
    });

    // Call abstract init class
    await this.init();

    // Subscribe to searchInput changes and trigger reload
    this.sub = this.facade.searchRequest$.subscribe(() => this.update());

    // Subscribe to loading
    this.sub = this.facade.getLoadingInfos('all').subscribe(i => (this.isLoading = i));
  }

  setSelectedItems(items: TEntity[]) {
    this.selectionService.set(items);
  }

  trackByItem(index: number, item: TEntity): string {
    return item.id;
  }

  update(): void {
    this.facade.searchResultState.nextPageToken = undefined;
    this.facade.searchResultState.results = [];
    this.items = [];
    this.setSelectedItems([]);
    this.loadData()?.subscribe();
  }

  loadData(): Observable<any> | undefined {
    if (this.isLoading) {
      return;
    }

    const request = this.facade.search();
    if (!request) {
      return;
    }

    return request.pipe(
      tap(searchResult => {
        if (searchResult.results) {
          const items = searchResult.results.map(i => i);
          this.items.push(...items);
          this.prepareData(items);
        }

        this.facade.setResultState({
          totalResults: searchResult.totalResults,
          results: [...this.facade.searchResultState.results, ...searchResult.results],
          nextPageToken: searchResult.pageToken,
          aggregationResults: searchResult.aggregationResults,
        });
      })
    );
  }

  protected prepareData(items: TEntity[]): void {}

  /**
   * Click event to trigger selection (ctrl + shift click)
   */
  itemClicked(event: MouseEvent, index: number, presist = false): void {
    const itemModel = this.items[index];

    if (this.isTouchDevice) {
      this.lastSelectedIndex = index;
      this.selectionService.toggle(itemModel);
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      this.lastRangeSelection = null;
      this.lastSelectedIndex = index;
      this.selectionService.toggle(itemModel);
      return;
    }

    if (!presist) {
      this.selectionService.clear();
    }

    if (event.shiftKey) {
      const firstIndex = this.lastSelectedIndex < index ? this.lastSelectedIndex : index;
      const lastIndex = this.lastSelectedIndex < index ? index : this.lastSelectedIndex;

      if (this.lastRangeSelection && presist) {
        let itemsToRemove: TEntity[] = [];

        if (firstIndex === this.lastRangeSelection.lastIndex) {
          itemsToRemove = this.items.slice(this.lastRangeSelection.firstIndex, firstIndex + 1).map(i => i);
        } else if (firstIndex < this.lastRangeSelection.firstIndex) {
          itemsToRemove = this.items.slice(lastIndex, this.lastRangeSelection.lastIndex + 1).map(i => i);
        } else if (lastIndex < this.lastRangeSelection.lastIndex) {
          itemsToRemove = this.items.slice(lastIndex, this.lastRangeSelection.lastIndex + 1).map(i => i);
        }

        if (itemsToRemove.length) {
          this.selectionService.removeItems(itemsToRemove);
        }
      }

      const itemsToAdd = this.items.slice(firstIndex, lastIndex + 1).map(i => i);

      this.selectionService.addItems(itemsToAdd);
      this.lastRangeSelection = { firstIndex, lastIndex };
      return;
    }

    this.lastRangeSelection = null;
    this.lastSelectedIndex = index;
    this.selectionService.toggle(itemModel);
  }

  itemPressed(event: Event, index: number): void {
    const itemModel = this.items[index];

    this.lastSelectedIndex = index;
    this.selectionService.clear();
    this.selectionService.addItem(itemModel);
  }

  toggleItems(isSelected: boolean): void {
    if (isSelected === true) {
      this.selectionService.addItems(this.items.map(model => model));
    } else {
      this.selectionService.clear();
    }
  }

  previewItem(item: TEntity): void {
    this.previewItemChange.emit(item);
  }

  setSort(newValue: ISortItem, isAscending: boolean, reload: boolean = true): void {
    if (newValue.field === '_score') {
      this.isAscending = null;
    } else {
      this.isAscending = isAscending;
    }

    this.activeSortingType = newValue;
    const sort = [
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
