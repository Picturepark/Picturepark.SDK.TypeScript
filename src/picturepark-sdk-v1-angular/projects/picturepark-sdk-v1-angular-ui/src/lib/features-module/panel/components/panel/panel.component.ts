import { Component, Input } from '@angular/core';
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './panel.component.scss'],
})
export class PanelComponent extends PanelBaseComponent {

  @Input() title: string;

  constructor(
  ) {
    super();
  }
}
