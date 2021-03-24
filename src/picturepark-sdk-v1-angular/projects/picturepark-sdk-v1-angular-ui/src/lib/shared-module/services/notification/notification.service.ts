import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// INTERFACES
import { Notification } from '../../../features-module/notification/interfaces/notification.interface';

@Injectable()
export class NotificationService {
  // NOTIFICATION BEHAVIOR SUBJECT DEFINITION
  private readonly notificationStore: Notification = {
    message: '',
    displayTime: 0,
    status: false,
    type: 'success',
  };

  notification = new BehaviorSubject<Notification>(this.notificationStore);

  // SEND NOTIFICATION
  sendNotification(notification: Notification) {
    this.notification.next(notification);
  }

  clearNotification() {
    this.notification.next(this.notificationStore);
  }
}
