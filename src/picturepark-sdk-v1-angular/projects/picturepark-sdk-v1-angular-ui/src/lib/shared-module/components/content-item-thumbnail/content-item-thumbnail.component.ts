import { Component, OnChanges, SimpleChanges, SecurityContext, OnInit, Input, Injector } from '@angular/core';

import { SafeUrl, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NON_VIRTUAL_CONTENT_SCHEMAS_IDS, BROKEN_IMAGE_URL } from '../../../utilities/constants';
import { switchMap } from 'rxjs/operators';
import { BaseBrowserItemComponent } from '../browser-item-base/browser-item-base.component';
import { ThumbnailSize, Content, ShareDetail, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { ContentService, fetchContentById } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-content-item-thumbnail',
  templateUrl: './content-item-thumbnail.component.html',
  styleUrls: ['./content-item-thumbnail.component.scss']
})
export class ContentItemThumbnailComponent extends BaseBrowserItemComponent<Content> implements OnChanges, OnInit {

  @Input() item: Content | ShareContentDetail;
  @Input() itemId: string;
  @Input() shareItem: ShareDetail;
  /**
   * If true the image will have a shadow box around
   */
  @Input() shadow: boolean;

  public isLoading = false;
  public thumbnailUrl: SafeUrl | null;

  public virtualItemHtml: SafeHtml | null;

  public constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    protected injector: Injector
  ) {
    super(injector);
  }

  async ngOnInit() {

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
      return;
    }

    if (this.itemId) {
      const fetchContentResult = await fetchContentById(this.contentService, this.itemId).toPromise();
      if (fetchContentResult) {
        this.item = fetchContentResult;
      }
    }

    if (this.item) {
      const downloadSubscription = this.loadItem.pipe(
        switchMap(
          () => {
            this.isLoading = true;
            return this.contentService.downloadThumbnail(
              this.item.id,
              this.thumbnailSize,
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
