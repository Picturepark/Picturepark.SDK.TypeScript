import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ConfirmOptions } from './confirm-dialog.interface';
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'pp-confirmation-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['../dialog-base/dialog-base.component.scss', './confirm-dialog.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        MatButtonModule,
    ],
})
export class ConfirmDialogComponent extends DialogBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: ConfirmOptions
  ) {
    super(dialogRef);
  }
}
