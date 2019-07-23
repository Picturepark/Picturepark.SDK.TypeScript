import { Component, Input } from '@angular/core';

@Component({
  selector: 'pp-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent {

  @Input() title: string;

  constructor() {}

  focusSearch() {}

}
