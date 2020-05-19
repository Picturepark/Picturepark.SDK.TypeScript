import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Content, ContentService, fetchContents } from '@picturepark/sdk-v1-angular';
import { BasketChange, BasketOperation } from './interfaces/basket-change';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketItemsIdsSubject: BehaviorSubject<string[]>;
  private basketItemsSubject: BehaviorSubject<Content[]>;
  private basketChanges: BehaviorSubject<BasketChange>;

  private localStorageKey = 'basketItems';
  private basketItemsIds: Set<string>;
  private basketItems: Content[] = [];

  constructor(private contentService: ContentService) {
    const itemsString = localStorage.getItem(this.localStorageKey);
    const itemsIdsArray = itemsString ? (JSON.parse(itemsString) as string[]) : [];

    this.basketItemsIds = new Set(itemsIdsArray);

    this.basketItemsIdsSubject = new BehaviorSubject([]);
    this.basketItemsSubject = new BehaviorSubject([]);
    this.basketChanges = new BehaviorSubject({ operation: BasketOperation.added, itemsIds: itemsIdsArray });

    this.basketChanges.subscribe((change) => {
      if (change.operation === BasketOperation.added) {
        // Handle basketItemsIds
        change.itemsIds.forEach((itemId) => this.basketItemsIds.add(itemId));

        // Handle basketItems
        const sub = fetchContents(this.contentService, change.itemsIds).subscribe((response) => {
          this.basketItems = this.basketItems.concat(response.results);
          this.basketItemsSubject.next(this.basketItems);
          sub.unsubscribe();
        });
      } else if (change.operation === BasketOperation.removed) {
        // Handle basketItemsIds
        change.itemsIds.forEach((itemId) => this.basketItemsIds.delete(itemId));

        // Handle basketItems
        this.basketItems = this.basketItems.filter((item) => !change.itemsIds.includes(item.id));
        this.basketItemsSubject.next(this.basketItems);
      } else if (change.operation === BasketOperation.cleared) {
        // Handle basketItemsIds
        this.basketItemsIds.clear();

        // Handle basketItems
        this.basketItems = [];
        this.basketItemsSubject.next(this.basketItems);
      }

      this.basketUpdated();
    });
  }

  public get basketChange(): Observable<string[]> {
    return this.basketItemsIdsSubject.asObservable();
  }

  public get basketItemsChanges(): Observable<Content[]> {
    return this.basketItemsSubject.asObservable();
  }

  public getBasketItems(): string[] {
    return Array.from(this.basketItemsIds);
  }

  public addItem(itemId: string) {
    this.basketChanges.next({ operation: BasketOperation.added, itemsIds: [itemId] });
  }

  public addItems(itemsIds: string[]) {
    this.basketChanges.next({ operation: BasketOperation.added, itemsIds: itemsIds });
  }

  public removeItem(itemId: string) {
    this.basketChanges.next({ operation: BasketOperation.removed, itemsIds: [itemId] });
  }

  public clearBasket() {
    this.basketChanges.next({ operation: BasketOperation.cleared, itemsIds: [] });
  }

  public contains(itemId: string) {
    return this.basketItemsIds.has(itemId);
  }

  public toggle(itemId: string) {
    if (this.contains(itemId)) {
      this.removeItem(itemId);
    } else {
      this.addItem(itemId);
    }
  }

  private basketUpdated() {
    const itemsIdsArray = Array.from(this.basketItemsIds);

    // Update storage
    const value = JSON.stringify(itemsIdsArray);
    localStorage.setItem(this.localStorageKey, value);

    // Update basket items ids
    this.basketItemsIdsSubject.next(itemsIdsArray);
  }
}
