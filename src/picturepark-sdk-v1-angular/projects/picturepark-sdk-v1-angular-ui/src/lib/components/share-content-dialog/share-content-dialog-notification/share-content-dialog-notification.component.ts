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
  
  constructor() { }

  closeNotification() {
    this.notificationStatus = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.notificationMessage = changes.notificationMessage && changes.notificationMessage.currentValue;
    this.notificationStatus = changes.notificationStatus && changes.notificationStatus.currentValue;
    this.notificationType = changes.notificationType && changes.notificationType.currentValue
  }
  
}
