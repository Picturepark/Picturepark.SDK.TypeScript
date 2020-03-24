import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-your-pp-subscription',
  templateUrl: './your-pp-subscription.component.html',
  styleUrls: ['./your-pp-subscription.component.scss'],
})
export class YourPpSubscriptionComponent {
  @Input() title: string;

  constructor() {}
}
