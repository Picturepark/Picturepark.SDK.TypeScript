import { Component, OnInit } from '@angular/core';

// COMPONETNS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './settings-panel.component.scss']
})
export class SettingsPanelComponent extends PanelBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
