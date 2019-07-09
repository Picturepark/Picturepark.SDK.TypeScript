import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';

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

  public thumbnailUrl: SafeUrl | null = null;

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {

    super();

  }

  public ngOnInit(): void {
    const downloadSubscription = this.loadItem.pipe(
      switchMap(
        () => {
          return this.contentService.downloadThumbnail(
            this.itemModel.item.contentIds[0],
            this.isListView ? ThumbnailSize.Small : this.thumbnailSize as ThumbnailSize || ThumbnailSize.Medium,
            null,
            null);
        })
    ).subscribe(response => {
        if (response) {
          this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data));
          this.isLoading = false;
        }
    }, (error) => {
      console.log('error', error);
      this.thumbnailUrl = null;
      this.isLoading = false;
    });

    this.subscription.add(downloadSubscription);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['thumbnailSize'] && this.isVisible) {
      const updateImage =
        (changes['thumbnailSize'].firstChange) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Small && this.isListView === false) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Medium && this.thumbnailSize === ThumbnailSize.Large);

      if (updateImage) {

        this.isLoading = true;
        this.thumbnailUrl = null;
        this.loadItem.next();
      }
    }
  }
}
