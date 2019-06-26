import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { BasketService } from '../../../services/basket.service';
import { ThumbnailSize, ContentService } from '@picturepark/sdk-v1-angular';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent extends BaseComponent implements OnInit {
  @Input()
  public itemId: string;

  public imageUrl: SafeUrl;

  constructor(private basketService: BasketService, private contentService: ContentService, private sanitizer: DomSanitizer) {
    super();
  }

  public ngOnInit(): void {
    const downloadThumbnailSubscription = this.contentService.downloadThumbnail(
<<<<<<< HEAD
      this.itemId, ThumbnailSize.Small, null, null
=======
      this.itemId,
      ThumbnailSize.Small,
      null,
      null
>>>>>>> 6c751f76f5e2df7c8c6118f89f66f685244308b5
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
