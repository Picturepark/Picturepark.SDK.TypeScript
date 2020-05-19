import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  BrowserToolbarModule,
  ContentDetailsDialogModule,
  ContentDownloadDialogModule,
  SharedModule,
  ShareItemsPanelModule,
  ShareMailRecipientsPanelModule,
  ShareOwnerPanelModule,
  ShareSettingsPanelModule,
} from '@picturepark/sdk-v1-angular-ui';
import { ShareDetailComponent } from './share-detail.component';

@NgModule({
  declarations: [ShareDetailComponent],
  imports: [
    CommonModule,
    ContentDetailsDialogModule,
    BrowserToolbarModule,
    ShareItemsPanelModule,
    MatProgressBarModule,
    SharedModule,
    ContentDownloadDialogModule,
    ShareMailRecipientsPanelModule,
    ShareOwnerPanelModule,
    ShareSettingsPanelModule,
  ],
  exports: [ShareDetailComponent],
})
export class ShareDetailModule {}
