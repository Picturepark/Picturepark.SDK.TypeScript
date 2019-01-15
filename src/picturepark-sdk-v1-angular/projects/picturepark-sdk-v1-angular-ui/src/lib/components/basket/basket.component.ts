import { Component, Output, EventEmitter } from '@angular/core';

import { ContentService, ContentDownloadLinkCreateRequest } from '@picturepark/sdk-v1-angular';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  public basketItems: string[] = [];

  @Output()
  public previewItemChange = new EventEmitter<string>();


  constructor(private contentService: ContentService, private basketService: BasketService) {
    this.basketService.basketChange.subscribe((items) => this.basketItems = items);
  }

  public previewItem(itemId: string) {
    this.previewItemChange.emit(itemId);
  }

  public downloadItems() {
    const request = new ContentDownloadLinkCreateRequest({
      contents: this.basketItems.map(item => ({ contentId: item, outputFormatId: 'Original' }))
    });

    this.contentService.createDownloadLink(request).subscribe(data => {
      if (data.downloadUrl) {
        window.location.replace(data.downloadUrl);
      }
    });
  }

  public clearBasket() {
    this.basketService.clearBasket();
  }

  public trackByBasket(index, basket: string) {
    return basket;
  }
}
