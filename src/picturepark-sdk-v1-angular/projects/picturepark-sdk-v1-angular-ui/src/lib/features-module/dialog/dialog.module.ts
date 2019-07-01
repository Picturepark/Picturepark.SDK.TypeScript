import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { NotificationModule } from '../notification/notification.module';
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { DialogBaseComponent } from './components/dialog-base/dialog-base.component';
import { ShareContentDialogComponent } from './components/share-dialog-component/share-dialog-component.component';
import {
  ShareContentRecipientsInputComponent
} from './components/share-content-recipients-input/share-content-recipients-input.component';

@NgModule({
  declarations: [
    DialogBaseComponent,
    ShareContentDialogComponent,
    ShareContentRecipientsInputComponent
  ],
  imports: [
    CommonModule,
    NotificationModule,
    SharedModule
  ],
  exports: [
    DialogBaseComponent,
    ShareContentDialogComponent,
    ShareContentRecipientsInputComponent
  ],
  entryComponents: [
    ShareContentDialogComponent,
    // ShareContentRecipientsInputComponent
  ]
})
export class DialogModule {}
