import { BaseComponent } from '../base.component';
import { Injector, OnInit, NgZone, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LazyGetter } from 'lazy-get-decorator';

// ANGULAR CDK
import { ScrollDispatcher } from '@angular/cdk/scrolling';


import { ConfigActions, PictureparkUIConfiguration, PICTUREPARK_UI_CONFIGURATION } from '../../../configuration';
import { FilterBase, IEntityBase, ThumbnailSize } from '@picturepark/sdk-v1-angular';
import { LiquidRenderingService } from '../../services/liquid-rendering/liquid-rendering.service';
import { ContentItemSelectionService } from '../../services/content-item-selection/content-item-selection.service';
import { ContentModel } from '../../models/content-model';
import { ISortItem } from './interfaces/sort-item';
import { TranslationService } from '../../services/translations/translation.service';
import { IBrowserView } from './interfaces/browser-view';
import { debounceTime } from 'rxjs/operators';

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
    protected get liquidRenderingService(): LiquidRenderingService {
        return this.injector.get(LiquidRenderingService);
    }
    @LazyGetter()
    protected get translationService(): TranslationService {
        return this.injector.get(TranslationService);
    }
    @LazyGetter()
    protected get contentItemSelectionService(): ContentItemSelectionService<TEntity> {
        return new ContentItemSelectionService<TEntity>();
    }
    @LazyGetter()
    protected get dialog(): MatDialog {
        return this.injector.get(MatDialog);
    }

    public self: BaseBrowserComponent<TEntity>;

    protected pictureParkUIConfig: PictureparkUIConfiguration;

    public configActions: ConfigActions;
    public isLoading = false;
    public items: ContentModel<TEntity>[] = [];
    public nextPageToken: string | undefined;
    public readonly pageSize = 75;
    public isAscending: boolean | null = null;
    public activeSortingType: ISortItem;
    public sortingTypes: ISortItem[];
    public views: IBrowserView[];
    public activeView: IBrowserView;
    public activeThumbnailSize?: ThumbnailSize = ThumbnailSize.Medium;

    protected scrollDebounceTime = 0;

    @Output() public totalResultsChange = new EventEmitter<number | null>();
    @Output() public selectedItemsChange = new EventEmitter<TEntity[]>();
    @Output() public previewItemChange = new EventEmitter<TEntity>();

    @Input() public searchString = '';
    @Input() public filter: FilterBase | null = null;

    private _totalResults: number | null = null;
    private _selectedItems: TEntity[] = [];
    private lastSelectedIndex = 0;

    abstract init(): Promise<void>;
    abstract initSort(): void;
    abstract onScroll(): void;
    abstract getSearchRequest(): Observable<{results: TEntity[]; totalResults: number; pageToken?: string | undefined }> | undefined;
    abstract checkContains(elementClassName: string): boolean;

    constructor(protected componentName: string, protected injector: Injector) {
        super();

        this.self = this;
        // Init default sort
        this.initSort();
        if (!this.sortingTypes) {
            this.sortingTypes = [{
                field: 'relevance',
                name: this.translationService.translate('SortInfo.Relevance')
            }];
            this.activeSortingType = this.sortingTypes[0];
        }
        this.setSortingType(this.activeSortingType, false);

        this.pictureParkUIConfig = injector.get<PictureparkUIConfiguration>(PICTUREPARK_UI_CONFIGURATION);
    }

    async ngOnInit(): Promise<void> {
        this.configActions = this.pictureParkUIConfig[this.componentName];

        // SCROLL SUBSCRIBER
        const scrollSubscription = this.scrollDispatcher.scrolled().pipe(debounceTime(this.scrollDebounceTime)).subscribe(scrollable => {
            if (!scrollable) { return; }

            const nativeElement = scrollable.getElementRef().nativeElement as HTMLElement;
            const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - (2 * nativeElement.clientHeight);

            if (scrollCriteria && !this.isLoading && this.items.length !== this.totalResults) {
                this.ngZone.run(() => this.onScroll());
            }
        });
        this.subscription.add(scrollSubscription);

        // ITEM SELECTION SUBSCRIBER
        const contentItemSelectionSubscription = this.contentItemSelectionService.selectedItems.subscribe(items => {
            this.selectedItems = items;
            this.items.forEach(model => model.isSelected = items.some(selectedItem => selectedItem.id === model.item.id));
        });
        this.subscription.add(contentItemSelectionSubscription);

        // Call abstract init class
        await this.init();
    }

    get totalResults(): number | null {
        return this._totalResults;
    }

    set totalResults(total: number | null) {
        this._totalResults = total;
        this.totalResultsChange.emit(total);
    }

    get selectedItems(): TEntity[] {
        return this._selectedItems;
    }

    set selectedItems(items: TEntity[]) {
        this._selectedItems = items;
        this.selectedItemsChange.emit(items);
    }

    public trackByItem(index: number, item: ContentModel<TEntity>): string {
        return item.item.id;
    }

    public update(): void {
        this.totalResults = null;
        this.nextPageToken = undefined;
        this.items = [];
        this.loadData();
      }

    public loadData(): void {
        const request = this.getSearchRequest();

        if (this.isLoading || !request) {
            return;
        }

        this.isLoading = true;
        const searchSubscription = request.subscribe(async searchResult => {
            this.totalResults = searchResult.totalResults;
            this.nextPageToken = searchResult.pageToken;

            if (searchResult.results) {
                await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
                const items = searchResult.results.map(item => {
                    const contentModel = new ContentModel(item, false);
                    contentModel.isSelected = this.selectedItems.some(selected => selected.id === item.id);
                    return contentModel;
                });
                this.prepareData(items);
                this.items.push(...items);
            }

            this.isLoading = false;
        }, () => {
            this.totalResults = null;
            this.isLoading = false;
        });
        this.subscription.add(searchSubscription);
    }

    protected prepareData(items: ContentModel<TEntity>[]): void {

    }

    /**
     * Click event to trigger selection (ctrl + shift click)
     */
    public itemClicked($event: MouseEvent, index: number): void {
        const itemModel = this.items[index];

        if ($event.ctrlKey) {
            this.lastSelectedIndex = index;

            if (itemModel.isSelected === true) {
            this.contentItemSelectionService.removeItem(itemModel.item);
            } else {
            this.contentItemSelectionService.addItem(itemModel.item);
            }
        } else if ($event.shiftKey) {
            const firstIndex = this.lastSelectedIndex < index ? this.lastSelectedIndex : index;
            const lastIndex = this.lastSelectedIndex < index ? index : this.lastSelectedIndex;

            const itemsToAdd = this.items.slice(firstIndex, lastIndex + 1).map(i => i.item);

            this.contentItemSelectionService.clear();
            this.contentItemSelectionService.addItems(itemsToAdd);
        } else {
            this.lastSelectedIndex = index;
            this.contentItemSelectionService.clear();
            this.contentItemSelectionService.addItem(itemModel.item);
        }
    }

    public toggleItems(isSelected: boolean): void {
        if (isSelected === true) {
            this.contentItemSelectionService.addItems(this.items.map(model => model.item));
        } else {
            this.contentItemSelectionService.clear();
        }
    }

    public previewItem(item: TEntity): void {
        this.previewItemChange.emit(item);
    }

    setSortingType(newValue: ISortItem, reload: boolean = true): void {
        if (newValue.field === 'relevance') {
            this.isAscending = null;
        } else if (this.isAscending === null) {
            this.isAscending = true;
        }

        this.activeSortingType = newValue;
        if (reload) {
            this.update();
        }
    }

    changeView(view: IBrowserView): void {
        this.activeView = view;
        this.activeThumbnailSize = view.thumbnailSize;
    }

    // HANDLE COMPONENENT CLICK EVENT
    @HostListener('document:click', ['$event'])
    handleClick(event: any): void {
        if (this.dialog.openDialogs.length > 0) { return; }

        if (this.checkContains(event.srcElement.className)) {
            this.contentItemSelectionService.clear();
        }
    }
}
