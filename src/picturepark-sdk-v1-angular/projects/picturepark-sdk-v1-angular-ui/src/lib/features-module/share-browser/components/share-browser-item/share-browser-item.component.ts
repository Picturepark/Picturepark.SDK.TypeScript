import { Component, OnChanges, SimpleChanges, OnInit, Injector } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// LIBRARIES
import { ThumbnailSize, Share, ContentService } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';
import { BROKEN_IMAGE_URL } from '../../../../utilities/constants';
import { Observable } from 'rxjs';
import { debounceTime, map, share } from 'rxjs/operators';

@Component({
  selector: 'pp-share-browser-item',
  templateUrl: './share-browser-item.component.html',
  styleUrls: [
    '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
    './share-browser-item.component.scss',
  ],
})
export class ShareBrowserItemComponent extends BaseBrowserItemComponent<Share> implements OnChanges, OnInit {
  // VARS
  public thumbnailSizes = ThumbnailSize;

  public isLoading = true;

  public thumbnailUrls: SafeUrl[] = [];

  isSelected$: Observable<boolean> | undefined;

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer, protected injector: Injector) {
    super(injector);
  }

  public getThumbnails(contentIds: string[]): void {
    const contentIdsReq = contentIds.slice(0, 3);

    Promise.all(
      contentIdsReq.map((contentId) => {
        return this.contentService.downloadThumbnail(
          contentId,
          this.isListView ? ThumbnailSize.Small : this.thumbnailSize || ThumbnailSize.Medium,
          null,
          null
        );
      })
    )
      .then((items) => {
        items.map((item) => {
          const downloadSubscription = item.subscribe((response) => {
            if (response) {
              this.thumbnailUrls.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data)));
            }
          });
          this.subscription.add(downloadSubscription);
        });
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public ngOnInit(): void {
    this.getThumbnails(this.itemModel.contentIds);

    this.isSelected$ = this.browser.selectedItemsChange.pipe(
      debounceTime(10),
      map((items) => items.some((selectedItem) => selectedItem.id === this.itemModel.id)),
      share()
    );
  }

  public updateUrl(event) {
    event.path[0].src = BROKEN_IMAGE_URL;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['thumbnailSize'] && this.isVisible) {
      const updateImage =
        changes['thumbnailSize'].firstChange ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Small && this.isListView === false) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Medium && this.thumbnailSize === ThumbnailSize.Large);

      if (updateImage) {
        this.isLoading = true;
        this.thumbnailUrls = [];
        this.getThumbnails(this.itemModel.contentIds);
      }
    }
  }
}
