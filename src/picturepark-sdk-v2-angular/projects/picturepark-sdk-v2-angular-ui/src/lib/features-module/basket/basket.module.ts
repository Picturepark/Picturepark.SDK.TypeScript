import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared-module/shared-module.module';
import { BasketComponent } from './basket.component';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';

@NgModule({
  declarations: [BasketComponent, BasketItemComponent],
  imports: [CommonModule, SharedModule, TranslatePipe],
  exports: [BasketComponent, BasketItemComponent],
})
export class BasketModule {}
