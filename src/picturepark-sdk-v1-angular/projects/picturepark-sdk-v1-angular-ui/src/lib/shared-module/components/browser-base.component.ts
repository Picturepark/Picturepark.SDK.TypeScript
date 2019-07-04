import {LazyGetter} from 'lazy-get-decorator';
import { BaseComponent } from './base.component';
import { Injector, OnInit, NgZone, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ConfigActions, PictureparkUIConfiguration, PICTUREPARK_UI_CONFIGURATION } from '../../configuration';
import { ContentModel } from '../models/content-model';
import { FilterBase } from '@picturepark/sdk-v1-angular';
import { SortingType } from '../models/sorting-type';
import { LiquidRenderingService } from '../services/liquid-rendering/liquid-rendering.service';
import { Observable } from 'rxjs';
import { ContentItemSelectionService } from '../services/content-item-selection/content-item-selection.service';
import { MatDialog } from '@angular/material';

export abstract class BaseBrowserComponent<TEntity extends { id: string }> extends BaseComponent implements OnInit {
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
    protected get contentItemSelectionService(): ContentItemSelectionService {
        return this.injector.get(ContentItemSelectionService);
    }
    @LazyGetter()
    protected get dialog(): MatDialog {
        return this.injector.get(MatDialog);
    }

    protected pictureParkUIConfig: PictureparkUIConfiguration;

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
    private lastSelectedIndex = 0;

    abstract init(): void;
    abstract onScroll(): void;
    abstract getSearchRequest(): Observable<any> | undefined;
    abstract checkContains(elementClassName: string): boolean;

    constructor(protected componentName: string, protected injector: Injector) {
        super();

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
                this.items.push(...searchResult.results.map(item => {
                    const contentModel = new ContentModel(item, false);
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

    /**
     * Click event to trigger selection (ctrl + shift click)
     */
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

    public toggleItems(isSelected: boolean): void {
        if (isSelected === true) {
            this.contentItemSelectionService.addItems(this.items.map((model) => model.item.id || ''));
        } else {
            this.contentItemSelectionService.clear();
        }
    }

    // HANDLE COMPONENENT CLICK EVENT
    @HostListener('document:click', ['$event'])
    handleClick(event: any): void {
        if (this.dialog.openDialogs.length > 0) { return; }

        console.log('clear', event.srcElement);
        if (this.checkContains(event.srcElement.className)) {
            this.contentItemSelectionService.clear();
        }
    }
}
