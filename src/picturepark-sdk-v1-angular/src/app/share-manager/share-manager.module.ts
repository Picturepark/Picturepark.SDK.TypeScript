import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import {
  BrowserToolbarModule,
  SearchBoxModule,
  SharedModule,
  ShareBrowserModule,
  ItemToolBarModule,
  AggregationListModule,
  ShareItemsPanelModule,
  ShareMailRecipientsPanelModule,
  ShareOwnerPanelModule,
  ShareSettingsPanelModule,
} from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ShareManagerRoutingModule } from './share-manager-routing.module';

// COMPONENTS
import { ShareBrowserComponent } from './share-manager.component';
import { ShareManagerItemComponent } from './components/share-manager-item/share-manager-item.component';
import { SharesManagerComponent } from './components/shares-manager/shares-manager.component';
import { ApplicationHeaderModule } from '../components/application-header/application-header.module';

@NgModule({
  declarations: [ShareBrowserComponent, ShareManagerItemComponent, SharesManagerComponent],
  imports: [
    CommonModule,
    BrowserToolbarModule,
    AggregationListModule,
    ShareManagerRoutingModule,
    SharedModule,
    SearchBoxModule,
    ShareBrowserModule,
    ItemToolBarModule,
    ShareItemsPanelModule,
    ApplicationHeaderModule,
    ShareMailRecipientsPanelModule,
    ShareOwnerPanelModule,
    ShareSettingsPanelModule,
  ],
})
export class ShareManagerModule {}
