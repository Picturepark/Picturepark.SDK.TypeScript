import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ChannelPickerComponent } from './channel-picker.component';

@NgModule({
  declarations: [ChannelPickerComponent],
  imports: [CommonModule, SharedModule],
  exports: [ChannelPickerComponent],
})
export class ChannelPickerModule {}
