import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ContentBrowserModule } from '../content-browser/content-browser.module';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { LayerPanelsModule } from '../layer-panels/layer-panels.module';
import { NotificationModule } from '../notification/notification.module';
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ContentDownloadDialogComponent } from './components/content-download-dialog/content-download-dialog.component';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';
import { ShareContentDialogComponent } from './components/share-content-dialog/share-content-dialog.component';
import { ShareContentRecipientsInputComponent } from './components/share-content-recipients-input/share-content-recipients-input.component';
import { ShareContentDialogItemComponent } from './components/share-content-dialog-item/share-content-dialog-item.component';

@NgModule({
  declarations: [
    ContentDownloadDialogComponent,
    DetailsDialogComponent,
    ShareContentDialogComponent,
    ShareContentRecipientsInputComponent,
    ShareContentDialogItemComponent
  ],
  imports: [
    CommonModule,
    ContentBrowserModule,
    DatePickerModule,
    LayerPanelsModule,
    NotificationModule,
    SharedModule
  ],
  exports: [
    ContentDownloadDialogComponent,
    DetailsDialogComponent,
    ShareContentDialogComponent,
    ShareContentRecipientsInputComponent
  ],
  entryComponents: [
    ContentDownloadDialogComponent,
    DetailsDialogComponent,
    ShareContentDialogComponent,
    ShareContentDialogItemComponent,
    // ShareContentRecipientsInputComponent
  ]
})
export class DialogModule {}
