import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONETNS
import { BrowserToolbarComponent } from './browser-toolbar.component';

@NgModule({
  declarations: [BrowserToolbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [BrowserToolbarComponent],
})
export class BrowserToolbarModule {}
