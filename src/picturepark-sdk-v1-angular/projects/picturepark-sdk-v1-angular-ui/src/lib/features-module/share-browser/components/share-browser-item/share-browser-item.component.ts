import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


// LIBRARIES
import { ThumbnailSize, Share, ContentService } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';

@Component({
  selector: 'pp-share-browser-item',
  templateUrl: './share-browser-item.component.html',
  styleUrls: [
    '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
    './share-browser-item.component.scss'
  ]
})
export class ShareBrowserItemComponent extends BaseBrowserItemComponent<Share> implements OnChanges, OnInit {

  // VARS
  public thumbnailSizes = ThumbnailSize;

  public isLoading = true;

  public thumbnailUrls: SafeUrl[] = [];

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }


  public getThumbnails(contentIds: string[]): void {

    const contentIdsReq = contentIds.slice(0, 3);

    Promise.all(contentIdsReq.map(contentId => {
      return this.contentService.downloadThumbnail(
        contentId,
        this.isListView ? ThumbnailSize.Small : this.thumbnailSize as ThumbnailSize || ThumbnailSize.Medium,
        null,
        null);

    })).then(items => {
      items.map(item => {
        const downloadSubscription = item.subscribe(response => {
          if (response) {
            this.thumbnailUrls.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data)));
          }
        });
        this.subscription.add(downloadSubscription);
      });
      this.isLoading = false;
    }).catch(err => {
      console.log(err);
    });

  }

  public ngOnInit(): void {
    this.getThumbnails(this.itemModel.item.contentIds);
  }

  // UPDATE IMAGE SRC IN CASE NOT FOUND
  updateUrl(event) {
   event.path[0].src = 'https://icons-for-free.com/download-icon-broken+image+48px-131985226047038454_512.png'
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes['thumbnailSize'] && this.isVisible) {
      const updateImage =
        (changes['thumbnailSize'].firstChange) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Small && this.isListView === false) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Medium && this.thumbnailSize === ThumbnailSize.Large);

      if (updateImage) {

        this.isLoading = true;
        this.thumbnailUrls = [];
        this.getThumbnails(this.itemModel.item.contentIds);
      }
    }
  }
}
