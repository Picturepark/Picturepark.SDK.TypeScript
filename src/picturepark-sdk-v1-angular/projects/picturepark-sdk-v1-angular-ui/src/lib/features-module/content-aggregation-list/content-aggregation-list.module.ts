import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ContentAggregationListComponent } from './content-aggregation-list.component';
import { ContentAggregationComponent } from './components/content-aggregation/content-aggregation.component';

@NgModule({
  declarations: [
    ContentAggregationListComponent,
    ContentAggregationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ContentAggregationListComponent,
    ContentAggregationComponent
  ]
})
export class ContentAggregationListModule { }
