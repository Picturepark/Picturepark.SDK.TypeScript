import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared-module.module';
import { ShareSettingsPanelComponent } from './share-settings-panel.component';

@NgModule({
  declarations: [ShareSettingsPanelComponent],
  imports: [CommonModule, SharedModule],
  exports: [ShareSettingsPanelComponent],
})
export class ShareSettingsPanelModule {}
