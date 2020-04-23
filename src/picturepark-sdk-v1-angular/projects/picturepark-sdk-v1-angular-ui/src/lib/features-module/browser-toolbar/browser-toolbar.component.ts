import { Component, OnInit, Input, Injector } from '@angular/core';

// LIBRARIES
import { IEntityBase } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ISortItem } from '../../shared-module/components/browser-base/interfaces/sort-item';

@Component({
  selector: 'pp-browser-toolbar',
  templateUrl: './browser-toolbar.component.html',
  styleUrls: ['./browser-toolbar.component.scss'],
})
export class BrowserToolbarComponent extends BaseComponent {
  @Input()
  selectionEnabled = true;

  @Input()
  sortingEnabled = true;

  @Input()
  entityName: string;

  @Input()
  browser: BaseBrowserComponent<IEntityBase>;

  get buttonLabel(): string {
    return this.selectedItemCount > 0 ? 'ContentBrowser.Selected' : 'ContentBrowser.SelectMenu';
  }

  get selectedItemCount(): number {
    return this.browser.selectedItems.length;
  }

  get selectedItemCountLabel(): string {
    return this.selectedItemCount > 0 ? `${this.selectedItemCount}` : '';
  }

  constructor(protected injector: Injector) {
    super(injector);
  }

  setSortDirection(asc: boolean) {
    this.browser.setSort(this.browser.activeSortingType, asc);
  }

  setSortField(sort: ISortItem) {
    this.browser.setSort(sort, this.browser.isAscending ?? true);
  }
}
