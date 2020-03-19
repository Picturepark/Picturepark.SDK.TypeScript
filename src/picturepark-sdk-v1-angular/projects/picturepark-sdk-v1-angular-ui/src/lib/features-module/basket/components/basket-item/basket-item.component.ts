import { Component, Input, Output, EventEmitter } from '@angular/core';


// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';
import { Content } from '@picturepark/sdk-v1-angular';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent extends BaseComponent  {

  @Input() public item: Content;

  @Output() itemChange = new EventEmitter<Content>();

  constructor(
    private basketService: BasketService,
  ) {
    super();
  }

  public remove() {
    this.basketService.removeItem(this.item.id);
  }
}
