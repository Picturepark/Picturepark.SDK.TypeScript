import {
  Component,
  OnChanges,
  SecurityContext,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// LIBRARIES
import { Content, ThumbnailSize } from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../../../content-download-dialog/services/content-download-dialog.service';
import { map, share, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemBasketSelection } from './interfaces/content-browser-item.interface';

@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html',
  styleUrls: [
    '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
    './content-browser-item.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBrowserItemComponent extends BaseBrowserItemComponent<Content> implements OnChanges, OnInit {
  @Output() changeInBasket = new EventEmitter<ItemBasketSelection>();
  listItemHtml: SafeHtml | null = null;
  thumbnailSizes = ThumbnailSize;

  isSelected$: Observable<boolean> | undefined;
  isInBasket$: Observable<boolean> | undefined;
  private isSelected: boolean | undefined;

  constructor(
    private basketService: BasketService,
    private sanitizer: DomSanitizer,
    private contentDownloadDialogService: ContentDownloadDialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isInBasket$ = this.basketService.basketChange.pipe(
      map(items => items.some(selectedItem => selectedItem === this.itemModel.id))
    );

    this.isSelected$ = this.browser.selectedItemsChange.pipe(
      map(items => items.some(selectedItem => selectedItem.id === this.itemModel.id)),
      tap(isSelected => (this.isSelected = isSelected)),
      share()
    );
  }

  ngOnChanges(): void {
    if (this.itemModel.displayValues && this.itemModel.displayValues['list']) {
      this.listItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.itemModel.displayValues['list']);
    }
  }

  downloadItem() {
    if (!this.isSelected) {
      this.browser.selectedItems = [this.itemModel];
    }

    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: this.browser.selectedItems,
    });
  }

  handleChangeInBasket() {
    this.isInBasket$?.pipe(take(1)).subscribe(inBasket => {
      this.changeInBasket.emit({ addItem: !inBasket, itemId: this.itemModel.id });
    });
  }
}
