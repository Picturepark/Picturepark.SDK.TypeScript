import { Component } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-third-party-licenses-credits',
  templateUrl: './third-party-licenses-credits.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './third-party-licenses-credits.component.scss']
})
export class ThirdPartyLicensesCreditsComponent extends PanelBaseComponent {

  constructor() {
    super();
  }
}
