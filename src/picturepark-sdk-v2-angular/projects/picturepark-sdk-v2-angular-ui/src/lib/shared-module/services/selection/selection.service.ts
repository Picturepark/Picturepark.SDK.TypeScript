import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEntityBase } from '@picturepark/sdk-v2-angular';

@Injectable({
  providedIn: 'root',
})
export class SelectionService<TEntity extends IEntityBase> {
  private selectedItemsSubject: BehaviorSubject<TEntity[]> = new BehaviorSubject([]);

  private items: Set<TEntity> = new Set();

  get selectedItems(): Observable<TEntity[]> {
    return this.selectedItemsSubject.asObservable();
  }

  addItem(itemId: TEntity) {
    this.items.add(itemId);
    this.updateSubject();
  }

  addItems(items: TEntity[]) {
    items.forEach(item => this.items.add(item));
    this.updateSubject();
  }

  removeItem(value: TEntity | string) {
    if (typeof value === 'string') {
      const item = this.getById(value);
      this.items.delete(item!);
    } else {
      this.items.delete(value);
    }

    this.updateSubject();
  }

  removeItems(values: TEntity[] | string[]) {
    values.forEach(value => {
      if (typeof value === 'string') {
        const item = this.getById(value);
        this.items.delete(item!);
      } else {
        this.items.delete(value);
      }
    });

    this.updateSubject();
  }

  toggle(item: TEntity) {
    if (this.items.has(item)) {
      this.removeItem(item);
    } else {
      this.addItem(item);
    }
  }

  getById(value: string): TEntity | undefined {
    return Array.from(this.items.values()).find(i => i.id === value);
  }

  clear() {
    this.items.clear();
    this.updateSubject();
  }

  isEmpty(): boolean {
    return Array.from(this.items.values()).length === 0;
  }

  private updateSubject() {
    const itemsArray = Array.from(this.items);
    this.selectedItemsSubject.next(itemsArray);
  }
}
