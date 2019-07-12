import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { ShareAggregationListComponent } from './share-aggregation-list.component';

@NgModule({
  declarations: [
    ShareAggregationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ShareAggregationListComponent
  ]
})
export class ShareAggregationListModule { }
