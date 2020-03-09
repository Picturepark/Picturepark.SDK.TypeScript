import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Content,
  ContentService,
  fetchAll,
  ContentSearchRequest,
  LifeCycleFilter,
  BrokenDependenciesFilter,
  ContentSearchType,
  TermsFilter } from '@picturepark/sdk-v1-angular';
import { ContentResolveBehavior } from '@picturepark/sdk-v1-angular';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketSubject: BehaviorSubject<Content[]>;


  private localStorageKey = 'basketItems';
  public basketItems: Content[];

  constructor(private contentService: ContentService) {
    const storedItem = localStorage.getItem(this.localStorageKey);
    this.basketItems = storedItem ? JSON.parse(storedItem) as Content[] : [];
    this.basketSubject = new BehaviorSubject(this.basketItems);
    this.basketSubject.next(this.basketItems);
  }

  public get basketChange(): Observable<Content[]> {
    return this.basketSubject.asObservable();
  }

  /**
   * @param item The item to be stored in the basket, it can be either the item in itself or
   * just the item id (utilizing the item id will create the need for aditional api requests)
   */
  public addItem(item: Content|string) {
    if (typeof(item) === 'string') {
      this.addItemById(item);
    } else {
      if (this.basketItems.findIndex( q => q.id === item.id ) === -1) {
        this.basketItems.push(item);
        this.updateStorage();
      }
    }
  }

  public addItemById(item: string) {
    fetchAll(req => this.contentService.search(req), new ContentSearchRequest({
      limit: 1000,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      searchType: ContentSearchType.MetadataAndFullText,
      debugMode: false,
      filter: new TermsFilter({
        field: 'id',
        terms: [item]
      })
    })).subscribe( result => {
      if (result[0]) {
        this.basketItems.push(result[0]);
        this.updateStorage();
      }
    });
  }

  /**
   * @param item The item to be removed from the basket, it can be either the item in itself or
   * just the item id
   */
  public removeItem(item: Content|string) {
    if (typeof(item) === 'string') {
      this.removeItemById(item);
    } else {
      this.basketItems = this.basketItems.filter( q => q.id !== item.id);
      this.updateStorage();
    }
  }

  public removeItemById(item: Content|string) {
    this.basketItems = this.basketItems.filter( q => q.id !== item);
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
