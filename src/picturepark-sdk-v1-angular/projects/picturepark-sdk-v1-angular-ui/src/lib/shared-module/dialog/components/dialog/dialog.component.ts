import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material';

// SERVICES
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  template: ''
})
export class DialogBaseComponent implements OnInit, OnChanges {

  @Input() public title: string;
  @Input() public dialogRef: MatDialogRef<any>;

  constructor(private notificationService: NotificationService) {}

  // CLOSE DIALOG
  public closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    this.title = changes.title && changes.title.currentValue;
    this.dialogRef = changes.dialogRef && changes.dialogRef.currentValue;
  }

}
