import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { ItemsMenuComponent } from './items-menu.component';

@NgModule({
  declarations: [
    ItemsMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemsMenuComponent
  ]
})
export class ItemsMenuModule { }
