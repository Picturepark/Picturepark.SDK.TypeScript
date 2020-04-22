import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pp-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnDestroy {
  protected subscription = new Subscription();
  @Input() title: string;

  constructor() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
