import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfigurationFactory } from '../lib/configuration';
import { SharedModule } from './shared-module/shared-module.module';

// IMPORTANT: Update docs/picturepark-sdk-v2-angular/modules.md when changing modules
@NgModule({
  declarations: [],
  providers: [{ provide: PICTUREPARK_UI_CONFIGURATION, useFactory: PictureparkUIConfigurationFactory }],
  imports: [CommonModule, SharedModule.forRoot()],
  exports: [SharedModule],
})
export class PictureparkUiModule {}
