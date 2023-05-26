import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// LIBRARIES
import { ThumbnailSize, Share, ContentService, LoggerService } from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { BaseBrowserItemComponent } from '../../../../shared-module/components/browser-item-base/browser-item-base.component';
import { BROKEN_IMAGE_URL } from '../../../../utilities/constants';
import { Observable } from 'rxjs';
import { debounceTime, map, share } from 'rxjs/operators';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { LazyLoadDirective } from '../../../../shared-module/directives/lazy-load.directive';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'pp-share-browser-item',
    templateUrl: './share-browser-item.component.html',
    styleUrls: [
        '../../../../shared-module/components/browser-item-base/browser-item-base.component.scss',
        './share-browser-item.component.scss',
    ],
    standalone: true,
    imports: [
        NgIf,
        LazyLoadDirective,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        AsyncPipe,
        TranslatePipe,
    ],
})
export class ShareBrowserItemComponent extends BaseBrowserItemComponent<Share> implements OnChanges, OnInit {
  // VARS
  thumbnailSizes = ThumbnailSize;

  isLoading = true;

  thumbnailUrls: SafeUrl[] = [];

  isSelected$: Observable<boolean> | undefined;

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer, private logger: LoggerService) {
    super();
  }

  getThumbnails(contentIds: string[]): void {
    const contentIdsReq = contentIds.slice(0, 3);

    Promise.all(
      contentIdsReq.map(contentId => {
        return this.contentService.downloadThumbnail(
          contentId,
          this.isListView ? ThumbnailSize.Small : this.thumbnailSize || ThumbnailSize.Medium,
          null,
          null
        );
      })
    )
      .then(items => {
        items.map(item => {
          this.sub = item.subscribe(response => {
            if (response) {
              this.thumbnailUrls.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data)));
            }
          });
        });
        this.isLoading = false;
      })
      .catch(err => {
        this.logger.error(err);
      });
  }

  ngOnInit(): void {
    this.getThumbnails(this.itemModel.contentIds);

    this.isSelected$ = this.browser.selectedItemsChange.pipe(
      debounceTime(10),
      map(items => items.some(selectedItem => selectedItem.id === this.itemModel.id)),
      share()
    );
  }

  updateUrl(event) {
    event.path[0].src = BROKEN_IMAGE_URL;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['thumbnailSize'] && this.isVisible()) {
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
