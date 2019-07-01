import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

// COMPONENTS
import { BaseComponent } from '../../../../shared-module/components/base.component';

// SERVICES
import { NotificationService } from '../../../../shared-module/services/notification/notification.service';

// INTERFACES
import { Notification } from '../../../notification/interfaces/notification.interface';

@Component({
  template: ''
})
export class DialogBaseComponent extends BaseComponent implements OnInit, OnDestroy {

  // SUBSCRIBERS
  notificationSubscriber: Subscription;

  // VARS
  public notification: Notification;
  public title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<any>,
    protected notificationService: NotificationService
  ) {
    super();
  }

  // CLOSE DIALOG
  public closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    // NOTIFICATION SUBSCRIBER
    this.notificationSubscriber = this.notificationService.notification.subscribe(notification => {
      this.notification = notification;
    });

    this.subscription.add(this.notificationSubscriber);

  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

}
