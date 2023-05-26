import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AggregationListComponent } from './aggregation-list.component';
import { SharedModule } from '../../shared-module.module';

@NgModule({
    imports: [CommonModule, SharedModule, AggregationListComponent],
    exports: [AggregationListComponent],
})
export class AggregationListModule {}
