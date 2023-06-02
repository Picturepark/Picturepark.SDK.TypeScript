import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-application-header',
    templateUrl: './application-header.component.html',
    styleUrls: ['./application-header.component.scss'],
    standalone: true,
})
export class ApplicationHeaderComponent {
  @Input() title: string;

  constructor() {}
}
