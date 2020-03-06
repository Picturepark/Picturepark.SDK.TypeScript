import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Content } from '@picturepark/sdk-v1-angular';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketSubject: BehaviorSubject<Content[]>;


  private localStorageKey = 'basketItems';
  public basketItems: Content[];

  constructor() {
    const storedItem = localStorage.getItem(this.localStorageKey);
    this.basketItems = storedItem ? JSON.parse(storedItem) as Content[] : [];
    this.basketSubject = new BehaviorSubject(this.basketItems);
    this.basketSubject.next(this.basketItems);
  }

  public get basketChange(): Observable<Content[]> {
    return this.basketSubject.asObservable();
  }

  public addItem(item: Content) {
    if (this.basketItems.findIndex( q => q.id === item.id ) === -1) {
      this.basketItems.push(item);
      this.updateStorage();
    }
  }

  public removeItem(item: Content) {
    this.basketItems = this.basketItems.filter( q => q.id !== item.id);
    this.updateStorage();
  }

  public clearBasket() {
    this.basketItems = [];
    this.updateStorage();
  }

  private updateStorage() {
    const value = JSON.stringify(this.basketItems);
    localStorage.setItem(this.localStorageKey, value);

    this.basketSubject.next(this.basketItems);
  }
}
