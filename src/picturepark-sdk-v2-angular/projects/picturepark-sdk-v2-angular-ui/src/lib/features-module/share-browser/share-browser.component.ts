import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// LIBRARIES
import { Share, ThumbnailSize, ShareSearchFacade } from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';

@Component({
  selector: 'pp-share-browser',
  templateUrl: './share-browser.component.html',
  styleUrls: [
    '../../shared-module/components/browser-base/browser-base.component.scss',
    './share-browser.component.scss',
  ],
})
export class ShareBrowserComponent extends BaseBrowserComponent<Share> {
  constructor(
    private activatedRoute: ActivatedRoute,
    injector: Injector,
    private router: Router,
    public facade: ShareSearchFacade
  ) {
    super('ShareBrowserComponent', injector, facade);
  }

  async init() {}

  initSort(): void {
    this.sortingTypes = [
      {
        field: '_score',
        name: this.translationService.translate('SortMenu.Relevance'),
      },
      {
        field: 'audit.creationDate',
        name: this.translationService.translate('SortMenu.CreationDate'),
      },
      {
        field: 'audit.modificationDate',
        name: this.translationService.translate('SortMenu.ModificationDate'),
      },
    ];
    this.activeSortingType = this.sortingTypes[1];
    this.isAscending = false;

    this.views = [
      {
        name: this.translationService.translate('ContentBrowser.ThumbnailSmall'),
        icon: 'collections',
        type: 'thumbnailSmall',
        thumbnailSize: ThumbnailSize.Small,
      },
      {
        name: this.translationService.translate('ContentBrowser.ThumbnailMedium'),
        icon: 'collections',
        type: 'thumbnailMedium',
        thumbnailSize: ThumbnailSize.Medium,
      },
      {
        name: this.translationService.translate('ContentBrowser.ThumbnailLarge'),
        icon: 'collections',
        type: 'thumbnailLarge',
        thumbnailSize: ThumbnailSize.Large,
      },
    ];

    this.activeView = this.views[1];
  }

  onScroll(): void {
    this.loadData()?.subscribe();
  }

  // CHECK IF ELEMENT CONTAINS CLASS NAME
  checkContains(elementClassName: string): boolean {
    const containClasses = ['browser__items'];
    return containClasses.some((iClass) => elementClassName.includes(iClass));
  }

  itemDetails(item: Share): void {
    this.router.navigate([item.id], { relativeTo: this.activatedRoute });
  }

  previewItemEvent(item: Share): void {
    this.router.navigate([item.id], { relativeTo: this.activatedRoute });
  }
}
