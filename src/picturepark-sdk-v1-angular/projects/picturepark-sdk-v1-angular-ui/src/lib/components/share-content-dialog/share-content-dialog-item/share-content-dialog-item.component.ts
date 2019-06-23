import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

// COMPONENTS
import { BaseComponent } from '../../base.component';

// SERVICES
import { ContentItemSelectionService } from '../../../services/content-item-selection.service';
import { ContentService, ThumbnailSize } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-share-content-dialog-item',
  templateUrl: './share-content-dialog-item.component.html',
  styleUrls: ['./share-content-dialog-item.component.scss']
})
export class ShareContentDialogItemComponent extends BaseComponent implements OnInit {

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

  public ngOnInit(): void {
    const downloadThumbnailSubscription = this.contentService
    .downloadThumbnail(this.itemId, ThumbnailSize.Small, null, null).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });
    this.subscription.add(downloadThumbnailSubscription);
  }

  public remove() {
    this.removeDialogContent.emit(this.itemId);
    this.contentItemSelectionService.removeItem(this.itemId);
  }
}
