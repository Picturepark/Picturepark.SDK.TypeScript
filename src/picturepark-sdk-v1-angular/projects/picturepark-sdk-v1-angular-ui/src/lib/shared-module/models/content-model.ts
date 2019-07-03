export class ContentModel<TEntity> {
  isSelected = false;
  isInBasket = false;
  item: TEntity;

  constructor(item: TEntity, isInBasket: boolean) {
    this.item = item;
    this.isInBasket = isInBasket;
  }
}
