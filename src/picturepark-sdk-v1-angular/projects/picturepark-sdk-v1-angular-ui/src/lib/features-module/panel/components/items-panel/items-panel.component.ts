import { Component, OnInit, Input } from '@angular/core';

// LIBRARIES
import { ShareContentDetail } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-items-panel',
  templateUrl: './items-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './items-panel.component.scss']
})
export class ItemsPanelComponent extends PanelBaseComponent implements OnInit {

  @Input() items: ShareContentDetail[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this.items)
  }

}
