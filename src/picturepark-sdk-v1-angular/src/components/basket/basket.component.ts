import { BasketService } from './../../services/basket.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  public basketItems: string[] = [];

  @Output()
  public previewItemChange = new EventEmitter<string>();


  constructor(private basketService: BasketService) {
    this.basketService.basketChange.subscribe((items) => this.basketItems = items);
  }

  public previewItem(itemId: string) {
    this.previewItemChange.emit(itemId);
  }

  public clearBasket() {
    this.basketService.clearBasket();
  }
}
