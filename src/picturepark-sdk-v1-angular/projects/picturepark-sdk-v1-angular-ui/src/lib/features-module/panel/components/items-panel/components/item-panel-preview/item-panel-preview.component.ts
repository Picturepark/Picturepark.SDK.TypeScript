import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// LIBRARIES
import { Content, ContentService, ThumbnailSize } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { PanelBaseComponent } from '../../../panel-base/panel-base.component';

@Component({
  selector: 'pp-item-panel-preview',
  templateUrl: './item-panel-preview.component.html',
  styleUrls: ['./item-panel-preview.component.scss']
})
export class ItemPanelPreviewComponent extends PanelBaseComponent implements OnInit {

  // SUBSCRIBER
  downloadThumbnailSubscription: Subscription;

  @Input() item: Content;

  // VARS
  public imageUrl: SafeUrl;

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {

    // SUBSCRIBERS
    this.downloadThumbnailSubscription = this.contentService.downloadThumbnail(
      this.item.id, ThumbnailSize.Small, null, null
    ).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });

    // UNSUBSCRIBE
    this.subscription.add(this.downloadThumbnailSubscription);

  }

}
