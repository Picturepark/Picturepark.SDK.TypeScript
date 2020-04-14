import { Component, Input, Injector } from '@angular/core';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { BasketService } from '../../../../shared-module/services/basket/basket.service';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent extends BaseComponent {
  @Input() public itemId: string;

  constructor(private basketService: BasketService, protected injector: Injector) {
    super(injector);
  }


  public remove() {
    this.basketService.removeItem(this.itemId);
  }
}
