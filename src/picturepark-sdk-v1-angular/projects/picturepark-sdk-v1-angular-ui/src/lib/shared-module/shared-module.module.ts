import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { MaterialsModule } from '../materials-module/materials-module.module';

// Services
import { BasketService } from './services/basket/basket.service';
import { SelectionService } from './services/selection/selection.service';
import { MetaDataPreviewService } from './services/metadata-preview/metadata-preview.service';
import { NotificationService } from './services/notification/notification.service';
import { TranslationService } from './services/translations/translation.service';

// Pipes
import { AvatarPipe, AvatarHashedPipe } from './pipes/avatar.pipe';
import { FileSizePipe } from './pipes/filesize.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { AggregationComponent } from './components/aggregation/aggregation.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { PanelComponent } from './components/panel/panel.component';

// HammerJS
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ContentItemThumbnailComponent } from './components/content-item-thumbnail/content-item-thumbnail.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pan: {
      direction: 6,
    },
    pinch: {
      enable: false,
    },
    rotate: {
      enable: false,
    },
  };
}

@NgModule({
  declarations: [
    // COMPONENTS
    AggregationComponent,
    ContentItemThumbnailComponent,
    PanelComponent,
    ConfirmDialogComponent,
    // PIPES
    AvatarPipe,
    AvatarHashedPipe,
    FileSizePipe,
    TranslatePipe,
    LazyLoadDirective,
    HighlightPipe,
  ],
  imports: [CommonModule, MaterialsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    // COMPONENTS
    AggregationComponent,
    ContentItemThumbnailComponent,
    PanelComponent,
    ConfirmDialogComponent,
    // PIPES
    AvatarPipe,
    AvatarHashedPipe,
    FileSizePipe,
    TranslatePipe,
    LazyLoadDirective,
    HighlightPipe,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        BasketService,
        SelectionService,
        MetaDataPreviewService,
        NotificationService,
        TranslationService,
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
      ],
    };
  }
}
