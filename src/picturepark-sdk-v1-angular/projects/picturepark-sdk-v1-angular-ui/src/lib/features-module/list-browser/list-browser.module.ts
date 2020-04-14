import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ListBrowserComponent } from './list-browser.component';
import { BrowserToolbarModule } from '../browser-toolbar/browser-toolbar.module';

@NgModule({
  declarations: [ListBrowserComponent],
  imports: [CommonModule, SharedModule, BrowserToolbarModule],
  exports: [ListBrowserComponent],
})
export class ListBrowserModule {}
