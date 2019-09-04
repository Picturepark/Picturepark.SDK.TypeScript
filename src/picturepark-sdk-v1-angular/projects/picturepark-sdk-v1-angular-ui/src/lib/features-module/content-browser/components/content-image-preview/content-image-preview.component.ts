import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// LIBRARIES
import {
  ContentService, ContentType, ContentDownloadLinkCreateRequest,
  ContentDownloadRequestItem, ContentDetail, OutputRenderingState, ThumbnailSize, ShareContentDetail, ShareService, ShareDetail
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';
import { FullscreenService, IShareItem } from '../../../content-details-dialog/fullscreen.service';

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
    @Input() public shareDetail?: ShareDetail;

    isLoading = true;

    constructor(
      private contentService: ContentService,
      private shareService: ShareService,
      private sanitizer: DomSanitizer,
      private fullscreenService: FullscreenService) {
      super();
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes.content && changes.content.currentValue) {

        this.content = changes.content.currentValue;

        // Implement fallback
        const output = this.content.outputs!.find(i => i.outputFormatId === this.outputId && i.renderingState === OutputRenderingState.Completed);

        if (this.shareContent) {
          const shareOutput = this.shareContent.outputs!.find(i => i.outputFormatId === this.outputId);
          if (shareOutput && shareOutput.viewUrl) {
            this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(shareOutput.viewUrl);
          } else {
              this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.shareContent.iconUrl!);
          }
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

        if (!this.shareContent) {
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
              isAudio: isAudio,
              isBinary: false,
              videoUrl: '',
              audioUrl: '',
              pdfUrl: '',

              displayValues: {},
              previewUrl: isImage ? response.downloadUrl! : this.thumbnailUrl,

              originalUrl: response.downloadUrl!,
              outputs: this.content.outputs! as any[],

              detail: {
                width: (<any>previewOutput.detail).width,
                height: (<any>previewOutput.detail).height,
              }
            };

            this.fullscreenService.showDetailById(item.id, [item]);
          });
          this.subscription.add(linkSubscription);
        } else {
          let index = 0;
          const share = {
            id: this.shareDetail!.id,
            url: this.shareDetail!.data!.url,
            name: this.shareDetail!.name,
            creator: this.shareDetail!.creator,
            description: this.shareDetail!.description,
            items: this.shareDetail!.contentSelections.map(s => {
              const outputs = s.outputs.map(o => {
                return {
                  contentId: s.id,
                  outputFormatId: o.outputFormatId,
                  fileExtension: o.detail ? o.detail.fileExtension : null,
                  viewUrl: o.viewUrl,
                  downloadUrl: o.downloadUrl,
                  detail: o.detail
                };
              });
              const previewOutput = outputs.find(o => o.outputFormatId === 'Preview');

              const originalOutput = outputs.find(o => o.outputFormatId === 'Original');

              const pdfOutput = s.outputs.find(i => i.outputFormatId === 'Pdf');
              return <any>{
                id: s.id,
                index: index++,
                displayValues: s.displayValues,
                detail: originalOutput ? originalOutput.detail : null,

                isMovie: s.contentSchemaId === 'VideoMetadata',
                isAudio: s.contentSchemaId === 'AudioMetadata',
                isImage: s.contentSchemaId === 'ImageMetadata',
                isPdf: pdfOutput !== undefined,
                isBinary: s.contentType !== 'ContentItem' as any,

                previewUrl: previewOutput ? previewOutput.viewUrl : originalOutput &&
                            s.contentSchemaId === 'ImageMetadata' ? originalOutput.viewUrl : s.iconUrl,
                previewOutputFormatId: previewOutput ? previewOutput.outputFormatId : null,

                originalUrl: originalOutput ? originalOutput.downloadUrl : null,
                originalOutputFormatId: originalOutput ? originalOutput.outputFormatId : null,

                pdfUrl: pdfOutput ? pdfOutput.downloadUrl : null,
                videoUrl:
                  s.outputs.find(i => i.outputFormatId === 'VideoLarge') ? s.outputs!.find(i => i.outputFormatId! === 'VideoLarge')!.downloadUrl :
                  s.outputs.find(i => i.outputFormatId === 'VideoSmall') ? s.outputs!.find(i => i.outputFormatId! === 'VideoSmall')!.downloadUrl : null,
                audioUrl:
                  s.outputs.find(i => i.outputFormatId === 'AudioSmall') ? s.outputs!.find(i => i.outputFormatId! === 'AudioSmall')!.downloadUrl : null,
                outputs: outputs
              };
            })
          };

          this.fullscreenService.showDetailById(share.items.find(i => i.id === this.content.id).id, share.items);
      }

    }
}
