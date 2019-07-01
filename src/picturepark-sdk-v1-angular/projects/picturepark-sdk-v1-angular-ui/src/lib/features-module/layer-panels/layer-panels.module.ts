import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { LayerPanelsComponent } from './layer-panels.component';
import { FieldDetailInfoDialogComponent } from './components/field-detail-info-dialog/field-detail-info-dialog.component';

@NgModule({
  declarations: [
    LayerPanelsComponent,
    FieldDetailInfoDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LayerPanelsComponent,
    FieldDetailInfoDialogComponent
  ],
  entryComponents: [
    FieldDetailInfoDialogComponent,
  ]
})
export class LayerPanelsModule { }
