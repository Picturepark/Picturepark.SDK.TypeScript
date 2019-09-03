import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import {
  ApplicationHeaderModule, ApplicationMenuModule, BrowserToolbarModule,
  PanelModule, SearchBoxModule, SharedModule, ShareBrowserModule, ItemToolBarModule, ShareAggregationListModule
} from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ShareManagerRoutingModule } from './share-manager-routing.module';

// COMPONENTS
import { ShareBrowserComponent } from './share-manager.component';
import { ShareManagerItemComponent } from './components/share-manager-item/share-manager-item.component';
import { SharesManagerComponent } from './components/shares-manager/shares-manager.component';
import { ShareItemsPanelModule } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/features-module/share-items-panel/share-items-panel.module';

@NgModule({
  declarations: [
    ShareBrowserComponent,
    ShareManagerItemComponent,
    SharesManagerComponent
  ],
  imports: [
    CommonModule,
    ApplicationHeaderModule,
    ApplicationMenuModule,
    BrowserToolbarModule,
    ShareAggregationListModule,
    PanelModule,
    ShareManagerRoutingModule,
    SharedModule,
    SearchBoxModule,
    ShareBrowserModule,
    ItemToolBarModule,
    ShareItemsPanelModule
  ]
})
export class ShareManagerModule { }
