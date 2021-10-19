import { Injectable } from '@angular/core';
import { ContentDownloadDialogComponent } from '../content-download-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContentDownloadDialogOptions } from '../interfaces/content-download-dialog.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContentDownloadDialogService {
  constructor(private dialog: MatDialog) {}

  showDialog(options: ContentDownloadDialogOptions): MatDialogRef<ContentDownloadDialogComponent, any> {
    const dialogRef = this.dialog.open(ContentDownloadDialogComponent, {
      data: options,
      autoFocus: false,
      panelClass: ['pp-dialog', options.isShareViewer ? 'cp-dialog' : ''],
    });

    const instance = dialogRef.componentInstance;
    instance.title = 'ContentDownloadDialog.Title';

    return dialogRef;
  }
}
