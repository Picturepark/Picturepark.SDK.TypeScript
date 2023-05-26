import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'pp-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class PanelComponent {
  @Input() title: string;
  @Input() showHeader = true;
}
