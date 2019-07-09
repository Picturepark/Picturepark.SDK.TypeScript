import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import {
  ApplicationHeaderModule, ApplicationMenuModule, ItemsMenuModule, PanelModule,
  SearchBoxModule, SharedModule, ShareBrowserModule, ToolBarModule
} from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ShareManagerRoutingModule } from './share-manager-routing.module';

// COMPONENTS
import { ShareBrowserComponent } from './share-manager.component';
import { ShareManagerItemComponent } from './components/share-manager-item/share-manager-item.component';

@NgModule({
  declarations: [
    ShareBrowserComponent,
    ShareManagerItemComponent
  ],
  imports: [
    CommonModule,
    ApplicationHeaderModule,
    ApplicationMenuModule,
    ItemsMenuModule,
    PanelModule,
    ShareManagerRoutingModule,
    SharedModule,
    SearchBoxModule,
    ShareBrowserModule,
    ToolBarModule
  ]
})
export class ShareManagerModule { }
