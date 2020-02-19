import { SafeUrl, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { Subscription } from 'rxjs';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { ContentService, ThumbnailSize, Content } from '@picturepark/sdk-v1-angular';
import { NON_VIRTUAL_CONTENT_SCHEMAS_IDS, BROKEN_IMAGE_URL } from '../../../../utilities/constants';

@Component({
  selector: 'pp-share-content-dialog-item',
  templateUrl: './share-content-dialog-item.component.html',
  styleUrls: ['./share-content-dialog-item.component.scss', './share-content-dialog-item-resp.component.scss']
})
export class ShareContentDialogItemComponent extends BaseComponent implements OnInit, OnDestroy {

  // SUBSCRIBER
  downloadThumbnailSubscription: Subscription;

  @Input()
  public item: Content;

  @Output() removeDialogContent = new EventEmitter<Content>();

  public imageUrl: SafeUrl;
  public isLoading = false;

  public virtualItemHtml: SafeHtml | null = null;

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {

    if (this.item.contentSchemaId && NON_VIRTUAL_CONTENT_SCHEMAS_IDS.indexOf(this.item.contentSchemaId) === -1) {
      if (this.item.displayValues && this.item.displayValues['thumbnail']) {
        this.virtualItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.item.displayValues['thumbnail']);
        return;
      }
    }

    // SUBSCRIBERS
    this.isLoading = true;
    this.downloadThumbnailSubscription = this.contentService.downloadThumbnail(
      this.item.id, ThumbnailSize.Small, null, null
    ).subscribe(result => {
      this.isLoading = false;
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });

    this.subscription.add(this.downloadThumbnailSubscription);

  }

  public updateUrl(event) {
    event.path[0].src = BROKEN_IMAGE_URL;
  }

  public remove() {
    this.removeDialogContent.emit(this.item);
  }
}
