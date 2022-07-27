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
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LazyGetter } from 'lazy-get-decorator';
import { throttleTime } from 'rxjs/operators';
import { firstValueFrom, Subject } from 'rxjs';

// LIBRARIES
import {
  ContentService,
  ContentType,
  ContentDownloadRequestItem,
  ContentDetail,
  OutputRenderingState,
  ThumbnailSize,
  ShareContentDetail,
  ShareDetail,
  DownloadFacade,
  PICTUREPARK_CDN_URL,
  ShareDataEmbed,
} from '@picturepark/sdk-v2-angular';

// SERVICES
import { FullscreenService, IShareItem } from '../../../content-details-dialog/fullscreen.service';
import { PICTUREPARK_UI_SCRIPTPATH } from '../../../../configuration';
import { BROKEN_IMAGE_URL } from '../../../../utilities/constants';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// INTERFACES
import { FullScreenDisplayItems } from './interfaces/content-image-preview.interfaces';

@Component({
  selector: 'pp-content-image-preview',
  templateUrl: './content-image-preview.component.html',
  styleUrls: ['./content-image-preview.component.scss'],
})
export class ContentImagePreviewComponent extends BaseComponent implements OnInit, OnChanges {
  thumbnailUrl: string;
  thumbnailUrlSafe: SafeUrl;
  pdfUrl: SafeUrl;

  @Input() content: ContentDetail | ShareContentDetail;
  @Input() outputId = 'Preview';
  @Input() width?: number;
  @Input() height?: number;
  @Input() shareDetail?: ShareDetail;

  @Output() playChange = new EventEmitter<boolean>();

  displayFullscreen = new Subject<FullScreenDisplayItems>();

  isIcon = false;
  isLoading = true;
  playing = false;

