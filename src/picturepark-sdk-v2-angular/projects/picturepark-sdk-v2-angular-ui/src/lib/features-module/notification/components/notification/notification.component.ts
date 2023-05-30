import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../../interfaces/notification.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class NotificationComponent implements OnChanges {
  @Input() notification: Notification;
  notificationData$ = new BehaviorSubject<Notification | undefined>(undefined);

  closeNotification() {
    this.notificationData$.next(undefined);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notification && changes.notification.currentValue) {
      const notificationData = changes.notification.currentValue as Notification;

      if (notificationData.displayTime > 0) {
        setTimeout(() => {
          this.closeNotification();
        }, notificationData.displayTime);
      }

      this.notificationData$.next(notificationData);
    }
  }
}
