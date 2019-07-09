import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareBrowserComponent } from './share-browser.component';
import { ShareBrowserItemComponent } from './components/share-browser-item/share-browser-item.component';

@NgModule({
  declarations: [
    ShareBrowserComponent,
    ShareBrowserItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ShareBrowserComponent,
    ShareBrowserItemComponent
  ]
})
export class ShareBrowserModule { }
