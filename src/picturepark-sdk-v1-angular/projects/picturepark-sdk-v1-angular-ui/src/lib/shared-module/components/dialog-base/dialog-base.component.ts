import { OnInit, OnDestroy, Injector, Directive } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// COMPONENTS
import { BaseComponent } from '../base.component';

// SERVICES
import { NotificationService } from '../../services/notification/notification.service';

// INTERFACES
import { Notification } from '../../../features-module/notification/interfaces/notification.interface';

@Directive()
export class DialogBaseComponent extends BaseComponent implements OnInit, OnDestroy {
  // VARS
  public notification: Notification;
  public title: string;
  public notificationService: NotificationService;

  constructor(protected dialogRef: MatDialogRef<any>, protected injector: Injector) {
    super(injector);
    this.notificationService = injector.get(NotificationService);
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
    this.sub = this.notificationService.notification.subscribe((notification) => {
      this.notification = notification;
    });
  }

  ngOnDestroy() {
    this.notificationService.clearNotification();
  }
}
