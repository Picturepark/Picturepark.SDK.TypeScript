import {
  Component, EventEmitter, Input, Output, OnInit, OnDestroy,
  AfterViewInit, ViewChild, ElementRef, Inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { ContentService, ContentDetail, AuthService, ImageMetadata, ThumbnailSize } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmbedService } from 'app/embed.service';

@Component({
  templateUrl: './content-picker-details.component.html'
})
export class ContentPickerDetailsComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;

  postUrl: any;
  content: ContentDetail;
  contentId: string;
  thumbnailUrl: SafeUrl;

  constructor(private route: ActivatedRoute,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private embedService: EmbedService,
    @Inject(AuthService) public authService: OidcAuthService) {
  }

  get imageMetadata() {
    return this.content && (<any>this.content.content).kind === 'ImageMetadata' ? <ImageMetadata>this.content.content : undefined;
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
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response!.data!));
      });

      this.contentService.get(this.contentId, true, []).subscribe((content: ContentDetail) => {
        this.content = content;
      });
    });
  }

  show() {
    const previewOutput = this.content.outputs!.filter(o => o.outputFormatId === 'Preview')[0];
    this.contentService.download(this.content.id!, 'Preview', null).subscribe(response => {
      const item: IShareItem = {
        id: this.content.id!,

        isImage: true,
        isPdf: false,
        isMovie: false,
        isBinary: false,

        displayValues: {},
        previewUrl: URL.createObjectURL(response!.data!),
        originalUrl: URL.createObjectURL(response!.data!),
        originalFileExtension: previewOutput.detail!.fileExtension!.substr(1),
        detail: {
          width: (<any>previewOutput.detail).width,
          height: (<any>previewOutput.detail).height,
        }
      };
      (<any>window).pictureparkWidgets.players.showDetailById(item.id, [item]);
    });
  }

  back() {
    this.location.back();
  }

  embed() {
    this.embedService.embed([this.content], this.postUrl);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
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
