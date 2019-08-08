import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-help-support-resources',
  templateUrl: './help-support-resources.component.html',
  styleUrls: ['./help-support-resources.component.scss']
})
export class HelpSupportResourcesComponent {

  @Input() title: string;

  constructor() {}

}
