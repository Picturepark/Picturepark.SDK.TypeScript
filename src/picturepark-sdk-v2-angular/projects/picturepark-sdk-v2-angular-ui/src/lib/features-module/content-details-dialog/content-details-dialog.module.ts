import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ContentBrowserModule } from '../content-browser/content-browser.module';
import { LayerPanelsModule } from '../layer-panels/layer-panels.module';
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ContentDetailsDialogComponent } from './content-details-dialog.component';

@NgModule({
  declarations: [ContentDetailsDialogComponent],
  imports: [CommonModule, ContentBrowserModule, LayerPanelsModule, SharedModule],
  exports: [ContentDetailsDialogComponent],
  entryComponents: [ContentDetailsDialogComponent],
})
export class ContentDetailsDialogModule {}
