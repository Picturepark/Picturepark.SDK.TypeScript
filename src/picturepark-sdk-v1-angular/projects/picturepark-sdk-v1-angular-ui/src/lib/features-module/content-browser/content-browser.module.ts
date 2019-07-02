import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';
import { OutputDownloadMenuModule } from '../output-download-menu/output-download-menu.module';

// COMPONENTS
import { ContentBrowserComponent } from './content-browser.component';
import { ContentBrowserItemComponent } from './components/content-browser-item/content-browser-item.component';


@NgModule({
  declarations: [
    ContentBrowserComponent,
    ContentBrowserItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OutputDownloadMenuModule
  ],
  exports: [
    ContentBrowserComponent,
    ContentBrowserItemComponent
  ]
})
export class ContentBrowserModule { }
