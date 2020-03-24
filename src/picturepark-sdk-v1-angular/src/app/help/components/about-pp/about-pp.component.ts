import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-pp',
  templateUrl: './about-pp.component.html',
  styleUrls: ['./about-pp.component.scss'],
})
export class AboutPpComponent {
  @Input() title: string;

  constructor() {}
}
