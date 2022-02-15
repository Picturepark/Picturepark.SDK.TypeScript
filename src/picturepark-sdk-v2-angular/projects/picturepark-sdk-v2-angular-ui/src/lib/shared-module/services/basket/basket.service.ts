import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Content, ContentService, fetchContents, LocalStorageService, StorageKey } from '@picturepark/sdk-v2-angular';
import { BasketChange, BasketOperation } from './interfaces/basket-change';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketItemsIdsSubject: BehaviorSubject<string[]>;
  private basketItemsSubject: BehaviorSubject<Content[]>;
  private basketChanges: BehaviorSubject<BasketChange>;

  private basketItemsIds: Set<string> = new Set();
  private basketItems: Content[] = [];

  constructor(private contentService: ContentService, private localStorageService: LocalStorageService) {
    const itemsString = this.localStorageService.get(StorageKey.BasketItems);
    const itemsIdsArray = itemsString ? (JSON.parse(itemsString) as string[]) : [];

    this.basketItemsIdsSubject = new BehaviorSubject([]);
    this.basketItemsSubject = new BehaviorSubject([]);
    this.basketChanges = new BehaviorSubject({ operation: BasketOperation.added, itemsIds: itemsIdsArray });

    this.basketChanges.subscribe(change => {
      if (change.operation === BasketOperation.added) {
        // Clear duplicates
        const itemsToAdd = change.itemsIds.filter(itemId => !Array.from(this.basketItemsIds).includes(itemId));

        // Handle basketItemsIds
        itemsToAdd.forEach(itemId => this.basketItemsIds.add(itemId));

        // Handle basketItems
        const sub = fetchContents(this.contentService, itemsToAdd).subscribe(response => {
          this.basketItems = this.basketItems.concat(response.results);
          this.basketItemsSubject.next(this.basketItems);
          sub.unsubscribe();
        });
      } else if (change.operation === BasketOperation.removed) {
        // Handle basketItemsIds
        change.itemsIds.forEach(itemId => this.basketItemsIds.delete(itemId));

        // Handle basketItems
        this.basketItems = this.basketItems.filter(item => !change.itemsIds.includes(item.id));
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

  get basketChange(): Observable<string[]> {
    return this.basketItemsIdsSubject.asObservable();
  }

  get basketItemsChanges(): Observable<Content[]> {
    return this.basketItemsSubject.asObservable();
  }

  getBasketItems(): string[] {
    return Array.from(this.basketItemsIds);
  }

  addItem(itemId: string) {
    this.basketChanges.next({ operation: BasketOperation.added, itemsIds: [itemId] });
  }

  addItems(itemsIds: string[]) {
    this.basketChanges.next({ operation: BasketOperation.added, itemsIds: itemsIds });
  }

  removeItem(itemId: string) {
    this.basketChanges.next({ operation: BasketOperation.removed, itemsIds: [itemId] });
  }

  removeItems(itemsIds: string[]) {
    this.basketChanges.next({ operation: BasketOperation.removed, itemsIds: itemsIds });
  }

  clearBasket() {
    this.basketChanges.next({ operation: BasketOperation.cleared, itemsIds: [] });
  }

  contains(itemId: string) {
    return this.basketItemsIds.has(itemId);
  }

  toggle(itemId: string) {
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
    this.localStorageService.set(StorageKey.BasketItems, value);

    // Update basket items ids
    this.basketItemsIdsSubject.next(itemsIdsArray);
  }
}
