import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ShareDetail,
  IMailRecipient,
  InfoFacade,
  ShareDataBasic,
  ShareContentDetail,
  PICTUREPARK_CONFIGURATION,
  ShareResolveBehavior,
  LanguageService,
  ShareAccessFacade,
  ShareType,
  EmbedContent,
} from '@picturepark/sdk-v2-angular';
import {
  ContentDetailsDialogComponent,
  ContentDetailsDialogOptions,
  ContentDownloadDialogService,
} from '@picturepark/sdk-v2-angular-ui';
import { PictureparkCdnConfiguration } from '../../models/cdn-config';
import { forkJoin, fromEvent, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.scss'],
})
export class ShareDetailComponent implements OnInit {
  shareDetail: ShareDetail;
  mailRecipients: IMailRecipient[];
  logoUrl: string;
  isLoading = false;
  shareToken: string;
  itemsLoading = false;
  pageToken?: string;
  enableDownload = false;

  get language() {
    return this.languageService.currentLanguage.ietf;
  }

  constructor(
    private shareAccessFacade: ShareAccessFacade,
    private infoFacade: InfoFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    public languageService: LanguageService,
    public contentDownloadDialogService: ContentDownloadDialogService,
    @Inject(PICTUREPARK_CONFIGURATION) private config: PictureparkCdnConfiguration
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const shareToken = paramMap.get('token')!;
      this.shareToken = shareToken;
      this.update(shareToken);
    });

    // Scroll loader
    const elem = document.getElementsByClassName('share-viewer-item-container')[0];
    fromEvent(elem, 'scroll')
      .pipe(debounceTime(50))
      .subscribe(scrollable => {
        if (!scrollable) {
          return;
        }

        const scrollCriteria = elem.scrollTop > elem.scrollHeight - 2 * elem.clientHeight;
        if (
          scrollCriteria &&
          !this.itemsLoading &&
          this.shareDetail.contentSelections.length !== this.shareDetail.contentCount
        ) {
          this.ngZone.run(() => this.onScroll());
        }
      });
  }

  onScroll() {
    this.itemsLoading = true;
    this.shareAccessFacade
      .loadNextPageOfContents(this.shareDetail, this.shareToken, this.language, 30)
      .subscribe(page => {
        this.itemsLoading = false;
      });
  }

  update(searchString: string): void {
    if (!searchString) {
      return;
    }

    this.isLoading = true;
    const shareInfo = forkJoin([
      this.shareAccessFacade.getShareByToken(searchString, this.language, [ShareResolveBehavior.Schemas], 30),
      this.infoFacade.getInfo(this.config.cdnUrl),
    ]);

    shareInfo.subscribe({
      next: ([share, info]) => {
        if (info.logosUrl) {
          this.logoUrl = info.logosUrl + 'full';
        }
        if (share) {
          this.enableDownload =
            share.shareType === ShareType.Basic ||
            !share.contents
              .filter(content => content instanceof EmbedContent)
              .map(content => content as EmbedContent)
              .some(content => content.conversionPresets?.some(i => i.conversion));

          this.shareDetail = share;
          this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients;
        }
        this.isLoading = false;
      },
    });
  }

  download(): void {
    this.shareAccessFacade.getOutputsInShare(this.shareToken).subscribe(res =>
      this.contentDownloadDialogService.showDialog({
        mode: 'multi',
        contents: res?.contentInfos?.map(c => ({
          id: c.id,
          contentSchemaId: c.contentSchemaId,
          contentType: c.contentType,
          outputs: res.outputs
            ?.filter(o => o.contentId === c.id)
            .map(o => ({
              contentId: o.contentId,
              outputFormatId: o.outputFormatId,
              dynamicRendering: o.dynamicRendering,
              fileSize: o.fileSize,
              renderingState: o.renderingState,
              id: o.id,
            })),
        })) as any,
        shareToken: this.shareToken,
        isShareViewer: true,
      })
    );
  }

  showDetail(item: ShareContentDetail): void {
    let index = this.shareDetail.contentSelections.indexOf(item);
    this.dialog.open(ContentDetailsDialogComponent, {
      data: <ContentDetailsDialogOptions>{
        id: item.id,
        shareContent: item,
        shareDetail: this.shareDetail,
        showMetadata: true,
        showReferenced: false,
        hasPrevious: () => {
          return index !== 0;
        },
        hasNext: () => {
          return this.shareDetail.contents.length > index + 1;
        },
        previous: () => {
          index--;
          return of(this.shareDetail.contentSelections[index]);
        },
        next: () => {
          index++;
          const content = this.shareDetail.contentSelections[index];

          if (content) {
            return of(content);
          }

          return this.shareAccessFacade
            .loadNextPageOfContents(this.shareDetail, this.shareToken, this.language, 30)
            .pipe(map(() => this.shareDetail.contentSelections[index]));
        },
        isShareViewer: true,
      },
      autoFocus: false,
      width: '980px',
      height: '700px',
      maxWidth: '98vw',
      maxHeight: '99vh',
      panelClass: ['pp-dialog'],
    });
  }
}
