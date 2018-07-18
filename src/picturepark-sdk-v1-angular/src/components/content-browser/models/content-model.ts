import { Content } from '../../../services/services';

export class ContentModel {
  isSelected = false;
  isInBasket = false;
  item: Content;

  constructor(item: Content, isInBasket: boolean) {
    this.item = item;
    this.isInBasket = isInBasket;
  }
}
