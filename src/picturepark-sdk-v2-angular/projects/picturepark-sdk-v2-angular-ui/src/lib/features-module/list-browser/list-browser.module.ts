import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ListBrowserComponent } from './list-browser.component';
import { BrowserToolbarModule } from '../browser-toolbar/browser-toolbar.module';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

@NgModule({
  declarations: [ListBrowserComponent],
  imports: [CommonModule, SharedModule, BrowserToolbarModule],
  exports: [ListBrowserComponent],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 250, hideDelay: 0, touchGestures: 'off' } },
  ],
})
export class ListBrowserModule {}
