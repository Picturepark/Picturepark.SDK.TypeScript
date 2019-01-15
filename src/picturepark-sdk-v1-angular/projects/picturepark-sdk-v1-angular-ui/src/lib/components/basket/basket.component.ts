import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

import { ContentService, ContentDownloadLinkCreateRequest } from '@picturepark/sdk-v1-angular';
import { BasketService } from '../../services/basket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnDestroy {
  public basketItems: string[] = [];

  @Output()
  public previewItemChange = new EventEmitter<string>();

  private subscription: Subscription = new Subscription();

  constructor(private contentService: ContentService, private basketService: BasketService) {
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

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
