import { Component, OnInit } from '@angular/core';
import { ShareDetail, IMailRecipient, ShareService, ShareDataBasic, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { MatDialog } from '@angular/material/dialog';
import { ContentDetailsDialogComponent, LiquidRenderingService } from '@picturepark/sdk-v1-angular-ui';
import { ActivatedRoute } from '@angular/router';
import { ContentDetailDialogOptions } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/features-module/content-details-dialog/ContentDetailDialogOptions';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.scss']
})
export class ShareDetailComponent implements OnInit {
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];
  public isLoading = false;

  constructor(
    private shareService: ShareService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private liquidRenderingService: LiquidRenderingService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const shareToken = paramMap.get('token')!;
      this.update(shareToken);
    });
  }

  update(searchString: string): void {
    if (!searchString) {
      return;
    }

    this.isLoading = true;
    this.shareService.getShareJson(searchString).subscribe(i => {
      this.shareDetail = ShareDetail.fromJS(i);
      this.liquidRenderingService.renderNestedDisplayValues(this.shareDetail);
      this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients!;
      this.isLoading = false;
    });
  }

  showDetail(item: ShareContentDetail): void {
    let index = this.shareDetail.contentSelections.indexOf(item);
    this.dialog.open(ContentDetailsDialogComponent,
      {
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
          }
        },
        autoFocus: false,
        width: '980px',
        height: '700px',
        maxWidth: '95vw'
      }
    );
  }
}
