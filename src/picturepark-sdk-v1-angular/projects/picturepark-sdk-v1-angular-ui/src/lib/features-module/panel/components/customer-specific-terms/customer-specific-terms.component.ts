import { Component } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-customer-specific-terms',
  templateUrl: './customer-specific-terms.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './customer-specific-terms.component.scss']
})
export class CustomerSpecificTermsComponent extends PanelBaseComponent {

  constructor() {
    super();
  }

}
