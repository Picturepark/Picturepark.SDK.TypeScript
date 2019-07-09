import { Component, OnInit } from '@angular/core';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-items-panel',
  templateUrl: './items-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './items-panel.component.css']
})
export class ItemsPanelComponent extends PanelBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
