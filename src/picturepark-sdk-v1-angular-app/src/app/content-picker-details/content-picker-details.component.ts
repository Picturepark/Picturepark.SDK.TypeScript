import {
  Component, EventEmitter, Input, Output, OnInit, OnDestroy,
  AfterViewInit, ViewChild, ElementRef, Inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import {
  ContentService, ContentDetail, AuthService, ImageMetadata, ThumbnailSize, 
  ContentType, ContentDownloadLinkCreateRequest, ContentDownloadRequestItem, DownloadLink
} from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmbedService } from 'app/embed.service';

@Component({
  templateUrl: './content-picker-details.component.html'
})
export class ContentPickerDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  private routeSubscription: Subscription;

  postUrl: any;
  content: ContentDetail;
  contentId: string;

  thumbnailUrl: string;
  thumbnailUrlSafe: SafeUrl;

  contentBrowserHeight: string;

  constructor(private route: ActivatedRoute,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private embedService: EmbedService,
    @Inject(AuthService) public authService: OidcAuthService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized && this.authService.isAuthorizing === false) {
      this.authService.login();
    }

    if (this.route.snapshot.queryParams['postUrl']) {
      this.postUrl = this.route.snapshot.queryParams['postUrl'];
    }

    this.routeSubscription = this.route.params.map(params => <string>params['id']).subscribe(async contentId => {
      this.contentId = contentId.toString();

      this.contentService.downloadThumbnail(this.contentId, ThumbnailSize.Medium).subscribe(response => {
        this.thumbnailUrl = URL.createObjectURL(response!.data!);
        this.thumbnailUrlSafe = this.sanitizer.bypassSecurityTrustUrl(this.thumbnailUrl);
      });

      this.contentService.get(this.contentId, true, []).subscribe((content: ContentDetail) => {
        this.content = content;
      });
    });

    window.addEventListener('resize', this.onWindowResized, false);
    this.recalculateSizes();
  }

  ngAfterViewInit() {
    this.recalculateSizes();
  }

  show() {
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

    this.contentService.createDownloadLink(request).subscribe((response: DownloadLink) => {
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
  }

  back() {
    this.location.back();
  }

  embed() {
    this.embedService.embed([this.content], this.postUrl);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResized, false);
    this.routeSubscription.unsubscribe();
  }

  onWindowResized = () => {
    this.recalculateSizes();
  };

  recalculateSizes() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    this.contentBrowserHeight = (windowHeight - 160 + 20) + 'px';
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
  }
}
