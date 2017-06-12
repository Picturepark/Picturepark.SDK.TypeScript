import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { InputConverter, StringConverter } from '../converter';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ContentService, ContentSearchRequest, ContentSearchResult, ThumbnailSize } from '@picturepark/sdk-v1-angular';
import { ContentViewItemModel } from '../content-browser/content-browser.component';

@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html'
})
export class ContentBrowserItemComponent implements OnChanges {
  @Input()
  itemModel: ContentViewItemModel;

  thumbnailUrl: SafeUrl | null = null;

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['itemModel']) {
      this.refresh();
    }
  }

  async refresh() {
    if (this.itemModel) {
      try {
        var blob = await this.contentService.downloadThumbnail(this.itemModel.item.id!, ThumbnailSize.Medium).toPromise();
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      } catch (error) {
        this.thumbnailUrl = null;
      }
    }
  }
}
