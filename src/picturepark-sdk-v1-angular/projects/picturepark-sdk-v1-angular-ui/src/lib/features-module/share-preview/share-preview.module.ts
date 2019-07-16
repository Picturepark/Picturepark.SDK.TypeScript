import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULE
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SharePreviewComponent } from './share-preview.component';

@NgModule({
  declarations: [
    SharePreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SharePreviewComponent
  ]
})
export class SharePreviewModule { }
