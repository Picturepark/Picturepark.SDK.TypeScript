import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import {
  BrowserToolbarModule,
  ContentDetailsDialogModule,
  ContentDownloadDialogModule,
  SharedModule,
  ShareItemsPanelModule,
  ShareMailRecipientsPanelModule,
  ShareOwnerPanelModule,
  ShareSettingsPanelModule,
  LanguageSwitchModule,
} from '@picturepark/sdk-v2-angular-ui';
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
    LanguageSwitchModule,
  ],
  exports: [ShareDetailComponent],
})
export class ShareDetailModule {}
