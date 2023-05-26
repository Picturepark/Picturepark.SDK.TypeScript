import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared-module/shared-module.module';
import { ShareBrowserComponent } from './share-browser.component';
import { ShareBrowserItemComponent } from './components/share-browser-item/share-browser-item.component';
import { BrowserToolbarComponent } from '../browser-toolbar/browser-toolbar.component';

@NgModule({
  declarations: [ShareBrowserComponent, ShareBrowserItemComponent],
  imports: [CommonModule, SharedModule, BrowserToolbarComponent],
  exports: [ShareBrowserComponent, ShareBrowserItemComponent],
})
export class ShareBrowserModule {}
