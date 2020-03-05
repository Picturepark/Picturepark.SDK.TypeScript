import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareItemsPanelComponent } from '../share-items-panel/share-items-panel.component';
import { ItemPanelPreviewComponent } from '../share-items-panel/components/item-panel-preview/item-panel-preview.component';
import { ContentDownloadDialogModule } from '../content-download-dialog/content-download-dialog.module';

@NgModule({
  declarations: [
    ShareItemsPanelComponent,
    ItemPanelPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContentDownloadDialogModule
  ],
  exports: [
    ShareItemsPanelComponent,
    ItemPanelPreviewComponent
  ]
})
export class ShareItemsPanelModule { }
