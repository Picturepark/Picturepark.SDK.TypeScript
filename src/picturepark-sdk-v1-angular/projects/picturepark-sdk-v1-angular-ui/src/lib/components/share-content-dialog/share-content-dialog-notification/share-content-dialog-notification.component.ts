import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pp-share-content-dialog-notification',
  templateUrl: './share-content-dialog-notification.component.html',
  styleUrls: ['./share-content-dialog-notification.component.css']
})
export class ShareContentDialogNotificationComponent implements OnChanges {

  @Input() notificationMessage: string;
  @Input() notificationType: string;
  @Input() notificationStatus: boolean;
  @Input() notificationDisplayTime: number;

  constructor() { }

  // CLOSE NOTIFICATION
  closeNotification() {
    this.notificationStatus = false;
  }

  ngOnChanges(changes: SimpleChanges) {

    this.notificationMessage = changes.notificationMessage && changes.notificationMessage.currentValue;
    this.notificationType = changes.notificationType && changes.notificationType.currentValue;
    this.notificationStatus = changes.notificationStatus && changes.notificationStatus.currentValue;
    this.notificationDisplayTime ? changes.notificationDisplayTime && changes.notificationDisplayTime.currentValue : 10000;

    if(this.notificationStatus) setTimeout(() => { this.closeNotification() }, this.notificationDisplayTime);

  }
}
