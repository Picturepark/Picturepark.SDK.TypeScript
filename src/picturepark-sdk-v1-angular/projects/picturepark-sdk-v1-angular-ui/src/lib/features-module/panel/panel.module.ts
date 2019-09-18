import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';
import { MailRecipientsPanelComponent } from './components/mail-recipients-panel/mail-recipients-panel.component';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
  declarations: [
    MailRecipientsPanelComponent,
    OwnerPanelComponent,
    SettingsPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MailRecipientsPanelComponent,
    OwnerPanelComponent,
    SettingsPanelComponent
  ]
})
export class PanelModule { }
