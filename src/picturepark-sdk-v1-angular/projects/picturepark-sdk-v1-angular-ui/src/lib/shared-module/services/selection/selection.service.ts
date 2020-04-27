import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEntityBase } from '@picturepark/sdk-v1-angular';

@Injectable({
  providedIn: 'root',
})
export class SelectionService<TEntity extends IEntityBase> {
  private selectedItemsSubject: BehaviorSubject<TEntity[]> = new BehaviorSubject([]);

  private items: Set<TEntity> = new Set();

  public get selectedItems(): Observable<TEntity[]> {
    return this.selectedItemsSubject.asObservable();
  }

  public addItem(itemId: TEntity) {
    this.items.add(itemId);
    this.updateSubject();
  }

  public addItems(items: TEntity[]) {
    items.forEach((item) => this.items.add(item));
    this.updateSubject();
  }

  public removeItem(value: TEntity | string) {
    if (typeof value === 'string') {
      const item = this.getById(value);
      this.items.delete(item!);
    } else {
      this.items.delete(value);
    }

    this.updateSubject();
  }

  public toggle(item: TEntity) {
    if (this.items.has(item)) {
      this.removeItem(item);
    } else {
      this.addItem(item);
    }
  }

  public getById(value: string): TEntity | undefined {
    return Array.from(this.items.values()).find((i) => i.id === value);
  }

  public clear() {
    this.items.clear();
    this.updateSubject();
  }

  public isEmpty(): boolean {
    return Array.from(this.items.values()).length === 0;
  }

  private updateSubject() {
    const itemsArray = Array.from(this.items);
    this.selectedItemsSubject.next(itemsArray);
  }
}
