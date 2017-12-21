import {
  Component, Input, Output, OnChanges, SimpleChange,
  ViewChildren, QueryList, EventEmitter, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { InputConverter, StringConverter, NumberConverter } from '../converter';

import { ChangeEvent, VirtualScrollComponent } from 'angular2-virtual-scroll';

import {
  ContentService, ContentSearchRequest, ContentSearchResult, AndFilter,
  FilterBase, SortInfo, SortDirection, Content, ContentSearchType, BrokenDependenciesFilter
} from '@picturepark/sdk-v1-angular';
import { ContentBrowserItemComponent } from '../content-browser-item/content-browser-item.component';

@Component({
  selector: 'pp-content-browser',
  templateUrl: './content-browser.component.html'
})
export class ContentBrowserComponent implements OnChanges {
  private totalResults: number = -1;

  isLoading = false;
  items: ContentModel[] = [];

  @Input()
  @InputConverter(StringConverter)
  height = '500px';

  @Input()
  @InputConverter(StringConverter)
  channel = '';

  @Input()
  query = '';

  @Input()
  filters: FilterBase[] = [];

  @Input()
  selectionMode = SelectionMode.Multiple;

  @Input()
  @InputConverter(NumberConverter)
  columns = 2;

  @Input()
  selectedItems: Content[] = [];
  @Output()
  selectedItemsChange = new EventEmitter<Content[]>();

  @Output()
  doubleClick = new EventEmitter<Content>();

  @ViewChild('virtualScroll')
  private virtualScroll: VirtualScrollComponent;

  constructor(private contentService: ContentService) {
  }

  toggleSelected(item: ContentModel) {
    if (this.selectionMode === SelectionMode.Single) {
      for (const i of this.items) {
        i.isSelected = i === item ? !i.isSelected : false;
      }
    } else if (this.selectionMode === SelectionMode.Multiple) {
      item.isSelected = !item.isSelected;
    }
    this.updateSelectedItems();
  }

  onDoubleClicked(item: ContentModel) {
    this.doubleClick.emit(item.item);
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['channel'] || changes['filters'] || changes['query']) {
      this.items = [];
      this.loadData();
    } else if (changes['selectionMode']) {
      this.onSelectionModeChanged()
    } else if (changes['selectedItems']) {
      this.onSelectedItems();
    }
  }

  public refresh() {
    if (this.virtualScroll) {
      this.virtualScroll.refresh();
    }
  }

  protected loadData() {
    if (this.channel && !this.isLoading) {
      this.isLoading = true;
      const request = new ContentSearchRequest({
        debugMode: false,
        start: this.items.length,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        filter: new AndFilter({ filters: this.filters }),
        channelIds: [this.channel],
        lifeCycleFilter: 0,
        limit: 50,
        searchString: this.query,
        searchType: ContentSearchType.MetadataAndFullText,
        sort: [
          new SortInfo({
            field: 'audit.creationDate',
            direction: SortDirection.Desc
          })
        ]
      });

      return this.contentService.searchByChannel(this.channel, request).toPromise().then(result => {
        if (result) {
          this.totalResults = result.totalResults;
          if (result.results) {
            for (const r of result.results) {
              this.items.push(new ContentModel(r, this));
            }
          }
        }

        this.updateSelectedItems();
        this.refresh();
        this.isLoading = false;
      }, error => {
        this.totalResults = -1;
        this.isLoading = false;
      });
    }

    return Promise.resolve();
  }

  protected onListChange(event: ChangeEvent) {
    if (event.end !== this.items.length) {
      return;
    }

    if (event.end === this.totalResults) {
      return;
    }

    this.loadData();
  }

  private updateSelectedItems() {
    this.selectedItems = this.items.filter(i => i.isSelected).map(i => i.item);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  private onSelectionModeChanged() {
    if (this.selectionMode === SelectionMode.None) {
      for (const item of this.items) {
        item.isSelected = false;
      }
    } else if (this.selectionMode === SelectionMode.Single) {
      if (this.selectedItems.length > 1) {
        for (const item of this.items) {
          item.isSelected = false;
        }
      }
    }

    setTimeout(() => this.updateSelectedItems(), 0);
  }

  private onSelectedItems() {
    for (const item of this.items) {
      item.isSelected = this.selectedItems.filter(i => i.id === item.item.id).length > 0;
    }
  }
}

export enum SelectionMode {
  None = <any>'none',
  Single = <any>'single',
  Multiple = <any>'multiple',
}

export class ContentModel {
  isSelected = false;
  item: Content;
  parent: ContentBrowserComponent;

  constructor(item: Content, parent: ContentBrowserComponent) {
    this.item = item;
    this.parent = parent;
  }
}
