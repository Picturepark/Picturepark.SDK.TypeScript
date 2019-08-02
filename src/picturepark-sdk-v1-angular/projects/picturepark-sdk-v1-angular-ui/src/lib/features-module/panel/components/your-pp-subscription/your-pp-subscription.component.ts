import { Component } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-your-pp-subscription',
  templateUrl: './your-pp-subscription.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './your-pp-subscription.component.scss']
})
export class YourPpSubscriptionComponent extends PanelBaseComponent {

  constructor() {
    super();
  }

}
