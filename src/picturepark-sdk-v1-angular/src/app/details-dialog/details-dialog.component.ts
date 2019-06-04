import {
  Component, OnInit, OnDestroy,
  Inject, SimpleChanges, OnChanges
} from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

import {
  ContentService, ContentDetail, ThumbnailSize,
  ContentType, ContentDownloadLinkCreateRequest, ContentDownloadRequestItem, DownloadLink, ContentResolveBehavior
} from '@picturepark/sdk-v1-angular';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LiquidRenderingService } from '@picturepark/sdk-v1-angular-ui';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html'
})
export class DetailsDialogComponent implements OnInit, OnDestroy, OnChanges {

  thumbnailUrl: string;
  thumbnailUrlSafe: SafeUrl;

  content: ContentDetail;

  contentId: string;
  private subscription: Subscription = new Subscription();

  constructor(private contentService: ContentService,
    private liquidRenderingService: LiquidRenderingService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    this.contentId = data;
    if (data) {
      const downloadThumbnailSubscription = this.contentService.downloadThumbnail(data, ThumbnailSize.Medium, null, null).subscribe(response => {
        this.thumbnailUrl = URL.createObjectURL(response!.data!);
        this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(this.thumbnailUrl);
      });

      this.subscription.add(downloadThumbnailSubscription);

      const contentGetSubscription = this.contentService.get(data, [
        ContentResolveBehavior.Content,
        ContentResolveBehavior.Metadata,
        ContentResolveBehavior.LinkedListItems,
        ContentResolveBehavior.InnerDisplayValueName,
        ContentResolveBehavior.Outputs
      ]).subscribe(async (content: ContentDetail) => {
        await this.liquidRenderingService.renderNestedDisplayValues(content);
        this.content = content;
      });

      this.subscription.add(contentGetSubscription);
    }

  }

  ngOnInit() {
    document.addEventListener('keydown', this.onKeyDown, false);


  }

  ngOnChanges(changes: SimpleChanges) {

  }

  showFullscreen() {
    const isPdf = this.content.contentType === ContentType.InterchangeDocument;
    const isAudio = this.content.contentType === ContentType.Audio;
    const isVideo = this.content.contentType === ContentType.Video;

    const isMovie = isAudio || isVideo;
    const isImage = !isMovie && !isPdf;

    const previewOutput =
      isPdf ? this.content.outputs!.filter(o => o.outputFormatId === 'Original')[0] :
        isAudio ? this.content.outputs!.filter(o => o.outputFormatId === 'AudioSmall')[0] :
          isVideo ? this.content.outputs!.filter(o => o.outputFormatId === 'VideoSmall')[0] :
            this.content.outputs!.filter(o => o.outputFormatId === 'Preview')[0];

    const request = new ContentDownloadLinkCreateRequest({
      contents: [
        new ContentDownloadRequestItem({
          contentId: this.contentId,
          outputFormatId: previewOutput.outputFormatId
        })
      ]
    });

    const linkSubscription = this.contentService.createDownloadLink(request).subscribe((response: DownloadLink) => {
      const item: IShareItem = {
        id: this.content.id!,

        isPdf: isPdf,
        isImage: isImage,
        isMovie: isMovie,
        isBinary: false,

        displayValues: {},
        previewUrl: isImage ? response.downloadUrl! : this.thumbnailUrl,

        originalUrl: response.downloadUrl!,
        originalFileExtension: previewOutput.detail!.fileExtension!,

        detail: {
          width: (<any>previewOutput.detail).width,
          height: (<any>previewOutput.detail).height,
        }
      };

      ((<any>window).pictureparkWidgets).players.showDetailById(item.id, [item]);
    });

    this.subscription.add(linkSubscription);
  }


  ngOnDestroy() {
    document.removeEventListener('keydown', this.onKeyDown, false);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onKeyDown = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLBodyElement && e.keyCode === 27) {
      e.cancelBubble = true;
      e.preventDefault();

      // Close
    }
  }
}

interface IShareItem {
  id: string;

  isImage: boolean;
  isPdf: boolean;
  isMovie: boolean;
  isBinary: boolean;

  displayValues: any;
  previewUrl: string;

  originalUrl: string;
  originalFileExtension: string;

  detail: {
    width: number;
    height: number;
  };
}
