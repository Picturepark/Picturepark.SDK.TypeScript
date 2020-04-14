import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDetailComponent } from './share-detail.component';
import {
  ContentDetailsDialogModule,
  PanelModule,
  BrowserToolbarModule,
  SharedModule,
  ContentDownloadDialogModule,
  ShareItemsPanelModule,
} from '@picturepark/sdk-v1-angular-ui';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ShareDetailComponent],
  imports: [
    CommonModule,
    ContentDetailsDialogModule,
    BrowserToolbarModule,
    PanelModule,
    ShareItemsPanelModule,
    MatProgressBarModule,
    SharedModule,
    ContentDownloadDialogModule,
  ],
  exports: [ShareDetailComponent],
})
export class ShareDetailModule {}
