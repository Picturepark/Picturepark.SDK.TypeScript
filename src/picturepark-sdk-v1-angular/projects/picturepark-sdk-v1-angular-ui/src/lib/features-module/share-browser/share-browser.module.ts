import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareBrowserComponent } from './share-browser.component';

@NgModule({
  declarations: [
    ShareBrowserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ShareBrowserComponent
  ]
})
export class ShareBrowserModule { }
