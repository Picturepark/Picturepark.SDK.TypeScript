import { Component, OnInit, Input } from '@angular/core';
import { PictureparkUIConfiguration } from '../../configuration';

@Component({
  selector: 'pp-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent implements OnInit {

  @Input() title: string;

  constructor() {}

  focusSearch() {}

  ngOnInit() {
  }

}
