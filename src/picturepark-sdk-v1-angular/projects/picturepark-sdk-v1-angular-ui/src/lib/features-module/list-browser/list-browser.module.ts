import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ListBrowserComponent } from './list-browser.component';

@NgModule({
  declarations: [
    ListBrowserComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListBrowserComponent
  ]
})
export class ListBrowserModule { }
