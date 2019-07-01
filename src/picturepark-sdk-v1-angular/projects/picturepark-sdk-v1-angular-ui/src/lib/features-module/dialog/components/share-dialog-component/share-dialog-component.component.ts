import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

// COMPONENTS
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';

// SERVICES
import { NotificationService } from '../../../../shared-module/services/notification/notification.service';

@Component({
  selector: 'pp-share-content-dialog-component',
  templateUrl: './share-dialog-component.component.html',
  styleUrls: ['../dialog-base/dialog-base.component.scss', './share-dialog-component.component.scss']
})
export class ShareContentDialogComponent extends DialogBaseComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<any>,
    protected notificationService: NotificationService
  ) {
    super(data, dialogRef, notificationService);
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
