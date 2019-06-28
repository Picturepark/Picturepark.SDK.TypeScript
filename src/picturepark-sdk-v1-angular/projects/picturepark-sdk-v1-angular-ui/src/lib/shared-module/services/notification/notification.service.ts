import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// INTERFACES
import { Notification } from '../../notification/interfaces/notification.interface';

@Injectable()
export class NotificationService {

  notificationSubject = new Subject<Notification>();

  constructor() {}

  // SEND NOTIFICATION
  sendNotification(notification: Notification): void {
    this.notificationSubject.next(notification);
  }

  // NOTIFICATION SUBSCRIBER
  notificationSubscriber(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

}
