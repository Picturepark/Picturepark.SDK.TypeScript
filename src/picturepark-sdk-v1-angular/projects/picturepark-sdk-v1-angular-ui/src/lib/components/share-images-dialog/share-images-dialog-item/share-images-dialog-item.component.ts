import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ContentItemSelectionService } from '../../../services/content-item-selection.service';
import { ThumbnailSize, ContentService } from '@picturepark/sdk-v1-angular';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'pp-share-images-dialog-item',
  templateUrl: './share-images-dialog-item.component.html',
  styleUrls: ['./share-images-dialog-item.component.scss']
})
export class ShareImagesDialogItemComponent extends BaseComponent implements OnInit {

  @Input()
  public itemId: string;

  @Output() deletedImage = new EventEmitter<string>();

  public imageUrl: SafeUrl;

  constructor(
    private contentItemSelectionService: ContentItemSelectionService, 
    private contentService: ContentService, 
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  public ngOnInit(): void {
    const downloadThumbnailSubscription = this.contentService.downloadThumbnail(this.itemId, ThumbnailSize.Small, null, null).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });
    this.subscription.add(downloadThumbnailSubscription);
  }

  public remove() {
    this.deletedImage.emit(this.itemId);
    this.contentItemSelectionService.removeItem(this.itemId);
  }
  
}
