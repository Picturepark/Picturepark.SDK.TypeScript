import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// MODULES
import { SharedModule } from '../../../shared-module/shared-module.module';
// import { SharedImportModule } from '../../../infrastructure/components/import/shared-import.module';

// COMPONENTS
import { ListItemsImportComponent } from './list-items-import.component';
import { ListItemsImportMapStepComponent } from './list-items-import-map-step/list-items-import-map-step.component';
import {
  ListItemsImportPreviewStepComponent,
} from './list-items-import-preview-step/list-items-import-preview-step.component';

@NgModule({
  declarations: [
    ListItemsImportComponent,
    ListItemsImportMapStepComponent,
    ListItemsImportPreviewStepComponent
  ],
  imports: [
    //SharedImportModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    ListItemsImportComponent,
    //SharedImportModule,
    CommonModule,
  ],
})
export class ListItemsImportModule { }