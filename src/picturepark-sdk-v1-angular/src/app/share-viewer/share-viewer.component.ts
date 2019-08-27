import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ShareService, ShareDetail, IMailRecipient, ShareDataBasic, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { ContentDetailsDialogComponent } from '@picturepark/sdk-v1-angular-ui';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-share-viewer',
  templateUrl: './share-viewer.component.html',
  styleUrls: ['./share-viewer.component.scss']
})
export class ShareViewerComponent implements OnChanges {
  public searchString: string;
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];

  constructor(private shareService: ShareService, private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchString']) {
      this.update(this.searchString);
    }
  }

  update(searchString: string): void {
    if (!searchString) {
      return;
    }

    this.shareService.getShareJson(searchString).subscribe(i => {
      this.shareDetail = ShareDetail.fromJS(i);
      this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients!;
      console.log(this.shareDetail);
    });
  }

  showDetail(item: ShareContentDetail): void {
    console.log(item);
    this.dialog.open(ContentDetailsDialogComponent,
      { data: item.id, width: '980px', height: '700px' }
    );
  }
}
