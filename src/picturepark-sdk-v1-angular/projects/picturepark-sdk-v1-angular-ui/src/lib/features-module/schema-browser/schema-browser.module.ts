import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SchemaBrowserComponent } from './schema-browser.component';
import { SchemaBrowserItemComponent } from './components/schema-browser-item/schema-browser-item.component';
import { BrowserToolbarModule } from '../browser-toolbar/browser-toolbar.module';

@NgModule({
  declarations: [SchemaBrowserComponent, SchemaBrowserItemComponent],
  imports: [CommonModule, SharedModule, BrowserToolbarModule],
  exports: [SchemaBrowserComponent, SchemaBrowserItemComponent],
})
export class SchemaBrowserModule {}
