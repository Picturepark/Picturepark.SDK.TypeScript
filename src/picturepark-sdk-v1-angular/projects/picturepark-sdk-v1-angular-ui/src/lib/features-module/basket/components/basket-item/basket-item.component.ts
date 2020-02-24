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
export class BasketItemComponent extends BaseComponent {

  @Input()
  public item: Content;

  constructor(
    private basketService: BasketService,
  ) {
    super();
  }

  public remove() {
    this.basketService.removeItem(this.item);
  }
}
