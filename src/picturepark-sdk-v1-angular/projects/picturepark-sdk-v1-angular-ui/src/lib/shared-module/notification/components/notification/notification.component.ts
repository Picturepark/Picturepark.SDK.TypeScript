import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

// INTERFACES
import { Notification } from '../../interfaces/notification.interface';

@Component({
  selector: 'pp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notificationSubscriber: Subscription;

  @Input() notificationService: Observable<Notification>;
  notificationData: Notification;

  constructor() {}

  // CLOSE NOTIFICATION
  closeNotification() {
    this.notificationData.status = false;
  }

  ngOnInit() {

    // NOTIFICATION SUBSCRIBER
    this.notificationSubscriber = this.notificationService.subscribe(notification => {
      this.notificationData = notification;
    });

  }

  ngOnDestroy(): void {

    // UNSUBSCRIBE
    this.notificationSubscriber.unsubscribe();
  }

}
