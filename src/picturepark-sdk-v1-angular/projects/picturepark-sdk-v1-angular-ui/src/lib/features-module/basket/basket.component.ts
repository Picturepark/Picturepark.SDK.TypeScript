import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  BrokenDependenciesFilter,
  Content,
  ContentSearchRequest,
  ContentSearchType,
  ContentService,
  fetchAll,
  ISearchResult,
  LifeCycleFilter,
  TermsFilter,
} from '@picturepark/sdk-v1-angular';
import { Observable } from 'rxjs';

import { ConfigActions, PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfiguration } from '../../configuration';
import { ShareContentDialogComponent } from '../../features-module/share-content-dialog/share-content-dialog.component';
import { BaseComponent } from '../../shared-module/components/base.component';
import { BasketService } from '../../shared-module/services/basket/basket.service';
import {
  ContentDownloadDialogComponent,
} from '../dialog/components/content-download-dialog/content-download-dialog.component';

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
    public dialog: MatDialog,
  ) {
    super();

    const basketSubscription = this.basketService.basketChange.subscribe((items) => this.basketItems = items);
    this.subscription.add(basketSubscription);
  }

  public previewItem(itemId: string): void {
    this.previewItemChange.emit(itemId);
  }

  public downloadItems(): void {

    const contentSearch = this.fetch().subscribe(data => {

      const dialogRef = this.dialog.open(ContentDownloadDialogComponent, {
        data: data.results,
        autoFocus: false
      });
      dialogRef.componentInstance.title = 'ContentDownloadDialog.Title';
    });

    this.subscription.add(contentSearch);
  }

  public openShareContentDialog(): void {

    const contentSearch = this.fetch().subscribe(data => {

      const dialogRef = this.dialog.open(ShareContentDialogComponent, {
        data: data.results,
        autoFocus: false
      });

      dialogRef.componentInstance.title = 'Basket.Share';
    });

    this.subscription.add(contentSearch);
  }

  public clearBasket(): void {
    this.basketService.clearBasket();
  }

  public trackByBasket(index, basket: string): string {
    return basket;
  }

  ngOnInit() {
    this.configActions = this.pictureParkUIConfig['BasketComponent'];
  }

  private fetch(): Observable<ISearchResult<Content>> {
    return fetchAll(req => this.contentService.search(req), new ContentSearchRequest({
      limit: 1000,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      searchType: ContentSearchType.MetadataAndFullText,
      debugMode: false,
      filter: new TermsFilter({
        field: 'id',
        terms: this.basketItems
      })
    }));
  }
}
