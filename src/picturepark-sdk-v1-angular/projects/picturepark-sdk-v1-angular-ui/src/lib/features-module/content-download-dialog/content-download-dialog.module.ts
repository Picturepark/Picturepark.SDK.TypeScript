import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentDownloadDialogComponent } from './content-download-dialog.component';
import { SharedModule } from '../../shared-module/shared-module.module';
import { DialogModule } from '../dialog/dialog.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ContentDownloadDialogComponent],
  imports: [CommonModule, DialogModule, SharedModule, MatSnackBarModule],
  exports: [ContentDownloadDialogComponent],
  entryComponents: [ContentDownloadDialogComponent],
})
export class ContentDownloadDialogModule {}
