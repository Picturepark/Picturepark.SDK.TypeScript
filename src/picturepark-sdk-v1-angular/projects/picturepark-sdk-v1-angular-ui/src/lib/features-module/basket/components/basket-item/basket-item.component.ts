import { Component, Input, Injector } from '@angular/core';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';
import { Content } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent extends BaseComponent {
  @Input() public item: Content;

  constructor(private basketService: BasketService, protected injector: Injector) {
    super(injector);
  }

  public remove() {
    this.basketService.removeItem(this.item.id);
  }
}
