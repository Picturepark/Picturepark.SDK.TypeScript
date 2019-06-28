import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

// COMPONENTS
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';

// SERVICES
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'pp-share-content-dialog-component',
  templateUrl: './share-dialog-component.component.html',
  styleUrls: ['./share-dialog-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShareContentDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {

  constructor(
    protected notificationService: NotificationService
  ) {
    super(notificationService);
  }

  // CLOSE DIALOG
  public closeDialog(): void {
    super.closeDialog();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
