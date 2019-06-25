import { Component, Output, EventEmitter, OnInit, Inject } from '@angular/core';

// LIBRARIES
import {
  ContentService, ContentSearchRequest, LifeCycleFilter, BrokenDependenciesFilter,
  ContentSearchType, TermsFilter, fetchAll } from '@picturepark/sdk-v1-angular';
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfiguration, ConfigActions } from '../../configuration';

// COMPONENTS
import { BaseComponent } from '../base.component';

// SERVICES
import { BasketService } from '../../services/basket.service';
import { DownloadFallbackService } from '../../services/download-fallback.service';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent implements OnInit {

  public basketItems: string[] = [];

  public configActions: ConfigActions;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(
    @Inject(PICTUREPARK_UI_CONFIGURATION) private pictureParkUIConfig: PictureparkUIConfiguration,
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
    const contentSearch = fetchAll(req => this.contentService.search(req), new ContentSearchRequest({
      limit: 1000,
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

  ngOnInit() {
    this.configActions = this.pictureParkUIConfig['BasketComponent'];
  }

}
