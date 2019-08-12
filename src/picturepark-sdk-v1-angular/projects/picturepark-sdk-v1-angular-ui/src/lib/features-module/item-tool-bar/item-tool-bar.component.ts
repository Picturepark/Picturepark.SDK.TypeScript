import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

// COMPONENTS

import {
  ContentDownloadDialogComponent
} from '../../features-module/dialog/components/content-download-dialog/content-download-dialog.component';
import {
  ShareContentDialogComponent
} from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { ShareService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-item-tool-bar',
  templateUrl: './item-tool-bar.component.html',
  styleUrls: ['./item-tool-bar.component.scss']
})
export class ItemToolBarComponent implements OnInit {

  @Input() toolBarIcon = 'code';
  @Input() toolBarOptions: any[] = [];
  @Input() shareId?: string;
  @Output() toolBarOutPutEvent = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private shareService: ShareService,
  ) { }

  fireAction(action: string): void {

    switch (action) {
      case 'download': {
        this.downloadItems(this.shareId);
        break;
      }
      case 'share': {
        this.shareItems(this.shareId);
        break;
      }
      case 'delete': {
        break;
      }
      default: {
        this.toolBarOutPutEvent.emit(action);
      }
    }

  }

  async shareItems(shareId: string | undefined) {
    if (shareId) {
      const share = await this.shareService.get(shareId).toPromise();
      const dialogRef = this.dialog.open(ShareContentDialogComponent, {
        data: share.contentSelections,
        autoFocus: false
      });
      dialogRef.componentInstance.title = 'ShareContentDialog.CreateShare';
    }
  }

  async downloadItems(shareId: string | undefined) {
    if (shareId) {
      const share = await this.shareService.get(shareId).toPromise();
      const dialogRef = this.dialog.open(ContentDownloadDialogComponent, {
        data: share.contentSelections,
        autoFocus: false
      });
      dialogRef.componentInstance.title = 'ContentDownloadDialog.Title';
    }
  }

  ngOnInit() {}

}
