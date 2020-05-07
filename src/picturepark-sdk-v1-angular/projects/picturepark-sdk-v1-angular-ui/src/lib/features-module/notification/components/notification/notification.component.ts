import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

// INTERFACES
import { Notification } from '../../interfaces/notification.interface';

@Component({
  selector: 'pp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnChanges {
  @Input() notification: Notification;
  notificationData: Notification;

  constructor() {}

  // CLOSE NOTIFICATION
  closeNotification() {
    this.notificationData.status = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notification && changes.notification.currentValue) {
      this.notificationData = changes.notification.currentValue;
      setTimeout(() => {
        this.closeNotification();
      }, this.notificationData.displayTime);
    }
  }
}
