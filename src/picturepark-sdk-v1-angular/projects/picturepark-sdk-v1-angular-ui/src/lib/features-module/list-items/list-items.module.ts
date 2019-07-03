import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ListItemsRoutingModule } from './list-items-routing.module';
import { ListModule } from './list/list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListItemsRoutingModule,
    ListModule,
  ],
  exports: [
    ListModule
  ]
})
export class ListItemsModule { }
