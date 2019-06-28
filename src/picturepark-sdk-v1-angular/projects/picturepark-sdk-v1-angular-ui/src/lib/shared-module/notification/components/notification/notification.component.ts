import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// SERVICES
import { NotificationService } from '../../../services/notification/notification.service';

// INTERFACES
import { Notification } from '../../interfaces/notification.interface';

@Component({
  selector: 'pp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notificationSubscriber: Subscription;

  @Input() notificationService: NotificationService;
  notificationData: Notification;

  constructor() {}

  // CLOSE NOTIFICATION
  closeNotification() {
    this.notificationData.status = false;
  }

  ngOnInit() {

    // NOTIFICATION SUBSCRIBER
    this.notificationSubscriber = this.notificationService.notificationSubscriber().subscribe(data => {

    });

  }

  ngOnDestroy() {

    // UNSUBSCRIBE
    this.notificationSubscriber.unsubscribe();

  }

}
