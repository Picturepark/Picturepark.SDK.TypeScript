import { Component } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-about-pp',
  templateUrl: './about-pp.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './about-pp.component.scss']
})
export class AboutPpComponent extends PanelBaseComponent {

  constructor() {
    super();
  }

}