  constructor(
    @Optional() @Inject(PICTUREPARK_UI_SCRIPTPATH) private uiScriptPath: string,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private fullscreenService: FullscreenService,
    private cdr: ChangeDetectorRef,
    protected injector: Injector,
    private downloadFacade: DownloadFacade,
    @Optional() @Inject(PICTUREPARK_CDN_URL) private cdnUrl?: string
  ) {
    super(injector);
    this.cdnUrl = this.cdnUrl || '';
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

  ngOnInit() {
    this.sub = this.displayFullscreen.pipe(throttleTime(1000, undefined, { leading: true })).subscribe(displayItems => {
      const selectedItem = displayItems.selectedItem;
      const items = displayItems.items;

      if (selectedItem.isMovie || selectedItem.isAudio) {
        this.playMedia(true, selectedItem);
        return;
      }

      if (selectedItem.isPdf) {
        this.showPdf(selectedItem);
        return;
      }

      this.fullscreenService.showDetailById(selectedItem.id, items);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.content && changes.content.currentValue) {
      this.content = changes.content.currentValue;

      if (this.content instanceof ShareContentDetail) {
        const shareOutput = this.content.outputs.find(i => i.outputFormatId === this.outputId);
        if (shareOutput && shareOutput.viewUrl) {
          this.setPreviewUrl(shareOutput.viewUrl, false);
          return;
        } else if (this.content.iconUrl) {
          this.setPreviewUrl(this.content.iconUrl, true);
          return;
        } else {
          this.setPreviewUrl(
            `${this.cdnUrl}/icon/${(this.shareDetail?.data as ShareDataEmbed).token}/${this.content.id}`,
            true
          );
        }
      } else {
        // If preview does not exist, fallback to download thumbnail as MissingDownloadOutputFallbackBehavior is not exposed
        const output = this.content.outputs?.find(
          i => i.outputFormatId === this.outputId && i.renderingState === OutputRenderingState.Completed
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

        this.sub = request.subscribe(response => {
          const isIcon = (response.headers && response.headers['content-type'] === 'image/svg+xml') || false;
          this.setPreviewUrl(URL.createObjectURL(response.data), isIcon);
        });
      }
    }
  }

  updateUrl(event) {
    this.thumbnailUrlSafe = BROKEN_IMAGE_URL;
  }

  private setPreviewUrl(url: string, isIcon: boolean): void {
    this.thumbnailUrl = url;
    this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(this.thumbnailUrl);
    this.isIcon = isIcon;
    this.isLoading = false;
  }

  async showFullscreen() {
    let isPdf = this.content.contentType === ContentType.InterchangeDocument;
    const isImage = !this.isVideo && !isPdf && !this.isIcon;
    let item: IShareItem;
    let items: IShareItem[] = [];

    if (this.content instanceof ContentDetail) {
      if (!this.content.outputs) return;

      const outputs = this.content.outputs;

      const pdfOutput = outputs.find(i => i.outputFormatId === 'Pdf');
      isPdf = pdfOutput !== undefined;

      const previewOutput = isPdf
        ? outputs.filter(o => o.outputFormatId === 'Pdf')[0]
        : this.isAudio
        ? outputs.filter(o => o.outputFormatId === 'AudioSmall')[0]
        : this.isVideo
        ? outputs.filter(o => o.outputFormatId === 'VideoSmall')[0]
        : this.isIcon
        ? outputs.filter(o => o.outputFormatId === 'Original')[0]
        : outputs.filter(o => o.outputFormatId === 'Preview')[0];

      const downloadLink = await firstValueFrom(
        this.downloadFacade.getDownloadLink([
          new ContentDownloadRequestItem({
            contentId: this.content.id,
            outputFormatId: previewOutput.outputFormatId,
          }),
        ])
      );

      item = {
        id: this.content.id,

        isPdf: isPdf,
        isImage: isImage,
        isMovie: this.isVideo,
        isAudio: this.isAudio,
        isBinary: false,
        isIcon: this.isIcon,
        videoUrl: this.isVideo ? downloadLink.downloadUrl : '',
        audioUrl: this.isAudio ? downloadLink.downloadUrl : '',
        pdfUrl: isPdf ? downloadLink.downloadUrl : '',

        displayValues: {},
        previewUrl: isImage ? downloadLink.downloadUrl : this.thumbnailUrl,

        originalUrl: downloadLink.downloadUrl,
        outputs: this.content.outputs as any[],

        detail: {
          width: (<any>previewOutput.detail).width,
          height: (<any>previewOutput.detail).height,
        },
      };

      items = [item];
    } else {
      if (!this.shareDetail) return;

      let index = 0;
      const share = {
        id: this.shareDetail.id,
        url: this.shareDetail.data?.url,
        name: this.shareDetail.name,
        creator: this.shareDetail.creator,
        description: this.shareDetail.description,
        items: this.shareDetail.contentSelections.map(s => {
          const previewOutput = s.outputs.find(o => o.outputFormatId === 'Preview');
          const originalOutput = s.outputs.find(o => o.outputFormatId === 'Original');
          const detail = originalOutput ? originalOutput.detail : previewOutput ? previewOutput.detail : null;

          const pdfOutput = s.outputs.find(i => i.outputFormatId === 'Pdf');
          return {
            id: s.id,
            index: index++,
            displayValues: s.displayValues,
            detail: detail,

            isMovie: s.contentSchemaId === 'VideoMetadata',
            isAudio: s.contentSchemaId === 'AudioMetadata',
            isImage: s.contentSchemaId === 'ImageMetadata',
            isPdf: pdfOutput !== undefined,
            isBinary: s.contentType !== ContentType.Virtual,
            isIcon: this.isIcon,

            previewUrl: previewOutput
              ? previewOutput.viewUrl
              : originalOutput && s.contentSchemaId === 'ImageMetadata'
              ? originalOutput.viewUrl
              : s.iconUrl,

            originalUrl: originalOutput ? originalOutput.downloadUrl : null,
            pdfUrl: pdfOutput ? pdfOutput.downloadUrl : null,
            videoUrl:
              s.outputs.find(i => i.outputFormatId === 'VideoLarge')?.downloadUrl ??
              s.outputs.find(i => i.outputFormatId === 'VideoSmall')?.downloadUrl,
            audioUrl: s.outputs.find(i => i.outputFormatId === 'AudioSmall')?.viewUrl,
            outputs: s.outputs,
          } as IShareItem;
        }),
      };

      item = share.items.find(i => i.id === this.content.id) ?? ({} as IShareItem);
      items = share.items;
    }

    this.displayFullscreen.next({ selectedItem: item, items });
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
    if (!item?.detail) return;

    this.playing = playing;
    this.playChange.emit(playing);
    this.cdr.detectChanges();

    const element = document.getElementsByClassName('video-player')[0];
    this.fullscreenService.renderVideoPlayer(element, item, item.detail.width, item.detail.height);
  }
}
