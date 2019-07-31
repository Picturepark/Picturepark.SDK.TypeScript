import { Component, OnChanges, SimpleChanges, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';

// LIBRARIES
import { ContentService, ThumbnailSize, Content } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../../../dialog/components/content-download-dialog/content-download-dialog.service';

// INTERFACES
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html',
  styleUrls: [
    '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
    './content-browser-item.component.scss'
  ]
})
export class ContentBrowserItemComponent extends BaseBrowserItemComponent<Content> implements OnChanges, OnInit {

  // VARS
  public thumbnailSizes = ThumbnailSize;

  public isLoading = true;

  public thumbnailUrl: SafeUrl | null = null;

  public virtualItemHtml: SafeHtml | null = null;

  public listItemHtml: SafeHtml | null = null;

  private nonVirtualContentSchemasIds = ['AudioMetadata', 'DocumentMetadata', 'FileMetadata', 'ImageMetadata', 'VideoMetadata'];

  constructor(
    private basketService: BasketService,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private contentDownloadDialogService: ContentDownloadDialogService
  ) {

    super();

  }

  public ngOnInit(): void {

    const downloadSubscription = this.loadItem.pipe(
      switchMap(
        () => {
          return this.contentService.downloadThumbnail(
            this.itemModel.item.id,
            this.isListView ? ThumbnailSize.Small : this.thumbnailSize as ThumbnailSize,
            null,
            null);
        })
      ).subscribe(response => {
      if (response) {
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data));
        this.isLoading = false;
      }
    }, () => {
      this.thumbnailUrl = null;
      this.isLoading = false;
    });

    this.subscription.add(downloadSubscription);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemModel'] && changes['itemModel'].firstChange) {
      if (this.itemModel.item.contentSchemaId && this.nonVirtualContentSchemasIds.indexOf(this.itemModel.item.contentSchemaId) === -1) {
        if (this.itemModel.item.displayValues && this.itemModel.item.displayValues['thumbnail']) {
          this.virtualItemHtml = this.sanitizer.bypassSecurityTrustHtml(this.itemModel.item.displayValues['thumbnail']);
        }
      }
    }

    if (this.itemModel.item.displayValues && this.itemModel.item.displayValues['list']) {
      this.listItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.itemModel.item.displayValues['list']);
    }

    if (changes['thumbnailSize'] && this.virtualItemHtml === null && this.isVisible) {
      const updateImage =
        (changes['thumbnailSize'].firstChange) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Small && this.isListView === false) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Medium && this.thumbnailSize === ThumbnailSize.Large);

      if (updateImage) {
        this.isLoading = true;
        this.thumbnailUrl = null;
        this.loadItem.next();
      }
    }
  }

  public downloadItem() {
    this.contentDownloadDialogService.showDialog([this.itemModel.item]);
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
