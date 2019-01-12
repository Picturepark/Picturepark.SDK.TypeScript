import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { BasketService } from '../../../services/basket.service';
import { ThumbnailSize, ContentService } from '@picturepark/sdk-v1-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit, OnDestroy {
  @Input()
  public itemId: string;

  public imageUrl: SafeUrl;
  private subscription: Subscription;

  constructor(private basketService: BasketService, private contentService: ContentService, private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.subscription = this.contentService.downloadThumbnail(this.itemId, ThumbnailSize.Small, null, null).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public remove() {
    this.basketService.removeItem(this.itemId);
  }
}
