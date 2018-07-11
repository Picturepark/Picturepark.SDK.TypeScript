import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
// TODO: should it be user specific?
export class BasketService {
  private basketSubject: BehaviorSubject<string[]>;


  private localStorageKey = 'basketItems';
  private basketItems: Set<string>;

  constructor() {
    const itemsString = localStorage.getItem(this.localStorageKey);
    const itemsArray = itemsString ? JSON.parse(itemsString) as string[] : [];

    this.basketItems = new Set(itemsArray);

    this.basketSubject = new BehaviorSubject(itemsArray);
  }

  public get basketChange(): Observable<string[]> {
    return this.basketSubject.asObservable();
  }

  public addItem(itemId: string) {
    this.basketItems.add(itemId);
    this.updateStorage();
  }

  public addItems(items: string[]) {
    items.forEach(item => this.basketItems.add(item));
    this.updateStorage();
  }

  public removeItem(itemId: string) {
    this.basketItems.delete(itemId);
    this.updateStorage();
  }

  public clearBasket() {
    this.basketItems.clear();
    this.updateStorage();
  }

  private updateStorage() {
    const itemsArray = Array.from(this.basketItems);
    const value = JSON.stringify(itemsArray);

    localStorage.setItem(this.localStorageKey, value);

    this.basketSubject.next(itemsArray);
  }
}
