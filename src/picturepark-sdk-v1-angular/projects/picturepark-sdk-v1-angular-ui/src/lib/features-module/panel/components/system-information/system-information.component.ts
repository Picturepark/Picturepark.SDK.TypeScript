import { Component } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-system-information',
  templateUrl: './system-information.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './system-information.component.scss']
})
export class SystemInformationComponent extends PanelBaseComponent {

  constructor() {
    super();
  }

}
