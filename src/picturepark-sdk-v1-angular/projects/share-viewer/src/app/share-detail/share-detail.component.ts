import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ShareDetail,
  IMailRecipient,
  InfoFacade,
  ShareDataBasic,
  ShareContentDetail,
  ShareService,
  PICTUREPARK_CONFIGURATION,
} from '@picturepark/sdk-v1-angular';
import { ContentDetailsDialogComponent, ContentDetailDialogOptions } from '@picturepark/sdk-v1-angular-ui';
import { PictureparkCdnConfiguration } from '../../models/cdn-config';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.scss'],
})
export class ShareDetailComponent implements OnInit {
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];
  public logoUrl: string;
  public isLoading = false;
  public items: ShareContentDetail[] = [];

  constructor(
    private shareService: ShareService,
    private infoFacade: InfoFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject(PICTUREPARK_CONFIGURATION) private config: PictureparkCdnConfiguration
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const shareToken = paramMap.get('token')!;
      this.update(shareToken);
    });
  }

  update(searchString: string): void {
    if (!searchString) {
      return;
    }

    this.isLoading = true;
    const shareInfo = forkJoin([
      this.shareService.getShareByToken(searchString, null, this.config.cdnUrl),
      this.infoFacade.getInfo(this.config.cdnUrl),
    ]);

    shareInfo.subscribe({
      next: ([shareJson, info]) => {
        if (info.logosUrl) {
          this.logoUrl = info.logosUrl + 'name';
        }
        if (shareJson) {
          this.shareDetail = shareJson;
          this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients;
        }
        this.isLoading = false;
      },
    });
  }

  downloadAll(): void {
    window.location.replace(this.shareDetail.data!.url);
  }

  showDetail(item: ShareContentDetail): void {
    let index = this.shareDetail.contentSelections.indexOf(item);
    this.dialog.open(ContentDetailsDialogComponent, {
      data: <ContentDetailDialogOptions>{
        id: item.id,
        shareContent: item,
        shareDetail: this.shareDetail,
        showMetadata: false,
        hasPrevious: () => {
          return index !== 0;
        },
        hasNext: () => {
          return this.shareDetail.contentSelections.length > index + 1;
        },
        previous: () => {
          index--;
          return this.shareDetail.contentSelections[index];
        },
        next: () => {
          index++;
          return this.shareDetail.contentSelections[index];
        },
      },
      autoFocus: false,
      width: '980px',
      height: '700px',
      maxWidth: '98vw',
      maxHeight: '99vh',
    });
  }
}
