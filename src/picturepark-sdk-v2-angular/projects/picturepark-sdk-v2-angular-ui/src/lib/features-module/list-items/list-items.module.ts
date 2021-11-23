import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ListModule } from './list/list.module';
import { ListBrowserModule } from '../list-browser/list-browser.module';
import { AggregationListModule } from '../../shared-module/components/aggregation-list/aggregation-list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ListModule, ListBrowserModule, AggregationListModule],
  exports: [ListModule],
})
export class ListItemsModule {}
