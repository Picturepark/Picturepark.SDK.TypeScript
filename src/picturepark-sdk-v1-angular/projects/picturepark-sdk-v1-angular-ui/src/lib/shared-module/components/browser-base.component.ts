import { BaseComponent } from './base.component';
import { Injector, OnInit, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ConfigActions, PictureparkUIConfiguration, PICTUREPARK_UI_CONFIGURATION } from '../../configuration';
import { ContentModel } from '../models/content-model';
import { FilterBase } from '@picturepark/sdk-v1-angular';
import { SortingType } from '../models/sorting-type';
import { LiquidRenderingService } from '../services/liquid-rendering/liquid-rendering.service';

export abstract class BaseBrowserComponent<TEntity extends { id: string }> extends BaseComponent implements OnInit {
    // Services
    protected scrollDispatcher: ScrollDispatcher;
    protected ngZone: NgZone;
    protected pictureParkUIConfig: PictureparkUIConfiguration;
    protected liquidRenderingService: LiquidRenderingService;

    public configActions: ConfigActions;
    public isLoading = false;
    public items: ContentModel<TEntity>[] = [];
    public nextPageToken: string | undefined;
    public readonly pageSize = 50;
    public isAscending: boolean | null = null;
    public activeSortingType = SortingType.relevance;
    public sortingTypes = SortingType;

    @Output() public totalResultsChange = new EventEmitter<number | null>();
    @Output() public selectedItemsChange = new EventEmitter<string[]>();

    @Input() public searchString = '';
    @Input() public filter: FilterBase | null = null;

    private _totalResults: number | null = null;
    private _selectedItems: string[] = [];

    abstract init(): void;
    abstract onScroll(): void;

    constructor(protected componentName: string, injector: Injector) {
        super();

        this.scrollDispatcher = injector.get(ScrollDispatcher);
        this.ngZone = injector.get(NgZone);
        this.liquidRenderingService = injector.get(LiquidRenderingService);
        this.pictureParkUIConfig = injector.get<PictureparkUIConfiguration>(PICTUREPARK_UI_CONFIGURATION);
    }

    ngOnInit(): void {
        this.configActions = this.pictureParkUIConfig[this.componentName];

        // Call abstract init class
        this.init();

        // SCROLL SUBSCRIBER
        const scrollSubscription = this.scrollDispatcher.scrolled().subscribe(scrollable => {
            if (!scrollable) { return; }

            const nativeElement = scrollable.getElementRef().nativeElement as HTMLElement;
            const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - (2 * nativeElement.clientHeight);

            if (scrollCriteria && !this.isLoading && this.items.length !== this.totalResults) {
                this.ngZone.run(() => this.onScroll());
            }
        });
        this.subscription.add(scrollSubscription);
    }

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

    public trackByItem(index, item: ContentModel<TEntity>): string {
        return item.item.id;
      }
}
