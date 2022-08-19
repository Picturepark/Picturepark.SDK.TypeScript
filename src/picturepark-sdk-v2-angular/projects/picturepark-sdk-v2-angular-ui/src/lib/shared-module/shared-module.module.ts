import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { MaterialsModule } from '../materials-module/materials-module.module';

// Services
import { SessionService } from './services/session/session.service';
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
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { ContentItemThumbnailComponent } from './components/content-item-thumbnail/content-item-thumbnail.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AggregationItemTranslatePipe } from './pipes/aggregation-item-translate';
import { UserInteractionDirective } from './directives/user-interaction.directive';
import { LoggerService } from '@picturepark/sdk-v2-angular';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  // iOS Safari & Android Chrome inconsistencies
  // https://github.com/hammerjs/hammer.js/issues/1166
  overrides = <any>{
    press: { time: 400 },
    pan: {
      direction: 30,
      enable: true,
      pointers: 0,
    },
  };

  options = {
    touchAction: 'auto',
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
    AggregationItemTranslatePipe,
    UserInteractionDirective,
  ],
  imports: [CommonModule, MaterialsModule, ReactiveFormsModule, HammerModule],
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
    AggregationItemTranslatePipe,
    UserInteractionDirective,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SessionService,
        BasketService,
        SelectionService,
        MetaDataPreviewService,
        NotificationService,
        TranslationService,
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
        LoggerService,
      ],
    };
  }
}
