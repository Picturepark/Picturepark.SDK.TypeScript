import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../../shared-module/shared-module.module';

// COMPONENTS
import { ListComponent } from './list.component';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
