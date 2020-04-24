import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ConfirmOptions, ConfirmResult } from '../../components/confirm-dialog/confirm-dialog.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirm(confirmOptions: ConfirmOptions): MatDialogRef<ConfirmDialogComponent, ConfirmResult> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: confirmOptions,
      autoFocus: false,
      minWidth: '400px',
    });

    return dialogRef;
  }
}
