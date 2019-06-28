import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

// SERVICES
import { NotificationService } from '../../../services/notification/notification.service';

// INTERFACES
import { Notification } from '../../../notification/interfaces/notification.interface';

@Component({
  template: '',
  styleUrls: ['./dialog-base.component.scss'],
})
export class DialogBaseComponent implements OnInit, OnChanges, OnDestroy {

  // SUBSCRIBERS
  notificationSubscriber: Subscription;

  // INPUTS
  @Input() public title: string;
  @Input() public dialogRef: MatDialogRef<any>;

  public notification: Notification;

  constructor(
    protected notificationService: NotificationService
  ) {}

  // CLOSE DIALOG
  public closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    // NOTIFICATION SUBSCRIBER
    this.notificationSubscriber = this.notificationService.notificationSubscriber().subscribe(notification => {
      this.notification = notification;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    this.title = changes.title && changes.title.currentValue;
    this.dialogRef = changes.dialogRef && changes.dialogRef.currentValue;
  }

  ngOnDestroy() {

    // UNSUBSCRIBE
    this.notificationSubscriber.unsubscribe();

  }

}
