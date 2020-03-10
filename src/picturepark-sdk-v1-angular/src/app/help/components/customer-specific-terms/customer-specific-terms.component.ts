import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-specific-terms',
  templateUrl: './customer-specific-terms.component.html',
  styleUrls: ['./customer-specific-terms.component.scss']
})
export class CustomerSpecificTermsComponent {
  @Input() title: string;

  constructor() {}
}
