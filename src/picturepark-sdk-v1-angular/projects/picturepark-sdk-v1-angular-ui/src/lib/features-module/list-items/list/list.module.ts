import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ListBrowserModule } from '../../list-browser/list-browser.module';
import { ListItemAggregationListModule } from '../../list-item-aggregation-list/list-item-aggregation-list.module';
import { SharedModule } from '../../../shared-module/shared-module.module';

// COMPONENTS
import { ListComponent } from './list.component';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListBrowserModule,
    ListItemAggregationListModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
