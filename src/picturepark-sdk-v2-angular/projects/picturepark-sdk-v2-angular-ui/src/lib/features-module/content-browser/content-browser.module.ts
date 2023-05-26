import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared-module/shared-module.module';
import { ContentBrowserComponent } from './content-browser.component';
import { ContentBrowserItemComponent } from './components/content-browser-item/content-browser-item.component';
import { ContentImagePreviewComponent } from './components/content-image-preview/content-image-preview.component';
import { BrowserToolbarComponent } from '../browser-toolbar/browser-toolbar.component';

@NgModule({
  declarations: [ContentBrowserComponent, ContentBrowserItemComponent, ContentImagePreviewComponent],
  imports: [CommonModule, SharedModule, BrowserToolbarComponent],
  exports: [ContentBrowserComponent, ContentBrowserItemComponent, ContentImagePreviewComponent],
})
export class ContentBrowserModule {}
