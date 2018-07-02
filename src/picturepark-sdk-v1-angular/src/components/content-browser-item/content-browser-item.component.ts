import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ContentService, ThumbnailSize } from '../../services/services';
import { ContentModel } from '../content-browser/content-browser.component';

@Component({
  selector: 'pp-content-browser-item',
  templateUrl: './content-browser-item.component.html'
})
export class ContentBrowserItemComponent implements OnInit {
  @Input()
  public itemModel: ContentModel;

  // TODO: no thumbnail, alternative image.
  public thumbnailUrl: SafeUrl | null = null;

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    // TODO: possible api bug. Adds width and height with null values.
    this.contentService.downloadThumbnail(this.itemModel.item.id!, ThumbnailSize.Medium).subscribe(response => {
      if (response) {
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.data));
      }
    }, () => {
      this.thumbnailUrl = null;
    });
  }
}
