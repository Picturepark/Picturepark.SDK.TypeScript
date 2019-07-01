import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { DatePickerModule } from './date-picker/date-picker.module';
import { DialogModule } from './dialog/dialog.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatePickerModule,
    DialogModule,
    NotificationModule,
  ],
  exports: [
    DatePickerModule,
    DialogModule,
    NotificationModule,
  ]
})
export class FeaturesModule { }
