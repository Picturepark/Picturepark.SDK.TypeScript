import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ConfirmOptions } from './confirm-dialog.interface';
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';
@Component({
  selector: 'pp-confirmation-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['../dialog-base/dialog-base.component.scss', './confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent extends DialogBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: ConfirmOptions
  ) {
    super(dialogRef);
  }
}
