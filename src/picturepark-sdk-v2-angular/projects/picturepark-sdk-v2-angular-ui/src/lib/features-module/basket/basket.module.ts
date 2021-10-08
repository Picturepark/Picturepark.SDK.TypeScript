import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { BasketComponent } from './basket.component';
import { BasketItemComponent } from './components/basket-item/basket-item.component';

@NgModule({
  declarations: [BasketComponent, BasketItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [BasketComponent, BasketItemComponent],
})
export class BasketModule {}
