import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ItemToolBarComponent } from './item-tool-bar.component';

@NgModule({
  declarations: [
    ItemToolBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ItemToolBarComponent
  ]
})
export class ItemToolBarModule { }
