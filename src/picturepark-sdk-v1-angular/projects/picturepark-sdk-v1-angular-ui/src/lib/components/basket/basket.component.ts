import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

import { ContentService, ContentDownloadLinkCreateRequest } from '@picturepark/sdk-v1-angular';
import { BasketService } from '../../services/basket.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent {
  public basketItems: string[] = [];

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(private contentService: ContentService, private basketService: BasketService) {
    super();
    const basketSubscription = this.basketService.basketChange.subscribe((items) => this.basketItems = items);
    this.subscription.add(basketSubscription);
  }

  public previewItem(itemId: string) {
    this.previewItemChange.emit(itemId);
  }

  public downloadItems() {
    const request = new ContentDownloadLinkCreateRequest({
      contents: this.basketItems.map(item => ({ contentId: item, outputFormatId: 'Original' }))
    });

    const linkSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
      if (data.downloadUrl) {
        window.location.replace(data.downloadUrl);
      }
    });
    this.subscription.add(linkSubscription);
  }

  public clearBasket() {
    this.basketService.clearBasket();
  }

  public trackByBasket(index, basket: string) {
    return basket;
  }
}
