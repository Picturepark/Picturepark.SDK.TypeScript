import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// LIBRARIES
import {
  ContentService, ContentType, ContentDownloadLinkCreateRequest,
  ContentDownloadRequestItem, ContentDetail, OutputRenderingState, ThumbnailSize, ShareContentDetail
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

@Component({
    selector: 'pp-content-image-preview',
    templateUrl: './content-image-preview.component.html',
    styleUrls: ['./content-image-preview.component.scss']
  })
  export class ContentImagePreviewComponent extends BaseComponent implements OnChanges {

    thumbnailUrl: string;
    thumbnailUrlSafe: SafeUrl;

    @Input() public content: ContentDetail;
    @Input() public outputId = 'Preview';
    @Input() public width?: number;
    @Input() public height?: number;
    @Input() public shareContent?: ShareContentDetail;

    isLoading = true;

    constructor(
      private contentService: ContentService,
      private sanitizer: DomSanitizer) {
      super();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes.content && changes.content.currentValue) {

        this.content = changes.content.currentValue;

        // Implement fallback
        const output = this.content.outputs!.find(i => i.outputFormatId === this.outputId && i.renderingState === OutputRenderingState.Completed);

        if (this.shareContent) {
          const shareOutput = this.shareContent.outputs!.find(i => i.outputFormatId === this.outputId);
          this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(shareOutput!.viewUrl!);
          this.isLoading = false;
          return;
        }

        // If preview does not exist, fallback to download thumbnail as MissingDownloadOutputFallbackBehavior is not exposed
        const request = output ?
          this.contentService.download(this.content.id, output.outputFormatId, this.width || 800, this.height || 650, null) :
          this.contentService.downloadThumbnail(this.content.id, ThumbnailSize.Large, null, null);

        const downloadThumbnailSubscription = request.subscribe(response => {
          this.thumbnailUrl = URL.createObjectURL(response!.data!);
          this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(this.thumbnailUrl);
          this.isLoading = false;
        });

        this.subscription.add(downloadThumbnailSubscription);

      }
    }

    updateUrl(event) {
      this.thumbnailUrlSafe = 'https://icons-for-free.com/download-icon-broken+image+48px-131985226047038454_512.png';
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
