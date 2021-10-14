import { Injectable } from '@angular/core';
import { ContentDownloadDialogComponent } from '../content-download-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContentDownloadDialogOptions } from '../interfaces/content-download-dialog.interfaces';
import { DialogService } from '../../../shared-module/services/dialog/dialog.service';
import { TranslationService } from '../../../shared-module/services/translations/translation.service';

@Injectable({
  providedIn: 'root',
})
export class ContentDownloadDialogService {
  constructor(private dialog: MatDialog,
    private dialogService: DialogService,
    private translationService: TranslationService) {}

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

  showLimitDialog() {
    this.dialogService.confirm({
      title: this.translationService.translate('LimitAlert.Title'),
      message: this.translationService.translate('LimitAlert.DownloadLimit'),
      options: {
        cancelText: this.translationService.translate('LimitAlert.Close'),
      },
    });
  }
}
