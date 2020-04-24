import {
  Input,
  Component,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Inject,
  Optional,
  Injector,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// LIBRARIES
import {
  ContentService,
  ContentType,
  ContentDownloadLinkCreateRequest,
  ContentDownloadRequestItem,
  ContentDetail,
  OutputRenderingState,
  ThumbnailSize,
  ShareContentDetail,
  ShareDetail,
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';
import { FullscreenService, IShareItem } from '../../../content-details-dialog/fullscreen.service';
import { LazyGetter } from 'lazy-get-decorator';
import { PICTUREPARK_UI_SCRIPTPATH } from '../../../../configuration';
import { BROKEN_IMAGE_URL } from '../../../../utilities/constants';

@Component({
  selector: 'pp-content-image-preview',
  templateUrl: './content-image-preview.component.html',
  styleUrls: ['./content-image-preview.component.scss'],
})
export class ContentImagePreviewComponent extends BaseComponent implements OnChanges {
  thumbnailUrl: string;
  thumbnailUrlSafe: SafeUrl;
  pdfUrl: SafeUrl;

  @Input() public content: ContentDetail;
  @Input() public outputId = 'Preview';
  @Input() public width?: number;
  @Input() public height?: number;
  @Input() public shareContent?: ShareContentDetail;
  @Input() public shareDetail?: ShareDetail;

  @Output() public playChange = new EventEmitter<boolean>();

  isLoading = true;
  playing = false;

  constructor(
    @Optional() @Inject(PICTUREPARK_UI_SCRIPTPATH) private uiScriptPath: string,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private fullscreenService: FullscreenService,
    private cdr: ChangeDetectorRef,
    protected injector: Injector
  ) {
    super(injector);
  }

  /** Gets the script path from either configured PICTUREPARK_UI_SCRIPTPATH or fallback to the configured base href */
  @LazyGetter()
  protected get scriptsPath() {
    if (this.uiScriptPath) {
      return this.uiScriptPath;
    }

    const base = document.getElementsByTagName('base');
    if (base.length > 0) {
      const url = base[0].href;
      return url.endsWith('/') ? url.slice(0, -1) : url;
    }
    return '';
  }

  get isVideo(): boolean {
    return this.content.contentType === ContentType.Video;
  }

  get isAudio(): boolean {
    return this.content.contentType === ContentType.Audio;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.content && changes.content.currentValue) {
      this.content = changes.content.currentValue;
      if (this.content instanceof ShareContentDetail) {
        this.shareContent = this.content;
      }

      if (this.shareContent) {
        const shareOutput = this.shareContent.outputs.find((i) => i.outputFormatId === this.outputId);
        if (shareOutput && shareOutput.viewUrl) {
          this.setPreviewUrl(shareOutput.viewUrl);
          return;
        } else if (this.shareContent.iconUrl) {
          this.setPreviewUrl(this.shareContent.iconUrl);
          return;
        }
      }

      // If preview does not exist, fallback to download thumbnail as MissingDownloadOutputFallbackBehavior is not exposed
      const output = this.content.outputs!.find(
        (i) => i.outputFormatId === this.outputId && i.renderingState === OutputRenderingState.Completed
      );
      const request = output
        ? this.contentService.download(
            this.content.id,
            output.outputFormatId,
            this.width || 800,
            this.height || 650,
            null
          )
        : this.contentService.downloadThumbnail(this.content.id, ThumbnailSize.Large, null, null);

      const downloadPreviewSubscription = request.subscribe((response) => {
        this.setPreviewUrl(URL.createObjectURL(response.data));
      });

      this.subscription.add(downloadPreviewSubscription);
    }
  }

  updateUrl(event) {
    this.thumbnailUrlSafe = BROKEN_IMAGE_URL;
  }

  private setPreviewUrl(url: string): void {
    this.thumbnailUrl = url;
    this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(this.thumbnailUrl);
    this.isLoading = false;
  }

  async showFullscreen(): Promise<void> {
    let isPdf = this.content.contentType === ContentType.InterchangeDocument;
    const isImage = !this.isVideo && !isPdf;
    let item: IShareItem;
    let items: IShareItem[] = [];

    if (!this.shareContent) {
      const outputs = this.content.outputs!;

      const pdfOutput = outputs.find((i) => i.outputFormatId === 'Pdf');
      isPdf = pdfOutput !== undefined;

      const previewOutput = isPdf
        ? outputs.filter((o) => o.outputFormatId === 'Pdf')[0]
        : this.isAudio
        ? outputs.filter((o) => o.outputFormatId === 'AudioSmall')[0]
        : this.isVideo
        ? outputs.filter((o) => o.outputFormatId === 'VideoSmall')[0]
        : outputs.filter((o) => o.outputFormatId === 'Preview')[0];

      const request = new ContentDownloadLinkCreateRequest({
        contents: [
          new ContentDownloadRequestItem({
            contentId: this.content.id,
            outputFormatId: previewOutput.outputFormatId,
          }),
        ],
      });

      const response = await this.contentService.createDownloadLink(request).toPromise();
      item = {
        id: this.content.id,

        isPdf: isPdf,
        isImage: isImage,
        isMovie: this.isVideo,
        isAudio: this.isAudio,
        isBinary: false,
        videoUrl: this.isVideo ? response.downloadUrl : '',
        audioUrl: this.isAudio ? response.downloadUrl : '',
        pdfUrl: isPdf ? response.downloadUrl : '',

        displayValues: {},
        previewUrl: isImage ? response.downloadUrl : this.thumbnailUrl,

        originalUrl: response.downloadUrl,
        outputs: this.content.outputs! as any[],

        detail: {
          width: (<any>previewOutput.detail).width,
          height: (<any>previewOutput.detail).height,
        },
      };
      items = [item];
    } else {
      let index = 0;
      const share = {
        id: this.shareDetail!.id,
        url: this.shareDetail!.data!.url,
        name: this.shareDetail!.name,
        creator: this.shareDetail!.creator,
        description: this.shareDetail!.description,
        items: this.shareDetail!.contentSelections.map((s) => {
          const previewOutput = s.outputs.find((o) => o.outputFormatId === 'Preview');
          const originalOutput = s.outputs.find((o) => o.outputFormatId === 'Original');
          const detail = originalOutput ? originalOutput.detail : previewOutput ? previewOutput.detail : null;

          const pdfOutput = s.outputs.find((i) => i.outputFormatId === 'Pdf');
          return <IShareItem>{
            id: s.id,
            index: index++,
            displayValues: s.displayValues,
            detail: detail,

            isMovie: s.contentSchemaId === 'VideoMetadata',
            isAudio: s.contentSchemaId === 'AudioMetadata',
            isImage: s.contentSchemaId === 'ImageMetadata',
            isPdf: pdfOutput !== undefined,
            isBinary: s.contentType !== ContentType.Virtual,

            previewUrl: previewOutput
              ? previewOutput.viewUrl
              : originalOutput && s.contentSchemaId === 'ImageMetadata'
              ? originalOutput.viewUrl
              : s.iconUrl,

            originalUrl: originalOutput ? originalOutput.downloadUrl : null,
            pdfUrl: pdfOutput ? pdfOutput.downloadUrl : null,
            videoUrl: s.outputs.find((i) => i.outputFormatId === 'VideoLarge')
              ? s.outputs.find((i) => i.outputFormatId === 'VideoLarge')!.downloadUrl
              : s.outputs.find((i) => i.outputFormatId === 'VideoSmall')
              ? s.outputs.find((i) => i.outputFormatId === 'VideoSmall')!.downloadUrl
              : null,
            audioUrl: s.outputs.find((i) => i.outputFormatId === 'AudioSmall')
              ? s.outputs.find((i) => i.outputFormatId === 'AudioSmall')!.viewUrl
              : null,
            outputs: s.outputs,
          };
        }),
      };

      item = share.items.find((i) => i.id === this.content.id)!;
      items = share.items;
    }

    if (item.isMovie || item.isAudio) {
      this.playMedia(true, item);
      return;
    }

    if (item.isPdf) {
      this.showPdf(item);
      return;
    }

    this.fullscreenService.showDetailById(item.id, items);
  }

  showPdf(item: IShareItem): void {
    this.playChange.emit(true);
    const url =
      this.scriptsPath +
      '/assets/picturepark-sdk-v1-widgets/pdfjs/web/viewer.html?file=' +
      item.pdfUrl +
      '&closeButton=false';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  playMedia(playing: boolean, item: IShareItem): void {
    this.playing = playing;
    this.playChange.emit(playing);
    this.cdr.detectChanges();

    const element = document.getElementsByClassName('video-player')[0];
    this.fullscreenService.renderVideoPlayer(element, item, item.detail!.width, item.detail!.height);
  }
}
