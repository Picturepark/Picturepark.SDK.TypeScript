import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONETNS
import { BrowserToolbarComponent } from './browser-toolbar.component';

@NgModule({
  declarations: [
    BrowserToolbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BrowserToolbarComponent
  ]
})
export class BrowserToolbarModule { }
