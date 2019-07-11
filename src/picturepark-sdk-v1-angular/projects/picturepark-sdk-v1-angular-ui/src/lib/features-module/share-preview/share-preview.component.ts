import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Content, ContentService, ThumbnailSize } from '@picturepark/sdk-v1-angular';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pp-share-preview',
  templateUrl: './share-preview.component.html',
  styleUrls: ['./share-preview.component.scss']
})
export class SharePreviewComponent implements OnInit {

  // SUBSCRIBER
  downloadThumbnailSubscription: Subscription;

  @Input() item: Content;

  // VARS
  public imageUrl: SafeUrl;

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    // SUBSCRIBERS
    this.downloadThumbnailSubscription = this.contentService.downloadThumbnail(
      this.item.id, ThumbnailSize.Large, null, null
    ).subscribe(result => {
      if (result !== null) {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.data));
      }
    });

  }


}
