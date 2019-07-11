import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

// LIBRARIES
import { ShareContentDetail } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { PanelBaseComponent } from '../panel-base/panel-base.component';

@Component({
  selector: 'pp-items-panel',
  templateUrl: './items-panel.component.html',
  styleUrls: ['../panel-base/panel-base.component.scss', './items-panel.component.scss']
})
export class ItemsPanelComponent extends PanelBaseComponent implements OnInit, OnChanges {

  @Input() items: ShareContentDetail[];
  @Input() creationDate: Date;
  @Input() modificationDate: Date;

  // VARS
  loader = false;

  constructor() {
    super();
  }

  // OPEN IN NEW WINDOW
  openInNewWindow(item: ShareContentDetail): void {

  }

  // DELETE ITEM
  deleteItem(item: ShareContentDetail): void {

  }

  ngOnInit() {
    this.loader = true;
  }

  ngOnChanges(changes: SimpleChanges) {

    this.items = changes.items && changes.items.currentValue;
    this.creationDate = changes.creationDate && changes.creationDate.currentValue;
    this.modificationDate = changes.modificationDate && changes.modificationDate.currentValue;

    if(this.items && this.creationDate && this.modificationDate) {
      this.loader = false;
    }

  }

}
