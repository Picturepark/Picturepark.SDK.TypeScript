import { OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class PanelBaseComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  // VARS
  @Input() title: string;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
