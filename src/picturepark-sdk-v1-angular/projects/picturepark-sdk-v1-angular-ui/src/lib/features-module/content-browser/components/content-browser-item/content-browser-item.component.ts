import { Component, OnChanges, SecurityContext, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// LIBRARIES
import { Content, ThumbnailSize } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../../../content-download-dialog/content-download-dialog.service';
import { map, debounceTime, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ContentBrowserComponent } from '../../content-browser.component';

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
  public listItemHtml: SafeHtml | null = null;

  public thumbnailSizes = ThumbnailSize;

  isSelected$: Observable<boolean> | undefined;
  isInBasket$: Observable<boolean> | undefined;

  constructor(
    protected injector: Injector,
    private basketService: BasketService,
    private sanitizer: DomSanitizer,
    private contentDownloadDialogService: ContentDownloadDialogService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.isInBasket$ = this.basketService.basketChange.pipe(
      map(items => items.some(selectedItem => selectedItem === this.itemModel.item.id))
    );

    this.isSelected$ = this.browser.selectedItemsChange.pipe(
      debounceTime(10),
      map(items => items.some(selectedItem => selectedItem.id === this.itemModel.item.id)),
      share()
    );
  }

  public ngOnChanges(): void {
    if (this.itemModel.item.displayValues && this.itemModel.item.displayValues['list']) {
      this.listItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.itemModel.item.displayValues['list']);
    }
  }

  public downloadItem() {
    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: [this.itemModel.item],
    });
  }

  public toggleInBasket() {
    if (!this.itemModel.item.id) {
      return;
    }

    this.basketService.toggle(this.itemModel.item.id);
  }
}
