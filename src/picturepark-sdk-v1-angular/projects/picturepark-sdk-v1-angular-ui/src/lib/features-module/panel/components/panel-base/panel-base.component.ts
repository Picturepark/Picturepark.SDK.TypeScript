import { OnInit, Input, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export class PanelBaseComponent implements OnInit, OnDestroy {

  protected subscription = new Subscription();

  // VARS
  @Input() title: string;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
