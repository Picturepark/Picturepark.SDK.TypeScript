import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ContentBrowserComponent } from './content-browser.component';
import { ContentBrowserItemComponent } from './components/content-browser-item/content-browser-item.component';
import { BrowserToolbarModule } from '../browser-toolbar/browser-toolbar.module';


@NgModule({
  declarations: [
    ContentBrowserComponent,
    ContentBrowserItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserToolbarModule
  ],
  exports: [
    ContentBrowserComponent,
    ContentBrowserItemComponent
  ]
})
export class ContentBrowserModule { }
