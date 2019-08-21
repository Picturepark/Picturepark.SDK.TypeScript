import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { ItemsPanelComponent } from './components/items-panel/items-panel.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';
import { ItemPanelPreviewComponent } from './components/items-panel/components/item-panel-preview/item-panel-preview.component';
import { MailRecipientsPanelComponent } from './components/mail-recipients-panel/mail-recipients-panel.component';

@NgModule({
  declarations: [
    ItemsPanelComponent,
    ItemPanelPreviewComponent,
    MailRecipientsPanelComponent,
    OwnerPanelComponent,
    SettingsPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ItemsPanelComponent,
    ItemPanelPreviewComponent,
    MailRecipientsPanelComponent,
    OwnerPanelComponent,
    SettingsPanelComponent,
  ]
})
export class PanelModule { }
