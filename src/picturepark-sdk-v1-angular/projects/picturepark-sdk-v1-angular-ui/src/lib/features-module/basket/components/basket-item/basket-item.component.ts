import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';

// LIBRARIES
import { ThumbnailSize, ContentService } from '@picturepark/sdk-v1-angular';

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
  public itemId: string;

  public imageUrl: SafeUrl;

  constructor(
    private basketService: BasketService,
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  public ngOnInit(): void {
    const downloadThumbnailSubscription = this.contentService.downloadThumbnail(
      this.itemId, ThumbnailSize.Small, null, null
    ).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });
    this.subscription.add(downloadThumbnailSubscription);
  }

  public remove() {
    this.basketService.removeItem(this.itemId);
  }
}
