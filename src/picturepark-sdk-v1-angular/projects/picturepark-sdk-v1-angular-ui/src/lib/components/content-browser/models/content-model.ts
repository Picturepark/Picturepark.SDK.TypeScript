import { Content } from '@picturepark/sdk-v1-angular';

export class ContentModel {
  isSelected = false;
  isInBasket = false;
  item: Content;

  constructor(item: Content, isInBasket: boolean) {
    this.item = item;
    this.isInBasket = isInBasket;
  }
}
