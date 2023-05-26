import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  BrowserToolbarComponent,
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
    BrowserToolbarComponent,
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
