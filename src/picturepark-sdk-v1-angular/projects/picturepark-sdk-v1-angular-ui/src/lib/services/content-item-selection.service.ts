import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ContentItemSelectionService {
  private selectedItemsSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);

  private items: Set<string> = new Set();

  public get selectedItems(): Observable<string[]> {
    return this.selectedItemsSubject.asObservable();
  }

  public addItem(itemId: string) {
    this.items.add(itemId);
    this.updateSubject();
  }

  public addItems(items: string[]) {
    items.forEach(item => this.items.add(item));
    this.updateSubject();
  }

  public removeItem(itemId: string) {
    this.items.delete(itemId);
    this.updateSubject();
  }

  public clear() {
    this.items.clear();
    this.updateSubject();
  }

  private updateSubject() {
    const itemsArray = Array.from(this.items);

    this.selectedItemsSubject.next(itemsArray);
  }
}
