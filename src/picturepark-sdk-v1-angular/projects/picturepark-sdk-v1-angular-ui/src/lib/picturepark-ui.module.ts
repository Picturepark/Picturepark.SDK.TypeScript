import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PICTURE PARK ACTIONS CONFIG
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfigurationFactory } from '../lib/configuration';

// MODULES
import { FeaturesModule } from './features-module/features-module.module';
import { SharedModule } from './shared-module/shared-module.module';

// SDK components
import { ContentAggregationComponent } from './components/content-aggregation-list/content-aggregation/content-aggregation.component';
import { ContentAggregationListComponent } from './components/content-aggregation-list/content-aggregation-list.component';
import { ContentBrowserItemComponent } from './components/content-browser/content-browser-item/content-browser-item.component';

import { ContentBrowserComponent } from './components/content-browser/content-browser.component';


import { LayerPanelsComponent } from './components/layer-panels/layer-panels.component';
import { FieldDetailInfoDialogComponent } from './components/layer-panels/field-detail-info-dialog/field-detail-info-dialog.component';
import {
  ListItemAggregationComponent
} from './components/list-item-aggregation-list/list-item-aggregation/list-item-aggregation.component';
import { ListItemAggregationListComponent } from './components/list-item-aggregation-list/list-item-aggregation-list.component';

// SDK services

import { LiquidRenderingService } from './services/liquid-rendering.service';

// SDK directives
import { LazyLoadDirective } from './directives/lazy-load.directive';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

@NgModule({
  declarations: [
    ContentBrowserComponent,
    ContentAggregationComponent,
    ContentAggregationListComponent,
    ContentBrowserItemComponent,
    FieldDetailInfoDialogComponent,
    ListItemAggregationComponent,
    ListItemAggregationListComponent,

    LazyLoadDirective,
    LayerPanelsComponent,
  ],
  providers: [
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
    ContentBrowserComponent,
    LayerPanelsComponent,
    ContentAggregationListComponent,
    ListItemAggregationListComponent,
    FeaturesModule,
    SharedModule
  ],
  entryComponents: [
    FieldDetailInfoDialogComponent,
  ]
})
export class PictureparkUiModule {}

