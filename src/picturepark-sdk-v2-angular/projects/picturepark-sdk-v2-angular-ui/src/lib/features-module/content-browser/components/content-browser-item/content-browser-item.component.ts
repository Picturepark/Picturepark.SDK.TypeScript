import {
  Component,
  OnChanges,
  SecurityContext,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Content, ThumbnailSize } from '@picturepark/sdk-v2-angular';
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';
import { BasketService } from '../../../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../../../content-download-dialog/services/content-download-dialog.service';
import { map } from 'rxjs/operators';
import { ItemBasketSelection } from './content-browser-item.interface';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ContentItemThumbnailComponent } from '../../../../shared-module/components/content-item-thumbnail/content-item-thumbnail.component';

@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html',
  styleUrls: [
    '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
    './content-browser-item.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ContentItemThumbnailComponent,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    TranslatePipe,
  ],
})
export class ContentBrowserItemComponent extends BaseBrowserItemComponent<Content> implements OnChanges, OnInit {
  @Output() changeInBasket = new EventEmitter<ItemBasketSelection>();
  listItemHtml: SafeHtml | null = null;
  thumbnailSizes = ThumbnailSize;

  isSelected = signal(false);
  isInBasket = signal(false);

  constructor(
    private basketService: BasketService,
    private sanitizer: DomSanitizer,
    private contentDownloadDialogService: ContentDownloadDialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.sub = this.basketService.basketChange
      .pipe(map(items => items.some(selectedItem => selectedItem === this.itemModel.id)))
      .subscribe(isInBasket => this.isInBasket.set(isInBasket));

    this.sub = this.browser.selectedItemsChange
      .pipe(map(items => items.some(selectedItem => selectedItem.id === this.itemModel.id)))
      .subscribe(isSelected => this.isSelected.set(isSelected));
  }

  ngOnChanges(): void {
    if (this.itemModel.displayValues?.['list']) {
      this.listItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.itemModel.displayValues['list']);
    }
  }

  downloadItem() {
    if (!this.isSelected) {
      this.browser.setSelectedItems([this.itemModel]);
    }

    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: this.browser.selectedItems(),
    });
  }

  handleChangeInBasket() {
    this.changeInBasket.emit({ addItem: !this.isInBasket(), itemId: this.itemModel.id });
  }
}
