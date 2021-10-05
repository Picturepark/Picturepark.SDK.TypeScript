import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { ItemToolBarComponent } from './item-tool-bar.component';

@NgModule({
  declarations: [ItemToolBarComponent],
  imports: [CommonModule],
  exports: [ItemToolBarComponent],
})
export class ItemToolBarModule {}
