import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared-module/shared-module.module';
import { FieldDetailInfoDialogComponent } from './components/field-detail-info-dialog/field-detail-info-dialog.component';
import { LayerFieldsComponent } from './components/layer-fields/layer-fields.component';
import { LayerPanelsComponent } from './layer-panels.component';

@NgModule({
  declarations: [
    LayerPanelsComponent,
    FieldDetailInfoDialogComponent,
    LayerFieldsComponent
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
