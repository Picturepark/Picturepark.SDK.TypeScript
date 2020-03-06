import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentDownloadDialogComponent } from './content-download-dialog.component';
import { SharedModule } from '../../shared-module/shared-module.module';
import { DialogModule } from '../dialog/dialog.module';


@NgModule({
  declarations: [
    ContentDownloadDialogComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule
  ],
  exports: [
    ContentDownloadDialogComponent,
  ],
})
export class ContentDownloadDialogModule {}
