import { Component, OnChanges, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// LIBRARIES
import { Content, ThumbnailSize } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../../../content-download-dialog/content-download-dialog.service';

@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html',
  styleUrls: [
    '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
    './content-browser-item.component.scss'
  ]
})
export class ContentBrowserItemComponent extends BaseBrowserItemComponent<Content> implements OnChanges {

  public listItemHtml: SafeHtml | null = null;

  public thumbnailSizes = ThumbnailSize;

  constructor(
    private basketService: BasketService,
    private sanitizer: DomSanitizer,
    private contentDownloadDialogService: ContentDownloadDialogService
  ) {
    super();
  }

  public ngOnChanges(): void {
    if (this.itemModel.item.displayValues && this.itemModel.item.displayValues['list']) {
      this.listItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.itemModel.item.displayValues['list']);
    }
  }

  public downloadItem() {
    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: [this.itemModel.item]
    });
  }

  public toggleInBasket() {
    if (!this.itemModel.item.id) {
      return;
    }

    if (this.itemModel.isInBasket === true) {
      this.basketService.removeItem(this.itemModel.item.id);
    } else {
      this.basketService.addItem(this.itemModel.item.id);
    }
  }
}
