import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-third-party-licenses-credits',
  templateUrl: './third-party-licenses-credits.component.html',
  styleUrls: ['./third-party-licenses-credits.component.scss']
})
export class ThirdPartyLicensesCreditsComponent {

  @Input() title: string;

  constructor() {}
}
