import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEntityBase } from '@picturepark/sdk-v2-angular';
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ISortItem } from '../../shared-module/components/browser-base/interfaces/sort-item';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-browser-toolbar',
  templateUrl: './browser-toolbar.component.html',
  styleUrls: ['./browser-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    TranslatePipe,
  ],
})
export class BrowserToolbarComponent extends BaseComponent {
  @Input() selectionEnabled = true;

  @Input() sortingEnabled = true;

  @Input() entityName: string;

  @Input() browser: BaseBrowserComponent<IEntityBase>;

  get buttonLabel(): string {
    return this.selectedItemCount > 0 ? 'ContentBrowser.Selected' : 'ContentBrowser.SelectMenu';
  }

  get selectedItemCount(): number {
    return this.browser.selectedItems.length;
  }

  get selectedItemCountLabel(): string {
    return this.selectedItemCount > 0 ? `${this.selectedItemCount}` : '';
  }

  setSortDirection(asc: boolean) {
    this.browser.setSort(this.browser.activeSortingType, asc);
  }

  setSortField(sort: ISortItem) {
    this.browser.setSort(sort, this.browser.isAscending ?? true);
  }
}
