import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ApplicationMenuModule } from './application-menu/application-menu.module';
import { ApplicationHeaderModule } from './application-header/application-header.module';
import { BasketModule } from './basket/basket.module';
import { BrowserToolbarModule } from './browser-toolbar/browser-toolbar.module';
import { ContentAggregationListModule } from './content-aggregation-list/content-aggregation-list.module';
import { ContentBrowserModule } from './content-browser/content-browser.module';
import { ContentDetailsDialogModule } from './content-details-dialog/content-details-dialog.module';
import { ChannelPickerModule } from './channel-picker/channel-picker.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { DialogModule } from './dialog/dialog.module';

import { LayerPanelsModule } from './layer-panels/layer-panels.module';
import { ListItemsModule } from './list-items/list-items.module';
import { ListBrowserModule } from './list-browser/list-browser.module';
import { ListItemAggregationListModule } from './list-item-aggregation-list/list-item-aggregation-list.module';
import { NotificationModule } from './notification/notification.module';
import { PanelModule } from './panel/panel.module';
import { SearchBoxModule } from './search-box/search-box.module';
import { SchemaBrowserModule } from './schema-browser/schema-browser.module';
import { ShareBrowserModule } from './share-browser/share-browser.module';
import { ShareContentDialogModule } from './share-content-dialog/share-content-dialog.module';
import { ItemToolBarModule } from './item-tool-bar/item-tool-bar.module';
import { ShareItemsPanelModule } from './share-items-panel/share-items-panel.module';
import { ContentDownloadDialogModule } from './content-download-dialog/content-download-dialog.module';

@NgModule({
  declarations: [],
  imports: [
    ApplicationMenuModule,
    ApplicationHeaderModule,
    BasketModule,
    BrowserToolbarModule,
    ContentAggregationListModule,
    ContentBrowserModule,
    ContentDetailsDialogModule,
    ChannelPickerModule,
    CommonModule,
    DatePickerModule,
    DialogModule,
    LayerPanelsModule,
    ListItemsModule,
    ListBrowserModule,
    ListItemAggregationListModule,
    NotificationModule,
    SchemaBrowserModule,
    SearchBoxModule,
    ShareBrowserModule,
    ShareContentDialogModule,
    PanelModule,
    ItemToolBarModule,
    ShareItemsPanelModule,
    ContentDownloadDialogModule
  ],
  exports: [
    ApplicationMenuModule,
    ApplicationHeaderModule,
    BasketModule,
    BrowserToolbarModule,
    ContentAggregationListModule,
    ContentBrowserModule,
    ContentDetailsDialogModule,
    ChannelPickerModule,
    DatePickerModule,
    DialogModule,
    LayerPanelsModule,
    ListItemsModule,
    ListBrowserModule,
    ListItemAggregationListModule,
    NotificationModule,
    SchemaBrowserModule,
    SearchBoxModule,
    ShareBrowserModule,
    ShareContentDialogModule,
    PanelModule,
    ItemToolBarModule,
    ShareItemsPanelModule,
    ContentDownloadDialogModule
  ]
})
export class FeaturesModule { }
