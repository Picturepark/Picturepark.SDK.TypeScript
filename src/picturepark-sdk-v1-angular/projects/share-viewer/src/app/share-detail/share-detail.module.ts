import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDetailComponent } from './share-detail.component';
import { ContentDetailsDialogModule, PanelModule, BrowserToolbarModule } from '@picturepark/sdk-v1-angular-ui';

@NgModule({
  declarations: [
    ShareDetailComponent
  ],
  imports: [
    CommonModule,
    ContentDetailsDialogModule,
    BrowserToolbarModule,
    PanelModule
  ],
  exports: [
    ShareDetailComponent
  ]
})
export class ShareDetailModule { }
