import { SafeUrl, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, Input, OnInit, SecurityContext } from '@angular/core';

// LIBRARIES
import { ThumbnailSize, ContentService, Content } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent extends BaseComponent implements OnInit {

  @Input()
  public item: Content;

  public imageUrl: SafeUrl;

  private nonVirtualContentSchemasIds = ['AudioMetadata', 'DocumentMetadata', 'FileMetadata', 'ImageMetadata', 'VideoMetadata'];
  public virtualItemHtml: SafeHtml | null = null;

  public isLoading = false;

  constructor(
    private basketService: BasketService,
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  public ngOnInit(): void {

    if (this.item.contentSchemaId && this.nonVirtualContentSchemasIds.indexOf(this.item.contentSchemaId) === -1) {
      if (this.item.displayValues && this.item.displayValues['thumbnail']) {
        this.virtualItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.item.displayValues['thumbnail']);
        return;
      }
    }

    this.isLoading = true;
    const downloadThumbnailSubscription = this.contentService.downloadThumbnail(
      this.item.id, ThumbnailSize.Small, null, null
    ).subscribe(result => {
      this.isLoading = false;

      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });
    this.subscription.add(downloadThumbnailSubscription);
  }



  public updateUrl(event) {
    event.path[0].src = 'https://icons-for-free.com/download-icon-broken+image+48px-131985226047038454_512.png';
  }

  public remove() {
    this.basketService.removeItem(this.item);
  }
}
