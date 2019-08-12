import { Injectable } from '@angular/core';
import { ContentDownloadDialogComponent } from './content-download-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Content } from '@picturepark/sdk-v1-angular';

@Injectable({
  providedIn: 'root',
})
export class ContentDownloadDialogService {
  constructor(private dialog: MatDialog) {

  }

  showDialog(items: Content[]): MatDialogRef<ContentDownloadDialogComponent, any> {
    const dialogRef = this.dialog.open(ContentDownloadDialogComponent, {
      data: items,
      autoFocus: false
    });

    const instance = dialogRef.componentInstance;
    instance.title = 'ContentDownloadDialog.Title';

    return dialogRef;
  }
}
