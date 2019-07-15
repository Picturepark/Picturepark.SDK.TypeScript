import { Component, OnInit, Input } from '@angular/core';
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import { BaseComponent } from '../../shared-module/components/base.component';
import { IEntityBase } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-browser-toolbar',
  templateUrl: './browser-toolbar.component.html',
  styleUrls: ['./browser-toolbar.component.scss']
})
export class BrowserToolbarComponent extends BaseComponent implements OnInit {

  @Input()
  entityName: string;

  @Input()
  browser: BaseBrowserComponent<IEntityBase>;

  constructor() {
    super();
  }

  ngOnInit() {
    const selectionChange = this.browser.selectedItemsChange.subscribe(i => console.log(i) );
    this.subscription.add(selectionChange);
  }
}
