import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared-module.module';
import { NotificationModule } from '../notification/notification.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentDownloadDialogComponent } from './content-download-dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [ContentDownloadDialogComponent, SnackbarComponent],
  imports: [CommonModule, NotificationModule, SharedModule, MatSnackBarModule],
  exports: [ContentDownloadDialogComponent],
  entryComponents: [ContentDownloadDialogComponent, SnackbarComponent],
})
export class ContentDownloadDialogModule {}
