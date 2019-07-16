import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ListModule } from './list/list.module';
import { ListBrowserModule } from '../list-browser/list-browser.module';
import { ListItemAggregationListModule } from '../list-item-aggregation-list/list-item-aggregation-list.module';
import { SchemasModule } from './schemas/schemas.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListModule,
    ListBrowserModule,
    ListItemAggregationListModule,
    SchemasModule,
  ],
  exports: [
    ListModule,
    SchemasModule
  ]
})
export class ListItemsModule { }
