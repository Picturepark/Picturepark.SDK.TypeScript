import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// LIBRARIES
import { ShareService, ShareContentDetail, IShareDataBasic, IMailRecipient } from '@picturepark/sdk-v1-angular';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-share-manager-item',
  templateUrl: './share-manager-item.component.html',
  styleUrls: ['./share-manager-item.component.scss']
})
export class ShareManagerItemComponent implements OnInit, OnDestroy {

  // SUBSCRIPTIONS
  susbcription = new Subscription();

  // VARS
  creationDate: Date;
  modificationDate: Date;
  items: ShareContentDetail[] = [];
  mailRecipients: IMailRecipient[] = [];
  toolBarOptions: any[];
  userId: string | undefined;
  subject: string;
  accessOriginal: string;
  shareId: string;

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shareService: ShareService
  ) {

    // TOOL BAR OPTIONS DEFINITION
    this.toolBarOptions = [{
      name: 'Download all contents',
      icon: 'file_download',
      action: 'download'
    },
    {
      name: 'Share all contents',
      icon: 'share',
      action: 'share'
    },
    {
      name: 'Embed all contents',
      icon: 'code'
    },
    {
      name: 'Expire',
      icon: 'schedule'
    },
    {
      name: 'Delete',
      icon: 'delete'
    }];

  }

  // GET SHARE INFO
  getShareInfo(shareId: string): void {

    this.shareId = shareId;

    this.shareService.get(shareId).subscribe(data => {

      this.items = data.contentSelections;
      this.creationDate = data.audit.creationDate;
      this.modificationDate = data.audit.modificationDate;
      this.userId = data.audit.createdByUser;

      const shareDataBasic = <IShareDataBasic | undefined>data.data;

      this.mailRecipients = shareDataBasic!.mailRecipients;

      this.subject = data.name;
      this.accessOriginal = data.outputAccess;
      this.creationDate = data.audit.creationDate;

      setTimeout(() => { this.isLoading = false; }, 0);

    });
  }

  ngOnInit() {

    // ROUTE SUBSCRIBER
    const activatedRoute = this.activatedRoute.params.subscribe(params => {
      this.getShareInfo(params.shareId);
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
