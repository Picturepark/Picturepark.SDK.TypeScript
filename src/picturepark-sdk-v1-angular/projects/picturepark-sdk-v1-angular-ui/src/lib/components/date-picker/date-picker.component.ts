import { Component, Input } from '@angular/core';

@Component({
  selector: 'pp-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Input() placeHolderMessage: string;
}

