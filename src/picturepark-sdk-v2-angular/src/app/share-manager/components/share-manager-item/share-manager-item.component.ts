import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription, take } from 'rxjs';
import {
  ShareService,
  ShareContentDetail,
  IMailRecipient,
  ShareDeleteManyRequest,
  ShareDetail,
  BusinessProcessService,
  ShareDataBasic,
} from '@picturepark/sdk-v2-angular';
import {
  ContentDownloadDialogService,
  DialogService,
  TranslationService,
  ContentDetailsDialogComponent,
  ShareOwnerPanelComponent,
  ItemToolBarComponent,
  ShareSettingsPanelComponent,
  ShareMailRecipientsPanelComponent,
  ShareItemsPanelComponent,
} from '@picturepark/sdk-v2-angular-ui';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-share-manager-item',
  templateUrl: './share-manager-item.component.html',
  styleUrls: ['./share-manager-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    ItemToolBarComponent,
    ShareSettingsPanelComponent,
    ShareMailRecipientsPanelComponent,
    ShareItemsPanelComponent,
    ShareOwnerPanelComponent,
  ],
})
export class ShareManagerItemComponent implements OnInit, OnDestroy {
  susbcription = new Subscription();

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
        name: this.translationService.translate('ShareManager.Download'),
        icon: 'file_download',
        action: () => {
          this.contentDownloadDialogService.showDialog({
            mode: 'single',
            contents: this.items,
          });
        },
      },
      {
        name: this.translationService.translate('ShareManager.Delete'),
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
            .subscribe(result => {
              if (result) {
                this.shareService
                  .deleteMany(new ShareDeleteManyRequest({ ids: [this.share.id] }))
                  .subscribe(async i => {
                    await lastValueFrom(
                      this.businessProcessService.waitForCompletion(i.id, '02:00:00', true).pipe(take(1))
                    );
                    this.router.navigate(['./share-manager']);
                  });
              }
            });
        },
      },
    ];
  }

  loadShare(shareId: string): void {
    this.shareService.get(shareId, null, null).subscribe(data => {
      this.share = data;

      this.items = data.contentSelections;
      this.userId = data.audit.createdByUser;

      if (data?.data instanceof ShareDataBasic) this.mailRecipients = data?.data?.mailRecipients ?? [];

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
      panelClass: ['pp-dialog'],
    });
  }

  ngOnInit() {
    const activatedRoute = this.activatedRoute.params.subscribe(params => {
      this.loadShare(params.shareId);
    });

    this.susbcription.add(activatedRoute);
  }

  ngOnDestroy() {
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }
  }
}
