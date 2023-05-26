import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared-module/shared-module.module';
import { ListBrowserComponent } from './list-browser.component';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { BrowserToolbarComponent } from '../browser-toolbar/browser-toolbar.component';

@NgModule({
  declarations: [ListBrowserComponent],
  imports: [CommonModule, SharedModule, BrowserToolbarComponent],
  exports: [ListBrowserComponent],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 250, hideDelay: 0, touchGestures: 'off' } },
  ],
})
export class ListBrowserModule {}
