import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ListItemAggregationListComponent } from './list-item-aggregation-list.component';

@NgModule({
  declarations: [
    ListItemAggregationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListItemAggregationListComponent
  ]
})
export class ListItemAggregationListModule { }
