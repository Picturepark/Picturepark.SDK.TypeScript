import { Component } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-help-support-resources',
  templateUrl: './help-support-resources.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './help-support-resources.component.scss']
})
export class HelpSupportResourcesComponent extends PanelBaseComponent {

  constructor() {
    super();
  }

}
