import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

// INTERFACES
import { Notification } from '../../notification/interfaces/notification.interface';

@Injectable()
export class NotificationService {

  // NOTIFICATION BEHAVIOR SUBJECT DEFINITION
  notificationStore: Notification;
  notification: Observable<Notification>;
  _notification: BehaviorSubject<Notification>;

  constructor() {

    // NOTIFICATION BEHAVIOR SUBJECT INITIALIZATION
    this.notificationStore = {
      message: '',
      displayTime: 0,
      status: false,
      type: 'success'
    };
    this._notification = new BehaviorSubject(this.notificationStore);
    this.notification = this._notification.asObservable();

    setTimeout(() => {
      this.sendNotification({
        message: 'this is a test',
        displayTime: 10000,
        status: true,
        type: 'success'
      });
    }, 5000);

  }

  // SEND NOTIFICATION
  sendNotification(notification: Notification): void {
    this._notification.next(notification);
  }

}
