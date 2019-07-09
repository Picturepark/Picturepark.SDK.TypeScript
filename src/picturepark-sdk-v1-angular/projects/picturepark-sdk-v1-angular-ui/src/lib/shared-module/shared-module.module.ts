import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULES
import { MaterialsModule } from '../materials-module/materials-module.module';

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
import { LazyLoadDirective } from './directives/lazy-load.directive';

@NgModule({
  declarations: [
    // COMPONENTS
    // PIPES
    FileSizePipe,
    TranslatePipe,
    LazyLoadDirective,
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
    // PIPES
    FileSizePipe,
    TranslatePipe,
    LazyLoadDirective
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
