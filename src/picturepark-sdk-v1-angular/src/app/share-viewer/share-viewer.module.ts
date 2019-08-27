import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import {
  ApplicationHeaderModule, ApplicationMenuModule, BrowserToolbarModule,
  PanelModule, SearchBoxModule
} from '@picturepark/sdk-v1-angular-ui';
import { ShareViewerComponent } from './share-viewer.component';
import { ShareViewerRoutingModule } from './share-viewer-routing.module';

// COMPONENTS

@NgModule({
  declarations: [
    ShareViewerComponent
  ],
  imports: [
    CommonModule,
    ApplicationHeaderModule,
    ApplicationMenuModule,
    BrowserToolbarModule,
    PanelModule,
    SearchBoxModule,
    ShareViewerRoutingModule
  ]
})
export class ShareViewerModule { }
