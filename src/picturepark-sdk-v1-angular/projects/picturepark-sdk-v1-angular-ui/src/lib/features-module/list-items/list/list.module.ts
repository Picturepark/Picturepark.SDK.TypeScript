import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ListBrowserModule } from '../../list-browser/list-browser.module';
import { SharedModule } from '../../../shared-module/shared-module.module';

// COMPONENTS
import { ListComponent } from './list.component';
import { AggregationListModule } from '../../../shared-module/components/aggregation-list/aggregation-list.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, SharedModule, ListBrowserModule, AggregationListModule],
  exports: [ListComponent],
})
export class ListModule {}
