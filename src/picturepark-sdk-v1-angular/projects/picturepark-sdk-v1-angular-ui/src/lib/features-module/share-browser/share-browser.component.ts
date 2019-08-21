import { Component, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

// LIBRARIES
import {
  Share, ShareSearchRequest, SearchBehavior, ShareService, SortDirection, SortInfo, ShareSearchResult, ThumbnailSize
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';

// INTERFACES
import { ContentModel } from '../../shared-module/models/content-model';

@Component({
  selector: 'pp-share-browser',
  templateUrl: './share-browser.component.html',
  styleUrls: [
    '../../shared-module/components/browser-base/browser-base.component.scss',
    './share-browser.component.scss'
  ]
})
export class ShareBrowserComponent extends BaseBrowserComponent<Share> implements OnChanges {

  constructor(
    private activatedRoute: ActivatedRoute,
    injector: Injector,
    private router: Router,
    private shareService: ShareService
  ) {
    super('ShareBrowserComponent', injector);
  }

  async init(): Promise<void> {
    this.loadData();
  }

  initSort(): void {
    this.sortingTypes = [
      {
        field: 'relevance',
        name: this.translationService.translate('SortMenu.Relevance')
      }, {
        field: 'audit.creationDate',
        name: this.translationService.translate('SortMenu.CreationDate')
      }, {
        field: 'audit.modificationDate',
        name: this.translationService.translate('SortMenu.ModificationDate')
      }
    ];
    this.activeSortingType = this.sortingTypes[1];
    this.isAscending = false;

    this.views = [{
      name: 'Small',
      icon: 'collections',
      type: 'thumbnailSmall',
      thumbnailSize: ThumbnailSize.Small
    }, {
      name: 'Medium',
      icon: 'collections',
      type: 'thumbnailMedium',
      thumbnailSize: ThumbnailSize.Medium
    }, {
      name: 'Large',
      icon: 'collections',
      type: 'thumbnailLarge',
      thumbnailSize: ThumbnailSize.Large
    }];

    this.activeView = this.views[1];
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
      sort: this.activeSortingType.field === 'relevance' ? [] : [
        new SortInfo({
          field: this.activeSortingType.field,
          direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
        })
      ]
    });

    return this.shareService.search(request);
  }

  // CHECK IF ELEMENT CONTAINS CLASS NAME
  checkContains(elementClassName: string): boolean {
    const containClasses = ['browser__items'];
    return containClasses.some(iClass => elementClassName.includes(iClass));
  }

  itemDetails(item: Share): void {
    this.router.navigate([item.id], { relativeTo: this.activatedRoute });
  }

  previewItemEvent(item: ContentModel<Share>): void {
    this.router.navigate([item.item.id], { relativeTo: this.activatedRoute });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] || changes['searchString']) {
      this.update();
    }
  }
}
