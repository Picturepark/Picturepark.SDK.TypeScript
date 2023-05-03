import { OnInit, OnDestroy, Directive, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// COMPONENTS
import { BaseComponent } from '../base.component';

// SERVICES
import { NotificationService } from '../../services/notification/notification.service';

// INTERFACES
import { Notification } from '../../../features-module/notification/interfaces/notification.interface';

@Directive()
export class DialogBaseComponent extends BaseComponent implements OnInit, OnDestroy {
  // VARS
  notification: Notification;
  title: string;
  notificationService = inject(NotificationService);

  constructor(protected dialogRef: MatDialogRef<any>) {
    super();
  }

  // CLOSE DIALOG
  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.init();
  }

  init() {
    // NOTIFICATION SUBSCRIBER
    this.sub = this.notificationService.notification$.subscribe(notification => {
      this.notification = notification;
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.notificationService.clearNotification();
  }
}
