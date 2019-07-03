import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULES
import { MaterialsModule } from '../materials-module/materials-module.module';

// COMPONENTS
import { ExportBaseComponent } from './components/export/export-base.component';

// SERVICES
import { BasketService } from './services/basket/basket.service';
import { ContentItemSelectionService } from './services/content-item-selection/content-item-selection.service';
import { LiquidRenderingService } from './services/liquid-rendering/liquid-rendering.service';
import { MetaDataPreviewService } from './services/metadata-preview/metadata-preview.service';
import { NotificationService } from './services/notification/notification.service';
import { TranslationService } from './services/translations/translation.service';

// PIPES
import { FileSizePipe } from './pipes/filesize.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { ImportBaseComponent } from './components/import/import-base/import-base.component';

@NgModule({
  declarations: [
    // COMPONENTS
    //ExportBaseComponent,
    // PIPES
    FileSizePipe,
    TranslatePipe,
    ImportBaseComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    // COMPONENTS
    //ExportBaseComponent,
    // PIPES
    FileSizePipe,
    TranslatePipe
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        BasketService,
        ContentItemSelectionService,
        LiquidRenderingService,
        MetaDataPreviewService,
        NotificationService,
        TranslationService,
      ]
    };
  }
}
