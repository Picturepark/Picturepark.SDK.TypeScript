import { Component, OnChanges, SimpleChanges, SecurityContext, OnInit, Input } from '@angular/core';

import { SafeUrl, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NON_VIRTUAL_CONTENT_SCHEMAS_IDS, BROKEN_IMAGE_URL } from '../../../utilities/constants';
import { switchMap } from 'rxjs/operators';
import { BaseBrowserItemComponent } from '../browser-item-base/browser-item-base.component';
import { ThumbnailSize, Content, ShareDetail } from '@picturepark/sdk-v1-angular';
import { ContentService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.scss']
})
export class ItemThumbnailComponent extends BaseBrowserItemComponent<Content> implements OnChanges, OnInit {

  @Input() item: Content;
  @Input() shareItem: ShareDetail;

  public isLoading = false;
  public thumbnailUrl: SafeUrl | null;

  public virtualItemHtml: SafeHtml | null;

  public constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
  ) {
    super();
  }

  ngOnInit() {
    // Handle shares
    if (this.shareItem) {
      const content = this.shareItem.contentSelections.find(i => i.id === this.item.id);

      if (content) {
        const output = content.outputs.find(i => i.outputFormatId === 'Thumbnail' + this.thumbnailSize);
        if (output) {
          this.thumbnailUrl = this.sanitizer.bypassSecurityTrustResourceUrl(output.viewUrl!);
        } else {
          this.thumbnailUrl = this.sanitizer.bypassSecurityTrustResourceUrl(content.iconUrl!);
        }
      }
    } else {
      const downloadSubscription = this.loadItem.pipe(
        switchMap(
          () => {
            this.isLoading = true;
            return this.contentService.downloadThumbnail(
              this.item.id,
              this.thumbnailSize || ThumbnailSize.Small,
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].firstChange) {
      if (this.item.contentSchemaId && NON_VIRTUAL_CONTENT_SCHEMAS_IDS.indexOf(this.item.contentSchemaId) === -1) {
        if (this.item.displayValues && this.item.displayValues['thumbnail']) {
          this.virtualItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.item.displayValues['thumbnail']);
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
