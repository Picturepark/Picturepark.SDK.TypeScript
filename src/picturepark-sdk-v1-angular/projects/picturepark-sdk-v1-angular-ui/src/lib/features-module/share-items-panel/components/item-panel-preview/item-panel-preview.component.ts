import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { Content, ContentService, ThumbnailSize, ShareDetail, ContentType } from '@picturepark/sdk-v1-angular';
import { PanelBaseComponent } from '../../../panel/components/panel-base/panel-base.component';

@Component({
  selector: 'pp-item-panel-preview',
  templateUrl: './item-panel-preview.component.html',
  styleUrls: ['./item-panel-preview.component.scss']
})
export class ItemPanelPreviewComponent extends PanelBaseComponent implements OnInit {

  // SUBSCRIBER
  downloadThumbnailSubscription: Subscription;

  @Input() item: Content;
  @Input() size: ThumbnailSize = ThumbnailSize.Large;
  @Input() share: ShareDetail;

  // VARS
  public imageUrl: SafeUrl;
  public virtualItemHtml: SafeHtml | null = null;

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {
    // Handle virtual content
    if (this.item.contentType === ContentType.Virtual) {
      this.virtualItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.item.displayValues['thumbnail']);
      return;
    }

    // SUBSCRIBERS
    if (!this.share) {
      this.downloadThumbnailSubscription = this.contentService.downloadThumbnail(
        this.item.id, this.size, null, null
      ).subscribe(result => {
        if (result !== null) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
        }
      });

      // UNSUBSCRIBE
      this.subscription.add(this.downloadThumbnailSubscription);
    } else {
      const content = this.share.contentSelections.find(i => i.id === this.item.id);
      if (!content) {
        return;
      }

      const output = content.outputs.find(i => i.outputFormatId === 'Thumbnail' + this.size);
      if (output) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(output!.viewUrl!);
      } else {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(content.iconUrl!);
      }
    }
  }

}
