import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

// COMPONENTS
import { BaseComponent } from '../../shared-module/components/base.component';
import {
  ContentDownloadDialogComponent
} from '../../features-module/dialog/components/content-download-dialog/content-download-dialog.component';
import {
  ShareContentDialogComponent
} from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { LoaderService } from '../../shared-module/services/loader/loader-service.service';
import { ShareService, ShareDeleteManyRequest } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-item-tool-bar',
  templateUrl: './item-tool-bar.component.html',
  styleUrls: ['./item-tool-bar.component.scss']
})
export class ItemToolBarComponent extends BaseComponent implements OnInit {

  @Input() toolBarIcon = 'code';
  @Input() toolBarOptions: any[] = [];
  @Input() shareId?: string;

  @Output() toolBarOutPutEvent = new EventEmitter();
  @Output() loaderEmitter = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private shareService: ShareService,
    private loaderService: LoaderService,
    private router: Router
  ) {
    super();
  }

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
        this.deleteShare(this.shareId);
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

  deleteShare(shareId: string | undefined) {
    if (shareId) {
      this.loaderService.setLoader(true);
      const shareIds = {ids: [shareId]} as ShareDeleteManyRequest;
      const shareServiceSubscriber = this.shareService.deleteMany(shareIds).subscribe(res => {
        this.loaderService.setLoader(false);
        this.router.navigate(['./share-manager']);
      });
      this.subscription.add(shareServiceSubscriber);
    }
  }

  setLoaderState(state) {
    this.loaderEmitter.emit(state);
  }

  ngOnInit() {}

}
