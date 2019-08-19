import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-system-information',
  templateUrl: './system-information.component.html',
  styleUrls: ['./system-information.component.scss']
})
export class SystemInformationComponent {

  @Input() title: string;

  constructor() {}

}
