import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { ContentItemSelectionService } from '../../../../shared-module/services/content-item-selection/content-item-selection.service';
import { ContentService, ThumbnailSize } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-share-content-dialog-item',
  templateUrl: './share-content-dialog-item.component.html',
  styleUrls: ['./share-content-dialog-item.component.scss', './share-content-dialog-item-resp.component.scss']
})
export class ShareContentDialogItemComponent extends BaseComponent implements OnInit, OnDestroy {

  // SUBSCRIBER
  downloadThumbnailSubscription: Subscription;

  @Input()
  public itemId: string;

  @Output() removeDialogContent = new EventEmitter<string>();

  public imageUrl: SafeUrl;

  constructor(
    private contentItemSelectionService: ContentItemSelectionService,
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {

    // SUBSCRIBERS
    this.downloadThumbnailSubscription = this.contentService.downloadThumbnail(
      this.itemId, ThumbnailSize.Small, null, null
    ).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });

    this.subscription.add(this.downloadThumbnailSubscription);

  }

  public remove() {
    this.removeDialogContent.emit(this.itemId);
    this.contentItemSelectionService.removeItem(this.itemId);
  }

  ngOnDestroy() {

    super.ngOnDestroy();

  }

}
