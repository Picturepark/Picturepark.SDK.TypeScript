import { Component, OnInit } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-owner-panel',
  templateUrl: './owner-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './owner-panel.component.css']
})
export class OwnerPanelComponent extends PanelBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
