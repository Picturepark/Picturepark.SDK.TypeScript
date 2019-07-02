import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBrowserComponent } from './list-browser.component';

@NgModule({
  declarations: [
    ListBrowserComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListBrowserComponent
  ]
})
export class ListBrowserModule { }
