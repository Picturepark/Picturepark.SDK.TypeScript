export interface BasketChange {
  operation: BasketOperation;
  itemsIds: string[];
}

export enum BasketOperation {
  added,
  removed,
  cleared,
}
