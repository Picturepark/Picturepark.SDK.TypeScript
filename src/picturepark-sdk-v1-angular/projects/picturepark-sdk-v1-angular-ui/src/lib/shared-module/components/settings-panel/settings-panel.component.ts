import { Component, Input } from '@angular/core';
// COMPONENTS
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'pp-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['../panel/panel.component.scss', './settings-panel.component.scss'],
})
export class SettingsPanelComponent extends PanelComponent {
  @Input() subject: string;
  @Input() accessOriginal: string;
  @Input() creationDate: Date;
  @Input() modificationDate: Date;

  constructor() {
    super();
  }
}
