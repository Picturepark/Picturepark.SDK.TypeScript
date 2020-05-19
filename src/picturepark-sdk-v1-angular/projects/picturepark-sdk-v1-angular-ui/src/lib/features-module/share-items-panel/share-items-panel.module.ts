import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareItemsPanelComponent } from '../share-items-panel/share-items-panel.component';
import { ContentDownloadDialogModule } from '../content-download-dialog/content-download-dialog.module';

@NgModule({
  declarations: [ShareItemsPanelComponent],
  imports: [CommonModule, SharedModule, ContentDownloadDialogModule],
  exports: [ShareItemsPanelComponent],
})
export class ShareItemsPanelModule {}
