import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDetailComponent } from './share-detail.component';
import { ContentDetailsDialogModule, PanelModule, BrowserToolbarModule } from '@picturepark/sdk-v1-angular-ui';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [
    ShareDetailComponent
  ],
  imports: [
    CommonModule,
    ContentDetailsDialogModule,
    BrowserToolbarModule,
    PanelModule,
    MatProgressBarModule
  ],
  exports: [
    ShareDetailComponent
  ]
})
export class ShareDetailModule { }
