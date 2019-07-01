import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PICTURE PARK ACTIONS CONFIG
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfigurationFactory } from '../lib/configuration';

// MODULES
import { FeaturesModule } from './features-module/features-module.module';
import { SharedModule } from './shared-module/shared-module.module';

// SDK components
import { BasketItemComponent } from './components/basket/basket-item/basket-item.component';
import { BasketComponent } from './components/basket/basket.component';
import { ContentAggregationComponent } from './components/content-aggregation-list/content-aggregation/content-aggregation.component';
import { ContentAggregationListComponent } from './components/content-aggregation-list/content-aggregation-list.component';
import { ContentBrowserItemComponent } from './components/content-browser/content-browser-item/content-browser-item.component';
import { ContentDownloadDialogComponent } from './components/content-download-dialog/content-download-dialog.component';

import { ChannelPickerComponent } from './components/channel-picker/channel-picker.component';
import { ContentBrowserComponent } from './components/content-browser/content-browser.component';

import { SearchBoxComponent } from './components/search-box/search-box.component';
import { OutputDownloadMenuComponent } from './components/output-download-menu/output-download-menu.component';
import { LayerPanelsComponent } from './components/layer-panels/layer-panels.component';
import { FieldDetailInfoDialogComponent } from './components/layer-panels/field-detail-info-dialog/field-detail-info-dialog.component';
import {
  ListItemAggregationComponent
} from './components/list-item-aggregation-list/list-item-aggregation/list-item-aggregation.component';
import { ListItemAggregationListComponent } from './components/list-item-aggregation-list/list-item-aggregation-list.component';

// SDK services
import { ContentItemSelectionService } from './services/content-item-selection.service';
import { BasketService } from './services/basket.service';
import { LiquidRenderingService } from './services/liquid-rendering.service';

// SDK directives
import { LazyLoadDirective } from './directives/lazy-load.directive';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

@NgModule({
  declarations: [
    BasketComponent,
    BasketItemComponent,
    ChannelPickerComponent,
    ContentBrowserComponent,
    ContentAggregationComponent,
    ContentAggregationListComponent,
    ContentBrowserItemComponent,
    ContentDownloadDialogComponent,
    FieldDetailInfoDialogComponent,
    ListItemAggregationComponent,
    ListItemAggregationListComponent,
    OutputDownloadMenuComponent,
    LazyLoadDirective,
    LayerPanelsComponent,
    // ShareContentRecipientsInputComponent,
    // ShareContentDialogComponent,
    // ShareContentDialogItemComponent,
    // ShareContentDialogNotificationComponent,
    SearchBoxComponent,
  ],
  providers: [
    ContentItemSelectionService,
    BasketService,
    LiquidRenderingService,
    { provide: PICTUREPARK_UI_CONFIGURATION, useFactory: PictureparkUIConfigurationFactory }
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    SharedModule.forRoot(),
  ],
  exports: [
    CommonModule,
    ChannelPickerComponent,
    ContentBrowserComponent,
    SearchBoxComponent,
    LayerPanelsComponent,
    ContentAggregationListComponent,
    ListItemAggregationListComponent,
    BasketComponent,
    OutputDownloadMenuComponent,
    ContentDownloadDialogComponent,
    FeaturesModule,
    SharedModule
  ],
  entryComponents: [
    ContentDownloadDialogComponent,
    // ShareContentRecipientsInputComponent,
    FieldDetailInfoDialogComponent,
    // ShareContentDialogComponent,
    // ShareContentDialogItemComponent,
    // ShareContentDialogNotificationComponent
  ]
})
export class PictureparkUiModule {}

