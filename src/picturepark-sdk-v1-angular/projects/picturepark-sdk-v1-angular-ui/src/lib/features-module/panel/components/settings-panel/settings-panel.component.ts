import { Component, OnInit, Input } from '@angular/core';

// COMPONETNS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './settings-panel.component.scss']
})
export class SettingsPanelComponent extends PanelBaseComponent implements OnInit {

  @Input() subject: string;
  @Input() accessOriginal: string;
  @Input() creationDate: Date;
  @Input() modificationDate: Date;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
