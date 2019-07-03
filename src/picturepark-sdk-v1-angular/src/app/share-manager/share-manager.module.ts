import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import {
  SearchBoxModule, SharedModule, ShareBrowserModule
} from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ShareManagerRoutingModule } from './share-manager-routing.module';

// COMPONENTS
import { ShareBrowserComponent } from './share-manager.component';

@NgModule({
  declarations: [
    ShareBrowserComponent
  ],
  imports: [
    CommonModule,
    ShareManagerRoutingModule,
    SharedModule,
    SearchBoxModule,
    ShareBrowserModule
  ]
})
export class ShareManagerModule { }
