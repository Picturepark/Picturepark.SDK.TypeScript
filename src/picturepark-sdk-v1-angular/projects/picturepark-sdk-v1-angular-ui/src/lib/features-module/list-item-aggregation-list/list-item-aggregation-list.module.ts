import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ListItemAggregationListComponent } from './list-item-aggregation-list.component';
import { ListItemAggregationComponent } from './components/list-item-aggregation/list-item-aggregation.component';

@NgModule({
  declarations: [
    ListItemAggregationListComponent,
    ListItemAggregationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListItemAggregationListComponent,
    ListItemAggregationComponent
  ]
})
export class ListItemAggregationListModule { }
