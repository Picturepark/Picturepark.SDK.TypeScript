import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

// SERVICES
import { NotificationService } from '../../../services/notification/notification.service';

// INTERFACES
import { Notification } from '../../../notification/interfaces/notification.interface';

@Component({
  template: ''
})
export class DialogBaseComponent implements OnInit, OnDestroy {

  // SUBSCRIBERS
  notificationSubscriber: Subscription;

  public notification: Notification;
  public title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<any>,
    protected notificationService: NotificationService
  ) {}

  // CLOSE DIALOG
  public closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    // NOTIFICATION SUBSCRIBER
    this.notificationSubscriber = this.notificationService.notification.subscribe(notification => {
      this.notification = notification;
    });

  }

  ngOnDestroy() {

    // UNSUBSCRIBE
    this.notificationSubscriber.unsubscribe();

  }

}
