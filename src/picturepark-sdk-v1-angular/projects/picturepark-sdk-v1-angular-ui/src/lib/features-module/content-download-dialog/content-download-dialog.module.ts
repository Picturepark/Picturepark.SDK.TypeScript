import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared-module.module';
import { NotificationModule } from '../notification/notification.module';
import { ContentDownloadDialogComponent } from './content-download-dialog.component';

@NgModule({
  declarations: [ContentDownloadDialogComponent],
  imports: [CommonModule, NotificationModule, SharedModule],
  exports: [ContentDownloadDialogComponent],
  entryComponents: [ContentDownloadDialogComponent],
})
export class ContentDownloadDialogModule {}
