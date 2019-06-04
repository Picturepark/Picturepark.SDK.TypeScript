import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

import {
  ContentService, ContentDownloadLinkCreateRequest, ContentSearchRequest, LifeCycleFilter,
  BrokenDependenciesFilter, ContentSearchType, TermsFilter
} from '@picturepark/sdk-v1-angular';
import { BasketService } from '../../services/basket.service';
import { BaseComponent } from '../base.component';
import { DownloadFallbackService } from '../../services/download-fallback.service';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent {
  public basketItems: string[] = [];

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(
    private contentService: ContentService,
    private basketService: BasketService,
    private downloadFallbackService: DownloadFallbackService
    ) {
    super();
    const basketSubscription = this.basketService.basketChange.subscribe((items) => this.basketItems = items);
    this.subscription.add(basketSubscription);
  }

  public previewItem(itemId: string) {
    this.previewItemChange.emit(itemId);
  }

  public downloadItems() {
    const contentSearch = this.contentService.search(new ContentSearchRequest({
      limit: 10000,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      searchType: ContentSearchType.MetadataAndFullText,
      debugMode: false,
      filter: new TermsFilter({
        field: 'id',
        terms: this.basketItems
      })
    })).subscribe(data => {
      contentSearch.unsubscribe();
      this.downloadFallbackService.download(data.results);
    });
  }

  public clearBasket() {
    this.basketService.clearBasket();
  }

  public trackByBasket(index, basket: string) {
    return basket;
  }
}
