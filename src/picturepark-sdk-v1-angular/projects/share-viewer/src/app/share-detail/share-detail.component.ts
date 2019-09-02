import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ShareDetail, IMailRecipient, ShareService, ShareDataBasic, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { MatDialog } from '@angular/material/dialog';
import { ContentDetailsDialogComponent } from '@picturepark/sdk-v1-angular-ui';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.scss']
})
export class ShareDetailComponent implements OnInit {
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];

  constructor(
    private shareService: ShareService,
    private dialog: MatDialog,
    private route: ActivatedRoute
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

    this.shareService.getShareJson(searchString).subscribe(i => {
      this.shareDetail = ShareDetail.fromJS(i);
      this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients!;
    });
  }

  showDetail(item: ShareContentDetail): void {
    this.dialog.open(ContentDetailsDialogComponent,
      { data: { id: item.id, shareContent: item}, width: '980px', height: '700px' }
    );
  }
}
