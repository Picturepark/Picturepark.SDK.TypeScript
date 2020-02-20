import { Component, OnChanges, SimpleChanges, SecurityContext, OnInit } from '@angular/core';

import { SafeUrl, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NON_VIRTUAL_CONTENT_SCHEMAS_IDS, BROKEN_IMAGE_URL } from '../../../utilities/constants';
import { switchMap } from 'rxjs/operators';
import { BaseBrowserItemComponent } from '../browser-item-base/browser-item-base.component';
import { ThumbnailSize, Content } from '@picturepark/sdk-v1-angular';
import { ContentService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.scss']
})
export class ItemThumbnailComponent extends BaseBrowserItemComponent<Content> implements OnChanges, OnInit  {

  public isLoading = true;
  public thumbnailUrl: SafeUrl | null;

  public virtualItemHtml: SafeHtml | null;

  public constructor(
    private contentService:  ContentService,
    private sanitizer: DomSanitizer,
  ) {
    super();
  }

  ngOnInit() {
    const downloadSubscription = this.loadItem.pipe(
      switchMap(
        () => {
          return this.contentService.downloadThumbnail(
            this.itemModel.item.id,
            this.thumbnailSize || ThumbnailSize.Small ,
            null,
            null);
        })
      ).subscribe(response => {
      if (response) {
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data));
        this.isLoading = false;
      }
    }, () => {
      this.thumbnailUrl = null;
      this.isLoading = false;
    });

    this.subscription.add(downloadSubscription);
    this.markAsVisible();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemModel'] && changes['itemModel'].firstChange) {
      if (this.itemModel.item.contentSchemaId && NON_VIRTUAL_CONTENT_SCHEMAS_IDS.indexOf(this.itemModel.item.contentSchemaId) === -1) {
        if (this.itemModel.item.displayValues && this.itemModel.item.displayValues['thumbnail']) {
          this.virtualItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.itemModel.item.displayValues['thumbnail']);
        }
      }
    }

    if (changes['thumbnailSize'] && !this.virtualItemHtml && this.isVisible) {
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

  public updateUrl(event) {
    event.path[0].src = BROKEN_IMAGE_URL;
  }

}
