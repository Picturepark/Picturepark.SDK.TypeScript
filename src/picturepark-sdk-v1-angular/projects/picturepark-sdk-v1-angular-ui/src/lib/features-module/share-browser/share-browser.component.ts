import { Component, Injector } from '@angular/core';
import { BaseBrowserComponent } from '../../shared-module/components/browser-base.component';
import {
  Share, ShareSearchRequest, SearchBehavior, ShareService, SortDirection, SortInfo, ShareSearchResult
} from '@picturepark/sdk-v1-angular';
import { Observable } from 'rxjs';

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

  getSearchRequest(): Observable<ShareSearchResult> | undefined {
    if (this.isLoading) { return; }

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

    return this.shareService.search(request);
  }

  // CHECK IF ELEMENT CONTAINS CLASS NAME
  checkContains(elementClassName: string): boolean {
    const containClasses = ['share-browser'];
    return containClasses.some(iClass => elementClassName.includes(iClass));
  }
}
