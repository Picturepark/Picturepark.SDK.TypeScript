import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PictureparkUIConfiguration } from '../../configuration';

@Component({
  selector: 'pp-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent implements OnChanges {

  @Input() title: string;

  constructor() {}

  focusSearch() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.title = changes.title && changes.title.currentValue;
  }

}
