import { OnInit, OnDestroy, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// COMPONENTS
import { BaseComponent } from '../base.component';

// SERVICES
import { NotificationService } from '../../services/notification/notification.service';

// INTERFACES
import { Notification } from '../../../features-module/notification/interfaces/notification.interface';

export class DialogBaseComponent extends BaseComponent implements OnInit, OnDestroy {
  // SUBSCRIBERS
  notificationSubscriber: Subscription;

  // VARS
  public notification: Notification;
  public title: string;
  public notificationService: NotificationService;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<any>,
    protected injector: Injector
  ) {
    super(injector);
    this.notificationService = injector.get(NotificationService);
  }

  // CLOSE DIALOG
  public closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.init();
  }

  init() {
    // NOTIFICATION SUBSCRIBER
    this.notificationSubscriber = this.notificationService.notification.subscribe((notification) => {
      this.notification = notification;
    });

    this.subscription.add(this.notificationSubscriber);
  }
}
