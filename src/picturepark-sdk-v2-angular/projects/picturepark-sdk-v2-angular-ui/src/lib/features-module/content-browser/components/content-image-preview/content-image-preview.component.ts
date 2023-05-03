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
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LazyGetter } from 'lazy-get-decorator';
import { catchError, throttleTime } from 'rxjs/operators';
import { firstValueFrom, Subject } from 'rxjs';

// LIBRARIES
import {
  ContentService,
  ContentDownloadRequestItem,
  ContentDetail,
  ThumbnailSize,
  ShareContentDetail,
  ShareDetail,
  DownloadFacade,
  PICTUREPARK_CDN_URL,
  ShareDataEmbed,
  ShareOutputDisplayContent,
  ShareOutputBase,
} from '@picturepark/sdk-v2-angular';

// SERVICES
import { ContentViewerType, FullscreenService, IShareItem } from '../../../content-details-dialog/fullscreen.service';
import { PICTUREPARK_UI_SCRIPTPATH } from '../../../../configuration';
import { BROKEN_IMAGE_URL } from '../../../../utilities/constants';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// INTERFACES
import { FullScreenDisplayItems } from './interfaces/content-image-preview.interfaces';
import { imageLoaderErrorHandler } from '../../../../shared-module/components/image-loader.helper';

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
  @Input() shareDetail?: ShareDetail;

  @Output() playChange = new EventEmitter<boolean>();

  displayFullscreen = new Subject<FullScreenDisplayItems>();

  isIcon = false;
  isLoading = true;
  playing = false;
  viewerType: ContentViewerType;

  constructor(
    @Optional() @Inject(PICTUREPARK_UI_SCRIPTPATH) private uiScriptPath: string,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private fullscreenService: FullscreenService,
    private cdr: ChangeDetectorRef,
    private downloadFacade: DownloadFacade,
    @Optional() @Inject(PICTUREPARK_CDN_URL) private cdnUrl?: string
  ) {
    super();
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

  ngOnInit() {
    this.sub = this.displayFullscreen.pipe(throttleTime(1000, undefined, { leading: true })).subscribe(displayItems => {
      const selectedItem = displayItems.selectedItem;
      const items = displayItems.items;

      if (selectedItem.viewerType === ContentViewerType.Video || selectedItem.viewerType === ContentViewerType.Audio) {
        this.playMedia(true, selectedItem);
        return;
      }

      if (selectedItem.viewerType === ContentViewerType.Document) {
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
        const shareOutput =
          this.content.outputs.find(
            i => i instanceof ShareOutputDisplayContent && i.outputFormatId === this.outputId
          ) ?? this.content.outputs.find(i => i.outputFormatId === this.outputId);
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
        const output = this.fullscreenService.getOutput(this.content, [this.outputId]);

        const request = output
          ? this.contentService.download(
              this.content.displayContentId ?? this.content.id,
              output.outputFormatId,
              null,
              null,
              null
            )
          : this.contentService.downloadThumbnail(this.content.id, ThumbnailSize.Large, null, null);

        this.sub = request.pipe(catchError(imageLoaderErrorHandler)).subscribe(response => {
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
    let item: IShareItem;
    let items: IShareItem[] = [];

    if (this.content instanceof ContentDetail) {
      const viewerType = this.fullscreenService.getContentViewerType(this.content);
      const viewerOutput = this.fullscreenService.getViewerOutput(this.content, viewerType);
      const output = this.fullscreenService.getOutput(this.content, [this.outputId]);
      if (!viewerOutput) return;

      const downloadLink = await firstValueFrom(
        this.downloadFacade.getDownloadLink([
          new ContentDownloadRequestItem({
            contentId: viewerOutput.contentId,
            outputFormatId: viewerOutput.outputFormatId,
          }),
        ])
      );

      item = {
        id: this.content.id,

        viewerType,
        isIcon: this.isIcon,
        playerUrl: downloadLink.downloadUrl,

        displayValues: this.content.displayValues,
        previewUrl: this.thumbnailUrl,
        originalUrl: downloadLink.downloadUrl,

        detail: {
          width: (<any>output?.detail).width,
          height: (<any>output?.detail).height,
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
          const viewerType = this.fullscreenService.getContentViewerType(s);
          const viewerOutput = this.fullscreenService.getViewerOutput(s, viewerType) as ShareOutputBase | undefined;
          const previewOutput = this.fullscreenService.getOutput(this.content, [this.outputId]) as
            | ShareOutputBase
            | undefined;
          const originalOutput = this.fullscreenService.getOutput(this.content, ['Original']) as
            | ShareOutputBase
            | undefined;

          const detail = originalOutput ? originalOutput.detail : previewOutput ? previewOutput.detail : null;

          return {
            id: s.id,
            index: index++,
            displayValues: s.displayValues,
            detail: detail,

            viewerType,
            isIcon: this.isIcon,
            previewUrl: previewOutput?.viewUrl ?? s.iconUrl,
            originalUrl: originalOutput?.downloadUrl,
            playerUrl: viewerOutput?.downloadUrl,
          } as IShareItem;
        }),
      };

      item = share.items.find(i => i.id === this.content.id) as IShareItem;
      items = share.items;
    }
    this.viewerType = item.viewerType;
    this.displayFullscreen.next({ selectedItem: item, items });
  }

  showPdf(item: IShareItem): void {
    this.playChange.emit(true);
    const url =
      this.scriptsPath +
      '/assets/picturepark-sdk-v1-widgets/pdfjs/web/viewer.html?file=' +
      item.playerUrl +
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
