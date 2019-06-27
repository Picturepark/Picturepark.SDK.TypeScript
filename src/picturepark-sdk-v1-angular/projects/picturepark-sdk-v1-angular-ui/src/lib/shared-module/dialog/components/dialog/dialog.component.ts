import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

// INTERFACES
import { Notification } from '../../../notification/interfaces/notification.interface';

@Component({
  selector: 'pp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnChanges {

  @Input() public title: string;
  @Input() public dialogRef: MatDialogRef<any>;

  notificationService: Observable<Notification>;

  constructor() {}

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
