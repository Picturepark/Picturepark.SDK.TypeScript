import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// LIBRARIES
import {
  ShareService,
  ShareContentDetail,
  IShareDataBasic,
  IMailRecipient,
  ShareDeleteManyRequest,
  ShareDetail,
  BusinessProcessService,
} from '@picturepark/sdk-v1-angular';
import {
  ContentDownloadDialogService,
  DialogService,
  TranslationService,
  ContentDetailsDialogComponent,
} from '@picturepark/sdk-v1-angular-ui';

@Component({
  selector: 'app-share-manager-item',
  templateUrl: './share-manager-item.component.html',
  styleUrls: ['./share-manager-item.component.scss'],
})
export class ShareManagerItemComponent implements OnInit, OnDestroy {
  // SUBSCRIPTIONS
  susbcription = new Subscription();

  // VARS
  items: ShareContentDetail[] = [];
  mailRecipients: IMailRecipient[] = [];
  toolBarOptions: any[];
  userId: string | undefined;
  subject: string;
  accessOriginal: string;
  share: ShareDetail;

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shareService: ShareService,
    private contentDownloadDialogService: ContentDownloadDialogService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private translationService: TranslationService,
    private router: Router,
    private businessProcessService: BusinessProcessService
  ) {
    this.toolBarOptions = [
      {
        name: 'Download all contents',
        icon: 'file_download',
        action: () => {
          this.contentDownloadDialogService.showDialog({
            mode: 'single',
            contents: this.items,
          });
        },
      },
      {
        name: 'Delete',
        icon: 'delete',
        action: () => {
          this.dialogService
            .confirm({
              title: this.translationService.translate('ShareManager.DeleteShare'),
              message: this.translationService.translate('ShareManager.ConfirmDelete'),
              options: {
                okText: this.translationService.translate('ShareManager.Delete'),
                cancelText: this.translationService.translate('ShareManager.Cancel'),
              },
            })
            .afterClosed()
            .subscribe((result) => {
              if (result) {
                this.shareService
                  .deleteMany(new ShareDeleteManyRequest({ ids: [this.share.id] }))
                  .subscribe(async (i) => {
                    await this.businessProcessService.waitForCompletion(i.id, '02:00:00', true).toPromise();
                    this.router.navigate(['./share-manager']);
                  });
              }
            });
        },
      },
    ];
  }

  // GET SHARE INFO
  loadShare(shareId: string): void {
    this.shareService.get(shareId).subscribe((data) => {
      this.share = data;

      this.items = data.contentSelections;
      this.userId = data.audit.createdByUser;

      const shareDataBasic = <IShareDataBasic | undefined>data.data;

      this.mailRecipients = shareDataBasic!.mailRecipients;

      this.subject = data.name;
      this.accessOriginal = data.outputAccess;

      setTimeout(() => {
        this.isLoading = false;
      }, 0);
    });
  }

  showDetail(item: ShareContentDetail): void {
    this.dialog.open(ContentDetailsDialogComponent, {
      data: { id: item.id, shareContent: item, shareDetail: this.share, showMetadata: true },
      autoFocus: false,
      width: '980px',
      height: '700px',
    });
  }

  ngOnInit() {
    // ROUTE SUBSCRIBER
    const activatedRoute = this.activatedRoute.params.subscribe((params) => {
      this.loadShare(params.shareId);
    });

    // ADD TO SUBSCRIBERS
    this.susbcription.add(activatedRoute);
  }

  ngOnDestroy() {
    // UNSUBSCRIBE
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }
  }
}
