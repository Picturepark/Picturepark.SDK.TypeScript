import { Component, Input } from '@angular/core';

@Component({
  selector: 'pp-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() title: string;
}
