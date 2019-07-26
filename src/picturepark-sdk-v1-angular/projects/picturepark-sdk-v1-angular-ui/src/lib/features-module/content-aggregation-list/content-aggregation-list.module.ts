import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ContentAggregationListComponent } from './content-aggregation-list.component';

@NgModule({
  declarations: [
    ContentAggregationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ContentAggregationListComponent
  ]
})
export class ContentAggregationListModule { }
