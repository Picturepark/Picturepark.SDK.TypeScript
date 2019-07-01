import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { BasketModule } from './basket/basket.module';
import { ContentAggregationListModule } from './content-aggregation-list/content-aggregation-list.module';
import { ContentBrowserModule } from './content-browser/content-browser.module';
import { ChannelPickerModule } from './channel-picker/channel-picker.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { DialogModule } from './dialog/dialog.module';
import { LayerPanelsModule } from './layer-panels/layer-panels.module';
import { ListItemAggregationListModule } from './list-item-aggregation-list/list-item-aggregation-list.module';
import { NotificationModule } from './notification/notification.module';
import { OutputDownloadMenuModule } from './output-download-menu/output-download-menu.module';
import { SearchBoxModule } from './search-box/search-box.module';

@NgModule({
  declarations: [],
  imports: [
    BasketModule,
    ContentAggregationListModule,
    ContentBrowserModule,
    ChannelPickerModule,
    CommonModule,
    DatePickerModule,
    DialogModule,
    LayerPanelsModule,
    ListItemAggregationListModule,
    NotificationModule,
    OutputDownloadMenuModule,
    SearchBoxModule
  ],
  exports: [
    BasketModule,
    ContentAggregationListModule,
    ContentBrowserModule,
    ChannelPickerModule,
    DatePickerModule,
    DialogModule,
    LayerPanelsModule,
    ListItemAggregationListModule,
    NotificationModule,
    OutputDownloadMenuModule,
    SearchBoxModule
  ]
})
export class FeaturesModule { }
