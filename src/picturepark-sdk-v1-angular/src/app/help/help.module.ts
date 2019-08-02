import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import { ApplicationHeaderModule, ItemToolBarModule, PanelModule } from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { HelpRoutingModule } from './help-routing.module';

// COMPONENTS
import { HelpWrapperComponent } from './help-wrapper.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
    HelpWrapperComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    ApplicationHeaderModule,
    HelpRoutingModule,
    ItemToolBarModule,
    PanelModule
  ]
})
export class HelpModule { }
