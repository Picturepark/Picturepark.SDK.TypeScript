import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ConfirmOptions, ConfirmResult } from '../../components/confirm-dialog/confirm-dialog.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirm(
    confirmOptions: ConfirmOptions,
    dialogOptions?: MatDialogConfig
  ): MatDialogRef<ConfirmDialogComponent, ConfirmResult> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: confirmOptions,
      autoFocus: false,
      minWidth: '400px',
      panelClass: ['pp-dialog', confirmOptions.isShareViewer ? 'cp-dialog' : ''],
      ...dialogOptions,
    });

    return dialogRef;
  }
}
