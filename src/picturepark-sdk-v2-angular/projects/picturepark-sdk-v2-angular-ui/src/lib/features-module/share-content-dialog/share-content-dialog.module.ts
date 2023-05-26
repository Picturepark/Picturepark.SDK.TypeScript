import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { DatePickerModule } from '../date-picker/date-picker.module';
import { NotificationModule } from '../notification/notification.module';
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareContentDialogComponent } from './share-content-dialog.component';
import { ShareContentDialogItemComponent } from './components/share-content-dialog-item/share-content-dialog-item.component';
import { ShareContentRecipientsInputComponent } from './components/share-content-recipients-input/share-content-recipients-input.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    imports: [CommonModule, DatePickerModule, NotificationModule, SharedModule, MatDividerModule, ShareContentDialogComponent, ShareContentDialogItemComponent, ShareContentRecipientsInputComponent],
    exports: [ShareContentDialogComponent],
})
export class ShareContentDialogModule {}
