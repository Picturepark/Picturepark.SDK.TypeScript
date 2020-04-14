import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ContentBrowserModule } from '../content-browser/content-browser.module';

import { LayerPanelsModule } from '../layer-panels/layer-panels.module';
import { NotificationModule } from '../notification/notification.module';
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, ContentBrowserModule, LayerPanelsModule, NotificationModule, SharedModule],
  exports: [NotificationModule],
  entryComponents: [
    ConfirmDialogComponent,
    // ShareContentRecipientsInputComponent
  ],
})
export class DialogModule {}
