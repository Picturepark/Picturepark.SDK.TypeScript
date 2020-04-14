import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareBrowserComponent } from './share-browser.component';
import { ShareBrowserItemComponent } from './components/share-browser-item/share-browser-item.component';
import { BrowserToolbarModule } from '../browser-toolbar/browser-toolbar.module';

@NgModule({
  declarations: [ShareBrowserComponent, ShareBrowserItemComponent],
  imports: [CommonModule, SharedModule, BrowserToolbarModule],
  exports: [ShareBrowserComponent, ShareBrowserItemComponent],
})
export class ShareBrowserModule {}
