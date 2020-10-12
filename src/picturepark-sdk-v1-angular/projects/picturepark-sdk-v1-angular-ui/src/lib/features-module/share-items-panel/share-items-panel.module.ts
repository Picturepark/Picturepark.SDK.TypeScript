import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareItemsPanelComponent } from '../share-items-panel/share-items-panel.component';
import { ContentDownloadDialogModule } from '../content-download-dialog/content-download-dialog.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ShareItemsPanelComponent],
  imports: [CommonModule, SharedModule, ContentDownloadDialogModule, ScrollingModule],
  exports: [ShareItemsPanelComponent],
})
export class ShareItemsPanelModule {}
