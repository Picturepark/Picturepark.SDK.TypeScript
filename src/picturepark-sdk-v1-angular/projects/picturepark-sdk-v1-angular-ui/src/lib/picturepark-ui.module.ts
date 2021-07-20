import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PICTURE PARK ACTIONS CONFIG
import {
  PICTUREPARK_UI_CONFIGURATION,
  PictureparkUIConfigurationFactory,
  ConfigService,
  initConfigurationFactory,
} from '../lib/configuration';

// MODULES
import { FeaturesModule } from './features-module/features-module.module';
import { SharedModule } from './shared-module/shared-module.module';
import { LANGUAGES_LOADED, ProfileService } from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules
@NgModule({
  declarations: [],
  providers: [
    { provide: ConfigService },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfigurationFactory,
      deps: [ConfigService, OidcAuthService, ProfileService, LANGUAGES_LOADED],
      multi: true,
    },
    {
      provide: PICTUREPARK_UI_CONFIGURATION,
      useFactory: PictureparkUIConfigurationFactory,
      deps: [ConfigService],
    },
  ],
  imports: [CommonModule, FeaturesModule, SharedModule.forRoot()],
  exports: [FeaturesModule, SharedModule],
})
export class PictureparkUiModule {}
