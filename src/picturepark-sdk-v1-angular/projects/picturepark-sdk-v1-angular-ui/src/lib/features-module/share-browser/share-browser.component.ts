import { Component, OnInit, Injector } from '@angular/core';
import { BaseBrowserComponent } from '../../shared-module/components/browser-base.component';
import { Share, ShareSearchRequest, SearchBehavior, ShareService, SortDirection, SortInfo } from '@picturepark/sdk-v1-angular';
import { ContentModel } from '../../shared-module/models/content-model';

@Component({
  selector: 'pp-share-browser',
  templateUrl: './share-browser.component.html',
  styleUrls: ['./share-browser.component.scss']
})
export class ShareBrowserComponent extends BaseBrowserComponent<Share> {
  constructor(injector: Injector, private shareService: ShareService) {
    super('ShareBrowserComponent', injector);
  }

  init(): void {
    this.loadData();
  }

  onScroll(): void {
    this.loadData();

  }

  private loadData(): void {
    if (!this.isLoading) {
      this.isLoading = true;

      const request = new ShareSearchRequest({
        debugMode: false,
        pageToken: this.nextPageToken,
        filter: this.filter ? this.filter : undefined,
        limit: this.pageSize,
        searchString: this.searchString,
        searchBehaviors: [
          SearchBehavior.SimplifiedSearch,
          SearchBehavior.DropInvalidCharactersOnFailure,
          SearchBehavior.WildcardOnSingleTerm
        ],
        sort: this.activeSortingType === this.sortingTypes.relevance ? [] : [
          new SortInfo({
            field: this.activeSortingType,
            direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
          })
        ]
      });

      const searchSubscription = this.shareService.search(request).subscribe(async searchResult => {

        this.totalResults = searchResult.totalResults;
        this.nextPageToken = searchResult.pageToken;

        if (searchResult.results) {
          await this.liquidRenderingService.renderNestedDisplayValues(searchResult);
          this.items.push(...searchResult.results.map(item => {
            const contentModel = new ContentModel(item, false);
            contentModel.isSelected = this.selectedItems.indexOf(item.id) !== -1;
            return contentModel;
          }));
        }

        this.isLoading = false;
      }, () => {
        this.totalResults = null;
        this.isLoading = false;
      });
      this.subscription.add(searchSubscription);
    }
  }

}
