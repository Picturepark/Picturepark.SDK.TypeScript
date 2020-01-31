import { Component, OnInit } from '@angular/core';
import { ShareDetail, IMailRecipient, InfoService, CustomerInfo, ShareService, ShareDataBasic, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { MatDialog } from '@angular/material/dialog';
import { ContentDetailsDialogComponent, LiquidRenderingService } from '@picturepark/sdk-v1-angular-ui';
import { ActivatedRoute } from '@angular/router';
import { ContentDetailDialogOptions } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/features-module/content-details-dialog/ContentDetailDialogOptions';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.scss']
})
export class ShareDetailComponent implements OnInit {
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];
  public logoUrl: string;
  public isLoading = false;

  constructor(
    private shareService: ShareService,
    private infoService: InfoService,
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

    const shareInfo = forkJoin({
      shareDetail: this.shareService.getShareJson(searchString, null),
      customerInfo: this.infoService.getInfo()
    });

    shareInfo.subscribe({
      next: (values) => {
        this.logoUrl = values.customerInfo.logosUrl;
        this.shareDetail = ShareDetail.fromJS(values.shareDetail);
        this.liquidRenderingService.renderNestedDisplayValues(this.shareDetail);
        this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients!;
        this.isLoading = false;
      }
    });
  }

  downloadAll(): void {
    window.location.replace(this.shareDetail.data!.url);
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
        maxWidth: '98vw',
        maxHeight: '99vh'
      }
    );
  }
}
