import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AggregationListComponent } from './aggregation-list.component';
import { SharedModule } from '../../shared-module.module';

@NgModule({
  declarations: [AggregationListComponent],
  imports: [CommonModule, SharedModule],
  exports: [AggregationListComponent],
})
export class AggregationListModule {}
