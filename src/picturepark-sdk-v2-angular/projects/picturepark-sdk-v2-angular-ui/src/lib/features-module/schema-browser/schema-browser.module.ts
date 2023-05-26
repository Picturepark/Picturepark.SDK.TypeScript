import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared-module/shared-module.module';
import { SchemaBrowserComponent } from './schema-browser.component';
import { SchemaBrowserItemComponent } from './components/schema-browser-item/schema-browser-item.component';
import { BrowserToolbarComponent } from '../browser-toolbar/browser-toolbar.component';

@NgModule({
    imports: [CommonModule, SharedModule, BrowserToolbarComponent, SchemaBrowserComponent, SchemaBrowserItemComponent],
    exports: [SchemaBrowserComponent, SchemaBrowserItemComponent],
})
export class SchemaBrowserModule {}
