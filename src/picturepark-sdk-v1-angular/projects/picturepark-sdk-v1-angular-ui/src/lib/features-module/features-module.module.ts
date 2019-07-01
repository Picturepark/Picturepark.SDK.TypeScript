import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { BasketModule } from './basket/basket.module';
import { ChannelPickerModule } from './channel-picker/channel-picker.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { DialogModule } from './dialog/dialog.module';
import { NotificationModule } from './notification/notification.module';
import { OutputDownloadMenuModule } from './output-download-menu/output-download-menu.module';
import { SearchBoxModule } from './search-box/search-box.module';

@NgModule({
  declarations: [],
  imports: [
    BasketModule,
    ChannelPickerModule,
    CommonModule,
    DatePickerModule,
    DialogModule,
    NotificationModule,
    OutputDownloadMenuModule,
    SearchBoxModule
  ],
  exports: [
    BasketModule,
    ChannelPickerModule,
    DatePickerModule,
    DialogModule,
    NotificationModule,
    OutputDownloadMenuModule,
    SearchBoxModule
  ]
})
export class FeaturesModule { }
