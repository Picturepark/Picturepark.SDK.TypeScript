import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared-module/shared-module.module';
import { FieldDetailInfoDialogComponent } from './components/field-detail-info-dialog/field-detail-info-dialog.component';
import { LayerFieldsComponent } from './components/layer-fields/layer-fields.component';
import { LayerPanelsComponent } from './layer-panels.component';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { MarkdownDirective } from './directives/markdown-directive';
import { ReadMoreComponent } from './components/read-more/read-more.component';

@NgModule({
  declarations: [
    LayerPanelsComponent,
    FieldDetailInfoDialogComponent,
    LayerFieldsComponent,
    MarkdownDirective,
    ReadMoreComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [LayerPanelsComponent, FieldDetailInfoDialogComponent, MarkdownDirective, ReadMoreComponent],
  providers: [TranslatePipe],
})
export class LayerPanelsModule {}
