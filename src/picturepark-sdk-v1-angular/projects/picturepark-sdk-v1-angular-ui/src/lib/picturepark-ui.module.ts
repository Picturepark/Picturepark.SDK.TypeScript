import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PICTURE PARK ACTIONS CONFIG
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfigurationFactory } from '../lib/configuration';

// MODULES
import { FeaturesModule } from './features-module/features-module.module';
import { SharedModule } from './shared-module/shared-module.module';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules
@NgModule({
  declarations: [],
  providers: [{ provide: PICTUREPARK_UI_CONFIGURATION, useFactory: PictureparkUIConfigurationFactory }],
  imports: [CommonModule, FeaturesModule, SharedModule.forRoot()],
  exports: [FeaturesModule, SharedModule],
})
export class PictureparkUiModule {}
