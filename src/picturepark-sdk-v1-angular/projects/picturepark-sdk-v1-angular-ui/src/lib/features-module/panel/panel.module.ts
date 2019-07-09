import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { ItemsPanelComponent } from './components/items-panel/items-panel.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';

@NgModule({
  declarations: [
    SettingsPanelComponent,
    ItemsPanelComponent,
    OwnerPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SettingsPanelComponent,
    ItemsPanelComponent,
    OwnerPanelComponent
  ]
})
export class PanelModule { }
