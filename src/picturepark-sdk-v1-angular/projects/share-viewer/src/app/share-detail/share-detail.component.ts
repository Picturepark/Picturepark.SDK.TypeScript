import { Component, OnInit } from '@angular/core';
import { ShareDetail, IMailRecipient, ShareService, ShareDataBasic, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { MatDialog } from '@angular/material/dialog';
import { ContentDetailsDialogComponent } from '@picturepark/sdk-v1-angular-ui';
import { ActivatedRoute } from '@angular/router';

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

    this.isLoading = true;
    this.shareService.getShareJson(searchString).subscribe(i => {
      this.shareDetail = ShareDetail.fromJS(i);
      this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients!;
      this.isLoading = false;
    });
  }

  showDetail(item: ShareContentDetail): void {
    this.dialog.open(ContentDetailsDialogComponent,
      { data: { id: item.id, shareContent: item, shareDetail: this.shareDetail, showMetadata: false}, width: '980px', height: '700px' }
    );
  }
}
