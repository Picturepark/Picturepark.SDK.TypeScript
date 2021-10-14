import { Component, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertOptions } from './alert-dialog.interface';
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';
@Component({
  selector: 'pp-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['../dialog-base/dialog-base.component.scss', './alert-dialog.component.scss'],
})
export class AlertDialogComponent extends DialogBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: AlertOptions,
    injector: Injector
  ) {
    super(dialogRef, injector);
  }
}
