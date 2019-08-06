import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// LIBRARIES
import {
  ContentService, ContentType, ContentDownloadLinkCreateRequest,
  ContentDownloadRequestItem, ContentDetail
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

@Component({
    selector: 'pp-content-image-preview',
    template: `<img [src]="thumbnailUrlSafe" (click)="showFullscreen()" style="width:100%"/>`,
    styles: ['img { cursor: pointer; }']
  })
  export class ContentImagePreviewComponent extends BaseComponent implements OnChanges {
    thumbnailUrl: string;
    thumbnailUrlSafe: SafeUrl;

    @Input() public content: ContentDetail;
    @Input() public outputId = 'Preview';
    @Input() public width?: number;
    @Input() public height?: number;

    constructor(
      private contentService: ContentService,
      private sanitizer: DomSanitizer) {
      super();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes.content && changes.content.currentValue) {

        this.content = changes.content.currentValue;

        const downloadThumbnailSubscription = this.contentService.download(
          this.content.id, this.outputId, this.width || 800, this.height || 650, null
        ).subscribe(response => {
          this.thumbnailUrl = URL.createObjectURL(response!.data!);
          this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(this.thumbnailUrl);
        });

        this.subscription.add(downloadThumbnailSubscription);

      }
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
              contentId: this.content.id,
              outputFormatId: previewOutput.outputFormatId
            })
          ]
        });

        const linkSubscription = this.contentService.createDownloadLink(request).subscribe(response => {
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
