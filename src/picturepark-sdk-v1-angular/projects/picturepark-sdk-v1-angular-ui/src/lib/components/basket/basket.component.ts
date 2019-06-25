import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  ContentService, ContentSearchRequest, LifeCycleFilter,
  BrokenDependenciesFilter, ContentSearchType, TermsFilter, fetchAll
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../base.component';
import { ShareContentDialogComponent } from '../share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../services/basket.service';
import { DownloadFallbackService } from '../../services/download-fallback.service';
import { MatDialog } from '@angular/material';

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
    public dialog: MatDialog,
    private downloadFallbackService: DownloadFallbackService
    ) {

    super();

    const basketSubscription = this.basketService.basketChange.subscribe((items) => this.basketItems = items);
    this.subscription.add(basketSubscription);

  }

  public previewItem(itemId: string): void {
    this.previewItemChange.emit(itemId);
  }

  public downloadItems(): void {
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

  public openShareContentDialog(): void {

    this.dialog.open(ShareContentDialogComponent, {
      data: this.basketItems
    });
    
  } 

  public clearBasket(): void {
    this.basketService.clearBasket();
  }

  public trackByBasket(index, basket: string): string {
    return basket;
  }
}
