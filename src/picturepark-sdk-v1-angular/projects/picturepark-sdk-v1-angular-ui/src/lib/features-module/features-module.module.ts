import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ApplicationMenuModule } from './application-menu/application-menu.module';
import { ApplicationHeaderModule } from './application-header/application-header.module';
import { BasketModule } from './basket/basket.module';
import { ContentAggregationListModule } from './content-aggregation-list/content-aggregation-list.module';
import { ContentBrowserModule } from './content-browser/content-browser.module';
import { ChannelPickerModule } from './channel-picker/channel-picker.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { DialogModule } from './dialog/dialog.module';
import { LayerPanelsModule } from './layer-panels/layer-panels.module';
import { ListBrowserModule } from './list-browser/list-browser.module';
import { ListItemAggregationListModule } from './list-item-aggregation-list/list-item-aggregation-list.module';
import { ItemsMenuModule } from './items-menu/items-menu.module';
import { NotificationModule } from './notification/notification.module';
import { OutputDownloadMenuModule } from './output-download-menu/output-download-menu.module';
import { PanelModule } from './panel/panel.module';
import { SearchBoxModule } from './search-box/search-box.module';
import { ShareBrowserModule } from './share-browser/share-browser.module';
import { ToolBarModule } from './tool-bar/tool-bar.module';

@NgModule({
  declarations: [],
  imports: [
    ApplicationMenuModule,
    ApplicationHeaderModule,
    BasketModule,
    ContentAggregationListModule,
    ContentBrowserModule,
    ChannelPickerModule,
    CommonModule,
    DatePickerModule,
    DialogModule,
    LayerPanelsModule,
    ListBrowserModule,
    ListItemAggregationListModule,
    ItemsMenuModule,
    NotificationModule,
    OutputDownloadMenuModule,
    SearchBoxModule,
    ShareBrowserModule,
    PanelModule,
    ToolBarModule
  ],
  exports: [
    ApplicationMenuModule,
    ApplicationHeaderModule,
    BasketModule,
    ContentAggregationListModule,
    ContentBrowserModule,
    ChannelPickerModule,
    DatePickerModule,
    DialogModule,
    LayerPanelsModule,
    ListBrowserModule,
    ListItemAggregationListModule,
    ItemsMenuModule,
    NotificationModule,
    OutputDownloadMenuModule,
    SearchBoxModule,
    ShareBrowserModule,
    PanelModule,
    ToolBarModule
  ]
})
export class FeaturesModule { }
