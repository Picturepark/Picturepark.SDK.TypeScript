import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared-module.module';
import { ShareOwnerPanelComponent } from './share-owner-panel.component';

@NgModule({
  declarations: [ShareOwnerPanelComponent],
  imports: [CommonModule, SharedModule],
  exports: [ShareOwnerPanelComponent],
})
export class ShareOwnerPanelModule {}
